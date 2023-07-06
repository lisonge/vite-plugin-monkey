// ==UserScript==
// @name         dynamic-import
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://i.songe.li/*
// @require      https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.3.7/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @resource     animate.css  https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css
// @grant        GM_getResourceText
// ==/UserScript==

System.addImportMap({ imports: {"md5":"user:md5","vue":"user:vue","element-plus":"user:element-plus"} });
System.set("user:md5", (()=>{const _=MD5;('default' in _)||(_.default=_);return _})());
System.set("user:vue", (()=>{const _=Vue;('default' in _)||(_.default=_);return _})());
System.set("user:element-plus", (()=>{const _=ElementPlus;('default' in _)||(_.default=_);return _})());

System.register("./__entry.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      if (location.href.includes("animate.css=on")) {
        module.import('./_monkey-resource-import_animate-a2152b62-ea523879.js');
        document.querySelectorAll("div").forEach((div) => {
          div.classList.add("animate__shakeX");
          div.classList.add("animate__animated");
        });
        console.log("dynamic import animate.css");
      }
      (async () => {
        if (location.href.includes("md5=on")) {
          const md5 = (await module.import('md5')).default;
          console.log(`md5('xx')=${md5("xx")}`);
          console.log("dynamic import md5");
        }
        const Vue = await module.import('vue');
        const ElementPlus = await module.import('element-plus');
        console.log({
          Vue,
          ElementPlus,
          default: ElementPlus.default
        });
      })();

    })
  };
}));

System.register("./_monkey-resource-import_animate-a2152b62-ea523879.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      const cssLoader = (e) => {
        const t = GM_getResourceText(e), o = document.createElement("style");
        return o.innerText = t, document.head.append(o), t;
      };
      cssLoader("animate.css");

    })
  };
}));

System.import("./__entry.js", "./");