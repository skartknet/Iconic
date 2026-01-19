# Iconic - Umbraco Icon Picker Package

## Project Overview
Iconic is an Umbraco backoffice extension that provides a highly configurable icon picker property editor. It allows users to select icons from multiple icon libraries (Font Awesome, Material Icons, etc.) within the same property.

**Core Architecture:**
- **Our.Iconic.Core** (.NET 9/10): Core models, value converters, property editor registration
- **Our.Iconic** (Razor Class Library): Backoffice UI using Lit web components, built with Vite
- **UmbracoV16/V17**: Test sites for Umbraco CMS 16 and 17 (actively supported versions)

## Key Components & Data Flow

### Backend (C#)
- **IconicPropertyEditor.cs**: Registers property editor with alias `our.iconic`, uses JSON value type
- **IconicValueConverter.cs**: Converts JSON to `Icon` model with nested `Package` for frontend rendering
  - Handles both string (Umbraco 13-) and JsonObject/JsonElement (Umbraco 14+) intermediate values
- **Icon.cs**: Model with `ToString()` override that renders HTML by replacing `{icon}` in template
  - Supports frontend/backoffice template override pattern

### Frontend (TypeScript + Lit)
Entry points defined in [vite.config.ts](Our.Iconic/vite.config.ts):
- **iconic-property-editor.element.ts**: Main property editor UI, opens modal picker
- **modal-picker.element.ts**: Icon selection modal with search/filter
- **settings-editor.element.ts**: DataType configuration UI for managing packages
- **modal-settings-addpackage.element.ts**: Modal for adding/editing icon packages

**Extension Registration**: [umbraco-package.json](Our.Iconic/public/umbraco-package.json) defines:
- Property editor UI with alias `Our.Iconic`
- Settings editor `Our.Iconic.Settings`
- Modal extensions for picker and package management

### Icon Package Configuration
Each icon package requires:
- **Template**: HTML with `{icon}` placeholder, e.g., `<i class="fa {icon}"></i>`
- **CSS File**: Stylesheet loaded in backoffice
- **Source File**: CSS/text file to extract icon names (using regex selector)
- **Backoffice/Frontend Templates**: Can differ (backoffice uses CDN, frontend uses local)
- **Filter**: Optional whitelist of specific icons

Pre-configurations in [preconfigs.json](Our.Iconic/public/preconfigs.json) provide defaults for common libraries.

## Development Workflows

### Building Frontend
```bash
cd Our.Iconic
npm run build        # Production build to wwwroot/App_Plugins/Iconic/
npm run watch        # Watch mode for development
```

### Building Backend
Use VS Code tasks or:
```powershell
dotnet build Our.Iconic.Core/Our.Iconic.Core.csproj
dotnet build Our.Iconic/Our.Iconic.csproj
```

### Testing with Umbraco Sites
Test sites in UmbracoV16/V17 reference the package projects:
- **Credentials**: admin@admin.com / Password123
- Run site: `dotnet watch run` in UmbracoV16 or UmbracoV17 folder
- Projects target .NET 9/10 for Umbraco 16/17 compatibility
- **Note**: No automated unit tests - manual testing via test sites

### Release & Publishing Workflow
**GitHub Actions automation** handles all releases:
- **Trigger**: Push to `release/*` branch
- **Process** ([.github/workflows/release.yml](.github/workflows/release.yml)):
  1. Extracts version from .csproj files (e.g., 17.0.0)
  2. Detects pre-release based on version format (e.g., 17.0.0-beta)
  3. Runs `npm ci && npm run build` for frontend
  4. Runs `dotnet restore && dotnet build --configuration Release`
  5. Creates NuGet packages: `dotnet pack --configuration Release`
  6. Publishes to NuGet.org using `NUGET_API_KEY` secret
  7. Creates GitHub release tag (e.g., v17.0.0)
- **Packages**: Our.Iconic.Core and Our.Iconic published separately
- **Dev builds**: `dev/*` branch triggers build-only validation
- Marketplace metadata in [umbraco-marketplace.json](umbraco-marketplace.json)

