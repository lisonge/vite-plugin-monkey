// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/vue@3.2.41/dist/vue.global.prod.js
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.18/dist/index.css
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// @grant      GM_listValues
// @grant      GM_setValue
// ==/UserScript==

(function(client, vue) {
  "use strict";
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  client.GM_deleteValue("key");
  client.GM_setValue("key", "value");
  console.log(client.GM_listValues());
  console.log({ createApp: vue.createApp, ref: vue.ref });
  (async () => {
  })();
})((window.monkeyWindow = window, window), Vue);
