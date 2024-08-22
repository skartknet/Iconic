import { LitElement as T, html as y, nothing as O, css as R, property as E, state as f, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as M } from "@umbraco-cms/backoffice/element-api";
import { P as w } from "./models-u6n50sPP.js";
import { UmbStaticFilePickerContext as b } from "@umbraco-cms/backoffice/static-file";
class W {
  async loadCss(e) {
    var i = await fetch(e);
    if (i.ok)
      return i.text();
  }
  async extractStyles(e, i, a) {
    (!e.selector || e.selector.length <= 0) && a(), e.sourcefile || (e.sourcefile = e.cssfile);
    var o = await fetch(e.sourcefile);
    if (!o.ok) {
      a();
      return;
    }
    e.extractedStyles = [];
    try {
      var l = new RegExp(e.selector, "g");
    } catch {
      a();
      return;
    }
    for (var r = await o.text(), m = l.exec(r); m !== null; )
      e.extractedStyles.push(m[1]), m = l.exec(r);
    e.extractedStyles.length > 0 ? i(e.extractedStyles) : a();
  }
  async loadPreconfigs() {
    var e = "/App_Plugins/Iconic/preconfigs.json", i = await fetch(e);
    return i.json();
  }
}
var z = Object.defineProperty, A = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, n = (t, e, i, a) => {
  for (var o = a > 1 ? void 0 : a ? A(e, i) : e, l = t.length - 1, r; l >= 0; l--)
    (r = t[l]) && (o = (a ? r(e, i, o) : r(o)) || o);
  return a && o && z(e, i, o), o;
}, v = (t, e, i) => e.has(t) || S("Cannot " + i), h = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), g = (t, e, i) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), k = (t, e, i, a) => (v(t, e, "write to private field"), e.set(t, i), i), u = (t, e, i) => (v(t, e, "access private method"), i), p, d, s, _, x, C, P, F, $, I;
let c = class extends M(T) {
  constructor() {
    super(), g(this, s), this.package = new w(), this.configType = "custom", this.previewButtonState = "init", this.analysing = "init", this.preconfigsOptions = [], this.preconfigs = [], g(this, p), g(this, d), this._dataService = new W(), k(this, p, new b(this)), k(this, d, new b(this)), this._dataService.loadPreconfigs().then((t) => {
      this.preconfigs = t, this.preconfigsOptions = t.map((e) => ({ name: e.name, value: e.name }));
    });
  }
  render() {
    return y`        
        <umb-body-layout headline="Add Package">
            <uui-form>                   
                <form class="our-iconic__form">   
                    <uui-box headline="Details">
                        <uui-form-layout-item>
                            <uui-label for="configType" slot="label" >Configuration Type</uui-label>                            
                            <uui-radio-group name="configType"  value="${this.configType}" @change=${u(this, s, F)}> 
                                <uui-radio name="configType" value="custom">Custom</uui-radio>
                                <uui-radio name="configType" value="preconfigured">Pre-Configured</uui-radio>
                            </uui-radio-group>
                        </uui-form-layout-item>

                        ${this.configType === "preconfigured" ? y`
                                <uui-form-layout-item>                        
                                    <uui-select class="full-width"
                                                placeholder="Select a pre-configuration..."
                                                .options="${this.preconfigsOptions}"
                                                @change="${u(this, s, $)}"></uui-select>
                                </uui-form-layout-item>
                            ` : O}

                        <uui-form-layout-item>  
                            <uui-label for="packageName" slot="label" >Enter a name</uui-label>
                            <uui-input id="packageName" .value="${this.package.name}"  class="full-width" name="packageName" type="text"></uui-input>
                        </uui-form-layout-item>                                    

                        <uui-form-layout-item>
                            <uui-label for="backofficeTemplate" slot="label" >Backoffice template</uui-label>
                            <uui-input id="backofficeTemplate" .value="${this.package.template}"  class="full-width" name="backofficeTemplate" type="text"></uui-input>
                        </uui-form-layout-item>
                        
                        <uui-form-layout-item>                            
                            <uui-label for="editCssFile" slot="label">CSS File</uui-label>
                            <div class="flex">
                                <uui-input id="editCssFile" class="full-width" .value="${this.package.cssfile}"  name="editCssFile" type="text" placeholder="Enter partial or absolute URL, or select from the filesystem."></uui-input>
                                <uui-button type="button" label="Select" @click=${u(this, s, C)}></uui-button>
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
                                <uui-button type="button" label="Select" @click=${u(this, s, P)}></uui-button>
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
                        <div class="our-iconic__container preview flex">
                            <div class="umb-panel-header-icon">
                                <iconic-icon package="model.package" icon="previewIcon">
                                </iconic-icon>
                            </div>

                            <div>
                                <div class="ml2">
                                    <small><em><i class="fa fa-glass"></i></em></small>
                                </div>

                                <uui-button @click="${u(this, s, I)}" label="Reload Preview" look="primary" ?disabled="${!this.package.cssfile}"></uui-button>
                            </div>
                        </div>
                        <div ng-hide="packageForm.$valid">
                            <p>Package configuration is not valid.</p>
                        </div>
                    
                       </uui-box>
                    
                    <umb-footer-layout>
                        <uui-button slot="actions" label="Cancel" @click="${u(this, s, _)}"></uui-button>
                        <uui-button slot="actions" label="Save" color="positive" look="primary" @click="${u(this, s, x)}"></uui-button>
                    </umb-footer-layout>                    
                </form>
            </uui-form>
    </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
_ = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
x = function() {
  var t, e;
  (t = this.modalContext) == null || t.updateValue({ package: this.package }), (e = this.modalContext) == null || e.submit();
};
C = function() {
  var t, e;
  (t = h(this, p)) == null || t.selectedItems.subscribe(async (i) => {
    if (i.length === 0) return;
    let a = Object.assign({}, this.package);
    a.cssfile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a;
    var o = await this._dataService.loadCss(this.package.cssfile);
    if (o !== void 0) {
      const l = new CSSStyleSheet();
      l.replaceSync(o), document.adoptedStyleSheets = [...document.adoptedStyleSheets, l], this.shadowRoot && (this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, l]);
    }
  }), (e = h(this, p)) == null || e.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
P = function() {
  var t, e;
  (t = h(this, d)) == null || t.selectedItems.subscribe((i) => {
    let a = Object.assign({}, this.package);
    a.sourcefile = decodeURIComponent(i[0].unique).replace("%dot%", ".").replace("/wwwroot/", "/"), this.package = a;
  }), (e = h(this, d)) == null || e.openPicker({
    foldersOnly: !1,
    multiple: !1,
    filter: (i) => i.name.endsWith(".css"),
    pickableFilter: (i) => i.name.endsWith(".css")
  });
};
F = function(t) {
  const e = t.target;
  this.configType = e.value;
};
$ = function(t) {
  const e = t.target;
  let i = this.preconfigs.find((a) => a.name === e.value);
  i && (this.package = Object.assign(new w(), i));
};
I = function() {
  this.previewButtonState = "busy", this.package.cssfile && this._dataService.extractStyles(
    this.package,
    (t) => {
      this.previewIcon = '<i class="fa fa-glass"></i>', this.previewButtonState = "success";
    },
    () => {
      this.previewIcon = void 0, this.previewButtonState = "error";
    }
  );
};
c.styles = R`
        uui-box {
            margin-top: var(--uui-size-layout-1);            
        }

        .full-width{
            width: 100%;
        }

        .flex {
            display: flex;
        }
       
    `;
n([
  E({ attribute: !1 })
], c.prototype, "modalContext", 2);
n([
  f()
], c.prototype, "package", 2);
n([
  f()
], c.prototype, "configType", 2);
n([
  f()
], c.prototype, "previewIcon", 2);
n([
  f()
], c.prototype, "previewButtonState", 2);
n([
  f()
], c.prototype, "analysing", 2);
c = n([
  U("add-package-modal")
], c);
export {
  c as default
};
//# sourceMappingURL=modal-settings-addpackage.element.js.map
