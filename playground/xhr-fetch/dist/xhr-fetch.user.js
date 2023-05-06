// ==UserScript==
// @name       xhr-fetch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://i.songe.li/*
// @connect    httpbin.org
// @connect    i.pximg.net
// @grant      GM.xmlHttpRequest
// @grant      GM_xmlhttpRequest
// ==/UserScript==

(async function () {
  'use strict';

  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const xmlhttpRequest = /* @__PURE__ */ (() => {
    return _GM_xmlhttpRequest ?? _GM.xmlHttpRequest;
  })();
  const fixUrl = (url = "") => {
    try {
      return url === "" && location.href ? location.href : url;
    } catch {
      return url;
    }
  };
  const delay = async (n = 0) => new Promise((res) => {
    setTimeout(res, n);
  });
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
  const GM_fetch = async (input, init = {}) => {
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
    new Headers(init.headers).forEach((value, key) => {
      headers[key] = value;
    });
    return new Promise((resolve, reject) => {
      var _a;
      const handle = xmlhttpRequest({
        method: request.method.toUpperCase(),
        url: fixUrl(request.url),
        headers,
        data,
        binary,
        responseType: "blob",
        async onload(e) {
          await delay();
          const resp2 = new Response(e.response ?? e.responseText, {
            status: e.status,
            statusText: e.statusText,
            headers: parseHeaders(e.responseHeaders)
          });
          Object.defineProperty(resp2, "url", { value: e.finalUrl });
          resolve(resp2);
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
          var _a2;
          if (response.readyState === 4) {
            (_a2 = request.signal) == null ? void 0 : _a2.removeEventListener("abort", abortXhr);
          }
        }
      });
      function abortXhr() {
        handle.abort();
      }
      (_a = request.signal) == null ? void 0 : _a.addEventListener("abort", abortXhr);
    });
  };
  console.time("x");
  const resp = (await GM_fetch(
    `https://i.pximg.net/img-original/img/2017/05/16/00/20/10/62921231_p0.png`,
    {
      headers: {
        referer: "https://www.pixiv.net/"
      }
    }
  ));
  console.log(resp);
  console.timeLog("x");
  const imgBlob = (await resp.blob());
  console.log(imgBlob.size);
  const imgUrl = URL.createObjectURL(imgBlob);
  const img = new Image();
  img.src = imgUrl;
  document.body.append(img);

})();
