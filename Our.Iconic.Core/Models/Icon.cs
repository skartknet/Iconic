using System;
using System.Text.Json.Serialization;

namespace Our.Iconic.Core.Models
{
    public class Icon
    {
        [JsonPropertyName("packageId")]
        public Guid PackageId { get; set; }

        [JsonPropertyName("icon")]
        public string Value { get; set; }

        public Package Package { get; set; }
    }
}