## Project Conventions

### Multi-Target Framework Pattern
Both Our.Iconic and Our.Iconic.Core target `<TargetFrameworks>net9.0;net10.0</TargetFrameworks>` for Umbraco 16/17 compatibility.

### Static Assets & RCL Pattern
Our.Iconic is a Razor Class Library with:
- `<StaticWebAssetBasePath>/</StaticWebAssetBasePath>` - Assets served from root
- Vite output to `wwwroot/App_Plugins/Iconic/`
- Language files in `public/lang/` (en-US.xml, es-ES.xml)

### Value Converter Pattern
IconicValueConverter checks editor alias `our.iconic` (case-insensitive) and:
1. Deserializes JSON to Icon model
2. Extracts packageId from intermediate value
3. Loads package config from DataType settings
4. Attaches matching Package to Icon model for template rendering

### Lit Element Patterns
- Use `UmbElementMixin` for Umbraco context consumption
- Modal manager via `UMB_MODAL_MANAGER_CONTEXT`
- Property editor implements `UmbPropertyEditorUiElement`
- Custom events with `UmbChangeEvent` for value updates
- Shared models in [models.ts](Our.Iconic/src/models.ts) match C# models (Icon, Package)

### Template Rendering
Templates support placeholders:
- `{icon}`: Replaced with icon value (e.g., "fa-home")
- `{classes}`: Extra CSS classes from frontend usage
- `{attributes}`: Additional HTML attributes (data-*, aria-*, etc.)

Example: `@Html.Raw(Model.Icon)` uses Icon.ToString() or explicit `@Model.Icon.RenderIcon(classes: "large")`

## Integration Points

### Umbraco Backoffice APIs
- PRelease Process

### Creating a New Release
1. Update version in both `.csproj` files (Our.Iconic.Core and Our.Iconic)
2. Commit changes to `dev/*` branch (triggers build validation)
3. Create/push to `release/*` branch (e.g., `release/17.0.0`)
4. GitHub Actions automatically:
   - Builds frontend and backend
   - Creates NuGet packages
   - Publishes to NuGet.org
   - Creates GitHub release with tag
5. For pre-release: Use version like `17.0.0-beta` (auto-detected)

## roperty editor registration via `[DataEditor]` attribute
- Extension manifest in umbraco-package.json (Extension API v1)
- Modal API for icon picker and settings dialogs
- Icon registration via `icons.js` for custom Iconic logo

### External Dependencies
- **Umbraco.Cms.Core**: 16.0.0+ (Core backend)
- **@umbraco-cms/backoffice**: 16.0.0+ (Frontend types/components)
- **Lit**: 3.1.4+ (Web components framework)
- **Vite**: 5.3.4+ (Frontend build tool)

## Common Tasks

### Adding New Icon Package Pre-configuration
1. Edit [preconfigs.json](Our.Iconic/public/preconfigs.json)
2. Define name, selector (regex), templates, and sourcefile pattern
3. Document in `Documentation/Configuration/{PackageName}/README.md`

### Debugging Value Converter Issues
- Check intermediate value type in IconicValueConverter (string vs JsonObject)
- Verify packageId exists in DataType configuration
- Ensure Package.Id matches saved packageId (GUID format)

### Extending Frontend Elements
- Create element in `src/elements/`, export default class
- Register in [vite.config.ts](Our.Iconic/vite.config.ts) entry array
- Add extension to [umbraco-package.json](Our.Iconic/public/umbraco-package.json)
- Import required Umbraco types from `@umbraco-cms/backoffice/*`

## Documentation Structure
- **[Documentation/Configuration](Documentation/Configuration/README.md)**: DataType setup, package configuration
- **[Documentation/Usage](Documentation/Usage/README.md)**: Rendering icons in views, helper methods
- **[Documentation/Tips](Documentation/Tips/README.md)**: Advanced use cases and troubleshooting
