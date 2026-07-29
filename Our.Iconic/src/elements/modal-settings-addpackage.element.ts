import { html, LitElement, property, customElement, state, css, nothing, unsafeHTML } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { AddPackageModalData, AddPackageModalValue } from "../tokens/modal-settings-addpackage.token.ts";
import type { UmbModalExtensionElement } from '@umbraco-cms/backoffice/modal';
import { Icon, Package, PreConfiguration } from "../models.ts";
import DataService from "../dataService.ts";
import { UmbStaticFilePickerInputContext } from "@umbraco-cms/backoffice/static-file";


import { UUIButtonState } from "@umbraco-cms/backoffice/external/uui";
import type { UUISelectOption } from "@umbraco-cms/backoffice/external/uui";
import { ICONIC_MODALPICKER_TOKEN } from "../tokens/modal-picker.token.ts";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";


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
    private errors: Record<string, string | undefined> = {};

    @state()
    private previewButtonState: UUIButtonState;

    @state()
    private previewIconName?: string;

    @state()
    private _isCssLoaded: boolean = false;

    @state()
    private openedPickerName?: string;

    private preconfigsOptions: UUISelectOption[] = [];
    private preconfigs: PreConfiguration[] = [];

    #filePickerModal?: UmbStaticFilePickerInputContext;        

    #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;
    #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;


    private _dataService: DataService = new DataService();

    constructor() {
        super();
        this.#filePickerModal = new UmbStaticFilePickerInputContext(this);        

        
        this._dataService.loadPreconfigs()
            .then(results => {
                this.preconfigs = results;
                this.preconfigsOptions = results.map(preconfig => {
                    return { name: preconfig.name, value: preconfig.name };
                });
            });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
            this.#notificationContext = instance;
        });

        this.#resetFormErrors();
    }


    connectedCallback(): void {
        super.connectedCallback();
        this.package = this.modalContext?.data?.package || new Package();
        this.#loadPreview();
    }

    #resetFormErrors(): void {
        let tempErrors = Object.assign({}, this.errors);

        tempErrors["name"] = undefined;
        tempErrors["backofficeTemplate"] = undefined;
        tempErrors["cssfile"] = undefined;
        tempErrors["selector"] = undefined;
        tempErrors["sourcefile"] = undefined;
        tempErrors["cssfile"] = undefined;
        tempErrors["cssfile"] = undefined;

        this.errors = tempErrors;
    }

    #isValidForm(): boolean {
        let isValid = true;
        let tempErrors = Object.assign({}, this.errors);

        if (this.package.name === '') {
            tempErrors["name"] = "Name is required";
            isValid = false;
        }

        if (this.package.backofficeTemplate === '') {
            tempErrors["backofficeTemplate"] = "A backoffice template is required";
            isValid = false;
        }

        if (this.package.cssfile === '') {
            tempErrors["cssfile"] = "A CSS file is required";
            isValid = false;
        }

        if (this.package.selector === '') {
            tempErrors["selector"] = "A selector pattern is required";
            isValid = false;
        }

        if (this.package.sourcefile === '') {
            tempErrors["sourcefile"] = "An icons source file is required";
            isValid = false;
        }

        if (this.package.extractedStyles.length == 0) {
            tempErrors["sourcefile"] = "No icons found in the source file";
            isValid = false;
        }

        this.errors = tempErrors;

        return isValid;
    }

    #handleCancel() {
        this.modalContext?.submit();
    }

    #handleSubmit() {
        if (!this.#isValidForm()) {
            this.#notificationContext?.peek("danger", {
                data: { message: "Please review the errors on the form." }
            });

            return;
        }
        this.modalContext?.updateValue({ package: this.package });
        this.modalContext?.submit();
    }

    #extractStyles() {
        this._dataService.extractStyles(this.package).
            then(extractedStyles => {
                if (extractedStyles == undefined || extractedStyles.length === 0) {
                    this.previewIconName = undefined;
                    this.previewIcon = undefined;
                    this.previewButtonState = "failed";
                    this.errors["sourcefile"] = "No icons found in the source file";
                    return;
                } else {
                    this.package.extractedStyles = extractedStyles;
                    this.errors["sourcefile"] = undefined;
                    this.#loadPreview();
                }
            },
                (error) => {
                    this.previewIconName = undefined;
                    this.previewIcon = undefined;
                    this.previewButtonState = "failed";
                    this.#notificationContext?.peek("danger", {
                        data: {
                            message: "Error reading the file. " + error
                        }
                    })
                }
            );
    }

    #openCssFilePicker() {
        this.#filePickerModal?.selectedItems.subscribe(async (selection) => {
            if( this.openedPickerName != "cssFilePicker") return;

            if (selection.length === 0) return;
            let packageCopy = Object.assign({}, this.package);

            var cssfile = decodeURIComponent(selection[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");

            if (cssfile === this.package.cssfile) return;

            this._isCssLoaded = false;

            packageCopy.cssfile = cssfile;
            this.package = packageCopy;            
            
            this.openedPickerName = undefined;
        });

        this.openedPickerName = "cssFilePicker";

        this.#filePickerModal?.openPicker({
            foldersOnly: false,
            multiple: false,
            hideTreeRoot: true,
            filter: (item) => item.name.endsWith(".css"),
            pickableFilter: (item) => item.name.endsWith(".css")
        });
    }

    #openSourceFilePicker() {
        this.#filePickerModal?.selectedItems.subscribe((selection) => {

            if( this.openedPickerName != "sourceFilePicker") return;

             if (selection.length === 0) return;

            let packageCopy = Object.assign({}, this.package);

            var sourcefile = decodeURIComponent(selection[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
            if (sourcefile === this.package.sourcefile) return;

            packageCopy.sourcefile = sourcefile;
            this.package = packageCopy;
            this.#extractStyles();
 
            this.openedPickerName = undefined;

        });

        this.openedPickerName = "sourceFilePicker";

        this.#filePickerModal?.openPicker({
            foldersOnly: false,
            multiple: false,
            hideTreeRoot: true,
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
            case "backofficeTemplate":
                tempObj.backofficeTemplate = target.value;
                break;
            case "frontendTemplate":
                tempObj.frontendTemplate = target.value;
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

        this.#resetFormErrors();
        this.#isValidForm();
        this.#extractStyles();
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

    #getIconToDisplay(icon: string): string {
        return this.package.backofficeTemplate.replace("{icon}", icon);
    }

    #loadPreview() {
        this.previewButtonState = "waiting";

        if (this.package.extractedStyles.length === 0) {
            this.previewButtonState = "failed";
            return
        }

        this.#loadCssFile().then(() => {
            //display first icon in the css file
            this.previewIconName = this.package.extractedStyles[0];

            if (this.package.backofficeTemplate === undefined) {
                this.#notificationContext?.peek("danger", {
                    data: { message: "Please review the errors on the form." }
                });

                this.previewButtonState = "failed";
                return;
            }

            this.previewIcon = this.#getIconToDisplay(this.previewIconName);
            this.previewButtonState = "success";
        }).catch(() => {
            this.previewIconName = undefined;
            this.previewIcon = undefined;
            this.previewButtonState = "failed";
        });
    }

    #removeFilteredIcon(index: number) {
        let tempPackage = Object.assign({}, this.package);
        tempPackage.filteredIcons.splice(index, 1);
        this.package = tempPackage;
    }

    #openFilterIconsOverlay() {
        let modalContext = this.#modalManagerContext?.open(this, ICONIC_MODALPICKER_TOKEN, {
            data: {
                packages: [this.package],
                showFilteredOnly: false,
                multiSelect: true
            },
            value: {
                icons: this.package.filteredIcons.map(x => {
                    var icon = new Icon(x, this.package.id);
                    return icon;
                })
            }
        });


        modalContext?.onSubmit().then((val) => {
            if (val?.icons == undefined) {
                return;
            }

            let tempPackage = Object.assign([], this.package);
            tempPackage.filteredIcons = val.icons.map(icon => icon.icon);
            this.package = tempPackage;
        });
    }

    async #loadCssFile() {
        if (!this.package.cssfile) {
            this._isCssLoaded = false;
            this.errors["cssfile"] = "Select a valid CSS file";
        }

        var cssContent = await this._dataService.loadCss(this.package.cssfile);

        if (cssContent === undefined) {
            this._isCssLoaded = false;
            this.errors["cssfile"] = "Error loading the CSS file";
            return;
        }

        if (this._isCssLoaded === false) {
            const fontSheet = new CSSStyleSheet();
            fontSheet.replaceSync(cssContent);
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontSheet];

            if (this.shadowRoot) {
                this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, fontSheet];
                this._isCssLoaded = true;
            }
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

        .flex-wrap {
            flex-wrap: wrap;
        }

        .flex-column {
            flex-direction: column;
        }

        .icon-filter{
            display: flex;
            flex-direction: column;
            margin-right: var(--uui-size-space-1);
            margin-bottom: var(--uui-size-space-2);
        }

        .icon-remove{
            font-size: var(--uui-size-4); 
            cursor: pointer;           
        }

        .icon-remove:hover{
            text-decoration: underline;
        }

        
        .icon{
            font-size: var(--uui-size-8);
            height: 55px;
            width: 55px;
            margin-right: var(--uui-size-space-1);
            margin-bottom: 0;
        }

        .icon-add{
            font-size: var(--uui-size-5);
        }
       
        .error{
            padding: var(--uui-size-space-3);      
            background-color: var(--uui-color-danger);  
            color: var(--uui-color-danger-contrast);    
        }       
        .required::after {
            content: '*';    
        }
    `

    render() {
        return html`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form>   
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
                            <uui-label for="packageName" slot="label"><span class="required">Enter a name</span></uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${this.#handleStringValueChange}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors["name"] == undefined}">
                                <p class="error">${this.errors["name"]}</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" ><span class="required">Backoffice template</span></uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.backofficeTemplate}" @change="${this.#handleStringValueChange}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                            <div ?hidden="${this.errors["backofficeTemplate"] == undefined}">
                                <p class="error">${this.errors["backofficeTemplate"]}</p>
                            </div>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="frontendTemplate" slot="label" >Frontend template</uui-label>
                            <uui-input id="frontendTemplate" .value="${this.package.frontendTemplate}" @change="${this.#handleStringValueChange}"  class="full-width" name="frontendTemplate" type="text"></uui-input>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label"><span class="required">CSS File</span></uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${this.#handleStringValueChange}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" look="primary" label="Select" @click=${this.#openCssFilePicker}></uui-button>
                            </div>
                            <div ?hidden="${this.errors["cssfile"] == undefined}">
                                <p class="error">${this.errors["cssfile"]}</p>
                            </div>                            
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label"><span class="required">Selector</span></uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${this.#handleStringValueChange}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label"><span class="required">Source File</span></uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${this.#handleStringValueChange}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" look="primary" label="Select" @click=${this.#openSourceFilePicker}></uui-button>
                            </div>
                            <div ?hidden="${this.errors["sourcefile"] == undefined}">
                                <p class="error">${this.errors["sourcefile"]}</p>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button class="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${unsafeHTML(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${this.#loadPreview}" ?disabled="${!this.package.extractedStyles}" state="${this.previewButtonState}"></uui-button>                            
                    
                        <div ?hidden="${this.errors["cssfile"] == undefined}">
                            <p class="error">${this.errors["cssfile"]}</p>
                        </div>                        
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                        <div class="flex flex-wrap">
                            ${this.package.filteredIcons.map((filteredIcon, index) => html`
                                <div class="icon-filter">                        
                                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default">
                                        ${unsafeHTML(this.#getIconToDisplay(filteredIcon))}
                                    </uui-button>                                    
                                    <div @click="${() => this.#removeFilteredIcon(index)}" class="icon-remove">
                                        Remove
                                    </div>
                                </div>
                            `)}
                                                                           
                            <uui-button class="icon icon-add" compact label="icon" look="placeholder" type="button" color="default" @click=${this.#openFilterIconsOverlay}>
                                Add
                            </uui-button>
                            
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
