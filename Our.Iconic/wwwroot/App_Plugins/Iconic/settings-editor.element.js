import { LitElement as b, html as m, css as x, property as C, customElement as k } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as I } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as f } from "./modal-settings-addpackage.token.js";
import { UmbChangeEvent as d } from "@umbraco-cms/backoffice/event";
var y = Object.defineProperty, w = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, _ = (e, t, a, n) => {
  for (var i = n > 1 ? void 0 : n ? w(t, a) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (i = (n ? c(t, a, i) : c(i)) || i);
  return n && i && y(t, a, i), i;
}, M = (e, t, a) => t.has(e) || g("Cannot " + a), l = (e, t, a) => (M(e, t, "read from private field"), a ? a.call(e) : t.get(e)), o = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u, h, p, v;
let r = class extends E(b) {
  constructor() {
    super(), this.value = [], o(this, u, () => {
      this._modalManagerContext?.open(this, f)?.onSubmit().then((t) => {
        if (t?.package) {
          let a = this.value ? this.value.map((n) => n) : [];
          a.push(Object.assign({}, t.package)), this.value = a, this.dispatchEvent(new d());
        }
      });
    }), o(this, h, (e) => {
      this._modalManagerContext?.open(this, f, {
        data: {
          package: e
        }
      })?.onSubmit().then((a) => {
        if (a.package) {
          var n = this.value.findIndex((i) => i.id === a.package.id);
          if (n >= 0) {
            let i = this.value.map((s) => s);
            i[n] = Object.assign({}, a.package), this.value = i, this.dispatchEvent(new d());
          }
        }
      });
    }), o(this, p, (e) => {
      if (this.value && this.value.length > e) {
        let t = Array.from(this.value);
        t.splice(e, 1), this.value = t, this.dispatchEvent(new d());
      }
    }), o(this, v, (e, t) => m`
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
                            <uui-button label="edit" compact  @click="${() => l(this, h).call(this, e)}">
                                <uui-icon name="icon-edit"></uui-icon>
                            </uui-button>		
                            <uui-button label="delete" compact @click="${() => l(this, p).call(this, t)}">
                                <uui-icon name="icon-remove"></uui-icon>
                            </uui-button>
                        </uui-action-bar>
                    </div>    
                    `), this.value = this.value || [], this.consumeContext(I, (e) => {
      this._modalManagerContext = e;
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return m`                
        <div class="container">                   
            ${this.value?.map((e, t) => l(this, v).call(this, e, t))}   
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
h = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
r.styles = [x`
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
  C({ type: Array })
], r.prototype, "value", 2);
r = _([
  k("iconic-settings-element")
], r);
export {
  r as default
};
//# sourceMappingURL=settings-editor.element.js.map
