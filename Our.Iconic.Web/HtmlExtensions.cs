using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Our.Iconic.Core.Models;
using System.Text;
using System.Text.RegularExpressions;
using Umbraco.Extensions;

namespace Our.Iconic.Web
{
    public static class HtmlExtensions
    {
        /// <summary>
        /// It helps to add html attributes and extra class to an Iconic icon template.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="icon"></param>
        /// <param name="htmlAttributes">Replaces an {attributes} placeholder in the icon template with the atttributes.</param>
        /// <param name="extraClasses">Replaces an {classes} placeholder in the icon template.</param>
        /// <returns></returns>

        public static IHtmlContent RenderIcon(this Icon icon, object? htmlAttributes, params string[]? extraClasses)

        {
            if(icon is null) return new HtmlString(string.Empty);


            var template = icon.Package.FrontendTemplate;

            if (template.IsNullOrWhiteSpace())
            {
                template = icon.Package.BackofficeTemplate;
            }


            var modifiedTemplate = template.Replace("{icon}", icon.Value);
            
            if(htmlAttributes is null)
            {
                modifiedTemplate = modifiedTemplate.Replace("{attributes}", "");
            }

            else
            {
                var htmlAttributesDict = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
                StringBuilder attributesString = new StringBuilder();

                foreach (var item in htmlAttributesDict)
                {
                    attributesString.Append($"{ConvertToKebabCase(item.Key)}=\"{item.Value}\"");
                }
                modifiedTemplate = modifiedTemplate.Replace("{attributes}", attributesString.ToString());

            }

            if (extraClasses is null)
            {
                modifiedTemplate = modifiedTemplate.Replace("{classes}", "");
            }
            else
            {
                modifiedTemplate = modifiedTemplate.Replace("{classes}", string.Join(" ", extraClasses));
            }


            return new HtmlString(modifiedTemplate);
        }

        public static IHtmlContent RenderIcon(this Icon icon)
        {
            if(icon is null) return new HtmlString(string.Empty);

            var template = icon.Package.FrontendTemplate;

            if (template.IsNullOrWhiteSpace())
            {
                template = icon.Package.BackofficeTemplate;
            }


            return new HtmlString(template.Replace("{icon}", icon.Value));
        }

        /// <summary>
        /// Converts a CamelCase string to kebab-case.
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private static string ConvertToKebabCase(string s)
        {
            string pattern = "([A-Z])";
            return Regex.Replace(s, pattern, "-$1").ToLower();
        }

    }
}
