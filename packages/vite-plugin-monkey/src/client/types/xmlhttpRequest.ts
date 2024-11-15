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

export interface GmResponseEventBase<TResponseType extends GmResponseType> {
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
  response: GmResponseTypeMap[TResponseType];
  responseText: string;
  responseXML: Document | null;
  status: number;
  statusText: string;
}

interface GmErrorEvent<TResponseType extends GmResponseType>
  extends GmResponseEventBase<TResponseType> {
  error: string;
}

interface GmResponseEvent<TResponseType extends GmResponseType, TContext>
  extends GmResponseEventBase<TResponseType> {
  finalUrl: string;
  context: TContext;
}

export interface GmProgressResponseEvent<
  TResponseType extends GmResponseType,
  TContext,
> extends GmResponseEvent<TResponseType, TContext>,
    GmProgressEventBase {}

export interface GmXmlhttpRequestOption<
  TResponseType extends GmResponseType,
  TContext,
> {
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
  context?: TContext;

  /**
   * @tampermonkey  text, json, arraybuffer, blob, document, stream
   * @violentmonkey text, json, arraybuffer, blob, document
   * @default
   * 'text'
   */
  responseType?: TResponseType;

  overrideMimeType?: string;

  anonymous?: boolean;

  /**
   * @available tampermonkey
   */
  fetch?: boolean;

  user?: string;

  password?: string;

  onabort?: () => void;

  onerror?: GmReponseEventListener<GmErrorEvent<TResponseType>>;

  /**
   * @available violentmonkey
   */
  onloadend?: GmReponseEventListener<GmResponseEvent<TResponseType, TContext>>;

  onloadstart?: GmReponseEventListener<
    GmResponseEvent<TResponseType, TContext>
  >;

  onprogress?: GmReponseEventListener<
    GmProgressResponseEvent<TResponseType, TContext>
  >;

  onreadystatechange?: GmReponseEventListener<
    GmResponseEvent<TResponseType, TContext>
  >;

  ontimeout?: () => void;

  onload?: GmReponseEventListener<GmResponseEvent<TResponseType, TContext>>;
}

export interface GmXmlhttpRequestType {
  <TResponseType extends GmResponseType = 'text', TContext = any>(
    details: GmXmlhttpRequestOption<TResponseType, TContext>,
  ): GmAbortHandle;

  /**
   * @see [tampermonkey#1278](https://github.com/Tampermonkey/tampermonkey/issues/1278#issuecomment-884363078)
   */
  RESPONSE_TYPE_STREAM?: 'stream';
}

export interface GmAsyncXmlhttpRequestReturnType<
  TResponseType extends GmResponseType,
  TContext,
> extends GmAbortHandle,
    Promise<GmResponseEvent<TResponseType, TContext>> {}

export interface GmAsyncXmlhttpRequestType {
  <TResponseType extends GmResponseType = 'text', TContext = any>(
    details: GmXmlhttpRequestOption<TResponseType, TContext>,
  ): GmAsyncXmlhttpRequestReturnType<TResponseType, TContext>;

  RESPONSE_TYPE_STREAM?: 'stream';
}
