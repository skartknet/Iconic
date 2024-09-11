import { LitElement as R, html as y, nothing as z, unsafeHTML as M, ifDefined as U, css as B, property as _, state as n, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as W } from "@umbraco-cms/backoffice/element-api";
import { D as A } from "./dataService-DAQWLY0h.js";
import { UmbStaticFilePickerContext as w } from "@umbraco-cms/backoffice/static-file";
class b {
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
var D = Object.defineProperty, L = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, c = (e, t, i, a) => {
  for (var l = a > 1 ? void 0 : a ? L(t, i) : t, m = e.length - 1, v; m >= 0; m--)
    (v = e[m]) && (l = (a ? v(t, i, l) : v(l)) || l);
  return a && l && D(t, i, l), l;
}, k = (e, t, i) => t.has(e) || C("Cannot " + i), h = (e, t, i) => (k(e, t, "read from private field"), t.get(e)), g = (e, t, i) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), S = (e, t, i, a) => (k(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (k(e, t, "access private method"), i), d, p, s, x, $, F, P, I, q, u, O, T, N, f;
let r = class extends W(R) {
  constructor() {
    super(), g(this, s), this.package = new b(), this.configType = "custom", this.errors = {}, this.preconfigsOptions = [], this.preconfigs = [], g(this, d), g(this, p), this._dataService = new A(), S(this, d, new w(this)), S(this, p, new w(this)), this._dataService.loadPreconfigs().then((e) => {
      this.preconfigs = e, this.preconfigsOptions = e.map((t) => ({ name: t.name, value: t.name }));
    }), o(this, s, x).call(this);
  }
  connectedCallback() {
    var e, t;
    super.connectedCallback(), this.package = ((t = (e = this.modalContext) == null ? void 0 : e.data) == null ? void 0 : t.package) || new b(), o(this, s, f).call(this);
  }
  render() {
    return y`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form class="our-iconic__form">   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${o(this, s, O)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? y`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${o(this, s, T)}"></uui-select>
                                </uui-form-layout-item>
                            ` : z}

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label" >Enter a name</uui-label>
                            <uui-input id="packageName" .value="${this.package.name}" @change="${o(this, s, u)}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors["name.required"]}">
                                <p>Please enter a name for the package.</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="template" slot="label" >Backoffice template</uui-label>
                            <uui-input id="template" .value="${this.package.template}" @change="${o(this, s, u)}"  class="full-width" name="template" type="text"></uui-input>
                            <div ?hidden="${this.errors["template.required"]}">
                                <p>Please enter a template for the icon to display on the backoffice.</p>
                            </div>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}" @change="${o(this, s, u)}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, I)}></uui-button>
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
                            <uui-input id="editSelector" .value="${this.package.selector}" @change="${o(this, s, u)}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label">Source File</uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}" @change="${o(this, s, u)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${o(this, s, q)}></uui-button>
                                <div ?hidden="${this.errors["name.required"]}">
                                    <p>A source file is required to extract the icons values.</p>
                                </div>
                            </div>
                        </uui-form-layout-item>                
                                
                    </uui-box>

                    <uui-box headline="Filters">
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                    <!-- <fieldset class="filters">
                    <legend>
                        <p>Filter</p>
                        <small>Use it to make available just specific icons, instead of the whole set. Leave blank to make all icons available.</small>
                    </legend>
                    <div ng-show="packageForm.$valid" class="flex our-iconic__container">
                        <div ng-repeat="filteredIcon in model.package.filteredIcons">
                            <div class="umb-panel-header-icon -placeholder" title="{{filteredIcon}}">
                                <iconic-icon package="model.package" icon="filteredIcon">
                                </iconic-icon>
                            </div>
                            <button ng-click="removeFilteredIcon($index)" class="button-remove" prevent-default>
                                <localize key="general_remove" class="ng-isolate-scope">Remove</localize>
                            </button>
                        </div>

                        <div class="umb-panel-header-icon" ng-click="openFilterIconsOverlay()">
                            <localize key="general_add" class="ng-isolate-scope" style="font-size: 1rem;">Add</localize>
                            <iconic-icon></iconic-icon>
                        </div>
                        </div>
                        <div ng-hide="packageForm.$valid">
                            <p>Package configuration is not valid.</p>
                        </div>
                    </fieldset> -->
                    </uui-box>

                    <uui-box headline="Preview">
                         
                        <div>
                            <uui-button id="icon" compact label="icon" look="placeholder" ?disabled="${!this.previewIcon}" type="button" color="default">
                                ${M(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${o(this, s, N)}" ?disabled="${!this.package.cssfile}" state="${U(this.previewButtonState)}"></uui-button>                            
                    
                        <div ?hidden="${this.errors["cssfile.required"]}">
                            <p>Please select a CSS file first.</p>
                        </div>
                    
                    </uui-box>
                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${o(this, s, F)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${o(this, s, P)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
x = function() {
  this.errors["name.required"] = !0, this.errors["template.required"] = !0, this.errors["cssfile.required"] = !0, this.errors["selector.required"] = !0, this.errors["sourcefile.required"] = !0, this.errors["cssfile.iconsfound"] = !0, this.errors["cssfile.loaded"] = !0;
};
$ = function() {
  let e = !0;
  return this.package.name === "" && (this.errors["name.required"] = !1, e = !1), this.package.template === "" && (this.errors["template.required"] = !1, e = !1), this.package.cssfile === "" && (this.errors["cssfile.required"] = !1, e = !1), this.package.selector === "" && (this.errors["selector.required"] = !1, e = !1), this.package.sourcefile === "" && (this.errors["sourcefile.required"] = !1, e = !1), this.package.extractedStyles.length == 0 && (this.errors["cssfile.iconsfound"] = !1, e = !1), e;
};
F = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
P = function() {
  var e, t;
  o(this, s, $).call(this) && ((e = this.modalContext) == null || e.updateValue({ package: this.package }), (t = this.modalContext) == null || t.submit());
};
I = function() {
  var e, t;
  (e = h(this, d)) == null || e.selectedItems.subscribe(async (i) => {
    if (i.length === 0) return;
    let a = Object.assign({}, this.package);
    a.cssfile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a, o(this, s, f).call(this), this._dataService.extractStyles(
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
  }), (t = h(this, d)) == null || t.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
q = function() {
  var e, t;
  (e = h(this, p)) == null || e.selectedItems.subscribe((i) => {
    let a = Object.assign({}, this.package);
    a.sourcefile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a;
  }), (t = h(this, p)) == null || t.openPicker({
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
O = function(e) {
  const t = e.target;
  this.configType = t.value;
};
T = function(e) {
  const t = e.target;
  let i = this.preconfigs.find((a) => a.name === t.value);
  i && (this.package = Object.assign(new b(), i));
};
N = function() {
  o(this, s, f).call(this), this.previewIconName = this.package.extractedStyles[0], this.previewIcon = this.package.template.replace("{icon}", this.previewIconName), this.previewButtonState = "success";
};
f = async function() {
  this.previewButtonState = "waiting", this.package.cssfile || (this.errors["preview.cssrequired"] = !1);
  var e = await this._dataService.loadCss(this.package.cssfile);
  if (e === void 0) {
    this.errors["cssfile.loaded"] = !1;
    return;
  }
  const t = new CSSStyleSheet();
  t.replaceSync(e), document.adoptedStyleSheets = [...document.adoptedStyleSheets, t], this.shadowRoot && (this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, t]);
};
r.styles = B`
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

        #icon{
            font-size: var(--uui-size-8);
            height: 60px;
            width: 60px;
            margin-right: var(--uui-size-layout-1);
            margin-bottom: var(--uui-size-layout-1);
        }
       
    `;
c([
  _({ attribute: !1 })
], r.prototype, "modalContext", 2);
c([
  _({ attribute: !1 })
], r.prototype, "data", 2);
c([
  n()
], r.prototype, "package", 2);
c([
  n()
], r.prototype, "configType", 2);
c([
  n()
], r.prototype, "previewIcon", 2);
c([
  n()
], r.prototype, "errors", 2);
c([
  n()
], r.prototype, "previewButtonState", 2);
c([
  n()
], r.prototype, "previewIconName", 2);
r = c([
  E("add-package-modal")
], r);
export {
  r as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
