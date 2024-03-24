function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
// ==UserScript==
// @name         dynamic-import
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/*
// @require      https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.6.2/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @resource     animate.css  https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css
// @grant        GM_addStyle
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

      const scriptRel = function detectScriptRel() {
        const relList = typeof document !== "undefined" && document.createElement("link").relList;
        return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      const assetsURL = function(dep) {
        return "/" + dep;
      };
      const seen = {};
      const __vitePreload = function preload(baseModule, deps, importerUrl) {
        let promise = Promise.resolve();
        if (deps && deps.length > 0) {
          const links = document.getElementsByTagName("link");
          const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
          const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
          promise = Promise.all(deps.map((dep) => {
            dep = assetsURL(dep);
            if (dep in seen)
              return;
            seen[dep] = true;
            const isCss = dep.endsWith(".css");
            const cssSelector = isCss ? '[rel="stylesheet"]' : "";
            const isBaseRelative = !!importerUrl;
            if (isBaseRelative) {
              for (let i = links.length - 1; i >= 0; i--) {
                const link2 = links[i];
                if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
                  return;
                }
              }
            } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
              return;
            }
            const link = document.createElement("link");
            link.rel = isCss ? "stylesheet" : scriptRel;
            if (!isCss) {
              link.as = "script";
              link.crossOrigin = "";
            }
            link.href = dep;
            if (cspNonce) {
              link.setAttribute("nonce", cspNonce);
            }
            document.head.appendChild(link);
            if (isCss) {
              return new Promise((res, rej) => {
                link.addEventListener("load", res);
                link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
              });
            }
          }));
        }
        return promise.then(() => baseModule()).catch((err) => {
          const e = new Event("vite:preloadError", { cancelable: true });
          e.payload = err;
          window.dispatchEvent(e);
          if (!e.defaultPrevented) {
            throw err;
          }
        });
      };
      if (location.href.includes("animate.css=on")) {
        __vitePreload(() => module.import('./_monkey-resource-import_animate-CYrDZYZj-CSq71P-s.js'), void 0 );
        document.querySelectorAll("div").forEach((div) => {
          div.classList.add("animate__shakeX");
          div.classList.add("animate__animated");
        });
        console.log("dynamic import animate.css");
      }
      (async () => {
        if (location.href.includes("md5=on")) {
          const md5 = (await __vitePreload(() => module.import('md5'), void 0 )).default;
          console.log(`md5('xx')=${md5("xx")}`);
          console.log("dynamic import md5");
        }
        const Vue = await __vitePreload(() => module.import('vue'), void 0 );
        const ElementPlus = await __vitePreload(() => module.import('element-plus'), void 0 );
        console.log({
          Vue,
          ElementPlus,
          default: ElementPlus.default
        });
      })();

    })
  };
}));

System.register("./_monkey-resource-import_animate-CYrDZYZj-CSq71P-s.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      const cssLoader = (e) => {
        const t = GM_getResourceText(e);
        return GM_addStyle(t), t;
      };
      const _monkeyResourceImport_animate = exports("default", cssLoader("animate.css"));

    })
  };
}));

System.import("./__entry.js", "./");