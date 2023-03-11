// ==UserScript==
// @name       test-v3
// @namespace  vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @match      https://lisonge.com/*
// @require    https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.prod.js
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.14.0/dist/system.min.js
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.14.0/dist/extras/named-register.min.js
// ==/UserScript==

(a=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=a,document.head.append(e)})(" #b .b2{display:flex}div[data-v-2c9b759a]{font-size:40px}.logo[data-v-2c9b759a]{height:6em;padding:1.5em;will-change:filter}.logo[data-v-2c9b759a]:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.vue[data-v-2c9b759a]:hover{filter:drop-shadow(0 0 2em #42b883aa)} ");

System.addImportMap({ imports: {"vue":"user:vue"} });
System.set("user:vue", Vue);

System.register("./__entry.js", ['vue'], (function (exports, module) {
  'use strict';
  var createApp, defineComponent, ref, openBlock, createElementBlock, toDisplayString;
  return {
    setters: [module => {
      createApp = module.createApp;
      defineComponent = module.defineComponent;
      ref = module.ref;
      openBlock = module.openBlock;
      createElementBlock = module.createElementBlock;
      toDisplayString = module.toDisplayString;
    }],
    execute: (async function () {

      const _sfc_main = /* @__PURE__ */ defineComponent({
        __name: "App",
        setup(__props) {
          const count = ref(0);
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
            }, toDisplayString(count.value), 1);
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
      const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c9b759a"]]);
      const delay = (n = 0) => {
        return new Promise((res) => setTimeout(res, n));
      };
      (await delay());
      createApp(App).mount(
        (() => {
          const app = document.createElement("div");
          document.body.append(app);
          return app;
        })()
      );
      console.log(location.href.at(-1));
      if (location.href) {
        (await module.import('./chunk-a4de7bed-27053969.js')).out();
      }

    })
  };
}));

System.register("./chunk-a4de7bed-27053969.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      const out = exports('out', () => {
        console.log(`out chunk`);
      });

    })
  };
}));

System.import("./__entry.js", "./");