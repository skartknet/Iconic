import { html, LitElement, property, customElement, state, unsafeHTML, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { ModalPickerData, ModalPickerValue } from "../tokens/modal-picker.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import DataService from "../dataService.ts";
import { Icon, Package } from "../models.ts";

@customElement('modal-picker')
export default class ModalPicker
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<ModalPickerData, ModalPickerValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<ModalPickerData, ModalPickerValue>;


    private _value?: Icon;
    private _dataService: DataService = new DataService();
    private _packages: Package[] = [];

    @state()
    private _icons: string[] = [];

    @state()
    private _selectedPackage?: Package;

    #handleCancel() {
        this.modalContext?.submit();
    }




    connectedCallback(): void {
        super.connectedCallback();

        this._packages = this.modalContext?.data.packages ?? [];
        if (this._packages && this._packages.length > 0) {
            this._selectedPackage = this._packages[0];
            this._dataService.processCssFiles(this._packages.map(x => x.cssfile), this.shadowRoot).then(() => {
                if (this._selectedPackage!.filteredIcons.length > 0) {
                    this._icons = this._selectedPackage!.filteredIcons;
                } else {
                    this._icons = this._selectedPackage!.extractedStyles;
                }
            });
        }


    }

    #selectIcon(e: Event) {
        var val = (e.target as HTMLElement).getAttribute("value");

        if (val) {
            this._value = { packageId: this._selectedPackage!.id, icon: val };
            this.modalContext?.updateValue({ value: this._value });
            this.modalContext?.submit();
        }
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
                <select ?hidden=${this._packages.length <= 1}>
                    ${this._packages.map((pck) => html`
                        <option value="${pck.id}">${pck.name}</option>
                    `)}
                </select>
                <h4 ?hidden=${this._packages.length > 0}>${this._packages[0].name}</h4>
                ${this._icons.map((icon) => html`
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" @click=${this.#selectIcon} value=${icon}>
                            ${unsafeHTML(this._selectedPackage?.template.replace("{icon}", icon))}
                    </uui-button>
                `)}              
            </umb-body-layout>
            <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${this.#handleCancel}"></uui-button>                        
            </umb-footer-layout> 
        `;
    }
}