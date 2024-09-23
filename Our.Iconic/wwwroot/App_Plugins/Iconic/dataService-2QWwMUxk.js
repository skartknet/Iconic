class o {
  async loadCss(s) {
    try {
      var t = await fetch(s);
      if (t.ok)
        return t.text();
      throw new Error("CSS file not found");
    } catch (r) {
      throw r;
    }
  }
  async extractStyles(s, t, r) {
    var e = Object.assign({}, s);
    (!e.selector || e.selector.length <= 0) && r(), e.sourcefile || (e.sourcefile = e.cssfile);
    var c = await fetch(e.sourcefile);
    if (!c.ok) {
      r();
      return;
    }
    e.extractedStyles = [];
    for (var n = await c.text(), i = new RegExp(e.selector, "g"), a = i.exec(n); a !== null; )
      e.extractedStyles.push(a[1]), a = i.exec(n);
    e.extractedStyles.length > 0 ? t(e.extractedStyles) : r();
  }
  async loadPreconfigs() {
    var s = "/App_Plugins/Iconic/preconfigs.json", t = await fetch(s);
    return t.json();
  }
  async processCssFile(s, t) {
    if (!s || !t) return;
    var r = await this.loadCss(s);
    if (r === void 0)
      throw new Error("CSS file not found");
    const e = new CSSStyleSheet();
    e.replaceSync(r), document.adoptedStyleSheets = [...document.adoptedStyleSheets, e], t && (t.adoptedStyleSheets = [...t.adoptedStyleSheets, e]);
  }
  async processCssFiles(s, t) {
    if (!(!s || !t))
      for (const r of s)
        this.processCssFile(r, t);
  }
}
export {
  o as D
};
//# sourceMappingURL=dataService-2QWwMUxk.js.map
