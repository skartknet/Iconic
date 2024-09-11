import { LitElement as k, html as m, css as x, property as w, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as C } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as f } from "./modal-settings-addpackage.token.js";
import { UmbSorterController as I } from "@umbraco-cms/backoffice/sorter";
import { UmbPropertyValueChangeEvent as _ } from "@umbraco-cms/backoffice/property-editor";
var M = Object.defineProperty, A = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, b = (e, t, i, r) => {
  for (var a = r > 1 ? void 0 : r ? A(t, i) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (a = (r ? c(t, i, a) : c(a)) || a);
  return r && a && M(t, i, a), a;
}, S = (e, t, i) => t.has(e) || g("Cannot " + i), s = (e, t, i) => (S(e, t, "read from private field"), i ? i.call(e) : t.get(e)), l = (e, t, i) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), d, u, h, p, v;
let o = class extends y(k) {
  constructor() {
    super(), this.value = [], l(this, d, new I(this, {
      itemSelector: ".item",
      containerSelector: ".container",
      getUniqueOfElement: (e) => e.getAttribute("data-package-id"),
      getUniqueOfModel: (e) => e.id
    })), l(this, u, (e, t) => m`
        <div class="item" data-package-id="${e.id}">
            <div class="details">                
                ${e.name}
                <div class="details-small">
                    <div ?hidden="${e.filteredIcons && e.filteredIcons.length > 0}" class="umb-node-preview__description">
                        Icons: ${e.extractedStyles.length}
                    </div>
                    <div ?hidden="${!e.filteredIcons || e.filteredIcons.length <= 0}" class="umb-node-preview__description">
                        Icons: ${e.filteredIcons.length} (filtered out of ${e.extractedStyles.length})
                    </div>
                </div>
            </div>
            <uui-action-bar>
				<uui-button label="edit" compact  @click="${() => s(this, p).call(this, e)}">
                    <uui-icon name="icon-edit"></uui-icon>
				</uui-button>		
				<uui-button label="delete" compact @click="${() => s(this, v).call(this, t)}">
					<uui-icon name="icon-remove"></uui-icon>
				</uui-button>
			</uui-action-bar>
        </div>    
        `), l(this, h, () => {
      var t;
      let e = (t = this._modalManagerContext) == null ? void 0 : t.open(this, f);
      e == null || e.onSubmit().then((i) => {
        this.value || (this.value = []), this.value = [...this.value, i.package], this.dispatchEvent(new _());
      });
    }), l(this, p, (e) => {
      var i;
      let t = (i = this._modalManagerContext) == null ? void 0 : i.open(this, f, {
        data: {
          package: e
        }
      });
      t == null || t.onSubmit().then((r) => {
        if (r) {
          var a = this.value.findIndex((n) => n.id === r.package.id);
          if (a >= 0) {
            let n = Array.from(this.value);
            n[a] = r.package, this.value = n, this.dispatchEvent(new _());
          }
        }
      });
    }), l(this, v, (e) => {
      this.value && this.value.length > e && (this.value = this.value.splice(e, 1));
    }), this.consumeContext(C, (e) => {
      this._modalManagerContext = e;
    });
  }
  connectedCallback() {
    super.connectedCallback(), s(this, d).setModel(this.value);
  }
  render() {
    var e;
    return m`                
            <div class="container">                   
                ${(e = this.value) == null ? void 0 : e.map((t, i) => s(this, u).call(this, t, i))}   
            </div>                                         

            <uui-button
                    class = "add-button"
					look="placeholder"
					label="Add"
                    @click="${s(this, h)}" 
					></uui-button>                   
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
o.styles = [x`
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
b([
  w({ type: Array })
], o.prototype, "value", 2);
o = b([
  E("iconic-settings-element")
], o);
export {
  o as default
};
//# sourceMappingURL=settings-editor.element.js.map
