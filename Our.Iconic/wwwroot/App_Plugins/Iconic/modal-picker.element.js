import { LitElement as x, html as d, nothing as k, unsafeHTML as O, css as $, property as I, state as _, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as z } from "@umbraco-cms/backoffice/element-api";
import { D as E } from "./dataService-w_RStjwn.js";
var F = Object.defineProperty, M = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, h = (e, t, i, c) => {
  for (var l = c > 1 ? void 0 : c ? M(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (l = (c ? r(t, i, l) : r(l)) || l);
  return c && l && F(t, i, l), l;
}, A = (e, t, i) => t.has(e) || b("Cannot " + i), D = (e, t, i) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), a = (e, t, i) => (A(e, t, "access private method"), i), s, y, f, C, S, w, m, P, p;
let o = class extends z(x) {
  constructor() {
    super(...arguments), D(this, s), this._value = [], this._multiSelect = !1, this._dataService = new E(), this._packages = [], this._packagesOptions = [], this._showFilteredOnly = !1, this._searchTerm = "", this._icons = [], this._filteredIcons = [];
  }
  connectedCallback() {
    var t, i, c, l, n, r, g;
    if (super.connectedCallback(), this._packages = ((t = this.modalContext) == null ? void 0 : t.data.packages) ?? [], this._packagesOptions = ((c = (i = this.modalContext) == null ? void 0 : i.data.packages) == null ? void 0 : c.map((u) => ({ name: u.name, value: u.id }))) ?? [], this._showFilteredOnly = ((l = this.modalContext) == null ? void 0 : l.data.showFilteredOnly) ?? !1, this._multiSelect = ((n = this.modalContext) == null ? void 0 : n.data.multiSelect) ?? !1, this._value = Array.from(((g = (r = this.modalContext) == null ? void 0 : r.getValue()) == null ? void 0 : g.icons) ?? []), this._packages && this._packages.length > 0) {
      var e = this._packages.findIndex((u) => {
        var v;
        return u.id == ((v = this._value[0]) == null ? void 0 : v.packageId);
      });
      this._selectedPackage = e >= 0 ? this._packages[e] : this._packages[0], e >= 0 ? this._packagesOptions[e].selected = !0 : this._packagesOptions[0].selected = !0, a(this, s, f).call(this).then(() => {
        a(this, s, p).call(this);
      });
    }
  }
  render() {
    return d`
            <umb-body-layout headline="Select Icons" style="height:95%;">  
                    
            ${this._packagesOptions.length > 1 ? d`                                
                    <uui-select .options=${this._packagesOptions}  @change="${a(this, s, C)}"></uui-select>                
            ` : ""}

            <uui-input @input="${a(this, s, P)}" placeholder="Search icons" clearable>
                <div slot="prepend">
                    <uui-icon-registry-essential>
                        <uui-icon name="search"></uui-icon>
                    </uui-icon-registry-essential>
                </div>
            </uui-input>

            ${this._filteredIcons.map((e) => {
      var t;
      return a(this, s, S).call(this, e) ? k : d`
                <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default" @click=${a(this, s, y)} label=${e} value=${e} title=${e}>
                        ${O((t = this._selectedPackage) == null ? void 0 : t.backofficeTemplate.replace("{icon}", e))}
                </uui-button>
            `;
    })}    
                                    
            </umb-body-layout>
            <umb-footer-layout>
                        ${this._multiSelect ? d`<uui-button slot="actions" label="Submit" @click="${a(this, s, m)}"></uui-button>` : k}                        
                        <uui-button slot="actions" label="Cancel" @click="${a(this, s, w)}"></uui-button>                        
            </umb-footer-layout> 
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
y = function(e) {
  var t = e.currentTarget.getAttribute("value");
  t && (this._multiSelect ? this._value.push({ packageId: this._selectedPackage.id, icon: t }) : this._value = [{ packageId: this._selectedPackage.id, icon: t }], e.currentTarget.setAttribute("disabled", "true"), this._multiSelect || a(this, s, m).call(this));
};
f = function() {
  return this._dataService.processCssFiles(this._packages.map((e) => e.cssfile), this.shadowRoot).then(() => {
    this._selectedPackage.filteredIcons.length > 0 && this._showFilteredOnly ? this._icons = this._selectedPackage.filteredIcons : this._icons = this._selectedPackage.extractedStyles;
  });
};
C = function(e) {
  var t = e.currentTarget.value;
  t && (this._selectedPackage = this._packages.find((i) => i.id === t), a(this, s, f).call(this).then(() => {
    a(this, s, p).call(this);
  }));
};
S = function(e) {
  return this._value.findIndex((t) => t.icon === e) >= 0;
};
w = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
m = function() {
  var e, t;
  (e = this.modalContext) == null || e.updateValue({ icons: this._value }), (t = this.modalContext) == null || t.submit();
};
P = function(e) {
  var t = e.target;
  this._searchTerm = t.value.trim().toLowerCase() || "", a(this, s, p).call(this);
};
p = function() {
  this._searchTerm ? this._filteredIcons = this._selectedPackage.extractedStyles.filter((e) => e.toLowerCase().includes(this._searchTerm)) : this._filteredIcons = this._icons;
};
o.styles = [
  $`
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
h([
  I({ attribute: !1 })
], o.prototype, "modalContext", 2);
h([
  _()
], o.prototype, "_icons", 2);
h([
  _()
], o.prototype, "_filteredIcons", 2);
h([
  _()
], o.prototype, "_selectedPackage", 2);
o = h([
  T("modal-picker")
], o);
export {
  o as default
};
//# sourceMappingURL=modal-picker.element.js.map
