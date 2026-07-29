# Umbraco 18 Support — Design

## Goal

Add a `UmbracoV18` test site to the solution and upgrade the Iconic package
(`Our.Iconic` / `Our.Iconic.Core`) so it is verified working against Umbraco
CMS 18, following the same pattern used to add v16 and v17 support.

## Background

The repo carries one test site project per supported major Umbraco version
(`UmbracoV16`, `UmbracoV17`), each referencing the shared `Our.Iconic`
library project. `Our.Iconic`/`Our.Iconic.Core` target `net9.0;net10.0` and
depend on `Umbraco.Cms.Core` pinned at a floor version (currently `16.0.0`)
that has stayed compatible across all supported major versions.

Umbraco.Cms `18.0.2` (stable) is available on NuGet and still targets
`net10.0` — no TFM change needed. A review of the `@umbraco-cms/backoffice`
18.0.0 npm package confirms every API this package's frontend uses
(`UmbModalToken`, `UMB_MODAL_MANAGER_CONTEXT`, `UmbElementMixin`,
`UmbStaticFilePickerInputContext`, `UmbPropertyEditorConfigCollection`,
`UmbChangeEvent`, `UUIInputElement`/`UUISelectElement`) is unchanged from
v17. Umbraco 18's documented breaking changes (OpenAPI/Swagger replacement,
`IPublishedContent.Parent()/Children()`, `ILocalizationService` split,
`IFileService` split) do not touch any API this package calls. No C# or
TypeScript source changes are expected — this is a dependency-bump and
verification task, not a rewrite.

## Changes

1. **`UmbracoV18` test site** — new project cloned from `UmbracoV17`'s
   structure (Program.cs, appsettings*.json, Views, wwwroot static assets,
   launchSettings), with:
   - `TargetFramework`: `net10.0`
   - `PackageReference Umbraco.Cms` → `18.0.2`
   - `ProjectReference` → `Our.Iconic.csproj`
2. **`Iconic.sln`** — add the new `UmbracoV18` project entry and build
   configurations, following the existing V16/V17 entries.
3. **`Our.Iconic/package.json`**:
   - `version`: `18.0.0`
   - `@umbraco-cms/backoffice`: `^18.0.2`
   - Regenerate `package-lock.json` via `npm install`
   - Rebuild the TS bundle (`npm run build`) so the compiled
     `wwwroot/App_Plugins/Iconic/*.js` assets are refreshed for the new
     backoffice types
4. **`Our.Iconic/Our.Iconic.csproj`** and
   **`Our.Iconic.Core/Our.Iconic.Core.csproj`**:
   - Bump `<Version>` to `18.0.0` (Core) / `18.0.0` (Our.Iconic), matching
     the repo's convention of bumping on each new major-version support
     addition
   - `Umbraco.Cms.Core` PackageReference stays at its existing floor
     (`16.0.0`) — no change, since v18's public surface is unchanged
5. No changes anticipated to `Our.Iconic.Core`'s C# value converter,
   configuration editor, or property editor code, or to any `.ts`/`.element.ts`
   file — verification will confirm this holds.

## Verification

- `dotnet build` the full solution.
- Run `UmbracoV18`, complete the Umbraco install wizard (SQLite, default
  starter setup consistent with the other test sites).
- In the backoffice: create/edit an Iconic data type, add a package
  (custom + preconfigured), open the icon picker modal, select an icon, and
  confirm the property saves and reloads without the document showing as
  dirty.
- If anything in the manual run-through reveals an actual incompatibility,
  fix it directly in `Our.Iconic`/`Our.Iconic.Core` (in scope) rather than
  treating it as a separate task.

## Out of scope

- Publishing/releasing the bumped package to NuGet or the Umbraco
  Marketplace.
- Changing the `Umbraco.Cms.Core` floor version away from 16.0.0.
- Removing or altering the existing V15/V16/V17 test sites.
