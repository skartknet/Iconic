import { html, LitElement, property, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext } from "@umbraco-cms/backoffice/modal";
import type { MyModalData, MyModalValue } from "./modal-picker.token.ts";
import { UmbModalExtensionElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package } from "../models.ts";

@customElement('modal-picker')
export default class MyDialogElement
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<MyModalData, MyModalValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<MyModalData, MyModalValue>;

    @property({ attribute: false })
    value?: MyModalValue;

    @state()
    private package: Package = new Package();


    private _handleCancel() {
        this.modalContext?.submit();
    }

    private _handleSubmit() {
        this.modalContext?.updateValue({ package: this.package });
        this.modalContext?.submit();
    }

    render() {
        return html`
            <div>
                <h1>${this.modalContext?.data.headline ?? "Default headline"}</h1>
                <button @click=${this._handleCancel}>Cancel</button>
                <button @click=${this._handleSubmit}>Submit</button>
            </div>
        `;
    }
}