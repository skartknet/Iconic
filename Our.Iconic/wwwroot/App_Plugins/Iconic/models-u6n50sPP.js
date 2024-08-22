class r {
  constructor() {
    this.id = this.uuid(), this.name = "", this.selector = "", this.template = "", this.cssfile = "", this.sourcefile = "", this.extractedStyles = [], this.filteredIcons = [];
  }
  uuid() {
    var i = "", t, s;
    for (t = 0; t < 32; t++)
      s = Math.random() * 16 | 0, (t == 8 || t == 12 || t == 16 || t == 20) && (i += "-"), i += (t == 12 ? 4 : t == 16 ? s & 3 | 8 : s).toString(16);
    return i;
  }
}
export {
  r as P
};
//# sourceMappingURL=models-u6n50sPP.js.map
