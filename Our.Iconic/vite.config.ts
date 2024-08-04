import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: ["src/iconic.ts", "src/modal-picker.element.ts", "src/modal-picker.token.ts", "src/settings.element.ts"], // your web component source file
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