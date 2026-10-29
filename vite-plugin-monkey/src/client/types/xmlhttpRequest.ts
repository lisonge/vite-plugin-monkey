import type {
  GmAbortHandle,
  GmProgressEventBase,
  GmReponseEventListener,
} from './_share.ts';

export interface GmResponseTypeMap<Json = unknown> {
  text: string;
  json: Json;
  arraybuffer: ArrayBuffer;
  blob: Blob;
  document: Document;
  stream: ReadableStream<Uint8Array>;
}

export type GmResponseType = keyof GmResponseTypeMap;

export interface GmResponseEventBase<R extends GmResponseType, Json = unknown> {
  responseHeaders: string;
  /**
   * 0 = XMLHttpRequest.UNSENT
   *
   * 1 = XMLHttpRequest.OPENED
   *
   * 2 = XMLHttpRequest.HEADERS_RECEIVED
   *
   * 3 = XMLHttpRequest.HEADERS_RECEIVED
   *
   * 4 = XMLHttpRequest.DONE
   */
  readyState: 0 | 1 | 2 | 3 | 4;
  response: GmResponseTypeMap<Json>[R];
  responseText: string;
  responseXML: Document | null;
  status: number;
  statusText: string;
}

interface GmErrorEvent<
  R extends GmResponseType,
  Json = unknown,
> extends GmResponseEventBase<R, Json> {
  error?: string;
}

export interface GmResponseEvent<
  R extends GmResponseType,
  C = undefined,
  Json = unknown,
> extends GmResponseEventBase<R, Json> {
  finalUrl: string;
  context: C;
}

export interface GmProgressResponseEvent<
  R extends GmResponseType,
  C = undefined,
  Json = unknown,
>
  extends GmResponseEvent<R, C, Json>, GmProgressEventBase {}

export interface GmRequestProxy {
  type: 'direct' | 'http' | 'https' | 'socks' | 'socks4';
  host: string;
  port: number;
  username?: string;
  password?: string;
  proxyDNS?: boolean;
  failoverTimeout?: number;
  proxyAuthorizationHeader?: string;
  connectionIsolationKey?: string;
}

export interface GmXmlhttpRequestOption<
  R extends GmResponseType,
  C = undefined,
  Json = unknown,
> {
  method?: string;
  /** Blob/File URLs require Tampermonkey 5.4.6226+. */
  url: string | URL | Blob | File;
  headers?: Record<string, string>;

  data?: BodyInit | Record<string, unknown> | unknown[];

  /** Tampermonkey 5.5.6233+, Firefox only. */
  proxy?: GmRequestProxy;

  /**
   * @available tampermonkey
   */
  redirect?: `follow` | `error` | `manual`;

  /**
   * @available tampermonkey
   */
  cookie?: string;

  /**
   * @see https://github.com/Tampermonkey/tampermonkey/issues/2057#issuecomment-2114745447
   * @available tampermonkey
   */
  cookiePartition?: {
    topLevelSite?: string;
  };

  binary?: boolean;

  /**
   * @available tampermonkey
   */
  nocache?: boolean;

  /**
   * @available tampermonkey
   */
  revalidate?: boolean;

  timeout?: number;

  /**
   * Property which will be added to the response event object
   */
  context?: C;

  /**
   * @tampermonkey  text, json, arraybuffer, blob, document, stream
   * @violentmonkey text, json, arraybuffer, blob, document
   * @default
   * 'text'
   */
  responseType?: R;

  overrideMimeType?: string;

  anonymous?: boolean;

  /** Greasemonkey / Violentmonkey: include credentials with the request. */
  withCredentials?: boolean;

  /** Violentmonkey 2.32+ / Greasemonkey: upload event handlers. */
  upload?: Pick<
    GmXmlhttpRequestOption<R, C, Json>,
    | 'onabort'
    | 'onerror'
    | 'onload'
    | 'onloadend'
    | 'onloadstart'
    | 'onprogress'
    | 'onreadystatechange'
    | 'ontimeout'
  >;

  /**
   * @available tampermonkey
   */
  fetch?: boolean;

  user?: string;

  password?: string;

  onabort?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;

  onerror?: GmReponseEventListener<GmErrorEvent<R, Json>>;

  /**
   * @available violentmonkey
   */
  onloadend?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;

  onloadstart?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;

  onprogress?: GmReponseEventListener<GmProgressResponseEvent<R, C, Json>>;

  onreadystatechange?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;

  ontimeout?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;

  onload?: GmReponseEventListener<GmResponseEvent<R, C, Json>>;
}

export interface GmXmlhttpRequestExtType {
  /**
   * @see [tampermonkey#1278](https://github.com/Tampermonkey/tampermonkey/issues/1278#issuecomment-884363078)
   */
  RESPONSE_TYPE_STREAM?: 'stream';
}

export interface GmXmlhttpRequestType extends GmXmlhttpRequestExtType {
  <R extends GmResponseType = 'text', C = undefined, Json = unknown>(
    details: GmXmlhttpRequestOption<R, C, Json>,
  ): GmAbortHandle;
}

export interface GmAsyncXmlhttpRequestReturnType<
  R extends GmResponseType,
  C = undefined,
  Json = unknown,
>
  extends GmAbortHandle, Promise<GmResponseEvent<R, C, Json>> {}

export interface GmAsyncXmlhttpRequestType extends GmXmlhttpRequestExtType {
  <R extends GmResponseType = 'text', C = undefined, Json = unknown>(
    details: GmXmlhttpRequestOption<R, C, Json>,
  ): GmAsyncXmlhttpRequestReturnType<R, C, Json> | void;
}
