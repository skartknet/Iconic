import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: [
                "src/elements/iconic-property-editor.element.ts",
                "src/elements/modal-picker.element.ts",
                "src/elements/modal-settings-addpackage.element.ts",
                "src/elements/settings-editor.element.ts",
                "src/tokens/modal-picker.token.ts",
                "src/tokens/modal-settings-addpackage.token.ts",
            ], 
            formats: ["es"],
        },
        outDir: "wwwroot/App_Plugins/Iconic", // all compiled files will be placed here
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
        },
    },
    base: "/App_Plugins/Iconic/", // the base path of the app in the browser (used for assets)
});