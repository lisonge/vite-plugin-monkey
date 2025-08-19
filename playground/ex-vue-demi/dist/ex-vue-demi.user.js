// ==UserScript==
// @name         ex-vue-demi
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.18/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/pinia@3.0.3/dist/pinia.iife.prod.js
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.full.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function (vue, pinia$1, ElementPlus) {
  'use strict';

  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  const cssLoader = (e) => _GM_addStyle(_GM_getResourceText(e));
  cssLoader("element-plus/dist/index.css");
  const useMainStore = pinia$1.defineStore("main", {
    // a function that returns a fresh state
    state: () => ({
      counter: 0,
      name: "Eduardo"
    }),
    // optional getters
    getters: {
      // getters receive the state as first parameter
      doubleCounter: (state) => state.counter * 2,
      // use getters in other getters
      doubleCounterPlusOne() {
        return this.doubleCounter + 1;
      }
    },
    // optional actions
    actions: {
      reset() {
        this.counter = 0;
      }
    }
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const main = useMainStore();
      const { counter, doubleCounter } = pinia$1.storeToRefs(main);
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", null, "counter:" + vue.toDisplayString(vue.unref(counter)), 1),
          vue.createElementVNode("div", null, "doubleCounter:" + vue.toDisplayString(vue.unref(doubleCounter)), 1),
          vue.createVNode(_component_el_button, {
            type: "success",
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(main).counter++)
          }, {
            default: vue.withCtx(() => _cache[1] || (_cache[1] = [
              vue.createTextVNode("main.counter++", -1)
            ])),
            _: 1,
            __: [1]
          })
        ], 64);
      };
    }
  });
  const pinia = pinia$1.createPinia();
  const app = vue.createApp(_sfc_main);
  app.use(ElementPlus);
  app.use(pinia);
  app.mount(
    (() => {
      const div = document.createElement("div");
      document.body.append(div);
      return div;
    })()
  );

})(Vue, Pinia, ElementPlus);