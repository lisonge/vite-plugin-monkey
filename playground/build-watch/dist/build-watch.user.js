// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/vue@3.2.40/dist/vue.global.prod.js
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.17/dist/index.css
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// @grant      GM_listValues
// @grant      GM_setValue
// ==/UserScript==

(function(vue) {
  var _a, _b;
  "use strict";
  var r = (_a = document.__monkeyWindow) != null ? _a : window;
  r.GM;
  r.unsafeWindow = (_b = r.unsafeWindow) != null ? _b : window;
  r.unsafeWindow;
  r.GM_info;
  r.GM_cookie;
  var u = (...e) => r.GM_setValue(...e), G = (...e) => r.GM_deleteValue(...e), _ = (...e) => r.GM_listValues(...e);
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  G("key");
  u("key", "value");
  console.log(_());
  console.log({ createApp: vue.createApp, ref: vue.ref });
  (async () => {
  })();
})(Vue);
