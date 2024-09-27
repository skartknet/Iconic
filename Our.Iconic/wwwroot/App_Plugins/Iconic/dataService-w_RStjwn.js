class o {
  async loadCss(t) {
    try {
      var e = await fetch(t);
      if (e.ok)
        return e.text();
      throw new Error("CSS file not found");
    } catch (r) {
      throw r;
    }
  }
  async extractStyles(t) {
    var e = Object.assign({}, t);
    if (!e.selector || e.selector.length <= 0)
      return;
    e.sourcefile || (e.sourcefile = e.cssfile);
    let r;
    try {
      r = await fetch(e.sourcefile);
    } catch (n) {
      throw n;
    }
    if (r.ok) {
      e.extractedStyles = [];
      for (var s = await r.text(), c = new RegExp(e.selector, "g"), a = c.exec(s); a !== null; )
        e.extractedStyles.push(a[1]), a = c.exec(s);
      if (e.extractedStyles.length > 0)
        return e.extractedStyles;
    }
  }
  async loadPreconfigs() {
    var t = "/App_Plugins/Iconic/preconfigs.json", e = await fetch(t);
    return e.json();
  }
  async processCssFile(t, e) {
    if (!t || !e) return;
    var r = await this.loadCss(t);
    if (r === void 0)
      throw new Error("CSS file not found");
    const s = new CSSStyleSheet();
    s.replaceSync(r), document.adoptedStyleSheets = [...document.adoptedStyleSheets, s], e && (e.adoptedStyleSheets = [...e.adoptedStyleSheets, s]);
  }
  async processCssFiles(t, e) {
    if (!(!t || !e))
      for (const r of t)
        this.processCssFile(r, e);
  }
}
export {
  o as D
};
//# sourceMappingURL=dataService-w_RStjwn.js.map
