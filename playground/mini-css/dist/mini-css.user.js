// ==UserScript==
// @name       mini-css
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     author_name
// @icon       https://vitejs.dev/logo.svg
// @match      https://songe.li/*
// @require    https://cdn.jsdelivr.net/npm/vue@3.5.18
// @resource   element-plus/dist/index.css         https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @resource   element-plus/dist/index.css?inline  https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @resource   normalize.css                       https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css
// @tag        tag1
// @tag        tag2
// @grant      GM_addStyle
// @grant      GM_getResourceText
// @grant      GM_getValue
// @grant      GM_registerMenuCommand
// @grant      GM_webRequest
// ==/UserScript==

(async function (vue) {
  'use strict';

  const d=new Set;const importCSS = async e=>{d.has(e)||(d.add(e),(t=>{typeof GM_addStyle=="function"?GM_addStyle(t):document.head.appendChild(document.createElement("style")).append(t);})(e));};

  importCSS(" *,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5)}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5)}.flex{display:flex}.dark .dark\\:bg-red\\:10{background-color:#f871711a}.test[data-v-0eae1295]{color:red} ");

  const style2Css = ".style2{background-color:red}";
  const style3Scss = ".style3{background-color:#00f}";
  var _GM = (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_getResourceText = (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_webRequest = (() => typeof GM_webRequest != "undefined" ? GM_webRequest : void 0)();
  const cssLoader = (e2) => _GM_addStyle(_GM_getResourceText(e2)), rawLoader = (e2) => _GM_getResourceText(e2);
  let e$2;
  const normalizeCss = async () => e$2 ?? (e$2 = cssLoader("normalize.css"));
  let e$1;
  const elementPlusDistIndexCssInline = async () => e$1 ?? (e$1 = rawLoader("element-plus/dist/index.css?inline"));
  let e;
  const elementPlusDistIndexCss1 = async () => e ?? (e = cssLoader("element-plus/dist/index.css"));
  const styleCss = ".read-the-docs{color:#888;position:fixed;top:60px;right:0;bottom:0;left:260px;background:#fff;z-index:1050;padding:10px 20px 200px;overflow-y:auto;box-shadow:-2px 2px 6px #bbb}body{display:flex;background-color:#0ff}";
  importCSS(styleCss);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main = {};
  const _hoisted_1 = { class: "flex dark:bg-red:10" };
  function _sfc_render(_ctx, _cache) {
    const _component_el_button = vue.resolveComponent("el-button");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("div", _hoisted_1, "counter:" + vue.toDisplayString(_ctx.counter), 1),
      vue.createElementVNode("div", null, "doubleCounter:" + vue.toDisplayString(_ctx.doubleCounter), 1),
      vue.createVNode(_component_el_button, {
        type: "success",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.main.counter++)
      }, {
        default: vue.withCtx(() => _cache[1] || (_cache[1] = [
          vue.createTextVNode("main.counter++", -1)
        ])),
        _: 1,
        __: [1]
      })
    ], 64);
  }
  const Test = _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0eae1295"]]);
  console.log(`hello wolrd`);
  console.log(Test);
  console.log(Object.keys(_GM));
  _GM_registerMenuCommand("", (e2) => {
  });
  _GM_getValue("key", String("default"));
  console.log(
    _GM_webRequest([], (...args) => {
      console.log(args);
    })
  );
  if (location.search.includes("test")) {
    await( importCSS(style2Css));
    importCSS(style3Scss);
    importCSS(style3Scss);
    normalizeCss();
    const x2 = await( elementPlusDistIndexCssInline());
    console.log(x2);
  } else {
    elementPlusDistIndexCss1();
  }

})(Vue);