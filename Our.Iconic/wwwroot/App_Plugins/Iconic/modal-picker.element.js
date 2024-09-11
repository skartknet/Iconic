import { LitElement as g, html as h, unsafeHTML as v, css as f, property as k, state as u, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { D as C } from "./dataService-DAQWLY0h.js";
var P = Object.defineProperty, x = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, l = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? x(t, a) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (i = (s ? r(t, a, i) : r(i)) || i);
  return s && i && P(t, a, i), i;
}, $ = (e, t, a) => t.has(e) || d("Cannot " + a), w = (e, t, a) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), p = (e, t, a) => ($(e, t, "access private method"), a), c, _, m;
let o = class extends y(g) {
  constructor() {
    super(...arguments), w(this, c), this._dataService = new C(), this._packages = [], this._icons = [];
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), this._packages = ((e = this.modalContext) == null ? void 0 : e.data.packages) ?? [], this._packages && this._packages.length > 0 && (this._selectedPackage = this._packages[0], this._dataService.processCssFiles(this._packages.map((t) => t.cssfile), this.shadowRoot).then(() => {
      this._selectedPackage.filteredIcons.length > 0 ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
    }));
  }
  render() {
    return h`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                <select ?hidden=${this._packages.length <= 1}>
                    ${this._packages.map((e) => h`
                        <option value="${e.id}">${e.name}</option>
                    `)}
                </select>
                <h4 ?hidden=${this._packages.length > 0}>${this._packages[0].name}</h4>
                ${this._icons.map((e) => {
      var t;
      return h`
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" @click=${p(this, c, m)} value=${e}>
                            ${v((t = this._selectedPackage) == null ? void 0 : t.template.replace("{icon}", e))}
                    </uui-button>
                `;
    })}              
            </umb-body-layout>
            <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${p(this, c, _)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
c = /* @__PURE__ */ new WeakSet();
_ = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
m = function(e) {
  var a, s;
  var t = e.target.getAttribute("value");
  t && (this._value = { packageId: this._selectedPackage.id, icon: t }, (a = this.modalContext) == null || a.updateValue({ value: this._value }), (s = this.modalContext) == null || s.submit());
};
o.styles = [
  f`
          .icon{
                font-size: var(--uui-size-8);
                height: 55px;
                width: 55px;
                margin-right: var(--uui-size-space-1);
                margin-bottom: var(--uui-size-space-2);
            }
        `
];
l([
  k({ attribute: !1 })
], o.prototype, "modalContext", 2);
l([
  u()
], o.prototype, "_icons", 2);
l([
  u()
], o.prototype, "_selectedPackage", 2);
o = l([
  b("modal-picker")
], o);
export {
  o as default
};
//# sourceMappingURL=modal-picker.element.js.map
