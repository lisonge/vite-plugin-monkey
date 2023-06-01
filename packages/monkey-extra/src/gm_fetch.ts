import { GM_xmlhttpRequest, XhrRequest } from 'vite-plugin-monkey/dist/client';
import { delay, parseHeaders } from './util';

// https://github.com/github/fetch/blob/master/fetch.js

const fixUrl = (url = '') => {
  try {
    return url === '' && location.href ? location.href : url;
  } catch {
    return url;
  }
};

/**
 * simulate window.fetch with GM_xmlhttpRequest
 *
 * because [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) will delete [Forbidden_header_name](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)
 *
 * so you must manually modify these headers by set the second parameter of GM_fetch
 * @example
 * GM_fetch(
 *   new Request('https://www.pixiv.net/', {
 *     headers: { referer: 'https://www.pixiv.net/' }, // it will not work !!!
 *   }),
 * );
 * GM_fetch(new Request('https://www.pixiv.net/'), {
 *   headers: { referer: 'https://www.pixiv.net/' }, // it will work
 *   headers: new Headers({ referer: 'https://www.pixiv.net/' }), // it will also work
 * });
 */
export const GM_fetch = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
  xhrDetails: Partial<XhrRequest> = {},
): Promise<Response> => {
  const request = new Request(input, init);
  if (request.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  const data = await request.blob();
  let binary = true;
  const headers: Record<string, string> = {};
  // can not get [`referer`,`user-agent`,`others`]
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  new Headers(init.headers).forEach((value, key) => {
    headers[key] = value;
  });
  return new Promise<Response>((resolve, reject) => {
    const handle = GM_xmlhttpRequest({
      ...xhrDetails,
      method: request.method.toUpperCase(),
      url: fixUrl(request.url),
      headers,
      data,
      binary,
      responseType: 'blob',
      timeout: 5000,
      async onload(e) {
        await delay();
        const resp = new Response(e.response ?? e.responseText, {
          status: e.status,
          statusText: e.statusText,
          headers: parseHeaders(e.responseHeaders),
        });
        Object.defineProperty(resp, 'url', { value: e.finalUrl });
        resolve(resp);
      },
      async onerror() {
        await delay();
        reject(new TypeError('Network request failed'));
      },
      async ontimeout() {
        await delay();
        reject(new TypeError('Network request failed'));
      },
      async onabort() {
        await delay();
        reject(new DOMException('Aborted', 'AbortError'));
      },
      async onreadystatechange(response) {
        if (response.readyState === 4) {
          request.signal?.removeEventListener('abort', abortXhr);
        }
      },
    });
    function abortXhr() {
      handle.abort();
    }
    request.signal?.addEventListener('abort', abortXhr);
  });
};
