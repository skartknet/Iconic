import { LitElement as h, html as _, property as u, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
var C = Object.defineProperty, y = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, i = (t, e, a, o) => {
  for (var r = o > 1 ? void 0 : o ? y(e, a) : e, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (r = (o ? p(e, a, r) : p(r)) || r);
  return o && r && C(e, a, r), r;
}, x = (t, e, a) => e.has(t) || m("Cannot " + a), E = (t, e, a) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), c = (t, e, a) => (x(t, e, "access private method"), a), s, d, v;
let n = class extends b(h) {
  constructor() {
    super(...arguments), E(this, s);
  }
  render() {
    return _`
            <div>
                <button @click=${c(this, s, d)}>Cancel</button>
                <button @click=${c(this, s, v)}>Submit</button>
            </div>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
d = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
v = function() {
  var t, e;
  (t = this.modalContext) == null || t.updateValue({ value: "" }), (e = this.modalContext) == null || e.submit();
};
i([
  u({ attribute: !1 })
], n.prototype, "modalContext", 2);
i([
  u({ attribute: !1 })
], n.prototype, "value", 2);
i([
  u({ attribute: !1 })
], n.prototype, "data", 2);
n = i([
  f("modal-picker")
], n);
export {
  n as default
};
//# sourceMappingURL=modal-picker.element.js.map
