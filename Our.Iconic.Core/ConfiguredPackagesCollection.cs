using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Our.Iconic.Core.Models;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace Our.Iconic.Core
{
    public class ConfiguredPackagesCollectionComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddSingleton<ConfiguredPackagesCollection>();
        }

    }


    public class ConfiguredPackagesCollection
    {
        private readonly IDictionary<string, IDictionary<Guid, Package>> _packagesCache;
        private readonly IDataTypeService dataTypeService;

        public ConfiguredPackagesCollection(IDataTypeService dataTypeService)
        {
            _packagesCache = new ConcurrentDictionary<string, IDictionary<Guid, Package>>();
            this.dataTypeService = dataTypeService;
        }

        public async Task<IDictionary<Guid, Package>> GetConfiguredPackages(IPublishedPropertyType propertyType)
        {
            var uniqueKey = propertyType.DataType.Id.ToString();
            if (!_packagesCache.ContainsKey(uniqueKey))
            {
                var dataType = await dataTypeService.GetAsync(propertyType.DataType.EditorAlias);
                var configurationJson = dataType.ConfigurationAs<IconicPackagesConfiguration>();
                _packagesCache.Add(uniqueKey, configurationJson.Packages.ToDictionary(p => p.Id));
            }

            return _packagesCache[uniqueKey];

        }

        public void Remove(string key)
        {
            _ = _packagesCache.Remove(key);
        }
        

    }
}
