import type {
  XhrOnloadType,
  XhrOnreadystatechangeType,
  XMLHttpRequestType,
} from './types';
import { parseHeaders } from './util';

const fakeXhr = (XMLHttpRequestLike: XMLHttpRequestType) => {
  return class FakeXMLHttpRequest extends XMLHttpRequestLike {
    _method = 'GET';
    _url: URL = new URL(location.origin);
    _reqHeaders = new Headers();

    open(
      method: string,
      url: string | URL,
      async = true,
      username?: string | null | undefined,
      password?: string | null | undefined,
    ) {
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
    setRequestHeader(name: string, value: string) {
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

    // _responseType: XMLHttpRequestResponseType = '';
    // get responseType(): XMLHttpRequestResponseType {
    //   return 'blob';
    // }
    // set responseType(value: XMLHttpRequestResponseType) {
    //   this._responseType = value;
    // }

    _onreadystatechange: XhrOnreadystatechangeType = null;

    _onload: XhrOnloadType = null;
    get onload(): XhrOnloadType {
      return this._onload;
    }
    set onload(value: XhrOnloadType) {
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
  };
};

export const buildXhrInterceptorManager = () => {
  fakeXhr.apply;
};

/**
 * https://juejin.cn/post/6938308842849566727#heading-16
 * https://bbs.tampermonkey.net.cn/thread-3284-1-1.html
 *
 */
