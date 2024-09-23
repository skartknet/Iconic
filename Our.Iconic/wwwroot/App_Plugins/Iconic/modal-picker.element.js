import { LitElement as v, html as h, unsafeHTML as b, nothing as k, css as y, property as C, state as _, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { D as $ } from "./dataService-2QWwMUxk.js";
var P = Object.defineProperty, w = Object.getOwnPropertyDescriptor, p = (e) => {
  throw TypeError(e);
}, r = (e, t, a, i) => {
  for (var s = i > 1 ? void 0 : i ? w(t, a) : t, c = e.length - 1, u; c >= 0; c--)
    (u = e[c]) && (s = (i ? u(t, a, s) : u(s)) || s);
  return i && s && P(t, a, s), s;
}, O = (e, t, a) => t.has(e) || p("Cannot " + a), I = (e, t, a) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), n = (e, t, a) => (O(e, t, "access private method"), a), l, m, f, g, d;
let o = class extends S(v) {
  constructor() {
    super(...arguments), I(this, l), this._value = [], this._multiSelect = !1, this._dataService = new $(), this._packages = [], this._showFilteredOnly = !1, this._icons = [];
  }
  connectedCallback() {
    var e, t, a, i, s;
    super.connectedCallback(), this._packages = ((e = this.modalContext) == null ? void 0 : e.data.packages) ?? [], this._showFilteredOnly = ((t = this.modalContext) == null ? void 0 : t.data.showFilteredOnly) ?? !1, this._multiSelect = ((a = this.modalContext) == null ? void 0 : a.data.multiSelect) ?? !1, this._value = Array.from(((s = (i = this.modalContext) == null ? void 0 : i.getValue()) == null ? void 0 : s.icons) ?? []), this._packages && this._packages.length > 0 && (this._selectedPackage = this._packages[0], this._dataService.processCssFiles(this._packages.map((c) => c.cssfile), this.shadowRoot).then(() => {
      this._selectedPackage.filteredIcons.length > 0 && this._showFilteredOnly ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
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
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" ?disabled=${n(this, l, f).call(this, e)} @click=${n(this, l, m)} label=${e} value=${e}>
                            ${b((t = this._selectedPackage) == null ? void 0 : t.template.replace("{icon}", e))}
                    </uui-button>
                `;
    })}              
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? h`<uui-button slot="actions" label="Submit" @click="${n(this, l, d)}"></uui-button>` : k}                        
                        <uui-button slot="actions" label="Cancel" @click="${n(this, l, g)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
l = /* @__PURE__ */ new WeakSet();
m = function(e) {
  var t = e.currentTarget.getAttribute("value");
  t && (this._value.push({ packageId: this._selectedPackage.id, icon: t }), e.currentTarget.setAttribute("disabled", "true"), this._multiSelect || n(this, l, d).call(this));
};
f = function(e) {
  return this._value.findIndex((t) => t.icon === e) >= 0;
};
g = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
d = function() {
  var e, t;
  (e = this.modalContext) == null || e.updateValue({ icons: this._value }), (t = this.modalContext) == null || t.submit();
};
o.styles = [
  y`
          .icon{
                font-size: var(--uui-size-8);
                height: 55px;
                width: 55px;
                margin-right: var(--uui-size-space-1);
                margin-bottom: var(--uui-size-space-2);
            }
        `
];
r([
  C({ attribute: !1 })
], o.prototype, "modalContext", 2);
r([
  _()
], o.prototype, "_icons", 2);
r([
  _()
], o.prototype, "_selectedPackage", 2);
o = r([
  x("modal-picker")
], o);
export {
  o as default
};
//# sourceMappingURL=modal-picker.element.js.map
