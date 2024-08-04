import { property as c, customElement as u, LitElement as v, html as m } from "@umbraco-cms/backoffice/external/lit";
var a = Object.defineProperty, f = Object.getOwnPropertyDescriptor, i = (p, t, s, r) => {
  for (var e = r > 1 ? void 0 : r ? f(t, s) : t, n = p.length - 1, l; n >= 0; n--)
    (l = p[n]) && (e = (r ? l(t, s, e) : l(e)) || e);
  return r && e && a(t, s, e), e;
};
let o = class extends v {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return m`
      <div>settings here</div>
    `;
  }
};
i([
  c({ type: String })
], o.prototype, "value", 2);
o = i([
  u("iconic-settings-element")
], o);
export {
  o as default
};
//# sourceMappingURL=settings.element.js.map
