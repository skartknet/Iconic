using System;
using System.Text.Json.Serialization;

namespace Our.Iconic.Core.Models
{
    public class Icon
    {

        [JsonPropertyName("icon")]
        public string Value { get; set; }

        public Package Package { get; set; }

        /// <summary>
        /// Returns the icon as HTML string, allowing simple usage with @Html.Raw(Model.Icon)
        /// This maintains backward compatibility with the documented usage pattern while
        /// still allowing advanced scenarios via .RenderIcon() extension methods.
        /// </summary>
        public override string ToString()
        {
            if (Package == null || string.IsNullOrWhiteSpace(Value))
            {
                return string.Empty;
            }

            // Prefer frontend template, fallback to backoffice template
            var template = !string.IsNullOrWhiteSpace(Package.FrontendTemplate)
                ? Package.FrontendTemplate
                : Package.BackofficeTemplate;

            if (string.IsNullOrWhiteSpace(template))
            {
                return string.Empty;
            }

            // Replace the {icon} placeholder with the actual icon value
            return template.Replace("{icon}", Value);
        }
    }
}
