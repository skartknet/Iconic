import { html, LitElement, property, customElement, state, css, nothing, unsafeHTML, ifDefined } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { AddPackageModalData, AddPackageModalValue } from "../tokens/modal-settings-addpackage.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package, PreConfiguration } from "../models.ts";
import DataService from "../dataService.ts";
import { UmbStaticFilePickerContext } from "@umbraco-cms/backoffice/static-file";
import { UUIButtonState } from "@umbraco-cms/backoffice/external/uui";

@customElement('add-package-modal')
export default class AddPackageModal
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<AddPackageModalData, AddPackageModalValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<AddPackageModalData, AddPackageModalValue>;

    @property({ attribute: false })
    data?: AddPackageModalData;

    @state()
    private package: Package = new Package();

    @state()
    private configType: string = "custom";


    @state()
    private previewIcon?: string;

    @state()
    private errors: Record<string, boolean> = {};

    @state()
    private previewButtonState: UUIButtonState;

    @state()
    private previewIconName?: string;

    private preconfigsOptions: Option[] = [];
    private preconfigs: PreConfiguration[] = [];

    #cssFilePickerModal?: UmbStaticFilePickerContext;
    #sourceFilePickerModal?: UmbStaticFilePickerContext;


    private _dataService: DataService = new DataService();

    constructor() {
        super();
        this.#cssFilePickerModal = new UmbStaticFilePickerContext(this);
        this.#sourceFilePickerModal = new UmbStaticFilePickerContext(this);
        this._dataService.loadPreconfigs()
            .then(results => {
                this.preconfigs = results;
                this.preconfigsOptions = results.map(preconfig => {
                    return { name: preconfig.name, value: preconfig.name };
                });
            });

        this.#initFormValidation();
    }


    connectedCallback(): void {
        super.connectedCallback();
        this.package = this.modalContext?.data?.package || new Package();
        this.#processCssFile();
    }

    #initFormValidation(): void {
        this.errors["name.required"] = true;
        this.errors["template.required"] = true;
        this.errors["cssfile.required"] = true;
        this.errors["selector.required"] = true;
        this.errors["sourcefile.required"] = true;
        this.errors["cssfile.iconsfound"] = true;
        this.errors["cssfile.loaded"] = true;

    }

    #isValidForm(): boolean {
        let isValid = true;
        if (this.package.name === '') {
            this.errors["name.required"] = false;
            isValid = false;
        }

        if (this.package.template === '') {
            this.errors["template.required"] = false;
            isValid = false;
        }

        if (this.package.cssfile === '') {
            this.errors["cssfile.required"] = false;
            isValid = false;
        }

        if (this.package.selector === '') {
            this.errors["selector.required"] = false;
            isValid = false;
        }

        if (this.package.sourcefile === '') {
            this.errors["sourcefile.required"] = false;
            isValid = false;
        }

        if (this.package.extractedStyles.length == 0) {
            this.errors["cssfile.iconsfound"] = false;
            isValid = false;
        }


        return isValid;
    }

    #handleCancel() {
        this.modalContext?.submit();
    }

    #handleSubmit() {
        if (!this.#isValidForm()) {
            return;
        }
        this.modalContext?.updateValue({ package: this.package });
        this.modalContext?.submit();
    }


    #openCssFilePicker() {
        this.#cssFilePickerModal?.selectedItems.subscribe(async (selection) => {
            if (selection.length === 0) return;
            let packageCopy = Object.assign({}, this.package);
            packageCopy.cssfile = decodeURIComponent(selection[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
            this.package = packageCopy;

            this.#processCssFile();

            this._dataService.extractStyles(
                this.package,
                (extractedStyles) => {
                    if (extractedStyles.length === 0) {
                        this.previewIcon = undefined;
                        this.previewButtonState = "failed";
                        this.errors["cssfile.iconsfound"] = false;
                        return;
                    }

                    this.package.extractedStyles = extractedStyles;

                    //display first icon in the css
                    this.previewIconName = extractedStyles[0];
                    this.previewIcon = this.package.template.replace("{icon}", this.previewIconName);
                    this.previewButtonState = "success";
                },
                () => {
                    this.previewIcon = undefined;
                    this.previewButtonState = "failed";
                    this.errors["cssfile.loaded"] = false;
                }
            );
        });

        this.#cssFilePickerModal?.openPicker({
            foldersOnly: false,
            multiple: false,
            filter: (item) => item.name.endsWith(".css"),
            pickableFilter: (item) => item.name.endsWith(".css")
        });
    }

    #openSourceFilePicker() {
        this.#sourceFilePickerModal?.selectedItems.subscribe((selection) => {
            let packageCopy = Object.assign({}, this.package);
            packageCopy.sourcefile = decodeURIComponent(selection[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
            this.package = packageCopy;
        });

        this.#sourceFilePickerModal?.openPicker({
            foldersOnly: false,
            multiple: false,
            filter: (item) => item.name.endsWith(".css"),
            pickableFilter: (item) => item.name.endsWith(".css")
        });
    }

    #handleStringValueChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const name = target.name;

        var tempObj = Object.assign({}, this.package);

        switch (name) {
            case "packageName":
                tempObj.name = target.value;
                break;
            case "template":
                tempObj.template = target.value;
                break;
            case "editCssFile":
                tempObj.cssfile = target.value;
                break;
            case "editSelector":
                tempObj.selector = target.value;
                break;
            case "editSourceFile":
                tempObj.sourcefile = target.value;
                break;
        }

        this.package = tempObj;
    }

    #handleConfigTypeChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.configType = target.value;
    }

    #selectPreconfig(event: Event) {
        const target = event.target as HTMLInputElement;
        let selectedPreConfig = this.preconfigs.find(preconfig => preconfig.name === target.value);
        if (selectedPreConfig) {
            this.package = Object.assign(new Package(), selectedPreConfig);
        }
    }

    #loadPreview() {
        this.#processCssFile();

        //display first icon in the css
        this.previewIconName = this.package.extractedStyles[0];
        this.previewIcon = this.package.template.replace("{icon}", this.previewIconName);
        this.previewButtonState = "success";
    }

    async #processCssFile() {
        this.previewButtonState = "waiting";
        if (!this.package.cssfile) {
            this.errors["preview.cssrequired"] = false;
        }

        var cssContent = await this._dataService.loadCss(this.package.cssfile);

        if (cssContent === undefined) {
            this.errors["cssfile.loaded"] = false;
            return;
        }

        const fontSheet = new CSSStyleSheet();
        fontSheet.replaceSync(cssContent);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontSheet];

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, fontSheet];
        }
    };


    static styles = css`
        uui-box {
            margin-top: var(--uui-size-layout-1);            
        }

        .full-width{
            width: 100%;
        }

        .flex {
            display: flex;
        }

        .flex-column {
            flex-direction: column;
        }

        #icon{
            font-size: var(--uui-size-8);
            height: 60px;
            width: 60px;
            margin-right: var(--uui-size-layout-1);
            margin-bottom: var(--uui-size-layout-1);
        }
       
    `

    render() {
        return html`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form class="our-iconic__form">   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${this.#handleConfigTypeChange}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ?
                html`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${this.#selectPreconfig}"></uui-select>
                                </uui-form-layout-item>
                            ` : nothing
            }

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label" >Enter a name</uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${this.#handleStringValueChange}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors["name.required"]}">
                                <p>Please enter a name for the package.</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="template" slot="label" >Backoffice template</uui-label>
                            <uui-input id="template" .value="${this.package.template}" @change="${this.#handleStringValueChange}"  class="full-width" name="template" type="text"></uui-input>
                            <div ?hidden="${this.errors["template.required"]}">
                                <p>Please enter a template for the icon to display on the backoffice.</p>
                            </div>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${this.#handleStringValueChange}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${this.#openCssFilePicker}></uui-button>
                            </div>
                            <div ?hidden="${this.errors["cssfile.loaded"]}">
                                <p>The CSS file could not be loaded.</p>
                            </div>
                            <div ?hidden="${this.errors["cssfile.iconsfound"]}">
                                <p>No icons could be found.</p>
                            </div>
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label">Selector</uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${this.#handleStringValueChange}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label">Source File</uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${this.#handleStringValueChange}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${this.#openSourceFilePicker}></uui-button>
                                <div ?hidden="${this.errors["name.required"]}">
                                    <p>A source file is required to extract the icons values.</p>
                                </div>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                    <!-- <fieldset class="filters">
                    <legend>
                        <p>Filter</p>
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                    </legend>
                    <div ng-show="packageForm.$valid" class="flex our-iconic__container">
                        <div ng-repeat="filteredIcon in model.package.filteredIcons">
                            <div class="umb-panel-header-icon -placeholder" title="{{filteredIcon}}">
                                <iconic-icon package="model.package" icon="filteredIcon">
                                </iconic-icon>
                            </div>
                            <button ng-click="removeFilteredIcon($index)" class="button-remove" prevent-default>
                                <localize key="general_remove" class="ng-isolate-scope">Remove</localize>
                            </button>
                        </div>

                        <div class="umb-panel-header-icon" ng-click="openFilterIconsOverlay()">
                            <localize key="general_add" class="ng-isolate-scope" style="font-size: 1rem;">Add</localize>
                            <iconic-icon></iconic-icon>
                        </div>
                        </div>
                        <div ng-hide="packageForm.$valid">
                            <p>Package configuration is not valid.</p>
                        </div>
                    </fieldset> -->
                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button id="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${unsafeHTML(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${this.#loadPreview}" ?disabled="${!this.package.cssfile}" state="${ifDefined(this.previewButtonState)}"></uui-button>                            
                    
                        <div ?hidden="${this.errors["cssfile.required"]}">
                            <p>Please select a CSS file first.</p>
                        </div>
                    
                    </uui-box>
                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${this.#handleCancel}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${this.#handleSubmit}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
    }
}