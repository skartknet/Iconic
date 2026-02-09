import { LitElement as B, nothing as z, html as b, unsafeHTML as $, css as U, property as P, state as n, customElement as W } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as j } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as D } from "@umbraco-cms/backoffice/modal";
import { D as V } from "./dataService-w_RStjwn.js";
import { UmbStaticFilePickerInputContext as G } from "@umbraco-cms/backoffice/static-file";
import { ICONIC_MODALPICKER_TOKEN as K } from "./modal-picker.token.js";
import { UMB_NOTIFICATION_CONTEXT as X } from "@umbraco-cms/backoffice/notification";
class H {
  constructor(t, i) {
    this.icon = t || "", this.packageId = i || "";
  }
}
class w {
  constructor() {
    this.id = this.uuid(), this.name = "", this.selector = "", this.backofficeTemplate = "", this.frontendTemplate = "", this.cssfile = "", this.sourcefile = "", this.extractedStyles = [], this.filteredIcons = [];
  }
  uuid() {
    var t = "", i, o;
    for (i = 0; i < 32; i++)
      o = Math.random() * 16 | 0, (i == 8 || i == 12 || i == 16 || i == 20) && (t += "-"), t += (i == 12 ? 4 : i == 16 ? o & 3 | 8 : o).toString(16);
    return t;
  }
}
var J = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, I = (e) => {
  throw TypeError(e);
}, l = (e, t, i, o) => {
  for (var u = o > 1 ? void 0 : o ? Q(t, i) : t, g = e.length - 1, k; g >= 0; g--)
    (k = e[g]) && (u = (o ? k(t, i, u) : k(u)) || u);
  return o && u && J(t, i, u), u;
}, S = (e, t, i) => t.has(e) || I("Cannot " + i), c = (e, t, i) => (S(e, t, "read from private field"), t.get(e)), h = (e, t, i) => t.has(e) ? I("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), y = (e, t, i, o) => (S(e, t, "write to private field"), t.set(e, i), i), s = (e, t, i) => (S(e, t, "access private method"), i), d, m, f, a, C, _, F, N, x, O, E, p, M, R, T, v, A, L, q;
let r = class extends j(B) {
  constructor() {
    super(), h(this, a), this.package = new w(), this.configType = "custom", this.errors = {}, this._isCssLoaded = !1, this.preconfigsOptions = [], this.preconfigs = [], h(this, d), h(this, m), h(this, f), this._dataService = new V(), y(this, d, new G(this)), this._dataService.loadPreconfigs().then((e) => {
      this.preconfigs = e, this.preconfigsOptions = e.map((t) => ({ name: t.name, value: t.name }));
    }), this.consumeContext(D, (e) => {
      y(this, m, e);
    }), this.consumeContext(X, (e) => {
      y(this, f, e);
    }), s(this, a, C).call(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.package = this.modalContext?.data?.package || new w(), s(this, a, v).call(this);
  }
  render() {
    return b`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form>   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${s(this, a, M)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? b`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${s(this, a, R)}"></uui-select>
                                </uui-form-layout-item>
                            ` : z}       

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label"><span class="required">Enter a name</span></uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${s(this, a, p)}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors.name == null}">
                                <p class="error">${this.errors.name}</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" ><span class="required">Backoffice template</span></uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.backofficeTemplate}" @change="${s(this, a, p)}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                            <div ?hidden="${this.errors.backofficeTemplate == null}">
                                <p class="error">${this.errors.backofficeTemplate}</p>
                            </div>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="frontendTemplate" slot="label" >Frontend template</uui-label>
                            <uui-input id="frontendTemplate" .value="${this.package.frontendTemplate}" @change="${s(this, a, p)}"  class="full-width" name="frontendTemplate" type="text"></uui-input>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label"><span class="required">CSS File</span></uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${s(this, a, p)}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" look="primary" label="Select" @click=${s(this, a, O)}></uui-button>
                            </div>
                            <div ?hidden="${this.errors.cssfile == null}">
                                <p class="error">${this.errors.cssfile}</p>
                            </div>                            
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label"><span class="required">Selector</span></uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${s(this, a, p)}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label"><span class="required">Source File</span></uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${s(this, a, p)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" look="primary" label="Select" @click=${s(this, a, E)}></uui-button>
                            </div>
                            <div ?hidden="${this.errors.sourcefile == null}">
                                <p class="error">${this.errors.sourcefile}</p>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button class="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${$(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${s(this, a, v)}" ?disabled="${!this.package.extractedStyles}" state="${this.previewButtonState}"></uui-button>                            
                    
                        <div ?hidden="${this.errors.cssfile == null}">
                            <p class="error">${this.errors.cssfile}</p>
                        </div>                        
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                        <div class="flex flex-wrap">
                            ${this.package.filteredIcons.map((e, t) => b`
                                <div class="icon-filter">                        
                                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default">
                                        ${$(s(this, a, T).call(this, e))}
                                    </uui-button>                                    
                                    <div @click="${() => s(this, a, A).call(this, t)}" class="icon-remove">
                                        Remove
                                    </div>
                                </div>
                            `)}
                                                                           
                            <uui-button class="icon icon-add" compact label="icon" look="placeholder" type="button" color="default" @click=${s(this, a, L)}>
                                Add
                            </uui-button>
                            
                        </div>

                    </uui-box>


                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${s(this, a, F)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${s(this, a, N)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
C = function() {
  let e = Object.assign({}, this.errors);
  e.name = void 0, e.backofficeTemplate = void 0, e.cssfile = void 0, e.selector = void 0, e.sourcefile = void 0, e.cssfile = void 0, e.cssfile = void 0, this.errors = e;
};
_ = function() {
  let e = !0, t = Object.assign({}, this.errors);
  return this.package.name === "" && (t.name = "Name is required", e = !1), this.package.backofficeTemplate === "" && (t.backofficeTemplate = "A backoffice template is required", e = !1), this.package.cssfile === "" && (t.cssfile = "A CSS file is required", e = !1), this.package.selector === "" && (t.selector = "A selector pattern is required", e = !1), this.package.sourcefile === "" && (t.sourcefile = "An icons source file is required", e = !1), this.package.extractedStyles.length == 0 && (t.sourcefile = "No icons found in the source file", e = !1), this.errors = t, e;
};
F = function() {
  this.modalContext?.submit();
};
N = function() {
  if (!s(this, a, _).call(this)) {
    c(this, f)?.peek("danger", {
      data: { message: "Please review the errors on the form." }
    });
    return;
  }
  this.modalContext?.updateValue({ package: this.package }), this.modalContext?.submit();
};
x = function() {
  this._dataService.extractStyles(this.package).then(
    (e) => {
      if (e == null || e.length === 0) {
        this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed", this.errors.sourcefile = "No icons found in the source file";
        return;
      } else
        this.package.extractedStyles = e, this.errors.sourcefile = void 0, s(this, a, v).call(this);
    },
    (e) => {
      this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed", c(this, f)?.peek("danger", {
        data: {
          message: "Error reading the file. " + e
        }
      });
    }
  );
};
O = function() {
  c(this, d)?.selectedItems.subscribe(async (e) => {
    if (this.openedPickerName != "cssFilePicker" || e.length === 0) return;
    let t = Object.assign({}, this.package);
    var i = decodeURIComponent(e[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
    i !== this.package.cssfile && (this._isCssLoaded = !1, t.cssfile = i, this.package = t, this.openedPickerName = void 0);
  }), this.openedPickerName = "cssFilePicker", c(this, d)?.openPicker({
    foldersOnly: !1,
    multiple: !1,
    hideTreeRoot: !0,
    filter: (e) => e.name.endsWith(".css"),
    pickableFilter: (e) => e.name.endsWith(".css")
  });
};
E = function() {
  c(this, d)?.selectedItems.subscribe((e) => {
    if (this.openedPickerName != "sourceFilePicker" || e.length === 0) return;
    let t = Object.assign({}, this.package);
    var i = decodeURIComponent(e[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/");
    i !== this.package.sourcefile && (t.sourcefile = i, this.package = t, s(this, a, x).call(this), this.openedPickerName = void 0);
  }), this.openedPickerName = "sourceFilePicker", c(this, d)?.openPicker({
    foldersOnly: !1,
    multiple: !1,
    hideTreeRoot: !0,
    filter: (e) => e.name.endsWith(".css"),
    pickableFilter: (e) => e.name.endsWith(".css")
  });
};
p = function(e) {
  const t = e.target, i = t.name;
  var o = Object.assign({}, this.package);
  switch (i) {
    case "packageName":
      o.name = t.value;
      break;
    case "backofficeTemplate":
      o.backofficeTemplate = t.value;
      break;
    case "frontendTemplate":
      o.frontendTemplate = t.value;
      break;
    case "editCssFile":
      o.cssfile = t.value;
      break;
    case "editSelector":
      o.selector = t.value;
      break;
    case "editSourceFile":
      o.sourcefile = t.value;
      break;
  }
  this.package = o, s(this, a, C).call(this), s(this, a, _).call(this), s(this, a, x).call(this);
};
M = function(e) {
  const t = e.target;
  this.configType = t.value;
};
R = function(e) {
  const t = e.target;
  let i = this.preconfigs.find((o) => o.name === t.value);
  i && (this.package = Object.assign(new w(), i));
};
T = function(e) {
  return this.package.backofficeTemplate.replace("{icon}", e);
};
v = function() {
  if (this.previewButtonState = "waiting", this.package.extractedStyles.length === 0) {
    this.previewButtonState = "failed";
    return;
  }
  s(this, a, q).call(this).then(() => {
    if (this.previewIconName = this.package.extractedStyles[0], this.package.backofficeTemplate === void 0) {
      c(this, f)?.peek("danger", {
        data: { message: "Please review the errors on the form." }
      }), this.previewButtonState = "failed";
      return;
    }
    this.previewIcon = s(this, a, T).call(this, this.previewIconName), this.previewButtonState = "success";
  }).catch(() => {
    this.previewIconName = void 0, this.previewIcon = void 0, this.previewButtonState = "failed";
  });
};
A = function(e) {
  let t = Object.assign({}, this.package);
  t.filteredIcons.splice(e, 1), this.package = t;
};
L = function() {
  c(this, m)?.open(this, K, {
    data: {
      packages: [this.package],
      showFilteredOnly: !1,
      multiSelect: !0
    },
    value: {
      icons: this.package.filteredIcons.map((t) => {
        var i = new H(t, this.package.id);
        return i;
      })
    }
  })?.onSubmit().then((t) => {
    if (t?.icons == null)
      return;
    let i = Object.assign([], this.package);
    i.filteredIcons = t.icons.map((o) => o.icon), this.package = i;
  });
};
q = async function() {
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
r.styles = U`
        uui-box {
            margin-top: var(--uui-size-layout-1);            
        }

        .full-width{
            width: 100%;
        }

        .flex {
            display: flex;
        }

        .flex-wrap {
            flex-wrap: wrap;
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
l([
  P({ attribute: !1 })
], r.prototype, "modalContext", 2);
l([
  P({ attribute: !1 })
], r.prototype, "data", 2);
l([
  n()
], r.prototype, "package", 2);
l([
  n()
], r.prototype, "configType", 2);
l([
  n()
], r.prototype, "previewIcon", 2);
l([
  n()
], r.prototype, "errors", 2);
l([
  n()
], r.prototype, "previewButtonState", 2);
l([
  n()
], r.prototype, "previewIconName", 2);
l([
  n()
], r.prototype, "_isCssLoaded", 2);
l([
  n()
], r.prototype, "openedPickerName", 2);
r = l([
  W("add-package-modal")
], r);
export {
  r as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
