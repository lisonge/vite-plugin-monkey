// ==UserScript==
// @name       vite-vue-ts-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/vue@3.4.14/dist/vue.global.prod.js
// @grant      GM_addStyle
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(" :root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}.read-the-docs[data-v-3d49b259]{color:#888}.logo[data-v-39299c53]{height:6em;padding:1.5em;will-change:filter}.logo[data-v-39299c53]:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.vue[data-v-39299c53]:hover{filter:drop-shadow(0 0 2em #42b883aa)} ");

(function (vue) {
  'use strict';

  const _withScopeId = (n) => (vue.pushScopeId("data-v-3d49b259"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$1 = { class: "card" };
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
    /* @__PURE__ */ vue.createTextVNode(" Edit "),
    /* @__PURE__ */ vue.createElementVNode("code", null, "components/HelloWorld.vue"),
    /* @__PURE__ */ vue.createTextVNode(" to test HMR ")
  ], -1));
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
    /* @__PURE__ */ vue.createTextVNode(" Check out "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://vuejs.org/guide/quick-start.html#local",
      target: "_blank"
    }, "create-vue"),
    /* @__PURE__ */ vue.createTextVNode(", the official Vue + Vite starter ")
  ], -1));
  const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
    /* @__PURE__ */ vue.createTextVNode(" Install "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://github.com/johnsoncodehk/volar",
      target: "_blank"
    }, "Volar"),
    /* @__PURE__ */ vue.createTextVNode(" in your IDE for a better DX ")
  ], -1));
  const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1));
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "HelloWorld",
    props: {
      msg: {}
    },
    setup(__props) {
      const count = vue.ref(0);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("h1", null, vue.toDisplayString(_ctx.msg), 1),
          vue.createElementVNode("div", _hoisted_1$1, [
            vue.createElementVNode("button", {
              type: "button",
              onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
            }, "count is " + vue.toDisplayString(count.value), 1),
            _hoisted_2$1
          ]),
          _hoisted_3$1,
          _hoisted_4$1,
          _hoisted_5
        ], 64);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3d49b259"]]);
  const viteLogoUrl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='31.88'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20257'%3e%3cdefs%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb466'%20x1='-.828%25'%20x2='57.636%25'%20y1='7.652%25'%20y2='78.411%25'%3e%3cstop%20offset='0%25'%20stop-color='%2341D1FF'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23BD34FE'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb467'%20x1='43.376%25'%20x2='50.316%25'%20y1='2.242%25'%20y2='89.03%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEA83'%3e%3c/stop%3e%3cstop%20offset='8.333%25'%20stop-color='%23FFDD35'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23FFA800'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb466)'%20d='M255.153%2037.938L134.897%20252.976c-2.483%204.44-8.862%204.466-11.382.048L.875%2037.958c-2.746-4.814%201.371-10.646%206.827-9.67l120.385%2021.517a6.537%206.537%200%200%200%202.322-.004l117.867-21.483c5.438-.991%209.574%204.796%206.877%209.62Z'%3e%3c/path%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb467)'%20d='M185.432.063L96.44%2017.501a3.268%203.268%200%200%200-2.634%203.014l-5.474%2092.456a3.268%203.268%200%200%200%203.997%203.378l24.777-5.718c2.318-.535%204.413%201.507%203.936%203.838l-7.361%2036.047c-.495%202.426%201.782%204.5%204.151%203.78l15.304-4.649c2.372-.72%204.652%201.36%204.15%203.788l-11.698%2056.621c-.732%203.542%203.979%205.473%205.943%202.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505%204.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'%3e%3c/path%3e%3c/svg%3e";
  const vueLogoUrl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e";
  const _hoisted_1 = {
    href: "https://vitejs.dev",
    target: "_blank"
  };
  const _hoisted_2 = ["src"];
  const _hoisted_3 = {
    href: "https://vuejs.org/",
    target: "_blank"
  };
  const _hoisted_4 = ["src"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", null, [
            vue.createElementVNode("a", _hoisted_1, [
              vue.createElementVNode("img", {
                src: vue.unref(viteLogoUrl),
                class: "logo",
                alt: "Vite logo"
              }, null, 8, _hoisted_2)
            ]),
            vue.createElementVNode("a", _hoisted_3, [
              vue.createElementVNode("img", {
                src: vue.unref(vueLogoUrl),
                class: "logo vue",
                alt: "Vue logo"
              }, null, 8, _hoisted_4)
            ])
          ]),
          vue.createVNode(HelloWorld, { msg: "Vite + Vue" })
        ], 64);
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39299c53"]]);
  vue.createApp(App).mount(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(Vue);