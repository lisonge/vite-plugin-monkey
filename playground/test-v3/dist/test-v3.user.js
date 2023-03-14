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
      const svgUrl2 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+";
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
      console.log({ svgUrl2 });

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