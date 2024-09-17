import { LitElement as b, html as v, css as k, property as x, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as I } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as m } from "./modal-settings-addpackage.token.js";
import { UmbPropertyValueChangeEvent as f } from "@umbraco-cms/backoffice/property-editor";
var w = Object.defineProperty, C = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, g = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? C(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (a = (s ? r(t, i, a) : r(a)) || a);
  return s && a && w(t, i, a), a;
}, M = (e, t, i) => t.has(e) || _("Cannot " + i), l = (e, t, i) => (M(e, t, "read from private field"), i ? i.call(e) : t.get(e)), c = (e, t, i) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), d, u, p, h;
let o = class extends E(b) {
  constructor() {
    super(), this.value = [], c(this, d, (e, t) => v`
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
				<uui-button label="edit" compact  @click="${() => l(this, p).call(this, e)}">
                    <uui-icon name="icon-edit"></uui-icon>
				</uui-button>		
				<uui-button label="delete" compact @click="${() => l(this, h).call(this, t)}">
					<uui-icon name="icon-remove"></uui-icon>
				</uui-button>
			</uui-action-bar>
        </div>    
        `), c(this, u, () => {
      var t;
      let e = (t = this._modalManagerContext) == null ? void 0 : t.open(this, m);
      e == null || e.onSubmit().then((i) => {
        if (this.value || (this.value = []), i && i.package) {
          let s = this.value.map((a) => a);
          s.push(Object.assign({}, i.package)), this.value = s, this.dispatchEvent(new f());
        }
      });
    }), c(this, p, (e) => {
      var i;
      let t = (i = this._modalManagerContext) == null ? void 0 : i.open(this, m, {
        data: {
          package: e
        }
      });
      t == null || t.onSubmit().then((s) => {
        if (s.package) {
          var a = this.value.findIndex((n) => n.id === s.package.id);
          if (a >= 0) {
            let n = this.value.map((r) => r);
            n[a] = Object.assign({}, s.package), this.value = n, this.dispatchEvent(new f());
          }
        }
      });
    }), c(this, h, (e) => {
      if (this.value && this.value.length > e) {
        let t = Array.from(this.value);
        t.splice(e, 1), this.value = t;
      }
    }), this.consumeContext(I, (e) => {
      this._modalManagerContext = e;
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    var e;
    return v`                
            <div class="container">                   
                ${(e = this.value) == null ? void 0 : e.map((t, i) => l(this, d).call(this, t, i))}   
            </div>                                         

            <uui-button
                    class = "add-button"
					look="placeholder"
					label="Add"
                    @click="${l(this, u)}" 
					></uui-button>                   
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
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
g([
  x({ type: Array })
], o.prototype, "value", 2);
o = g([
  y("iconic-settings-element")
], o);
export {
  o as default
};
//# sourceMappingURL=settings-editor.element.js.map
