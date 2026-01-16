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

            // Handle both string (Umbraco 13 and earlier) and JsonObject/JsonElement (Umbraco 14+)
            // This fixes compatibility with Umbraco 14+ where the intermediate value is JsonObject instead of string
            string jsonString;
            if (inter is JsonObject jsonObject)
            {
                jsonString = jsonObject.ToJsonString();
            }
            else if (inter is JsonElement jsonElement)
            {
                jsonString = jsonElement.GetRawText();
            }
            else if (inter is string str)
            {
                jsonString = str;
            }
            else
            {
                // Fallback for any other type
                jsonString = inter.ToString();
            }
            
            string packageId = null;

            using (JsonDocument document = JsonDocument.Parse(jsonString))
            {
                if (document.RootElement.TryGetProperty("packageId", out JsonElement packageIdElement))
                {
                    packageId = packageIdElement.GetString();
                }
            }


            var model = JsonSerializer.Deserialize<Icon>(jsonString);

            var config = new IconicPackagesConfiguration();
            var jobj = propertyType.DataType.ConfigurationAs<IDictionary<string, object>>();

            config.Packages = JsonSerializer.Deserialize<IEnumerable<Package>>(jobj["packages"].ToString());


            var package = config.Packages.SingleOrDefault(x => x.Id.ToString() == packageId);

            if (package is null)
            {
                return null;
            }

            model.Package = package;

            return model;
        }


    }
}
