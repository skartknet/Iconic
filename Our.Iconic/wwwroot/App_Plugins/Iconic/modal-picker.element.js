import { LitElement as C, nothing as S, html as r, unsafeHTML as w, css as P, property as x, state as p, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { D as I } from "./dataService-w_RStjwn.js";
var T = Object.defineProperty, z = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, o = (e, t, a, n) => {
  for (var l = n > 1 ? void 0 : n ? z(t, a) : t, u = e.length - 1, d; u >= 0; u--)
    (d = e[u]) && (l = (n ? d(t, a, l) : d(l)) || l);
  return n && l && T(t, a, l), l;
}, E = (e, t, a) => t.has(e) || m("Cannot " + a), F = (e, t, a) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), s = (e, t, a) => (E(e, t, "access private method"), a), i, g, _, v, k, b, f, y, h;
let c = class extends $(C) {
  constructor() {
    super(...arguments), F(this, i), this._value = [], this._multiSelect = !1, this._dataService = new I(), this._packages = [], this._packagesOptions = [], this._showFilteredOnly = !1, this._searchTerm = "", this._icons = [], this._filteredIcons = [];
  }
  connectedCallback() {
    if (super.connectedCallback(), this._packages = this.modalContext?.data.packages ?? [], this._packagesOptions = this.modalContext?.data.packages?.map((t) => ({ name: t.name, value: t.id })) ?? [], this._showFilteredOnly = this.modalContext?.data.showFilteredOnly ?? !1, this._multiSelect = this.modalContext?.data.multiSelect ?? !1, this._value = Array.from(this.modalContext?.getValue()?.icons ?? []), this._packages && this._packages.length > 0) {
      var e = this._packages.findIndex((t) => t.id == this._value[0]?.packageId);
      this._selectedPackage = e >= 0 ? this._packages[e] : this._packages[0], e >= 0 ? this._packagesOptions[e].selected = !0 : this._packagesOptions[0].selected = !0, s(this, i, _).call(this).then(() => {
        s(this, i, h).call(this);
      });
    }
  }
  render() {
    return r`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                    
            ${this._packagesOptions.length > 1 ? r`                                
                    <uui-select .options=${this._packagesOptions}  @change="${s(this, i, v)}"></uui-select>                
            ` : ""}

            <uui-input @input="${s(this, i, y)}" placeholder="Search icons" clearable>
                <div slot="prepend">
                    <uui-icon-registry-essential>
                        <uui-icon name="search"></uui-icon>
                    </uui-icon-registry-essential>
                </div>
            </uui-input>

            ${this._filteredIcons.map((e) => r`
                <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" ?disabled=${s(this, i, k).call(this, e)} @click=${s(this, i, g)} label=${e} value=${e} title=${e}>
                        ${w(this._selectedPackage?.backofficeTemplate.replace("{icon}", e))}
                </uui-button>
            `)}    
                                    
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? r`<uui-button slot="actions" label="Submit" @click="${s(this, i, f)}"></uui-button>` : S}                        
                        <uui-button slot="actions" label="Cancel" @click="${s(this, i, b)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
i = /* @__PURE__ */ new WeakSet();
g = function(e) {
  var t = e.currentTarget.getAttribute("value");
  t && (this._multiSelect ? this._value.push({ packageId: this._selectedPackage.id, icon: t }) : this._value = [{ packageId: this._selectedPackage.id, icon: t }], e.currentTarget.setAttribute("disabled", "true"), this._multiSelect || s(this, i, f).call(this));
};
_ = function() {
  return this._dataService.processCssFiles(this._packages.map((e) => e.cssfile), this.shadowRoot).then(() => {
    this._selectedPackage.filteredIcons.length > 0 && this._showFilteredOnly ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
  });
};
v = function(e) {
  var t = e.currentTarget.value;
  t && (this._selectedPackage = this._packages.find((a) => a.id === t), s(this, i, _).call(this).then(() => {
    s(this, i, h).call(this);
  }));
};
k = function(e) {
  return this._value.findIndex((t) => t.icon === e) >= 0;
};
b = function() {
  this.modalContext?.submit();
};
f = function() {
  this.modalContext?.updateValue({ icons: this._value }), this.modalContext?.submit();
};
y = function(e) {
  var t = e.target;
  this._searchTerm = t.value.trim().toLowerCase() || "", s(this, i, h).call(this);
};
h = function() {
  this._searchTerm ? this._filteredIcons = this._selectedPackage.extractedStyles.filter((e) => e.toLowerCase().includes(this._searchTerm)) : this._filteredIcons = this._icons;
};
c.styles = [
  P`
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
        }

        uui-input {
            width: 100%;            
            margin-bottom: var(--uui-size-space-2);
        }
        `
];
o([
  x({ attribute: !1 })
], c.prototype, "modalContext", 2);
o([
  p()
], c.prototype, "_icons", 2);
o([
  p()
], c.prototype, "_filteredIcons", 2);
o([
  p()
], c.prototype, "_selectedPackage", 2);
c = o([
  O("modal-picker")
], c);
export {
  c as default
};
//# sourceMappingURL=modal-picker.element.js.map
