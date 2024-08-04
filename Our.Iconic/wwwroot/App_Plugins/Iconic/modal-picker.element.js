import { LitElement as s, html as u, property as d, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
var b = Object.defineProperty, c = Object.getOwnPropertyDescriptor, m = (t, e, n, a) => {
  for (var l = a > 1 ? void 0 : a ? c(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (l = (a ? r(e, n, l) : r(l)) || l);
  return a && l && b(e, n, l), l;
};
let o = class extends p(s) {
  _handleCancel() {
    var t;
    (t = this.modalContext) == null || t.submit();
  }
  _handleSubmit() {
    var t, e;
    (t = this.modalContext) == null || t.updateValue({ myData: "hello world" }), (e = this.modalContext) == null || e.submit();
  }
  render() {
    var t;
    return u`
            <div>
                <h1>${((t = this.modalContext) == null ? void 0 : t.data.headline) ?? "Default headline"}</h1>
                <button @click=${this._handleCancel}>Cancel</button>
                <button @click=${this._handleSubmit}>Submit</button>
            </div>
        `;
  }
};
m([
  d({ attribute: !1 })
], o.prototype, "modalContext", 2);
m([
  d({ attribute: !1 })
], o.prototype, "data", 2);
o = m([
  h("modal-picker")
], o);
export {
  o as default
};
//# sourceMappingURL=modal-picker.element.js.map
