using System;
using System.Text.Json.Serialization;

namespace Our.Iconic.Core.Models
{
    public class Package
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("selector")]
        public string Selector { get; set; }

        [JsonPropertyName("frontendTemplate")]
        public string FrontendTemplate { get; set; }

        [JsonPropertyName("backofficeTemplate")]
        public string BackofficeTemplate { get; set; }

        [JsonPropertyName("cssfile")]
        public string CssFile { get; set; }

        [JsonPropertyName("sourcefile")]
        public string SourceFile { get; set; }
    }
}
