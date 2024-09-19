import { LitElement as b, html as m, css as k, property as x, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as I } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as f } from "./modal-settings-addpackage.token.js";
import { UmbPropertyValueChangeEvent as d } from "@umbraco-cms/backoffice/property-editor";
var C = Object.defineProperty, w = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, _ = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? w(t, a) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (i = (s ? r(t, a, i) : r(i)) || i);
  return s && i && C(t, a, i), i;
}, M = (e, t, a) => t.has(e) || g("Cannot " + a), l = (e, t, a) => (M(e, t, "read from private field"), a ? a.call(e) : t.get(e)), c = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u, p, h, v;
let o = class extends y(b) {
  constructor() {
    super(), this.value = [], c(this, u, () => {
      var t;
      let e = (t = this._modalManagerContext) == null ? void 0 : t.open(this, f);
      e == null || e.onSubmit().then((a) => {
        if (a != null && a.package) {
          let s = this.value.map((i) => i);
          s.push(Object.assign({}, a.package)), this.value = s, this.dispatchEvent(new d());
        }
      });
    }), c(this, p, (e) => {
      var a;
      let t = (a = this._modalManagerContext) == null ? void 0 : a.open(this, f, {
        data: {
          package: e
        }
      });
      t == null || t.onSubmit().then((s) => {
        if (s.package) {
          var i = this.value.findIndex((n) => n.id === s.package.id);
          if (i >= 0) {
            let n = this.value.map((r) => r);
            n[i] = Object.assign({}, s.package), this.value = n, this.dispatchEvent(new d());
          }
        }
      });
    }), c(this, h, (e) => {
      if (this.value && this.value.length > e) {
        let t = Array.from(this.value);
        t.splice(e, 1), this.value = t, this.dispatchEvent(new d());
      }
    }), c(this, v, (e, t) => m`
                    <div class="item" data-package-id="${e.id}">
                        <div class="details">                
                            <b>${e.name}</b>
                            <div class="details-small">
                                <div ?hidden="${e.filteredIcons && e.filteredIcons.length > 0}">
                                    Icons: ${e.extractedStyles.length}
                                </div>
                                <div ?hidden="${!e.filteredIcons || e.filteredIcons.length <= 0}">
                                    Icons: ${e.filteredIcons.length} (filtered out of ${e.extractedStyles.length})
                                </div>
                            </div>
                        </div>
                        <uui-action-bar>
                            <uui-button label="edit" compact  @click="${() => l(this, p).call(this, e)}">
                                <uui-icon name="icon-edit"></uui-icon>
                            </uui-button>		
                            <uui-button label="delete" compact @click="${() => l(this, h).call(this, t)}">
                                <uui-icon name="icon-remove"></uui-icon>
                            </uui-button>
                        </uui-action-bar>
                    </div>    
                    `), this.consumeContext(I, (e) => {
      this._modalManagerContext = e;
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    var e;
    return m`                
        <div class="container">                   
            ${(e = this.value) == null ? void 0 : e.map((t, a) => l(this, v).call(this, t, a))}   
        </div>                                         

        <uui-button
                class = "add-button"
                look="placeholder"
                label="Add Package"
                @click="${l(this, u)}" 
                ></uui-button>                   
    `;
  }
};
u = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
o.styles = [k`
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
_([
  x({ type: Array })
], o.prototype, "value", 2);
o = _([
  E("iconic-settings-element")
], o);
export {
  o as default
};
//# sourceMappingURL=settings-editor.element.js.map
