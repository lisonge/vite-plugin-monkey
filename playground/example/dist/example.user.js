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
// @include            /test\.com/
// @match              https://i.songe.li/
// @require            https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0
// @require            https://raw.githubusercontent.com/lisonge/src/main/js/monkey.js
// @grant              GM_addElement
// @grant              GM_cookie
// @grant              unsafeWindow
// ==/UserScript==

// use vite-plugin-monkey@2.0.1 at 2022-08-15T03:48:35.655Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": "#app{background-color:beige}\n"
});

(function(c){var n,t;"use strict";const i=(o=>o&&typeof o=="object"&&"default"in o?o:{default:o})(c),w="";var e=(n=Reflect.get(document,"__monkeyWindow"))!=null?n:window;e.GM,e.unsafeWindow=(t=e.unsafeWindow)!=null?t:window;var s=e.unsafeWindow;e.GM_info;var a=e.GM_cookie,f=(...o)=>e.GM_addElement(...o);console.log(`md5('114514')=${i.default("114514")}`),console.log("document.readyState",document.readyState),console.log(e),f("div",{innerHTML:"hello"}),s==window?console.log("scope->host"):console.log("scope->monkey"),a.list({},(o,l)=>{if(l)console.log(l);else{const[d]=o;d&&console.log(d)}})})(md5);
 
