using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Html;

namespace Our.Iconic.Core.Helpers
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
#if NET5_0_OR_GREATER
        public static IHtmlContent RenderIcon(this IHtmlHelper helper, IHtmlContent icon, object htmlAttributes, params string[] extraClasses)
#else
        public static IHtmlString RenderIcon(this HtmlHelper helper, IHtmlString icon, object htmlAttributes, params string[] extraClasses)
#endif
        {

            var htmlAttributesDict = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            StringBuilder attributesString = new StringBuilder();

            foreach (var item in htmlAttributesDict)
            {
                attributesString.Append($"{ConvertToKebabCase(item.Key)}=\"{item.Value}\"");
            }

            var modifiedTemplate = icon.ToString().Replace("{attributes}", attributesString.ToString())
                                                  .Replace("{classes}", string.Join(" ", extraClasses));


            return new HtmlString(modifiedTemplate);
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
