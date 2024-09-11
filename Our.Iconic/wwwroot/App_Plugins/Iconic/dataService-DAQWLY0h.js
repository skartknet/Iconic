class o {
  async loadCss(e) {
    var t = await fetch(e);
    if (t.ok)
      return t.text();
    throw new Error("CSS file not found");
  }
  async extractStyles(e, t, s) {
    (!e.selector || e.selector.length <= 0) && s(), e.sourcefile || (e.sourcefile = e.cssfile);
    var r = await fetch(e.sourcefile);
    if (!r.ok) {
      s();
      return;
    }
    e.extractedStyles = [];
    for (var c = await r.text(), n = new RegExp(e.selector, "g"), a = n.exec(c); a !== null; )
      e.extractedStyles.push(a[1]), a = n.exec(c);
    e.extractedStyles.length > 0 ? t(e.extractedStyles) : s();
  }
  async loadPreconfigs() {
    var e = "/App_Plugins/Iconic/preconfigs.json", t = await fetch(e);
    return t.json();
  }
  async processCssFile(e, t) {
    if (!e || !t) return;
    var s = await this.loadCss(e);
    if (s === void 0)
      throw new Error("CSS file not found");
    const r = new CSSStyleSheet();
    r.replaceSync(s), document.adoptedStyleSheets = [...document.adoptedStyleSheets, r], t && (t.adoptedStyleSheets = [...t.adoptedStyleSheets, r]);
  }
  async processCssFiles(e, t) {
    if (!(!e || !t))
      for (const s of e)
        this.processCssFile(s, t);
  }
}
export {
  o as D
};
//# sourceMappingURL=dataService-DAQWLY0h.js.map
