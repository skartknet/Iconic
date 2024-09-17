import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { Icon, Package } from '../models';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { ICONIC_MODALPICKER_TOKEN } from '../tokens/modal-picker.token';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { UmbPropertyEditorConfigCollection, UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
import DataService from '../dataService';

@customElement('iconic-property-editor')
export default class IconicPropertyEditor extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

  #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

  @property({ attribute: false })
  value?: Icon;


  @state()
  private _previewIcon?: string;


  private _dataService: DataService = new DataService();
  private _packages?: Package[] = [];
  private _selectedPackage?: Package;


  constructor() {
    super();

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
      this.#modalManagerContext = instance;
    });


  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.value && this._packages) {
      this._selectedPackage = this._packages.find((el) => el.id === this.value?.packageId);
    }

    this.#setPreviewIcon();
  }

  @property({ attribute: false })
  public set config(config: UmbPropertyEditorConfigCollection) {
    this._packages = config.getValueByAlias("packages");
  }

  async #setPreviewIcon() {


    if (this.value?.icon && this._selectedPackage) {
      await this._dataService.processCssFile(this._selectedPackage.cssfile, this.shadowRoot).then(() => {
        this._previewIcon = this._selectedPackage?.template.replace("{icon}", this.value!.icon)
      });
    } else {
      this._previewIcon = "";
    }
  }

  #openModal() {
    let modalContext = this.#modalManagerContext?.open(this, ICONIC_MODALPICKER_TOKEN, {
      data: {
        packages: this._packages,
        showFilteredOnly: true
      },
    });

    modalContext?.onSubmit().then((val) => {
      if (val?.value == undefined) {
        this.value = undefined;
      } else {
        this.value = val.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
        this._selectedPackage = this._packages?.find((el) => el.id === this.value?.packageId);
        this.#setPreviewIcon();
      }
    })
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
              <uui-button class="icon" compact label="icon" look="placeholder" @click=${this.#openModal} type="button" color="default">
                ${unsafeHTML(this._previewIcon)}
              </uui-button>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'iconic-property-editor': IconicPropertyEditor
  }
}
