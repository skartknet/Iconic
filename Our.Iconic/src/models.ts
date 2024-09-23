class Icon {
    icon: string;
    packageId: string;

    constructor(icon: string, packageId: string) {
        this.icon = icon || "";
        this.packageId = packageId || "";
    }
}

class Package {

    id: string;
    name: string;
    selector: string;      
    backofficeTemplate: string;
    frontendTemplate: string;
    cssfile: string;
    sourcefile: string;
    extractedStyles: string[];
    filteredIcons: string[];

    constructor() {
        this.id = this.uuid();
        this.name = "";
        this.selector = "";                
        this.backofficeTemplate = "";
        this.frontendTemplate = "";
        this.cssfile = "";
        this.sourcefile = "";
        this.extractedStyles = [];
        this.filteredIcons = [];
    }

    uuid(): string {
        var uuid = "",
            i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
}

class PreConfiguration{
    name: string;
    selector: string;
    template: string;

    constructor(name: string, selector: string, template: string){
        this.name = name;
        this.selector = selector;
        this.template = template;
    }

}

export { Icon, Package, PreConfiguration };