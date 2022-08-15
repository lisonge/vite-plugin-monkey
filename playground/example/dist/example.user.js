// ==UserScript==
// @name               example
// @name:ja            hentai
// @name:zh            测试_
// @namespace          https://github.com/lisonge
// @version            1.0.1
// @author             lisonge
// @description        default description zh
// @description:zh     描述
// @description:en     description
// @description:ja     説明z
// @description:zh-CN  描述
// @license            MIT
// @icon               https://vitejs.dev/logo.svg
// @homepage           https://github.com/lisonge/vite-plugin-monkey#readme
// @homepageURL        https://github.com/lisonge/vite-plugin-monkey#readme
// @source             https://github.com/lisonge/vite-plugin-monkey.git
// @supportURL         https://github.com/lisonge/vite-plugin-monkey/issues
// @include            /^https:\/\/i\.songe\.li\/.*/
// @match              https://i.songe.li/
// @require            https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0
// @grant              GM_addElement
// @grant              GM_cookie
// @grant              unsafeWindow
// ==/UserScript==

// use vite-plugin-monkey@2.0.1 at 2022-08-15T13:00:52.647Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": "#app {\n  background-color: beige;\n}\n"
});

(function(md52) {
  var _a, _b;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md52);
  const style = "";
  var monkeyWindow = (_a = Reflect.get(document, "__monkeyWindow")) != null ? _a : window;
  monkeyWindow.GM;
  monkeyWindow.unsafeWindow = (_b = monkeyWindow.unsafeWindow) != null ? _b : window;
  var unsafeWindow = monkeyWindow.unsafeWindow;
  monkeyWindow.GM_info;
  var GM_cookie = monkeyWindow.GM_cookie;
  var GM_addElement = (...args) => {
    return monkeyWindow.GM_addElement(...args);
  };
  console.log(`md5('114514')=${md5__default.default("114514")}`);
  console.log("document.readyState", document.readyState);
  console.log(monkeyWindow);
  GM_addElement("div", { innerHTML: "hello" });
  if (unsafeWindow == window) {
    console.log("scope->host");
  } else {
    console.log("scope->monkey");
  }
  GM_cookie.list({}, (cookies, error) => {
    if (error) {
      console.log(error);
    } else {
      const [cookie] = cookies;
      if (cookie) {
        console.log(cookie);
      }
    }
  });
})(md5);
 
