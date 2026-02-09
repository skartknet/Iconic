import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { Icon, Package } from '../models';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { ICONIC_MODALPICKER_TOKEN } from '../tokens/modal-picker.token';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { UmbPropertyEditorConfigCollection} from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import DataService from '../dataService';

@customElement('iconic-property-editor')
export default class IconicPropertyEditor extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

  #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

  @property({ attribute: false })
  value?: Icon;


  @state()
  private _selectedIcon?: string;

  @state()
  private _selectedPackage?: Package;

  private _dataService: DataService = new DataService();
  private _packages?: Package[] = [];


  constructor() {
    super();

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
      this.#modalManagerContext = instance;
    });


  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.value && this._packages) {
      this._selectedIcon = this.value.icon;
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
        this._selectedIcon = this._selectedPackage?.backofficeTemplate.replace("{icon}", this.value!.icon)
      });
    } else {
      this._selectedIcon = "";
    }
  }

  #removeIcon() {
    this.value = undefined;
    this._selectedIcon = undefined;
    this.dispatchEvent(new UmbChangeEvent());
  }

  #openModal() {
    let modalContext = this.#modalManagerContext?.open(this, ICONIC_MODALPICKER_TOKEN, {
      data: {
        packages: this._packages,
        showFilteredOnly: true
      },
      value: {
        icons: this.value ? [this.value] : []
      },
    });

    modalContext?.onSubmit().then((val) => {
      let tempVal: Icon | undefined = undefined;
      if (val?.icons?.length && val?.icons?.length > 0) {
        tempVal = val.icons[0];
        this.value = tempVal;
        this.dispatchEvent(new UmbChangeEvent());
        this._selectedPackage = this._packages?.find((el) => el.id === this.value?.packageId);
        this.#setPreviewIcon();
      } else {
        this.value = tempVal;
        this.dispatchEvent(new UmbChangeEvent());
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
      .action {
        cursor: pointer;
        color: var(--uui-color-text-alt);
        font-size: var(--uui-size-4);
        font-weight: 500;
      }

      .action:hover {
        color: var(--uui-color-text);
        text-decoration: underline;
      }
    `
  ]


  render() {
    return html`
              <uui-button class="icon" compact label="icon" look="placeholder" @click=${this.#openModal} type="button" color="default">
                ${this._selectedIcon ? unsafeHTML(this._selectedIcon) : unsafeHTML('<span style="font-size: var(--uui-size-4);">Add</span>')}                
              </uui-button>
              ${this._selectedIcon ? html`                                
                <div><small class="action" @click=${this.#removeIcon}>Remove</small></div>
              ` : ''}
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'iconic-property-editor': IconicPropertyEditor
  }
}
