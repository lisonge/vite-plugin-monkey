// ==UserScript==
// @name         external-source
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.18/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.full.min.js
// @resource     element-plus/dist/index.css      https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @resource     element-plus/dist/index.css?raw  https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// ==/UserScript==

(function (Vue, elementPlus) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Vue__namespace = _interopNamespaceDefault(Vue);

  var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_getResourceText = (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const cssLoader = (e) => _GM_addStyle(_GM_getResourceText(e)), rawLoader = (e) => _GM_getResourceText(e);
  cssLoader("element-plus/dist/index.css");
  const name = "element-plus";
  const version = "2.10.7";
  const description = "A Component Library for Vue 3";
  const keywords = ["element-plus", "element", "component library", "ui framework", "ui", "vue"];
  const homepage = "https://element-plus.org/";
  const bugs = { "url": "https://github.com/element-plus/element-plus/issues" };
  const license = "MIT";
  const main = "lib/index.js";
  const module = "es/index.mjs";
  const types = "es/index.d.ts";
  const exports$1 = { ".": { "types": "./es/index.d.ts", "import": "./es/index.mjs", "require": "./lib/index.js" }, "./global": { "types": "./global.d.ts" }, "./es": { "types": "./es/index.d.ts", "import": "./es/index.mjs" }, "./lib": { "types": "./lib/index.d.ts", "require": "./lib/index.js" }, "./es/*.mjs": { "types": "./es/*.d.ts", "import": "./es/*.mjs" }, "./es/*": { "types": ["./es/*.d.ts", "./es/*/index.d.ts"], "import": "./es/*.mjs" }, "./lib/*.js": { "types": "./lib/*.d.ts", "require": "./lib/*.js" }, "./lib/*": { "types": ["./lib/*.d.ts", "./lib/*/index.d.ts"], "require": "./lib/*.js" }, "./*": "./*" };
  const unpkg = "dist/index.full.js";
  const jsdelivr = "dist/index.full.js";
  const repository = { "type": "git", "url": "git+https://github.com/element-plus/element-plus.git" };
  const publishConfig = { "access": "public" };
  const style = "dist/index.css";
  const sideEffects = ["dist/*", "theme-chalk/**/*.css", "theme-chalk/src/**/*.scss", "es/components/*/style/*", "lib/components/*/style/*"];
  const peerDependencies = { "vue": "^3.2.0" };
  const dependencies = { "@ctrl/tinycolor": "^3.4.1", "@element-plus/icons-vue": "^2.3.1", "@floating-ui/dom": "^1.0.1", "@popperjs/core": "npm:@sxzz/popperjs-es@^2.11.7", "@types/lodash": "^4.14.182", "@types/lodash-es": "^4.17.6", "@vueuse/core": "^9.1.0", "async-validator": "^4.2.5", "dayjs": "^1.11.13", "escape-html": "^1.0.3", "lodash": "^4.17.21", "lodash-es": "^4.17.21", "lodash-unified": "^1.0.2", "memoize-one": "^6.0.0", "normalize-wheel-es": "^1.2.0" };
  const devDependencies = { "@types/node": "*", "csstype": "^2.6.20", "vue": "^3.2.37", "vue-router": "^4.0.16" };
  const vetur = { "tags": "tags.json", "attributes": "attributes.json" };
  const browserslist = ["> 1%", "not ie 11", "not op_mini all"];
  const gitHead = "5873341fb5d343ee0a19e6af1655f70f14a9f9f8";
  const ElementPlusPkg = {
    name,
    version,
    description,
    keywords,
    homepage,
    bugs,
    license,
    main,
    module,
    types,
    exports: exports$1,
    unpkg,
    jsdelivr,
    repository,
    publishConfig,
    style,
    sideEffects,
    peerDependencies,
    dependencies,
    devDependencies,
    vetur,
    "web-types": "web-types.json",
    browserslist,
    gitHead
  };
  const cssRaw = rawLoader("element-plus/dist/index.css?raw");
  console.log({
    Vue: Vue__namespace,
    ElDatePicker: elementPlus.ElDatePicker,
    ElButton: elementPlus.ElButton,
    ElementPlusPkg,
    unsafeWindow: _unsafeWindow,
cssRaw

});

})(Vue, ElementPlus);