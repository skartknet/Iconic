import { Package, PreConfiguration } from "./models";


export default class DataService {
    async loadCss(uri: string) {

        try {
            var result = await fetch(uri);

            if (result.ok) {
                return result.text();
            } else {
                throw new Error("CSS file not found");
            }
        } catch (error) {
            throw error;
        }

    }

    async extractStyles(item: Package): Promise<string[] | undefined> {

        var tempItem = Object.assign({}, item);

        if (!tempItem.selector || tempItem.selector.length <= 0) {
            return undefined;
        }

        if (!tempItem.sourcefile) tempItem.sourcefile = tempItem.cssfile;

        let result: Response;

        try {
            result = await fetch(tempItem.sourcefile);
        } catch (error) {
            throw error;
        }

        if (!result.ok) {
            return undefined;
        }

        tempItem.extractedStyles = [];


        var data = await result.text();

        var pattern = new RegExp(tempItem.selector, "g");
        var match = pattern.exec(data);
        while (match !== null) {
            tempItem.extractedStyles.push(match[1]);
            match = pattern.exec(data);
        }

        if (tempItem.extractedStyles.length > 0) {
            return tempItem.extractedStyles;
        } else {
            return undefined;
        }

    }


    async loadPreconfigs(): Promise<PreConfiguration[]> {
        var path = "/App_Plugins/Iconic/preconfigs.json";

        var result = await fetch(path);

        return result.json() as Promise<PreConfiguration[]>;

    }


    async processCssFile(cssFilePath: string, shadowRoot: ShadowRoot | null) {
        if (!cssFilePath || !shadowRoot) return;

        var cssContent = await this.loadCss(cssFilePath);

        if (cssContent === undefined) {
            throw new Error("CSS file not found");
        }

        const fontSheet = new CSSStyleSheet();
        fontSheet.replaceSync(cssContent);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontSheet];

        if (shadowRoot) {
            shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, fontSheet];
        }


    };

    async processCssFiles(cssFilePaths: Array<string>, shadowRoot?: ShadowRoot | null) {
        if (!cssFilePaths || !shadowRoot) return;
        for (const cssFilePath of cssFilePaths) {
            this.processCssFile(cssFilePath, shadowRoot);
        }
    };
}