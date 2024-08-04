import { html, customElement, property, LitElement} from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";


@customElement('iconic-settings-element')
export default class IconicSettingsElement extends LitElement implements UmbPropertyEditorUiElement {
    @property({ type: String })
    public value = "";
    
    render() {
        return html`
      <div>settings here</div>
    `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iconic-settings-element': IconicSettingsElement
    }
}
