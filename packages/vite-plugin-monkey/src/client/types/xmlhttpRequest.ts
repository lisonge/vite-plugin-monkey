import type {
  GmAbortHandle,
  GmProgressEventBase,
  GmReponseEventListener,
} from './_share';

export interface GmResponseTypeMap {
  text: string;
  json: any;
  arraybuffer: ArrayBuffer;
  blob: Blob;
  document: Document;
  stream: ReadableStream<Uint8Array>;
}

export type GmResponseType = keyof GmResponseTypeMap;

export interface GmResponseEventBase<R extends GmResponseType> {
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
  response: GmResponseTypeMap[R];
  responseText: string;
  responseXML: Document | null;
  status: number;
  statusText: string;
}

interface GmErrorEvent<R extends GmResponseType>
  extends GmResponseEventBase<R> {
  error: string;
}

export interface GmResponseEvent<R extends GmResponseType, C>
  extends GmResponseEventBase<R> {
  finalUrl: string;
  context: C;
}

export interface GmProgressResponseEvent<R extends GmResponseType, C>
  extends GmResponseEvent<R, C>,
    GmProgressEventBase {}

export interface GmXmlhttpRequestOption<R extends GmResponseType, C> {
  method?: string;
  url: string;
  headers?: Record<string, string>;

  data?: BodyInit;

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

  /**
   * @available tampermonkey
   */
  fetch?: boolean;

  user?: string;

  password?: string;

  onabort?: () => void;

  onerror?: GmReponseEventListener<GmErrorEvent<R>>;

  /**
   * @available violentmonkey
   */
  onloadend?: GmReponseEventListener<GmResponseEvent<R, C>>;

  onloadstart?: GmReponseEventListener<GmResponseEvent<R, C>>;

  onprogress?: GmReponseEventListener<GmProgressResponseEvent<R, C>>;

  onreadystatechange?: GmReponseEventListener<GmResponseEvent<R, C>>;

  ontimeout?: () => void;

  onload?: GmReponseEventListener<GmResponseEvent<R, C>>;
}

export interface GmXmlhttpRequestExtType {
  /**
   * @see [tampermonkey#1278](https://github.com/Tampermonkey/tampermonkey/issues/1278#issuecomment-884363078)
   */
  RESPONSE_TYPE_STREAM?: 'stream';
}

export interface GmXmlhttpRequestType extends GmXmlhttpRequestExtType {
  <R extends GmResponseType = 'text', C = any>(
    details: GmXmlhttpRequestOption<R, C>,
  ): GmAbortHandle;
}

export interface GmAsyncXmlhttpRequestReturnType<
  R extends GmResponseType,
  C = any,
> extends GmAbortHandle,
    Promise<GmResponseEvent<R, C>> {}

export interface GmAsyncXmlhttpRequestType extends GmXmlhttpRequestExtType {
  <R extends GmResponseType = 'text', C = any>(
    details: GmXmlhttpRequestOption<R, C>,
  ): GmAsyncXmlhttpRequestReturnType<R, C>;
}
