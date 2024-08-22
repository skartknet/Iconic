import { LitElement as m, html as c, css as p, property as u, state as v, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { P as g } from "./models-u6n50sPP.js";
import { UMB_MODAL_MANAGER_CONTEXT as b } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as d } from "./modal-settings-addpackage.token.js";
import { UmbSorterController as I } from "@umbraco-cms/backoffice/sorter";
var w = Object.defineProperty, y = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, s = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? y(t, i) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && w(t, i, o), o;
}, E = (e, t, i) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), _;
let a = class extends f(m) {
  constructor() {
    super(), E(this, _, new I(this, {
      itemSelector: ".item",
      containerSelector: ".container",
      getUniqueOfElement: (e) => e.id,
      getUniqueOfModel: (e) => e.id
    })), this.renderItem = (e, t) => c`
        <div class="item">
            <div class="umb-node-preview">
                <i class="umb-node-preview__icon icon-navigation handle"></i>
                <div class="umb-node-preview__content">
                    <div class="umb-node-preview__name">${e.name}</div>
                    <div ?hidden="${e.filteredIcons && e.filteredIcons.length > 0}" class="umb-node-preview__description">
                        <umb-localize key="iconicConfig_icons">Icons</umb-localize>: ${e.extractedStyles.length}
                    </div>
                    <div ?hidden="${!e.filteredIcons || e.filteredIcons.length <= 0}" class="umb-node-preview__description">
                        <umb-localize key="iconicConfig_icons">Icons</umb-localize>: ${e.filteredIcons.length} (filtered out of ${e.extractedStyles.length})
                    </div>
                </div>
                <div class="umb-node-preview__actions">
                    <a class="umb-node-preview__action umb-node-preview__action--green" @click="${() => this.editPackage(e)}" prevent-default>Edit</a>
                    <a class="umb-node-preview__action umb-node-preview__action--red" @click="${() => this.removeItem(t)}" prevent-default>
                        <umb-localize key="iconicConfig_remove">Remove</umb-localize>
                    </a>
                </div>
            </div>
        </div>    
        `, this.createNewPackage = () => {
      var e;
      (e = this._modalManagerContext) == null || e.open(this, d, {
        data: {
          package: new g()
        }
      });
    }, this.editPackage = (e) => {
      var t;
      (t = this._modalManagerContext) == null || t.open(this, d, {
        data: {
          package: e
        }
      });
    }, this.removeItem = (e) => {
      this._value && this._value.length > e && (this._value = this._value.splice(e, 1));
    }, this.toggleItemDisplay = (e) => this._selectedItem = this._selectedItem === e ? this._selectedItem = void 0 : e, this.value && (this._value = JSON.parse(this.value)), this.consumeContext(b, (e) => {
      this._modalManagerContext = e;
    });
  }
  render() {
    var e;
    return c`                
            <div class="container">                   
                ${(e = this._value) == null ? void 0 : e.map((t, i) => this.renderItem(t, i))}   
            </div>                                         

            <uui-button
                    class = "add-button"
					look="placeholder"
					label="Add"
                    @click="${this.createNewPackage}" 
					></uui-button>                   
        `;
  }
};
_ = /* @__PURE__ */ new WeakMap();
a.styles = [p`
        :host {
            display: flex;
            flex-direction: column;
        }
  `];
s([
  u({ type: String })
], a.prototype, "value", 2);
s([
  v()
], a.prototype, "_value", 2);
s([
  v()
], a.prototype, "_selectedItem", 2);
a = s([
  h("iconic-settings-element")
], a);
export {
  a as default
};
//# sourceMappingURL=settings-editor.element.js.map
