import { LitElement as B, html as k, nothing as U, unsafeHTML as C, css as W, property as $, state as n, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as L } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as j } from "@umbraco-cms/backoffice/modal";
import { D as V } from "./dataService-DAQWLY0h.js";
import { UmbStaticFilePickerContext as x } from "@umbraco-cms/backoffice/static-file";
import { ICONIC_MODALPICKER_TOKEN as G } from "./modal-picker.token.js";
class w {
  constructor() {
    this.id = this.uuid(), this.name = "", this.selector = "", this.template = "", this.cssfile = "", this.sourcefile = "", this.extractedStyles = [], this.filteredIcons = [];
  }
  uuid() {
    var t = "", i, a;
    for (i = 0; i < 32; i++)
      a = Math.random() * 16 | 0, (i == 8 || i == 12 || i == 16 || i == 20) && (t += "-"), t += (i == 12 ? 4 : i == 16 ? a & 3 | 8 : a).toString(16);
    return t;
  }
}
var K = Object.defineProperty, H = Object.getOwnPropertyDescriptor, I = (e) => {
  throw TypeError(e);
}, u = (e, t, i, a) => {
  for (var l = a > 1 ? void 0 : a ? H(t, i) : t, v = e.length - 1, b; v >= 0; v--)
    (b = e[v]) && (l = (a ? b(t, i, l) : b(l)) || l);
  return a && l && K(t, i, l), l;
}, S = (e, t, i) => t.has(e) || I("Cannot " + i), p = (e, t, i) => (S(e, t, "read from private field"), t.get(e)), f = (e, t, i) => t.has(e) ? I("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), y = (e, t, i, a) => (S(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (S(e, t, "access private method"), i), d, h, m, s, P, F, O, q, T, M, c, N, R, _, E, z, A, g;
let r = class extends L(B) {
  constructor() {
    super(), f(this, s), this.package = new w(), this.configType = "custom", this.errors = {}, this.preconfigsOptions = [], this.preconfigs = [], f(this, d), f(this, h), f(this, m), this._dataService = new V(), y(this, d, new x(this)), y(this, h, new x(this)), this._dataService.loadPreconfigs().then((e) => {
      this.preconfigs = e, this.preconfigsOptions = e.map((t) => ({ name: t.name, value: t.name }));
    }), this.consumeContext(j, (e) => {
      y(this, m, e);
    }), o(this, s, P).call(this);
  }
  connectedCallback() {
    var e, t;
    super.connectedCallback(), this.package = ((t = (e = this.modalContext) == null ? void 0 : e.data) == null ? void 0 : t.package) || new w(), o(this, s, g).call(this);
  }
  render() {
    return k`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form>   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${o(this, s, N)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? k`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${o(this, s, R)}"></uui-select>
                                </uui-form-layout-item>
                            ` : U}

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label" >Enter a name</uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${o(this, s, c)}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors["name.required"]}">
                                <p>Please enter a name for the package.</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="template" slot="label" >Backoffice template</uui-label>
                            <uui-input id="template" .value="${this.package.template}" @change="${o(this, s, c)}"  class="full-width" name="template" type="text"></uui-input>
                            <div ?hidden="${this.errors["template.required"]}">
                                <p>Please enter a template for the icon to display on the backoffice.</p>
                            </div>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${o(this, s, c)}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, T)}></uui-button>
                            </div>
                            <div ?hidden="${this.errors["cssfile.loaded"]}">
                                <p>The CSS file could not be loaded.</p>
                            </div>
                            <div ?hidden="${this.errors["cssfile.iconsfound"]}">
                                <p>No icons could be found.</p>
                            </div>
                        </uui-form-layout-item>
                    </uui-box>      
                    <uui-box headline="Rules">                            

                        <uui-form-layout-item>
                            <uui-label for="editSelector" slot="label">Selector</uui-label>
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${o(this, s, c)}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label">Source File</uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${o(this, s, c)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, M)}></uui-button>
                                <div ?hidden="${this.errors["name.required"]}">
                                    <p>A source file is required to extract the icons values.</p>
                                </div>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>

                        <div class="flex">
                            ${this.package.filteredIcons.map((e, t) => k`
                                <div class="icon-filter">                        
                                    <uui-button class="icon" compact label="icon" look="placeholder" type="button" color="default">
                                        ${C(o(this, s, _).call(this, e))}
                                    </uui-button>                                    
                                    <div @click="${() => o(this, s, z).call(this, t)}" class="icon-remove">
                                        Remove
                                    </div>
                                </div>
                            `)}
                                                                           
                            <uui-button class="icon icon-add" compact label="icon" look="placeholder" type="button" color="default" @click=${o(this, s, A)}>
                                Add
                            </uui-button>
                            
                        </div>

                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button class="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${C(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${o(this, s, E)}" ?disabled="${!this.package.cssfile}" state="${this.previewButtonState}"></uui-button>                            
                    
                        <div ?hidden="${this.errors["cssfile.required"]}">
                            <p>Please select a CSS file first.</p>
                        </div>
                    
                    </uui-box>
                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${o(this, s, O)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${o(this, s, q)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
P = function() {
  this.errors["name.required"] = !0, this.errors["template.required"] = !0, this.errors["cssfile.required"] = !0, this.errors["selector.required"] = !0, this.errors["sourcefile.required"] = !0, this.errors["cssfile.iconsfound"] = !0, this.errors["cssfile.loaded"] = !0;
};
F = function() {
  let e = !0;
  return this.package.name === "" && (this.errors["name.required"] = !1, e = !1), this.package.template === "" && (this.errors["template.required"] = !1, e = !1), this.package.cssfile === "" && (this.errors["cssfile.required"] = !1, e = !1), this.package.selector === "" && (this.errors["selector.required"] = !1, e = !1), this.package.sourcefile === "" && (this.errors["sourcefile.required"] = !1, e = !1), this.package.extractedStyles.length == 0 && (this.errors["cssfile.iconsfound"] = !1, e = !1), e;
};
O = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
q = function() {
  var e, t;
  o(this, s, F).call(this) && ((e = this.modalContext) == null || e.updateValue({ package: this.package }), (t = this.modalContext) == null || t.submit());
};
T = function() {
  var e, t;
  (e = p(this, d)) == null || e.selectedItems.subscribe(async (i) => {
    if (i.length === 0) return;
    let a = Object.assign({}, this.package);
    a.cssfile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a, o(this, s, g).call(this), this._dataService.extractStyles(
      this.package,
      (l) => {
        if (l.length === 0) {
          this.previewIcon = void 0, this.previewButtonState = "failed", this.errors["cssfile.iconsfound"] = !1;
          return;
        }
        this.package.extractedStyles = l, this.previewIconName = l[0], this.previewIcon = this.package.template.replace("{icon}", this.previewIconName), this.previewButtonState = "success";
      },
      () => {
        this.previewIcon = void 0, this.previewButtonState = "failed", this.errors["cssfile.loaded"] = !1;
      }
    );
  }), (t = p(this, d)) == null || t.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
M = function() {
  var e, t;
  (e = p(this, h)) == null || e.selectedItems.subscribe((i) => {
    let a = Object.assign({}, this.package);
    a.sourcefile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a;
  }), (t = p(this, h)) == null || t.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
c = function(e) {
  const t = e.target, i = t.name;
  var a = Object.assign({}, this.package);
  switch (i) {
    case "packageName":
      a.name = t.value;
      break;
    case "template":
      a.template = t.value;
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
  this.package = a;
};
N = function(e) {
  const t = e.target;
  this.configType = t.value;
};
R = function(e) {
  const t = e.target;
  let i = this.preconfigs.find((a) => a.name === t.value);
  i && (this.package = Object.assign(new w(), i));
};
_ = function(e) {
  return this.package.template.replace("{icon}", e);
};
E = function() {
  this.previewButtonState = "waiting", o(this, s, g).call(this), this.previewIconName = this.package.extractedStyles[0], this.previewIcon = o(this, s, _).call(this, this.previewIconName), this.previewButtonState = "success";
};
z = function(e) {
  let t = Object.assign({}, this.package);
  t.filteredIcons.splice(e, 1), this.package = t;
};
A = function() {
  var t;
  let e = (t = p(this, m)) == null ? void 0 : t.open(this, G, {
    data: {
      packages: [this.package],
      showFilteredOnly: !1
    }
  });
  e == null || e.onSubmit().then((i) => {
    if ((i == null ? void 0 : i.value) == null)
      return;
    let a = Object.assign([], this.package);
    a.filteredIcons = [...a.filteredIcons, i.value.icon], this.package = a;
  });
};
g = async function() {
  this.package.cssfile || (this.errors["preview.cssrequired"] = !1);
  var e = await this._dataService.loadCss(this.package.cssfile);
  if (e === void 0) {
    this.errors["cssfile.loaded"] = !1;
    return;
  }
  const t = new CSSStyleSheet();
  t.replaceSync(e), document.adoptedStyleSheets = [...document.adoptedStyleSheets, t], this.shadowRoot && (this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, t]);
};
r.styles = W`
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
       
    `;
u([
  $({ attribute: !1 })
], r.prototype, "modalContext", 2);
u([
  $({ attribute: !1 })
], r.prototype, "data", 2);
u([
  n()
], r.prototype, "package", 2);
u([
  n()
], r.prototype, "configType", 2);
u([
  n()
], r.prototype, "previewIcon", 2);
u([
  n()
], r.prototype, "errors", 2);
u([
  n()
], r.prototype, "previewButtonState", 2);
u([
  n()
], r.prototype, "previewIconName", 2);
r = u([
  D("add-package-modal")
], r);
export {
  r as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
