import { html, LitElement, property, customElement, state, unsafeHTML, css, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { ModalPickerData, ModalPickerValue } from "../tokens/modal-picker.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import DataService from "../dataService.ts";
import { Icon, Package } from "../models.ts";
import { UUISelectElement } from "@umbraco-cms/backoffice/external/uui";

@customElement('modal-picker')
export default class ModalPicker
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<ModalPickerData, ModalPickerValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<ModalPickerData, ModalPickerValue>;

    private _value: Icon[] = [];
    private _multiSelect: boolean = false;
    private _dataService: DataService = new DataService();
    private _packages: Package[] = [];
    private _packagesOptions: Option[] = [];

    private _showFilteredOnly: boolean = false;

    @state()
    private _icons: string[] = [];

    @state()
    private _selectedPackage?: Package;


    connectedCallback(): void {
        super.connectedCallback();

        this._packages = this.modalContext?.data.packages ?? [];
        this._packagesOptions = this.modalContext?.data.packages?.map(x => <Option>{ name: x.name, value: x.id }) ?? [];

        if(this._packagesOptions.length > 0){
            this._packagesOptions[0].selected = true;
        }

        this._showFilteredOnly = this.modalContext?.data.showFilteredOnly ?? false;
        this._multiSelect = this.modalContext?.data.multiSelect ?? false;
        this._value = Array.from(this.modalContext?.getValue()?.icons ?? []);

        if (this._packages && this._packages.length > 0) {
            this._selectedPackage = this._packages[0];
            this.#loadSelectedPackage();
        }


    }

    #selectIcon(e: Event) {
        var val = (e.currentTarget as HTMLElement).getAttribute("value");

        if (val) {
            this._value.push({ packageId: this._selectedPackage!.id, icon: val });
            (e.currentTarget as HTMLElement).setAttribute("disabled", "true");

            if (!this._multiSelect) {
                this.#handleSave();
            }
        }
    }

    #loadSelectedPackage() {

        this._dataService.processCssFiles(this._packages.map(x => x.cssfile), this.shadowRoot).then(() => {
            if (this._selectedPackage!.filteredIcons.length > 0 && this._showFilteredOnly) {
                this._icons = this._selectedPackage!.filteredIcons;
            } else {
                this._icons = this._selectedPackage!.extractedStyles;
            }
        });
    }

    #handlePackageSelection(e: Event) {
        var val = (e.currentTarget as UUISelectElement).value;

        if (val) {
            this._selectedPackage = this._packages.find(x => x.id === val);
            this.#loadSelectedPackage();
        }
    }

    #isSelected(icon: string): boolean {
        return this._value.findIndex(x => x.icon === icon) >= 0;
    }

    #handleCancel() {
        this.modalContext?.submit();
    }

    #handleSave() {
        this.modalContext?.updateValue({ icons: this._value });
        this.modalContext?.submit();
    }

    static styles = [
        css`
          .icon{
                font-size: var(--uui-size-8);
                height: 55px;
                width: 55px;
                margin-right: var(--uui-size-space-1);
                margin-bottom: var(--uui-size-space-2);
            }
        `
    ]

    render() {
        return html`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                
                <uui-select ?hidden=${this._packagesOptions.length == 0} .options=${this._packagesOptions}  @change="${this.#handlePackageSelection}"></uui-select>

                </umb-property-editor-ui-dropdown>
                <h4 ?hidden=${this._packages.length == 0}>${this._packages[0].name}</h4>
                ${this._icons.map((icon) => html`
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" ?disabled=${this.#isSelected(icon)} @click=${this.#selectIcon} label=${icon} value=${icon}>
                            ${unsafeHTML(this._selectedPackage?.backofficeTemplate.replace("{icon}", icon))}
                    </uui-button>
                `)}              
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? html`<uui-button slot="actions" label="Submit" @click="${this.#handleSave}"></uui-button>` : nothing}                        
                        <uui-button slot="actions" label="Cancel" @click="${this.#handleCancel}"></uui-button>                        
            </umb-footer-layout> 
        `;
    }
}