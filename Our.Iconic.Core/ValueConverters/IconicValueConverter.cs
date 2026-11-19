using Our.Iconic.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

namespace Our.Iconic.Core.ValueConverters
{
    public class IconicValueConverter : PropertyValueConverterBase
    {


        public override bool IsConverter(IPublishedPropertyType propertyType)
             => propertyType.EditorUiAlias.Equals("our.iconic", StringComparison.OrdinalIgnoreCase);

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType)
            => typeof(Icon);



        public override object ConvertIntermediateToObject(IPublishedElement owner,
                                                  IPublishedPropertyType propertyType,
                                                  PropertyCacheLevel referenceCacheLevel,
                                                  object inter,
                                                  bool preview)
        {
            // No icon picked. Depending on the Umbraco version and where the property lives, that arrives as null,
            // an empty string, or JSON null (block list/grid items keep an empty picker as null).
            var value = AsJsonObject(inter);
            if (value is null)
            {
                return null;
            }

            var iconValue = GetString(value, "icon");
            if (string.IsNullOrWhiteSpace(iconValue) || !Guid.TryParse(GetString(value, "packageId"), out var packageId))
            {
                return null;
            }

            var configuration = propertyType.DataType.ConfigurationAs<IDictionary<string, object>>();
            if (configuration is null || !configuration.TryGetValue("packages", out var packages) || packages is null)
            {
                return null;
            }

            var package = JsonSerializer.Deserialize<IEnumerable<Package>>(packages.ToString())?
                .FirstOrDefault(x => x.Id == packageId);

            if (package is null)
            {
                return null;
            }

            return new Icon
            {
                Value = iconValue,
                Package = package
            };
        }

        /// <summary>
        /// Gets the stored value as a JSON object: Umbraco 14+ hands over a JsonObject or JsonElement, earlier versions
        /// (and values stored as text) a string. Returns null for anything that isn't an object.
        /// </summary>
        private static JsonObject AsJsonObject(object inter)
        {
            try
            {
                switch (inter)
                {
                    case JsonObject jsonObject:
                        return jsonObject;
                    case JsonElement { ValueKind: JsonValueKind.Object } jsonElement:
                        return JsonNode.Parse(jsonElement.GetRawText()) as JsonObject;
                    case JsonElement { ValueKind: JsonValueKind.String } jsonElement:
                        return Parse(jsonElement.GetString());
                    case JsonValue jsonValue when jsonValue.TryGetValue(out string text):
                        return Parse(text);
                    case string text:
                        return Parse(text);
                    default:
                        return null;
                }
            }
            catch (JsonException)
            {
                return null;
            }
        }

        private static JsonObject Parse(string json)
            => string.IsNullOrWhiteSpace(json) ? null : JsonNode.Parse(json) as JsonObject;

        private static string GetString(JsonObject value, string propertyName)
            => value[propertyName] is JsonValue jsonValue && jsonValue.TryGetValue(out string text) ? text : null;
    }
}
