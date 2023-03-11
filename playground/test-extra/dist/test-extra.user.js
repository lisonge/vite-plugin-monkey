// ==UserScript==
// @name       test-extra
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://i.songe.li/*
// @connect    httpbin.org
// @connect    i.pximg.net
// @grant      GM_xmlhttpRequest
// @grant      unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  var delay = async (n = 0) => new Promise((res) => {
    setTimeout(res, n);
  });
  var lazyValuePlaceholder = {};
  var lazy = (fn) => {
    let temp = void 0;
    let o = {
      get k() {
        if (temp === void 0) {
          temp = fn();
        }
        return temp;
      }
    };
    const wm = lazyValue(() => /* @__PURE__ */ new WeakMap());
    return new Proxy(lazyValuePlaceholder, {
      get(_, p, receiver) {
        const v = Reflect.get(o.k, p, receiver);
        if (typeof v == "function") {
          const f = v;
          let fBind = wm.value.get(f);
          if (fBind === void 0) {
            fBind = f.bind(o.k);
            wm.value.set(f, fBind);
          }
          return fBind;
        }
        return v;
      },
      set(_, p, newValue, receiver) {
        return Reflect.set(o.k, p, newValue, receiver);
      },
      has(_, p) {
        return Reflect.has(o.k, p);
      },
      ownKeys() {
        return Reflect.ownKeys(o.k);
      },
      isExtensible() {
        return Reflect.isExtensible(o.k);
      },
      deleteProperty(_, p) {
        return Reflect.deleteProperty(o.k, p);
      },
      setPrototypeOf(_, v) {
        return Reflect.setPrototypeOf(o.k, v);
      },
      getOwnPropertyDescriptor(_, p) {
        return Reflect.getOwnPropertyDescriptor(o.k, p);
      },
      defineProperty(_, property, attributes) {
        return Reflect.defineProperty(o.k, property, attributes);
      },
      getPrototypeOf() {
        return Reflect.getPrototypeOf(o.k);
      },
      preventExtensions() {
        return Reflect.preventExtensions(o.k);
      },
      apply(_, thisArg, argArray) {
        return Reflect.apply(o.k, thisArg, argArray);
      },
      construct(_, argArray, newTarget) {
        return Reflect.construct(o.k, argArray, newTarget);
      }
    });
  };
  var lazyValue = (fn) => {
    let temp = lazyValuePlaceholder;
    return {
      get value() {
        if (temp === lazyValuePlaceholder) {
          temp = fn();
        }
        return temp;
      }
    };
  };
  var parseHeaders = (rawHeaders = "") => {
    const headers = new Headers();
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split("\r").map(function(header) {
      return header.startsWith(`
`) ? header.substring(1) : header;
    }).forEach(function(line) {
      var _a;
      let parts = line.split(":");
      let key = (_a = parts.shift()) == null ? void 0 : _a.trim();
      if (key) {
        let value = parts.join(":").trim();
        headers.append(key, value);
      }
    });
    return headers;
  };
  var fixUrl = (url = "") => {
    try {
      return url === "" && location.href ? location.href : url;
    } catch {
      return url;
    }
  };
  var GM_fetch = async (input, init = {}) => {
    var _a;
    const request = new Request(input, init);
    if ((_a = request.signal) == null ? void 0 : _a.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    const data = await request.text();
    let binary = true;
    const headers = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    new Headers(init.headers).forEach((value, key) => {
      headers[key] = value;
    });
    return new Promise((resolve, reject) => {
      var _a2;
      const handle = _GM_xmlhttpRequest({
        method: request.method.toUpperCase(),
        url: fixUrl(request.url),
        headers,
        data,
        binary,
        responseType: "blob",
        async onload(e) {
          await delay();
          const resp = new Response(e.response ?? e.responseText, {
            status: e.status,
            statusText: e.statusText,
            headers: parseHeaders(e.responseHeaders)
          });
          Object.defineProperty(resp, "url", { value: e.finalUrl });
          resolve(resp);
        },
        async onerror() {
          await delay();
          reject(new TypeError("Network request failed"));
        },
        async ontimeout() {
          await delay();
          reject(new TypeError("Network request failed"));
        },
        async onabort() {
          await delay();
          reject(new DOMException("Aborted", "AbortError"));
        },
        async onreadystatechange(response) {
          var _a3;
          if (response.readyState === 4) {
            (_a3 = request.signal) == null ? void 0 : _a3.removeEventListener("abort", abortXhr);
          }
        }
      });
      function abortXhr() {
        handle.abort();
      }
      (_a2 = request.signal) == null ? void 0 : _a2.addEventListener("abort", abortXhr);
    });
  };
  var querySelector = async (root, selectors, timeout) => {
    const node = root.querySelector(selectors);
    if (node) {
      return node;
    }
    return new Promise((res) => {
      let task = void 0;
      const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.target instanceof Element) {
            const node2 = mutation.target.querySelector(selectors);
            if (node2) {
              observer.disconnect();
              window.clearTimeout(task);
              return res(node2);
            }
          }
        }
      });
      observer.observe(root, {
        attributes: true,
        childList: true,
        subtree: true
      });
      if (timeout !== void 0) {
        task = window.setTimeout(() => {
          observer.disconnect();
          res(null);
        }, timeout);
      }
    });
  };
  var produceChain = (originalFetch, interceptors, request, index = 0) => {
    return {
      request,
      proceed: async (req = request) => {
        while (index < interceptors.length) {
          const target = interceptors[index];
          if (target) {
            return target(
              produceChain(originalFetch, interceptors, req, index + 1)
            );
          }
          index++;
        }
        return originalFetch(req);
      }
    };
  };
  var InterceptorManager = class {
    constructor() {
      __publicField(this, "interceptors", []);
      __publicField(this, "cache", /* @__PURE__ */ new WeakMap());
      __publicField(this, "use", (interceptor) => {
        this.interceptors.push(interceptor);
        return this.interceptors.length - 1;
      });
      __publicField(this, "eject", (id) => {
        this.interceptors[id] = null;
      });
      __publicField(this, "clear", () => {
        for (let i = 0; i < this.interceptors.length; i++) {
          this.interceptors[i] = null;
        }
      });
      __publicField(this, "hook", (target, originalFetch = target.fetch) => {
        const oldFakeFetch = this.cache.get(target);
        if (oldFakeFetch) {
          return target.fetch == oldFakeFetch;
        }
        const fakeFetch = async (input, init) => {
          return produceChain(
            originalFetch,
            this.interceptors,
            new Request(input, init)
          ).proceed();
        };
        this.cache.set(target, target.fetch);
        target.fetch = fakeFetch;
        return target.fetch == fakeFetch;
      });
      __publicField(this, "unhook", (target) => {
        const oldFakeFetch = this.cache.get(target);
        this.cache.delete(target);
        if (!oldFakeFetch) {
          return true;
        }
        target.fetch = oldFakeFetch;
        return target.fetch == oldFakeFetch;
      });
    }
  };
  var UnsafeWindowInterceptorManager = /* @__PURE__ */ lazy(() => {
    const t = new InterceptorManager();
    t.hook(_monkeyWindow.unsafeWindow ?? window);
    return t;
  });
  (async () => {
    const resp = await GM_fetch(
      `https://i.pximg.net/img-original/img/2017/05/16/00/20/10/62921231_p0.png`,
      {
        headers: {
          referer: "https://www.pixiv.net/"
        }
      }
    );
    const imgBlob = await resp.blob();
    const imgUrl = URL.createObjectURL(imgBlob);
    const img = new Image();
    img.src = imgUrl;
    document.body.append(img);
  })();
  (async () => {
    const randomKey = `_` + Math.random().toString(16).substring(2);
    window.setTimeout(() => {
      const div2 = document.createElement("div");
      div2.classList.add(randomKey);
      document.body.append(div2);
    }, 1e3);
    const div = await querySelector(document.body, `.` + randomKey, 1500);
    if (div) {
      div.textContent = randomKey;
    }
  })();
  (async () => {
    UnsafeWindowInterceptorManager.use(async ({ proceed, request }) => {
      const url = new URL(request.url);
      console.log(`hook: ${request.url}`);
      url.searchParams.set(`k`, new Date().getTime().toString());
      return proceed(new Request(url, request));
    });
    await fetch(location.href);
  })();

})();
