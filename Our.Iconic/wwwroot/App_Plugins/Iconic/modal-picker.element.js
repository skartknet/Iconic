import { LitElement as y, html as u, unsafeHTML as C, nothing as S, css as P, property as x, state as m, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { D as w } from "./dataService-w_RStjwn.js";
var I = Object.defineProperty, T = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, r = (e, t, a, c) => {
  for (var s = c > 1 ? void 0 : c ? T(t, a) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (s = (c ? n(t, a, s) : n(s)) || s);
  return c && s && I(t, a, s), s;
}, E = (e, t, a) => t.has(e) || f("Cannot " + a), F = (e, t, a) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), l = (e, t, a) => (E(e, t, "access private method"), a), i, g, d, k, v, b, p;
let h = class extends $(y) {
  constructor() {
    super(...arguments), F(this, i), this._value = [], this._multiSelect = !1, this._dataService = new w(), this._packages = [], this._packagesOptions = [], this._showFilteredOnly = !1, this._icons = [];
  }
  connectedCallback() {
    var e, t, a, c, s, o, n;
    super.connectedCallback(), this._packages = ((e = this.modalContext) == null ? void 0 : e.data.packages) ?? [], this._packagesOptions = ((a = (t = this.modalContext) == null ? void 0 : t.data.packages) == null ? void 0 : a.map((_) => ({ name: _.name, value: _.id }))) ?? [], this._packagesOptions.length > 0 && (this._packagesOptions[0].selected = !0), this._showFilteredOnly = ((c = this.modalContext) == null ? void 0 : c.data.showFilteredOnly) ?? !1, this._multiSelect = ((s = this.modalContext) == null ? void 0 : s.data.multiSelect) ?? !1, this._value = Array.from(((n = (o = this.modalContext) == null ? void 0 : o.getValue()) == null ? void 0 : n.icons) ?? []), this._packages && this._packages.length > 0 && (this._selectedPackage = this._packages[0], l(this, i, d).call(this));
  }
  render() {
    return u`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                
                <uui-select ?hidden=${this._packagesOptions.length == 0} .options=${this._packagesOptions}  @change="${l(this, i, k)}"></uui-select>

                </umb-property-editor-ui-dropdown>
                <h4 ?hidden=${this._packages.length == 0}>${this._packages[0].name}</h4>
                ${this._icons.map((e) => {
      var t;
      return u`
                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" ?disabled=${l(this, i, v).call(this, e)} @click=${l(this, i, g)} label=${e} value=${e}>
                            ${C((t = this._selectedPackage) == null ? void 0 : t.backofficeTemplate.replace("{icon}", e))}
                    </uui-button>
                `;
    })}              
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? u`<uui-button slot="actions" label="Submit" @click="${l(this, i, p)}"></uui-button>` : S}                        
                        <uui-button slot="actions" label="Cancel" @click="${l(this, i, b)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
i = /* @__PURE__ */ new WeakSet();
g = function(e) {
  var t = e.currentTarget.getAttribute("value");
  t && (this._value.push({ packageId: this._selectedPackage.id, icon: t }), e.currentTarget.setAttribute("disabled", "true"), this._multiSelect || l(this, i, p).call(this));
};
d = function() {
  this._dataService.processCssFiles(this._packages.map((e) => e.cssfile), this.shadowRoot).then(() => {
    this._selectedPackage.filteredIcons.length > 0 && this._showFilteredOnly ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
  });
};
k = function(e) {
  var t = e.currentTarget.value;
  t && (this._selectedPackage = this._packages.find((a) => a.id === t), l(this, i, d).call(this));
};
v = function(e) {
  return this._value.findIndex((t) => t.icon === e) >= 0;
};
b = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
p = function() {
  var e, t;
  (e = this.modalContext) == null || e.updateValue({ icons: this._value }), (t = this.modalContext) == null || t.submit();
};
h.styles = [
  P`
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
  x({ attribute: !1 })
], h.prototype, "modalContext", 2);
r([
  m()
], h.prototype, "_icons", 2);
r([
  m()
], h.prototype, "_selectedPackage", 2);
h = r([
  O("modal-picker")
], h);
export {
  h as default
};
//# sourceMappingURL=modal-picker.element.js.map
