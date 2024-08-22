import { html, LitElement, property, customElement, state, css, nothing, unsafeHTML } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { AddPackageModalData, AddPackageModalValue } from "../tokens/modal-settings-addpackage.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package, PreConfiguration } from "../models.ts";
import DataService from "../dataService.ts";
import { UMB_STATIC_FILE_PICKER_MODAL, UmbStaticFilePickerContext } from "@umbraco-cms/backoffice/static-file";

@customElement('add-package-modal')
export default class AddPackageModal
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<AddPackageModalData, AddPackageModalValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<AddPackageModalData, AddPackageModalValue>;


    @state()
    private package: Package = new Package();

    @state()
    private configType: string = "custom";

    
    @state()
    private previewIcon?: string;
    
    @state()
    private previewButtonState: string = "init";
    
    @state()
    private analysing: string = "init";
    
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
    }

    #handleCancel() {
        this.modalContext?.submit();
    }

    #handleSubmit() {
        this.modalContext?.updateValue({ package: this.package });
        this.modalContext?.submit();
    }

    #openCssFilePicker() {
        this.#cssFilePickerModal?.selectedItems.subscribe(async (selection) =>  {
            if(selection.length === 0) return;
            let packageCopy = Object.assign({}, this.package);
            packageCopy.cssfile = decodeURIComponent(selection[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
            this.package = packageCopy;

            var cssContent = await this._dataService.loadCss(this.package.cssfile);

            if(cssContent !== undefined) {
                const fontSheet = new CSSStyleSheet();
                fontSheet.replaceSync(cssContent);
                document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontSheet];
                if(this.shadowRoot){
                    this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, fontSheet];
                }
            }
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
        this.previewButtonState = "busy";
        if (this.package.cssfile) {
            this._dataService.extractStyles(
                this.package,
                (extractedStyles) => {
                    //display first icon in the css
                    this.previewIcon = '<i class="fa fa-glass"></i>';                    
                    this.previewButtonState = "success";
                },
                () => {
                    this.previewIcon = undefined;
                    //   displayError("iconicErrors_no_rules");
                    this.previewButtonState = "error";
                }
            );
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
                            <uui-input id="packageName" .value="${this.package.name}"  class="full-width" name="packageName" type="text"></uui-input>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" >Backoffice template</uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.template}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${this.#openCssFilePicker}></uui-button>
                            </div>
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label">Selector</uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label">Source File</uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${this.#openSourceFilePicker}></uui-button>
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
                        <div class="our-iconic__container preview flex">
                            <div class="umb-panel-header-icon">
                                <iconic-icon package="model.package" icon="previewIcon">
                                </iconic-icon>
                            </div>

                            <div>
                                <div class="ml2">
                                    <small><em><i class="fa fa-glass"></i></em></small>
                                </div>

                                <uui-button @click="${this.#loadPreview}" label="Reload Preview" look="primary" ?disabled="${!this.package.cssfile}"></uui-button>
                            </div>
                        </div>
                        <div ng-hide="packageForm.$valid">
                            <p>Package configuration is not valid.</p>
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