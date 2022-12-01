import { monkeyWindow } from 'vite-plugin-monkey/dist/client';
import { lazy, parseHeaders } from './util';

type InterceptorChain = {
  request: Request;
  /**
   * @param request if not set, use chain.request
   */
  proceed: (request?: Request) => Promise<Response>;
};

type NetworkInterceptor = (
  chain: InterceptorChain,
) => Response | Promise<Response>;

type FetchType = typeof fetch;

type WindowLike = {
  fetch: FetchType;
};

const produceChain = (
  originalFetch: FetchType,
  interceptors: (NetworkInterceptor | null)[],
  request: Request,
  index = 0,
): InterceptorChain => {
  return {
    request,
    proceed: async (req = request) => {
      while (index < interceptors.length) {
        const target = interceptors[index];
        if (target) {
          return target(
            produceChain(originalFetch, interceptors, req, index + 1),
          );
        }
        index++;
      }
      return originalFetch(req);
    },
  };
};

export class InterceptorManager {
  private interceptors: (NetworkInterceptor | null)[] = [];
  private FetchKey = Symbol(`originalFetch`);

  use = (interceptor: NetworkInterceptor): number => {
    this.interceptors.push(interceptor);
    return this.interceptors.length - 1;
  };
  eject = (id: number) => {
    this.interceptors[id] = null;
  };
  clear = () => {
    for (let i = 0; i < this.interceptors.length; i++) {
      this.interceptors[i] = null;
    }
  };
  hook = (target: WindowLike) => {
    if (Reflect.get(target, this.FetchKey)) {
      return;
    }
    const originalFetch = target.fetch;
    const fakeFetch: FetchType = async (input, init) => {
      return produceChain(
        originalFetch,
        this.interceptors,
        new Request(input, init),
      ).proceed();
    };
    Reflect.set(target, this.FetchKey, target.fetch);
    target.fetch = fakeFetch;
  };

  unhook = (target: WindowLike) => {
    if (!Reflect.get(target, this.FetchKey)) {
      return;
    }
    Reflect.set(
      target,
      this.FetchKey,
      Reflect.get(target, this.FetchKey) ?? target.fetch,
    );
    Reflect.deleteProperty(target, this.FetchKey);
  };
}

export const UnsafeWindowInterceptorManager = /* @__PURE__ */ lazy(() => {
  const t = new InterceptorManager();
  t.hook(monkeyWindow.unsafeWindow ?? window);
  return t;
});

type OnloadType = typeof XMLHttpRequest.prototype.onload;
type OnreadystatechangeType =
  typeof XMLHttpRequest.prototype.onreadystatechange;

class FakeXMLHttpRequest extends XMLHttpRequest {
  _method = 'GET';
  _url: URL = new URL(location.origin);
  _reqHeaders = new Headers();

  open(
    method: string,
    url: string | URL,
    async = true,
    username?: string | null | undefined,
    password?: string | null | undefined,
  ): void {
    const u = new URL(url, location.pathname);
    if (username) {
      u.username = username;
    }
    if (password) {
      u.password = password;
    }
    this._url = u;
    this._method = method;
    return super.open(method, url, async, username, password);
  }
  setRequestHeader(name: string, value: string): void {
    this._reqHeaders.append(name, value);
  }
  async send(body: Document | XMLHttpRequestBodyInit | null = null) {
    let bd = body;
    if (bd && bd instanceof Document) {
      bd = new Blob([new XMLSerializer().serializeToString(bd)], {
        type: bd.contentType,
      });
    }
    let req = new Request(this._url, {
      headers: this._reqHeaders,
      method: this._method,
      body: bd,
      credentials: this.withCredentials ? `include` : `omit`,
    });
    // TODO 发起请求前拦截
    req.headers.forEach((value, key) => {
      this.setRequestHeader(key, value);
    });
    if (req.body) {
      return super.send(await req.blob());
    }
    return super.send();
  }

  _responseType: XMLHttpRequestResponseType = '';
  get responseType(): XMLHttpRequestResponseType {
    return 'blob';
  }
  set responseType(value: XMLHttpRequestResponseType) {
    this._responseType = value;
  }

  _onreadystatechange: OnreadystatechangeType = null;

  _onload: OnloadType = null;
  get onload(): OnloadType {
    return this._onload;
  }
  set onload(value: OnloadType) {
    if (value === null) {
      this._onload = null;
    } else {
      this._onload = async (ev) => {
        // https://github.com/github/fetch/blob/fb5b0cf42b470faf8c5448ab461d561f34380a30/fetch.js#L521

        const resp = new Response(this.response ?? this.responseText, {
          status: this.status,
          statusText: this.statusText,
          headers: parseHeaders(this.getAllResponseHeaders() || ``),
        });
        Object.defineProperty(resp, 'url', {
          value: this.responseURL ?? this.getResponseHeader(`X-Request-URL`),
        });
        // TODO 完全收到回复后拦截

        const blob = await resp.blob();

        if (this.responseType == 'text' || this.responseType == '') {
        } else if (this.responseType == 'arraybuffer') {
        } else if (this.responseType == 'blob') {
        } else if (this.responseType == 'json') {
        } else if (this.responseType == 'document') {
          // TODO
        }
        value.call(this, ev);
      };
    }
  }
}

/**
 * https://juejin.cn/post/6938308842849566727#heading-16
 * https://bbs.tampermonkey.net.cn/thread-3284-1-1.html
 *
 */
