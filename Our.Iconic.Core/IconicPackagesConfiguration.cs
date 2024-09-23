using Our.Iconic.Core.Models;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Cms.Core.PropertyEditors;

namespace Our.Iconic.Core
{    
    public class IconicPackagesConfiguration
    { 
        public IEnumerable<Package> Packages { get; set; } = Enumerable.Empty<Package>();
    }
}
