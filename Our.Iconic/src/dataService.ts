import { Package, PreConfiguration } from "./models";


export default class DataService {
    async loadCss(uri: string) {
        var result = await fetch (uri);

        if(result.ok){
            return result.text();
        }
                  
    }

    async extractStyles(item: Package, successCallback: (extractedStyles: string[]) => void, errorCallback: () => void) {
        if (!item.selector || item.selector.length <= 0) {
            errorCallback();
        }

        if (!item.sourcefile) item.sourcefile = item.cssfile;

        var result = await fetch(item.sourcefile);

        if (!result.ok) {
            errorCallback();
            return;
        }

        item.extractedStyles = [];

        
        var data = await result.text();
        
        var pattern = new RegExp(item.selector, "g");
        var match = pattern.exec(data);
        while (match !== null) {
            item.extractedStyles.push(match[1]);
            match = pattern.exec(data);
        }

        if (item.extractedStyles.length > 0) {
            successCallback(item.extractedStyles);
        } else {
            //   displayError("iconicErrors_no_rules");
            errorCallback();
        }

    }


    async loadPreconfigs(): Promise<PreConfiguration[]> {
        var path = "/App_Plugins/Iconic/preconfigs.json";

        var result = await fetch(path);
        
        return result.json() as Promise<PreConfiguration[]>;

    }
}