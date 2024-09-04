import { html, customElement, property, LitElement, state, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { Package } from "../models";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN } from "../tokens/modal-settings-addpackage.token";
import { UmbSorterController } from '@umbraco-cms/backoffice/sorter';
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";


@customElement('iconic-settings-element')
export default class IconicSettingsElement extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

    @property({ type: Array })
    value: Array<Package> = [];

    private _modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

    #sorter = new UmbSorterController(this, {
        itemSelector: '.item',
        containerSelector: '.container',
        getUniqueOfElement: (element) => element.id,
        getUniqueOfModel: (model: Package) => model.id
    });


    constructor() {
        super();

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this._modalManagerContext = instance;
        });

        //this.#sorter.setModel(this._value);

    }


    render() {
        return html`                
            <div class="container">                   
                ${this.value?.map((item, index) => this.#renderItem(item, index))}   
            </div>                                         

            <uui-button
                    class = "add-button"
					look="placeholder"
					label="Add"
                    @click="${this.#createNewPackage}" 
					></uui-button>                   
        `
    }

    static styles = [css`
        :host {
            display: flex;
            flex-direction: column;
        }
  `];

    #renderItem = (item: Package, index: number) => {
        return html`
        <div class="item" id="package_${index}">
            <div class="umb-node-preview">
                <i class="umb-node-preview__icon icon-navigation handle"></i>
                <div class="umb-node-preview__content">
                    <div class="umb-node-preview__name">${item.name}</div>
                    <div ?hidden="${item.filteredIcons && item.filteredIcons.length > 0}" class="umb-node-preview__description">
                        <umb-localize key="iconicConfig_icons">Icons</umb-localize>: ${item.extractedStyles.length}
                    </div>
                    <div ?hidden="${!item.filteredIcons || item.filteredIcons.length <= 0}" class="umb-node-preview__description">
                        <umb-localize key="iconicConfig_icons">Icons</umb-localize>: ${item.filteredIcons.length} (filtered out of ${item.extractedStyles.length})
                    </div>
                </div>
                <div class="umb-node-preview__actions">
                    <a class="umb-node-preview__action umb-node-preview__action--green" @click="${() => this.#editPackage(item)}" prevent-default>Edit</a>
                    <a class="umb-node-preview__action umb-node-preview__action--red" @click="${() => this.#removeItem(index)}" prevent-default>
                        <umb-localize key="iconicConfig_remove">Remove</umb-localize>
                    </a>
                </div>
            </div>
        </div>    
        `
    }

    #createNewPackage = () => {

        let modalContext = this._modalManagerContext?.open(this, ICONIC_SETTINGS_ADDPACKAGE_TOKEN);

        modalContext?.onSubmit().then((value) => {
            if (!this.value) {
                this.value = [];
            }

            this.value = [...this.value, value.package];
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        })
    };

    #editPackage = (pkg: Package) => {
        this._modalManagerContext?.open(this, ICONIC_SETTINGS_ADDPACKAGE_TOKEN, {
            data: {
                package: pkg
            }
        });
    };

    #removeItem = (index: number) => {
        if (this.value && this.value.length > index) {
            this.value = this.value.splice(index, 1);
        }
    };


}

declare global {
    interface HTMLElementTagNameMap {
        'iconic-settings-element': IconicSettingsElement
    }
}
