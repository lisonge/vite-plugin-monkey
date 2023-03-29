// ==UserScript==
// @name       vm-dom
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://i.songe.li/*
// @require    https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2.1.3/dist/index.js
// @connect    httpbin.org
// @connect    i.pximg.net
// ==/UserScript==

(function (VM) {
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

  const VM__namespace = /*#__PURE__*/_interopNamespaceDefault(VM);

  function Greetings() {
    return /* @__PURE__ */ VM__namespace.h(VM__namespace.Fragment, null, /* @__PURE__ */ VM__namespace.h("div", null, "hello"), /* @__PURE__ */ VM__namespace.h("p", null, "This is a panel. You can drag to move it."));
  }
  document.body.appendChild(VM__namespace.m(/* @__PURE__ */ VM__namespace.h(Greetings, null)));

})(VM);
