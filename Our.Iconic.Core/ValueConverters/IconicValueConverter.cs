using Newtonsoft.Json.Linq;
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
            if (inter == null) return null;


            var model = JsonSerializer.Deserialize<Icon>((string)inter);

            var config = new IconicPackagesConfiguration();
            var jobj = propertyType.DataType.ConfigurationAs<IDictionary<string, object>>();

            config.Packages = JsonSerializer.Deserialize<IEnumerable<Package>>(jobj["packages"].ToString());


            var package = config.Packages.SingleOrDefault(x => x.Id == model.PackageId);

            if (package is null)
            {
                return null;
            }

            model.Package = package;

            return model;
        }


    }
}
