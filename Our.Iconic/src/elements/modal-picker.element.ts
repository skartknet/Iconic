import { html, LitElement, property, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { ModalPickerData, ModalPickerValue } from "../tokens/modal-picker.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package } from "../models.ts";

@customElement('modal-picker')
export default class MyDialogElement
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<ModalPickerData, ModalPickerValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<ModalPickerData, ModalPickerValue>;

    @property({ attribute: false })
    value?: ModalPickerValue;

    @property({ attribute: false })
    data?: ModalPickerData;

    #handleCancel() {
        this.modalContext?.submit();
    }

    #handleSubmit() {
        this.modalContext?.updateValue({ value: "" });
        this.modalContext?.submit();
    }

    render() {
        return html`
            <div>
                <button @click=${this.#handleCancel}>Cancel</button>
                <button @click=${this.#handleSubmit}>Submit</button>
            </div>
        `;
    }
}