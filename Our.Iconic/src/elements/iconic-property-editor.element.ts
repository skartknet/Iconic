import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { Package } from '../models';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { ICONIC_MODALPICKER_TOKEN } from '../tokens/modal-picker.token';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';

@customElement('iconic-property-editor')
export default class IconicPropertyEditor extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

  #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

  @property({ type: String })
  value?: string;

  @property({ attribute: false})
  config?: UmbPropertyEditorConfigCollection;

  _configObj?: Record<string, unknown>;

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

    this._configObj = this.config?.toObject();

    this.#loadPackage([], this.package);
  }

  render() {
    return html`
              <uui-button id="icon" compact label="icon" look="placeholder" @click=${this.#openModal} ?disabled="${!this.value}" type="button" color="default">
                  ${unsafeHTML(this.value)}
              </uui-button>
    `
  }


  #openModal() {
    this.#modalManagerContext?.open(this, ICONIC_MODALPICKER_TOKEN, {
        data: {
            packages: value,
        },

    });
}

  static styles = [
    css`
      #icon{
            font-size: var(--uui-size-8);
            height: 60px;
            width: 60px;
            margin-right: var(--uui-size-layout-1);
            margin-bottom: var(--uui-size-layout-1);
        }
    `
  ]

}

declare global {
  interface HTMLElementTagNameMap {
    'iconic-property-editor': IconicPropertyEditor
  }
}
