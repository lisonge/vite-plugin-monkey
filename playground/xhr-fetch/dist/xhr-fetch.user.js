// ==UserScript==
// @name       xhr-fetch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://i.songe.li/*
// @connect    httpbin.org
// @grant      GM.xmlHttpRequest
// @grant      GM_xmlhttpRequest
// ==/UserScript==

(function() {
  "use strict";
  var monkeyWindow = /* @__PURE__ */ (() => {
    var _a;
    return (_a = document.__monkeyWindow) != null ? _a : window;
  })();
  const xmlhttpRequest = /* @__PURE__ */ (() => {
    var _a;
    return (_a = monkeyWindow.GM_xmlhttpRequest) != null ? _a : monkeyWindow.GM.xmlHttpRequest;
  })();
  const fixUrl = (url) => {
    try {
      return url === "" && location.href ? location.href : url;
    } catch {
      return url;
    }
  };
  const delay = async (n = 0) => {
    return new Promise((res) => {
      setTimeout(res, n);
    });
  };
  const parseHeaders = (rawHeaders = "") => {
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
  const GM_fetch = async (input, init) => {
    const request = new Request(input, init);
    if (request.signal && request.signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    let data = await request.text();
    let binary = true;
    const headers = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return new Promise((resolve, reject) => {
      const handle = xmlhttpRequest({
        method: request.method.toUpperCase(),
        url: fixUrl(request.url),
        headers,
        data,
        binary,
        responseType: "blob",
        async onload(response) {
          var _a;
          await delay();
          const resp = new Response((_a = response.response) != null ? _a : response.responseText, {
            status: response.status,
            statusText: response.statusText,
            headers: parseHeaders(response.responseHeaders)
          });
          Object.defineProperty(resp, "url", { value: response.finalUrl });
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
          if (request.signal) {
            if (response.readyState === 4) {
              request.signal.removeEventListener("abort", abortXhr);
            }
          }
        }
      });
      function abortXhr() {
        handle.abort();
      }
      if (request.signal) {
        request.signal.addEventListener("abort", abortXhr);
      }
    });
  };
  (async () => {
    console.time("x");
    const resp = await GM_fetch(`https://baidu.com/`, {
      method: "POST",
      body: JSON.stringify({
        key: 114514
      }),
      headers: {
        "content-type": "application/json"
      }
    });
    console.log(resp);
    console.log(resp.type);
    console.timeLog("x");
  })();
})();
