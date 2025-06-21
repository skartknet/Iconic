import { LitElement as S, html as u, unsafeHTML as O, nothing as P, css as x, property as w, state as g, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as I } from "@umbraco-cms/backoffice/element-api";
import { D as T } from "./dataService-w_RStjwn.js";
var z = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, d = (t, e, a, c) => {
  for (var s = c > 1 ? void 0 : c ? E(e, a) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (s = (c ? n(e, a, s) : n(s)) || s);
  return c && s && z(e, a, s), s;
}, F = (t, e, a) => e.has(t) || v("Cannot " + a), M = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), l = (t, e, a) => (F(t, e, "access private method"), a), i, k, p, b, y, C, _;
let h = class extends I(S) {
  constructor() {
    super(...arguments), M(this, i), this._value = [], this._multiSelect = !1, this._dataService = new T(), this._packages = [], this._packagesOptions = [], this._showFilteredOnly = !1, this._icons = [];
  }
  connectedCallback() {
    var e, a, c, s, o, n, f;
    if (super.connectedCallback(), this._packages = ((e = this.modalContext) == null ? void 0 : e.data.packages) ?? [], this._packagesOptions = ((c = (a = this.modalContext) == null ? void 0 : a.data.packages) == null ? void 0 : c.map((r) => ({ name: r.name, value: r.id }))) ?? [], this._showFilteredOnly = ((s = this.modalContext) == null ? void 0 : s.data.showFilteredOnly) ?? !1, this._multiSelect = ((o = this.modalContext) == null ? void 0 : o.data.multiSelect) ?? !1, this._value = Array.from(((f = (n = this.modalContext) == null ? void 0 : n.getValue()) == null ? void 0 : f.icons) ?? []), this._packages && this._packages.length > 0) {
      var t = this._packages.findIndex((r) => {
        var m;
        return r.id == ((m = this._value[0]) == null ? void 0 : m.packageId);
      });
      this._selectedPackage = t >= 0 ? this._packages[t] : this._packages[0], t >= 0 ? this._packagesOptions[t].selected = !0 : this._packagesOptions[0].selected = !0, l(this, i, p).call(this);
    }
  }
  render() {
    return u`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                
            ${this._packagesOptions.length > 1 ? u`                                
                    <uui-select .options=${this._packagesOptions}  @change="${l(this, i, b)}"></uui-select>                
            ` : ""}
                ${this._icons.map((t) => {
      var e;
      return u`
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" ?disabled=${l(this, i, y).call(this, t)} @click=${l(this, i, k)} label=${t} value=${t}>
                            ${O((e = this._selectedPackage) == null ? void 0 : e.backofficeTemplate.replace("{icon}", t))}
                    </uui-button>
                `;
    })}              
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? u`<uui-button slot="actions" label="Submit" @click="${l(this, i, _)}"></uui-button>` : P}                        
                        <uui-button slot="actions" label="Cancel" @click="${l(this, i, C)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
i = /* @__PURE__ */ new WeakSet();
k = function(t) {
  var e = t.currentTarget.getAttribute("value");
  e && (this._multiSelect ? this._value.push({ packageId: this._selectedPackage.id, icon: e }) : this._value = [{ packageId: this._selectedPackage.id, icon: e }], t.currentTarget.setAttribute("disabled", "true"), this._multiSelect || l(this, i, _).call(this));
};
p = function() {
  this._dataService.processCssFiles(this._packages.map((t) => t.cssfile), this.shadowRoot).then(() => {
    this._selectedPackage.filteredIcons.length > 0 && this._showFilteredOnly ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
  });
};
b = function(t) {
  var e = t.currentTarget.value;
  e && (this._selectedPackage = this._packages.find((a) => a.id === e), l(this, i, p).call(this));
};
y = function(t) {
  return this._value.findIndex((e) => e.icon === t) >= 0;
};
C = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
_ = function() {
  var t, e;
  (t = this.modalContext) == null || t.updateValue({ icons: this._value }), (e = this.modalContext) == null || e.submit();
};
h.styles = [
  x`
          .icon{
                font-size: var(--uui-size-8);
                height: 55px;
                width: 55px;
                margin-right: var(--uui-size-space-1);
                margin-bottom: var(--uui-size-space-2);
            }

        uui-select {
            width: 100%;
            display: block;
            margin-bottom: var(--uui-size-space-2);
        
        `
];
d([
  w({ attribute: !1 })
], h.prototype, "modalContext", 2);
d([
  g()
], h.prototype, "_icons", 2);
d([
  g()
], h.prototype, "_selectedPackage", 2);
h = d([
  $("modal-picker")
], h);
export {
  h as default
};
//# sourceMappingURL=modal-picker.element.js.map
