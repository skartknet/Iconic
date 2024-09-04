import { LitElement as w, html as u, css as b, property as C, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as y } from "@umbraco-cms/backoffice/modal";
import { ICONIC_SETTINGS_ADDPACKAGE_TOKEN as _ } from "./modal-settings-addpackage.token.js";
import { UmbSorterController as I } from "@umbraco-cms/backoffice/sorter";
import { UmbPropertyValueChangeEvent as M } from "@umbraco-cms/backoffice/property-editor";
var $ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, f = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? O(t, i) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && $(t, i, a), a;
}, S = (e, t, i) => t.has(e) || m("Cannot " + i), r = (e, t, i) => (S(e, t, "read from private field"), i ? i.call(e) : t.get(e)), n = (e, t, i) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), g, d, v, p, h;
let s = class extends k(w) {
  constructor() {
    super(), this.value = [], n(this, g, new I(this, {
      itemSelector: ".item",
      containerSelector: ".container",
      getUniqueOfElement: (e) => e.id,
      getUniqueOfModel: (e) => e.id
    })), n(this, d, (e, t) => u`
        <div class="item" id="package_${t}">
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
                    <a class="umb-node-preview__action umb-node-preview__action--green" @click="${() => r(this, p).call(this, e)}" prevent-default>Edit</a>
                    <a class="umb-node-preview__action umb-node-preview__action--red" @click="${() => r(this, h).call(this, t)}" prevent-default>
                        <umb-localize key="iconicConfig_remove">Remove</umb-localize>
                    </a>
                </div>
            </div>
        </div>    
        `), n(this, v, () => {
      var t;
      let e = (t = this._modalManagerContext) == null ? void 0 : t.open(this, _);
      e == null || e.onSubmit().then((i) => {
        this.value || (this.value = []), this.value = [...this.value, i.package], this.dispatchEvent(new M());
      });
    }), n(this, p, (e) => {
      var t;
      (t = this._modalManagerContext) == null || t.open(this, _, {
        data: {
          package: e
        }
      });
    }), n(this, h, (e) => {
      this.value && this.value.length > e && (this.value = this.value.splice(e, 1));
    }), this.consumeContext(y, (e) => {
      this._modalManagerContext = e;
    });
  }
  render() {
    var e;
    return u`                
            <div class="container">                   
                ${(e = this.value) == null ? void 0 : e.map((t, i) => r(this, d).call(this, t, i))}   
            </div>                                         

            <uui-button
                    class = "add-button"
					look="placeholder"
					label="Add"
                    @click="${r(this, v)}" 
					></uui-button>                   
        `;
  }
};
g = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
s.styles = [b`
        :host {
            display: flex;
            flex-direction: column;
        }
  `];
f([
  C({ type: Array })
], s.prototype, "value", 2);
s = f([
  E("iconic-settings-element")
], s);
export {
  s as default
};
//# sourceMappingURL=settings-editor.element.js.map
