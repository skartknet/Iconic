using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Sync;

namespace Our.Iconic.Migrations
{
    /// <summary>
    /// Brings Iconic data types created with Iconic 12/13 (Umbraco 10-13) to the current format. Umbraco's own upgrade
    /// keeps these data types on the <c>our.iconic</c> property editor, which no longer exists, so they show up as
    /// missing editors and their configuration is in a shape the new backoffice can't use:
    /// <list type="bullet">
    /// <item>the data type moves to the core plain JSON property editor with the <c>Our.Iconic</c> UI;</item>
    /// <item>each package's single <c>template</c> becomes the <c>backofficeTemplate</c> (now required) and the
    /// <c>frontendTemplate</c>;</item>
    /// <item>the stylesheet and source file paths, stored as file system paths (<c>wwwroot/css/icons.css</c>),
    /// become the URLs the backoffice now fetches them from (<c>/css/icons.css</c>);</item>
    /// <item>a missing <c>filteredIcons</c> list is added.</item>
    /// </list>
    /// Stored property values don't change: they are still <c>{"icon": ..., "packageId": ...}</c>.
    /// </summary>
    /// <remarks>
    /// Runs on every start rather than once as a migration plan step, so it also picks up Iconic 13 data types that
    /// arrive later, such as from uSync or Deploy schema files exported before the upgrade. It only saves a data type
    /// that still needs a change, so on an up-to-date site it reads the Iconic data types and stops.
    /// </remarks>
    public sealed class IconicDataTypeMigration : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
    {
        /// <summary>The property editor alias of Iconic 12/13 (Umbraco 10-13).</summary>
        public const string LegacyEditorAlias = "our.iconic";

        /// <summary>The alias of Iconic's property editor UI.</summary>
        public const string EditorUiAlias = "Our.Iconic";

        private readonly IRuntimeState _runtimeState;
        private readonly IServerRoleAccessor _serverRoleAccessor;
        private readonly IDataTypeService _dataTypeService;
        private readonly PropertyEditorCollection _propertyEditors;
        private readonly IConfigurationEditorJsonSerializer _jsonSerializer;
        private readonly ILogger<IconicDataTypeMigration> _logger;

        public IconicDataTypeMigration(
            IRuntimeState runtimeState,
            IServerRoleAccessor serverRoleAccessor,
            IDataTypeService dataTypeService,
            PropertyEditorCollection propertyEditors,
            IConfigurationEditorJsonSerializer jsonSerializer,
            ILogger<IconicDataTypeMigration> logger)
        {
            _runtimeState = runtimeState;
            _serverRoleAccessor = serverRoleAccessor;
            _dataTypeService = dataTypeService;
            _propertyEditors = propertyEditors;
            _jsonSerializer = jsonSerializer;
            _logger = logger;
        }

        public async Task HandleAsync(UmbracoApplicationStartedNotification notification, CancellationToken cancellationToken)
        {
            // Only once the database is installed and upgraded, and only on the server that writes to it.
            if (_runtimeState.Level != RuntimeLevel.Run || _serverRoleAccessor.CurrentServerRole == ServerRole.Subscriber)
            {
                return;
            }

            var dataTypes = (await _dataTypeService.GetByEditorAliasAsync(LegacyEditorAlias))
                .Concat(await _dataTypeService.GetByEditorUiAlias(EditorUiAlias))
                .DistinctBy(x => x.Key)
                .ToList();

            foreach (var dataType in dataTypes)
            {
                try
                {
                    await MigrateAsync(dataType);
                }
                catch (Exception ex)
                {
                    // One data type that can't be moved shouldn't stop the site from starting.
                    _logger.LogError(ex, "Could not update Iconic data type {DataTypeName} ({DataTypeKey})", dataType.Name, dataType.Key);
                }
            }
        }

        private async Task MigrateAsync(IDataType dataType)
        {
            var changed = false;

            if (dataType.EditorAlias != Constants.PropertyEditors.Aliases.PlainJson || dataType.EditorUiAlias != EditorUiAlias)
            {
                if (!_propertyEditors.TryGet(Constants.PropertyEditors.Aliases.PlainJson, out var plainJson))
                {
                    throw new InvalidOperationException($"The {Constants.PropertyEditors.Aliases.PlainJson} property editor is not registered.");
                }

                dataType.Editor = plainJson;
                dataType.EditorUiAlias = EditorUiAlias;
                changed = true;
            }

            var configuration = JsonNode.Parse(_jsonSerializer.Serialize(dataType.ConfigurationData)) as JsonObject ?? new JsonObject();
            if (configuration["packages"] is JsonArray packages)
            {
                foreach (var package in packages.OfType<JsonObject>())
                {
                    changed |= MigratePackage(package);
                }
            }

            if (!changed)
            {
                return;
            }

            dataType.ConfigurationData = _jsonSerializer.Deserialize<Dictionary<string, object>>(configuration.ToJsonString())
                ?? new Dictionary<string, object>();

            var result = await _dataTypeService.UpdateAsync(dataType, Constants.Security.SuperUserKey);
            if (!result.Success)
            {
                throw new InvalidOperationException($"Saving the data type failed: {result.Status}");
            }

            _logger.LogInformation("Updated Iconic data type {DataTypeName} ({DataTypeKey}) to the current format", dataType.Name, dataType.Key);
        }

        /// <summary>Brings one package's configuration to the current format; returns whether anything changed.</summary>
        internal static bool MigratePackage(JsonObject package)
        {
            var changed = false;

            // Only Iconic 12/13 packages have a "template" (and file system paths).
            if (package["template"] is JsonValue templateValue)
            {
                templateValue.TryGetValue(out string? template);

                if (string.IsNullOrWhiteSpace(GetString(package, "backofficeTemplate")))
                {
                    package["backofficeTemplate"] = template;
                }

                if (string.IsNullOrWhiteSpace(GetString(package, "frontendTemplate")))
                {
                    package["frontendTemplate"] = template;
                }

                package.Remove("template");

                foreach (var property in new[] { "cssfile", "sourcefile" })
                {
                    if (GetString(package, property) is { } path)
                    {
                        package[property] = ToUrl(path);
                    }
                }

                changed = true;
            }

            if (package["filteredIcons"] is null)
            {
                package["filteredIcons"] = new JsonArray();
                changed = true;
            }

            return changed;
        }

        /// <summary>
        /// Turns an Iconic 12/13 file path (<c>wwwroot/css/icons.css</c>, as its file picker stored it, or
        /// <c>~/css/icons.css</c>) into a root-relative URL (<c>/css/icons.css</c>). External URLs are kept.
        /// </summary>
        internal static string ToUrl(string path)
        {
            if (string.IsNullOrWhiteSpace(path) || path.Contains("://") || path.StartsWith("//"))
            {
                return path;
            }

            var relative = path.TrimStart('~').TrimStart('/');
            if (relative.StartsWith("wwwroot/", StringComparison.OrdinalIgnoreCase))
            {
                relative = relative.Substring("wwwroot/".Length);
            }

            return "/" + relative;
        }

        private static string? GetString(JsonObject package, string propertyName)
            => package[propertyName] is JsonValue value && value.TryGetValue(out string? text) ? text : null;
    }
}
