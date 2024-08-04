import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package } from './models';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { ICONIC_MODALPICKER_TOKEN } from './modal-picker.token';

@customElement('iconic-element')
export default class IconicElement extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

  #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

  @property({ type: String })
  public value = ''

  @state()
  private package: Package = new Package();
  

  #loadPackage(packages: Package[], selectedPackage: Package) {
    return packages.find(function (el) {
      return el.id === selectedPackage.id;
    });
  }

  constructor() {
    super();

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
      this.#modalManagerContext = instance;
    });


    this.#loadPackage([], this.package);
  }

  render() {
    return html`
      <uui-button id="icon" compact="" label="icon" look="outline" type="button" color="default" style="font-size: 25px;"
                  @click=${this._openModal}>
						<umb-icon name="icon-document"></umb-icon>            
      </uui-button>
    `
  }


  private _openModal() {
    this.#modalManagerContext?.open(this, ICONIC_MODALPICKER_TOKEN, {
        data: {
            headline: "My modal headline",
        },
    });
}

  static styles = [
    css`
      #icon {
        font-size: var(--uui-size-8);
        height: 60px;
        width: 60px;
      }
    `
  ]

}

declare global {
  interface HTMLElementTagNameMap {
    'iconic-element': IconicElement
  }
}
