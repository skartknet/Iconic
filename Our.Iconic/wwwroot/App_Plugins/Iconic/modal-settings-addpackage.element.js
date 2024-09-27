import { LitElement as U, html as S, nothing as W, unsafeHTML as I, css as j, property as P, state as p, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as V } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as G } from "@umbraco-cms/backoffice/modal";
import { D as K } from "./dataService-w_RStjwn.js";
import { UmbStaticFilePickerContext as O } from "@umbraco-cms/backoffice/static-file";
import { ICONIC_MODALPICKER_TOKEN as X } from "./modal-picker.token.js";
import { UMB_NOTIFICATION_CONTEXT as H } from "@umbraco-cms/backoffice/notification";
class J {
  constructor(t, i) {
    this.icon = t || "", this.packageId = i || "";
  }
}
class _ {
  constructor() {
    this.id = this.uuid(), this.name = "", this.selector = "", this.backofficeTemplate = "", this.frontendTemplate = "", this.cssfile = "", this.sourcefile = "", this.extractedStyles = [], this.filteredIcons = [];
  }
  uuid() {
    var t = "", i, a;
    for (i = 0; i < 32; i++)
      a = Math.random() * 16 | 0, (i == 8 || i == 12 || i == 16 || i == 20) && (t += "-"), t += (i == 12 ? 4 : i == 16 ? a & 3 | 8 : a).toString(16);
    return t;
  }
}
var Q = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, F = (e) => {
  throw TypeError(e);
}, c = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? Y(t, i) : t, y = e.length - 1, w; y >= 0; y--)
    (w = e[y]) && (r = (a ? w(t, i, r) : w(r)) || r);
  return a && r && Q(t, i, r), r;
}, C = (e, t, i) => t.has(e) || F("Cannot " + i), n = (e, t, i) => (C(e, t, "read from private field"), t.get(e)), h = (e, t, i) => t.has(e) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), v = (e, t, i, a) => (C(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (C(e, t, "access private method"), i), f, m, g, d, s, x, T, N, E, k, M, A, u, L, q, $, b, R, B, z;
let l = class extends V(U) {
  constructor() {
    super(), h(this, s), this.package = new _(), this.configType = "custom", this.errors = {}, this._isCssLoaded = !1, this.preconfigsOptions = [], this.preconfigs = [], h(this, f), h(this, m), h(this, g), h(this, d), this._dataService = new K(), v(this, f, new O(this)), v(this, m, new O(this)), this._dataService.loadPreconfigs().then((e) => {
      this.preconfigs = e, this.preconfigsOptions = e.map((t) => ({ name: t.name, value: t.name }));
    }), this.consumeContext(G, (e) => {
      v(this, g, e);
    }), this.consumeContext(H, (e) => {
      v(this, d, e);
    }), o(this, s, x).call(this);
  }
  connectedCallback() {
    var e, t;
    super.connectedCallback(), this.package = ((t = (e = this.modalContext) == null ? void 0 : e.data) == null ? void 0 : t.package) || new _(), o(this, s, b).call(this);
  }
  render() {
    return S`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form>   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${o(this, s, L)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? S`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${o(this, s, q)}"></uui-select>
                                </uui-form-layout-item>
                            ` : W}       

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label"><span class="required">Enter a name</span></uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${o(this, s, u)}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors.name == null}">
                                <p class="error">${this.errors.name}</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" ><span class="required">Backoffice template</span></uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.backofficeTemplate}" @change="${o(this, s, u)}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                            <div ?hidden="${this.errors.backofficeTemplate == null}">
                                <p class="error">${this.errors.backofficeTemplate}</p>
                            </div>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="frontendTemplate" slot="label" >Frontend template</uui-label>
                            <uui-input id="frontendTemplate" .value="${this.package.frontendTemplate}" @change="${o(this, s, u)}"  class="full-width" name="frontendTemplate" type="text"></uui-input>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label"><span class="required">CSS File</span></uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${o(this, s, u)}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, M)}></uui-button>
                            </div>
                            <div ?hidden="${this.errors.cssfile == null}">
                                <p class="error">${this.errors.cssfile}</p>
                            </div>                            
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label"><span class="required">Selector</span></uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${o(this, s, u)}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label"><span class="required">Source File</span></uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${o(this, s, u)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, A)}></uui-button>
                                <div ?hidden="${this.errors.sourcefile == null}">
                                    <p class="error">${this.errors.sourcefile}</p>
                                </div>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button class="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${I(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${o(this, s, b)}" ?disabled="${!this.package.extractedStyles}" state="${this.previewButtonState}"></uui-button>                            
                    
                        <div ?hidden="${this.errors.cssfile == null}">
                            <p class="error">${this.errors.cssfile}</p>
                        </div>                        
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                        <div class="flex">
                            ${this.package.filteredIcons.map((e, t) => S`
                                <div class="icon-filter">                        
                                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default">
                                        ${I(o(this, s, $).call(this, e))}
                                    </uui-button>                                    
                                    <div @click="${() => o(this, s, R).call(this, t)}" class="icon-remove">
                                        Remove
                                    </div>
                                </div>
                            `)}
                                                                           
                            <uui-button class="icon icon-add" compact label="icon" look="placeholder" type="button" color="default" @click=${o(this, s, B)}>
                                Add
                            </uui-button>
                            
                        </div>

                    </uui-box>


                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${o(this, s, N)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${o(this, s, E)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
f = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
x = function() {
  let e = Object.assign({}, this.errors);
  e.name = void 0, e.backofficeTemplate = void 0, e.cssfile = void 0, e.selector = void 0, e.sourcefile = void 0, e.cssfile = void 0, e.cssfile = void 0, this.errors = e;
};
T = function() {
  let e = !0, t = Object.assign({}, this.errors);
  return this.package.name === "" && (t.name = "Name is required", e = !1), this.package.backofficeTemplate === "" && (t.backofficeTemplate = "A backoffice template is required", e = !1), this.package.cssfile === "" && (t.cssfile = "A CSS file is required", e = !1), this.package.selector === "" && (t.selector = "A selector pattern is required", e = !1), this.package.sourcefile === "" && (t.sourcefile = "An icons source file is required", e = !1), this.package.extractedStyles.length == 0 && (t.sourcefile = "No icons found in the source file", e = !1), this.errors = t, e;
};
N = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
E = function() {
  var e, t, i;
  if (!o(this, s, T).call(this)) {
    (e = n(this, d)) == null || e.peek("danger", {
      data: { message: "Please review the errors on the form." }
    });
    return;
  }
  (t = this.modalContext) == null || t.updateValue({ package: this.package }), (i = this.modalContext) == null || i.submit();
};
k = function() {
  this._dataService.extractStyles(this.package).then(
    (e) => {
      if (e == null || e.length === 0) {
        this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed", this.errors.sourcefile = "No icons found in the source file";
        return;
      } else
        this.package.extractedStyles = e, o(this, s, b).call(this);
    },
    (e) => {
      var t;
      this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed", (t = n(this, d)) == null || t.peek("danger", {
        data: {
          message: "Error reading the file. " + e
        }
      });
    }
  );
};
M = function() {
  var e, t;
  (e = n(this, f)) == null || e.selectedItems.subscribe(async (i) => {
    if (i.length === 0) return;
    let a = Object.assign({}, this.package);
    var r = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
    r !== this.package.cssfile && (this._isCssLoaded = !1, a.cssfile = r, this.package = a, o(this, s, k).call(this));
  }), (t = n(this, f)) == null || t.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
A = function() {
  var e, t;
  (e = n(this, m)) == null || e.selectedItems.subscribe((i) => {
    let a = Object.assign({}, this.package);
    var r = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
    r !== this.package.sourcefile && (a.sourcefile = r, this.package = a, o(this, s, k).call(this));
  }), (t = n(this, m)) == null || t.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
u = function(e) {
  const t = e.target, i = t.name;
  var a = Object.assign({}, this.package);
  switch (i) {
    case "packageName":
      a.name = t.value;
      break;
    case "backofficeTemplate":
      a.backofficeTemplate = t.value;
      break;
    case "frontendTemplate":
      a.frontendTemplate = t.value;
      break;
    case "editCssFile":
      a.cssfile = t.value;
      break;
    case "editSelector":
      a.selector = t.value;
      break;
    case "editSourceFile":
      a.sourcefile = t.value;
      break;
  }
  this.package = a, o(this, s, x).call(this), o(this, s, T).call(this), o(this, s, k).call(this);
};
L = function(e) {
  const t = e.target;
  this.configType = t.value;
};
q = function(e) {
  const t = e.target;
  let i = this.preconfigs.find((a) => a.name === t.value);
  i && (this.package = Object.assign(new _(), i));
};
$ = function(e) {
  return this.package.backofficeTemplate.replace("{icon}", e);
};
b = function() {
  if (this.previewButtonState = "waiting", this.package.extractedStyles.length === 0) {
    this.previewButtonState = "failed";
    return;
  }
  o(this, s, z).call(this).then(() => {
    var e;
    if (this.previewIconName = this.package.extractedStyles[0], this.package.backofficeTemplate === void 0) {
      (e = n(this, d)) == null || e.peek("danger", {
        data: { message: "Please review the errors on the form." }
      }), this.previewButtonState = "failed";
      return;
    }
    this.previewIcon = o(this, s, $).call(this, this.previewIconName), this.previewButtonState = "success";
  }).catch(() => {
    this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed";
  });
};
R = function(e) {
  let t = Object.assign({}, this.package);
  t.filteredIcons.splice(e, 1), this.package = t;
};
B = function() {
  var t;
  let e = (t = n(this, g)) == null ? void 0 : t.open(this, X, {
    data: {
      packages: [this.package],
      showFilteredOnly: !1,
      multiSelect: !0
    },
    value: {
      icons: this.package.filteredIcons.map((i) => {
        var a = new J(i, this.package.id);
        return a;
      })
    }
  });
  e == null || e.onSubmit().then((i) => {
    if ((i == null ? void 0 : i.icons) == null)
      return;
    let a = Object.assign([], this.package);
    a.filteredIcons = i.icons.map((r) => r.icon), this.package = a;
  });
};
z = async function() {
  this.package.cssfile || (this._isCssLoaded = !1, this.errors.cssfile = "Select a valid CSS file");
  var e = await this._dataService.loadCss(this.package.cssfile);
  if (e === void 0) {
    this._isCssLoaded = !1, this.errors.cssfile = "Error loading the CSS file";
    return;
  }
  if (this._isCssLoaded === !1) {
    const t = new CSSStyleSheet();
    t.replaceSync(e), document.adoptedStyleSheets = [...document.adoptedStyleSheets, t], this.shadowRoot && (this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, t], this._isCssLoaded = !0);
  }
};
l.styles = j`
        uui-box {
            margin-top: var(--uui-size-layout-1);            
        }

        .full-width{
            width: 100%;
        }

        .flex {
            display: flex;
        }

        .flex-column {
            flex-direction: column;
        }

        .icon-filter{
            display: flex;
            flex-direction: column;
            margin-right: var(--uui-size-space-1);
            margin-bottom: var(--uui-size-space-2);
        }

        .icon-remove{
            font-size: var(--uui-size-4); 
            cursor: pointer;           
        }

        .icon-remove:hover{
            text-decoration: underline;
        }

        
        .icon{
            font-size: var(--uui-size-8);
            height: 55px;
            width: 55px;
            margin-right: var(--uui-size-space-1);
            margin-bottom: 0;
        }

        .icon-add{
            font-size: var(--uui-size-5);
        }
       
        .error{
            padding: var(--uui-size-space-3);      
            background-color: var(--uui-color-danger);  
            color: var(--uui-color-danger-contrast);    
        }       
        .required::after {
            content: '*';    
        }
    `;
c([
  P({ attribute: !1 })
], l.prototype, "modalContext", 2);
c([
  P({ attribute: !1 })
], l.prototype, "data", 2);
c([
  p()
], l.prototype, "package", 2);
c([
  p()
], l.prototype, "configType", 2);
c([
  p()
], l.prototype, "previewIcon", 2);
c([
  p()
], l.prototype, "errors", 2);
c([
  p()
], l.prototype, "previewButtonState", 2);
c([
  p()
], l.prototype, "previewIconName", 2);
c([
  p()
], l.prototype, "_isCssLoaded", 2);
l = c([
  D("add-package-modal")
], l);
export {
  l as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
