import { html, customElement, property, LitElement, css } from "@umbraco-cms/backoffice/external/lit";
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { Package } from "../models";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN } from "../tokens/modal-settings-addpackage.token";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";


@customElement('iconic-settings-element')
export default class IconicSettingsElement extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

    @property({ type: Array })
    public value: Array<Package> = [];

    private _modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;


    constructor() {
        super();

        this.value = this.value || [];

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this._modalManagerContext = instance;
        });

    }

    connectedCallback() {
        super.connectedCallback();
    }


    #createNewPackage = () => {

        let modalContext = this._modalManagerContext?.open(this, ICONIC_SETTINGS_ADDPACKAGE_TOKEN);

        modalContext?.onSubmit().then((val) => {
            if (val?.package) {
                let tempVal = this.value ? this.value.map(x => x) : [];
                tempVal.push(Object.assign({}, val.package));

                this.value = tempVal;
                this.dispatchEvent(new UmbPropertyValueChangeEvent());
            }
        })
    };

    #editPackage = (pkg: Package) => {
        let modalContext = this._modalManagerContext?.open(this, ICONIC_SETTINGS_ADDPACKAGE_TOKEN, {
            data: {
                package: pkg
            }
        });

        modalContext?.onSubmit().then((value) => {
            if (!value.package) {
                return;
            }

            var existingPackage = this.value.findIndex(x => x.id === value.package.id);
            if (existingPackage >= 0) {
                let tempVal = this.value.map(x => x);

                tempVal[existingPackage] = Object.assign({}, value.package);

                this.value = tempVal;
                this.dispatchEvent(new UmbPropertyValueChangeEvent());
            }
        })
    };

    #removeItem = (index: number) => {
        if (this.value && this.value.length > index) {
            let tempVal = Array.from(this.value);
            tempVal.splice(index, 1);
            this.value = tempVal;
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        }
    };


    static styles = [css`
        :host {
            display: flex;
            flex-direction: column;
            
        }

        .item {
            display: flex;      
            padding: calc(var(--uui-size-2, 6px) + 1px);      
            justify-content: space-between;
            align-items: center;            
            border-bottom: 1px solid #ccc;
            min-height: var(--uui-size-16);
            border: 1px solid var(--uui-color-border, #d8d7d9);
            border-radius: var(--uui-border-radius, 3px);
            margin-bottom: var(--uui-size-2);
        }


        .details-small {
            font-size: 0.8em;
        }
  `];



    render() {
        return html`                
        <div class="container">                   
            ${this.value?.map((item, index) => this.#renderItem(item, index))}   
        </div>                                         

        <uui-button
                class = "add-button"
                look="placeholder"
                label="Add Package"
                @click="${this.#createNewPackage}" 
                ></uui-button>                   
    `
    }

    #renderItem = (item: Package, index: number) => {
        return html`
                    <div class="item" data-package-id="${item.id}">
                        <div class="details">                
                            <b>${item.name}</b>
                            <div class="details-small">
                                <div ?hidden="${item.filteredIcons && item.filteredIcons.length > 0}">
                                    Icons: ${item.extractedStyles.length}
                                </div>
                                <div ?hidden="${!item.filteredIcons || item.filteredIcons.length <= 0}">
                                    Icons: ${item.filteredIcons.length} (filtered out of ${item.extractedStyles.length})
                                </div>
                            </div>
                        </div>
                        <uui-action-bar>
                            <uui-button label="edit" compact  @click="${() => this.#editPackage(item)}">
                                <uui-icon name="icon-edit"></uui-icon>
                            </uui-button>		
                            <uui-button label="delete" compact @click="${() => this.#removeItem(index)}">
                                <uui-icon name="icon-remove"></uui-icon>
                            </uui-button>
                        </uui-action-bar>
                    </div>    
                    `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iconic-settings-element': IconicSettingsElement
    }
}
