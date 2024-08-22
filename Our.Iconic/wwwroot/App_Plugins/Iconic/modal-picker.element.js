import { LitElement as p, html as u, property as m, state as c, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as d } from "@umbraco-cms/backoffice/element-api";
import { P as b } from "./models-u6n50sPP.js";
var f = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, r = (t, e, n, l) => {
  for (var a = l > 1 ? void 0 : l ? _(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (a = (l ? s(e, n, a) : s(a)) || a);
  return l && a && f(e, n, a), a;
};
let o = class extends d(p) {
  constructor() {
    super(...arguments), this.package = new b();
  }
  _handleCancel() {
    var t;
    (t = this.modalContext) == null || t.submit();
  }
  _handleSubmit() {
    var t, e;
    (t = this.modalContext) == null || t.updateValue({ package: this.package }), (e = this.modalContext) == null || e.submit();
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
r([
  m({ attribute: !1 })
], o.prototype, "modalContext", 2);
r([
  m({ attribute: !1 })
], o.prototype, "value", 2);
r([
  c()
], o.prototype, "package", 2);
o = r([
  h("modal-picker")
], o);
export {
  o as default
};
//# sourceMappingURL=modal-picker.element.js.map
