import { LitElement as z, html as k, nothing as N, unsafeHTML as E, ifDefined as M, css as U, property as x, state as d, customElement as B } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as W } from "@umbraco-cms/backoffice/element-api";
import { P as b } from "./models-u6n50sPP.js";
import { UmbStaticFilePickerContext as w } from "@umbraco-cms/backoffice/static-file";
class A {
  async loadCss(e) {
    var i = await fetch(e);
    if (i.ok)
      return i.text();
  }
  async extractStyles(e, i, a) {
    (!e.selector || e.selector.length <= 0) && a(), e.sourcefile || (e.sourcefile = e.cssfile);
    var s = await fetch(e.sourcefile);
    if (!s.ok) {
      a();
      return;
    }
    e.extractedStyles = [];
    for (var u = await s.text(), n = new RegExp(e.selector, "g"), v = n.exec(u); v !== null; )
      e.extractedStyles.push(v[1]), v = n.exec(u);
    e.extractedStyles.length > 0 ? i(e.extractedStyles) : a();
  }
  async loadPreconfigs() {
    var e = "/App_Plugins/Iconic/preconfigs.json", i = await fetch(e);
    return i.json();
  }
}
var L = Object.defineProperty, j = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, c = (t, e, i, a) => {
  for (var s = a > 1 ? void 0 : a ? j(e, i) : e, u = t.length - 1, n; u >= 0; u--)
    (n = t[u]) && (s = (a ? n(e, i, s) : n(s)) || s);
  return a && s && L(e, i, s), s;
}, y = (t, e, i) => e.has(t) || _("Cannot " + i), h = (t, e, i) => (y(t, e, "read from private field"), e.get(t)), g = (t, e, i) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), S = (t, e, i, a) => (y(t, e, "write to private field"), e.set(t, i), i), l = (t, e, i) => (y(t, e, "access private method"), i), p, f, o, C, P, $, I, F, q, T, O, R, m;
let r = class extends W(z) {
  constructor() {
    super(), g(this, o), this.package = new b(), this.configType = "custom", this.errors = {}, this.preconfigsOptions = [], this.preconfigs = [], g(this, p), g(this, f), this._dataService = new A(), S(this, p, new w(this)), S(this, f, new w(this)), this._dataService.loadPreconfigs().then((t) => {
      this.preconfigs = t, this.preconfigsOptions = t.map((e) => ({ name: e.name, value: e.name }));
    }), l(this, o, C).call(this);
  }
  connectedCallback() {
    var t, e;
    super.connectedCallback(), this.package = ((e = (t = this.modalContext) == null ? void 0 : t.data) == null ? void 0 : e.package) || new b(), l(this, o, m).call(this);
  }
  render() {
    return k`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form class="our-iconic__form">   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${l(this, o, T)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? k`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${l(this, o, O)}"></uui-select>
                                </uui-form-layout-item>
                            ` : N}

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label" >Enter a name</uui-label>
                            <uui-input id="packageName" .value="${this.package.name}"  class="full-width" name="packageName" type="text"></uui-input>
                            <div ?hidden="${this.errors["name.required"]}">
                                <p>Please enter a name for the package.</p>
                            </div>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" >Backoffice template</uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.template}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                            <div ?hidden="${this.errors["template.required"]}">
                                <p>Please enter a template for the icon to display on the backoffice.</p>
                            </div>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${l(this, o, F)}></uui-button>
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
                            <uui-input id="editSelector" .value="${this.package.selector}"  class="full-width" name="editSelector" type="text"></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                            <uui-label for="editSourceFile" slot="label">Source File</uui-label>
                            <div class="flex">                                
                                <uui-input id="editSourceFile" .value="${decodeURIComponent(this.package.sourcefile)}"  class="full-width" name="editSourceFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${l(this, o, q)}></uui-button>
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
                                ${E(this.previewIcon)}
                            </uui-button>
                            <div><small><em>${this.previewIconName}</em></small></div>
                        </div>
                        <uui-button label="Reload Preview" look="primary" @click="${l(this, o, R)}" ?disabled="${!this.package.cssfile}" state="${M(this.previewButtonState)}"></uui-button>                            
                    
                        <div ?hidden="${this.errors["cssfile.required"]}">
                            <p>Please select a CSS file first.</p>
                        </div>
                    
                    </uui-box>
                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${l(this, o, $)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${l(this, o, I)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
C = function() {
  this.errors["name.required"] = !0, this.errors["template.required"] = !0, this.errors["cssfile.required"] = !0, this.errors["selector.required"] = !0, this.errors["sourcefile.required"] = !0, this.errors["cssfile.iconsfound"] = !0, this.errors["cssfile.loaded"] = !0;
};
P = function() {
  let t = !0;
  return this.package.name === "" && (this.errors["name.required"] = !1, t = !1), this.package.template === "" && (this.errors["template.required"] = !1, t = !1), this.package.cssfile === "" && (this.errors["cssfile.required"] = !1, t = !1), this.package.selector === "" && (this.errors["selector.required"] = !1, t = !1), this.package.sourcefile === "" && (this.errors["sourcefile.required"] = !1, t = !1), this.package.extractedStyles.length == 0 && (this.errors["cssfile.iconsfound"] = !1, t = !1), t;
};
$ = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
I = function() {
  var t, e;
  l(this, o, P).call(this) && ((t = this.modalContext) == null || t.updateValue({ package: this.package }), (e = this.modalContext) == null || e.submit());
};
F = function() {
  var t, e;
  (t = h(this, p)) == null || t.selectedItems.subscribe(async (i) => {
    if (i.length === 0) return;
    let a = Object.assign({}, this.package);
    a.cssfile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a, l(this, o, m).call(this), this._dataService.extractStyles(
      this.package,
      (s) => {
        if (s.length === 0) {
          this.previewIcon = void 0, this.previewButtonState = "failed", this.errors["cssfile.iconsfound"] = !1;
          return;
        }
        this.package.extractedStyles = s, this.previewIconName = s[0], this.previewIcon = this.package.template.replace("{icon}", this.previewIconName), this.previewButtonState = "success";
      },
      () => {
        this.previewIcon = void 0, this.previewButtonState = "failed", this.errors["cssfile.loaded"] = !1;
      }
    );
  }), (e = h(this, p)) == null || e.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
q = function() {
  var t, e;
  (t = h(this, f)) == null || t.selectedItems.subscribe((i) => {
    let a = Object.assign({}, this.package);
    a.sourcefile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a;
  }), (e = h(this, f)) == null || e.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
T = function(t) {
  const e = t.target;
  this.configType = e.value;
};
O = function(t) {
  const e = t.target;
  let i = this.preconfigs.find((a) => a.name === e.value);
  i && (this.package = Object.assign(new b(), i));
};
R = function() {
  l(this, o, m).call(this), this.previewIconName = this.package.extractedStyles[0], this.previewIcon = this.package.template.replace("{icon}", this.previewIconName), this.previewButtonState = "success";
};
m = async function() {
  this.previewButtonState = "waiting", this.package.cssfile || (this.errors["preview.cssrequired"] = !1);
  var t = await this._dataService.loadCss(this.package.cssfile);
  if (t === void 0) {
    this.errors["cssfile.loaded"] = !1;
    return;
  }
  const e = new CSSStyleSheet();
  e.replaceSync(t), document.adoptedStyleSheets = [...document.adoptedStyleSheets, e], this.shadowRoot && (this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, e]);
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
  x({ attribute: !1 })
], r.prototype, "modalContext", 2);
c([
  x({ attribute: !1 })
], r.prototype, "data", 2);
c([
  d()
], r.prototype, "package", 2);
c([
  d()
], r.prototype, "configType", 2);
c([
  d()
], r.prototype, "previewIcon", 2);
c([
  d()
], r.prototype, "errors", 2);
c([
  d()
], r.prototype, "previewButtonState", 2);
c([
  d()
], r.prototype, "previewIconName", 2);
r = c([
  B("add-package-modal")
], r);
export {
  r as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
