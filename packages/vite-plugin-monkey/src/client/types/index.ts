import type { WebRequestRule } from '../../shared/types';
import type {
  GmCookieFc,
  TamperInfo,
  TamperScriptMeta,
  WebRequestListener,
} from './tampermonkey';
import type { ViolentInfo, ViolentScriptMeta } from './violentmonkey';

type CommonScriptMeta = {
  namespace: string;
  name: string;
  author?: string;
  description?: string;
  icon?: string;
  excludes: string[];
  includes: string[];
  matches: string[];
  resources: {
    name: string;
    url: string;
    content: string;
    meta: string;
  }[];
  runAt: string;
  version: string;
  noframes: boolean;
  unwrap: boolean;
  homepage: string;
};

type ScriptMeta = CommonScriptMeta & TamperScriptMeta & ViolentScriptMeta;

type CommonInfo = {
  version: string;
  scriptHandler: string;
  scriptMetaStr: string;
  scriptSource: string;
  scriptUpdateURL?: string;
  scriptWillUpdate: boolean;
  script: ScriptMeta;
};

/**
 * GM_info Type
 */
export type GmScriptInfo = CommonInfo & TamperInfo & ViolentInfo;

type HTMLElementTagName = keyof HTMLElementTagNameMap;

type GmAddElementFc = {
  <K extends HTMLElementTagName>(
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): HTMLElementTagNameMap[K];

  (tagName: string, attributes?: Partial<HTMLElement>): HTMLElement;

  <K extends HTMLElementTagName>(
    parentNode: Node | Element | ShadowRoot,
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): HTMLElementTagNameMap[K];
  (
    parentNode: Node | Element | ShadowRoot,
    tagName: string,
    attributes?: Partial<HTMLElement>,
  ): HTMLElement;
};

export type GmOpenInTabDetails = {
  active?: boolean;
  insert?: boolean;
  /**
   * @available tampermonkey
   */
  setParent?: boolean;
  /**
   * @available tampermonkey
   */
  incognito?: boolean;
  /**
   * @available violentmonkey
   */
  container?: 0 | 1 | 2;
  /**
   * @available violentmonkey
   */
  pinned?: boolean;
};

type GmOpenHandle = {
  onclose?: () => void;
  closed: boolean;
  close: () => void;
};

type GmOpenInTabFc = {
  (url: string, details?: GmOpenInTabDetails): GmOpenHandle;
  (url: string, openInBackground?: boolean): GmOpenHandle;
};

export type GmNotificationDetails = {
  text: string;
  title?: string;
  image?: string;
  /**
   * @available tampermonkey
   */
  highlight?: boolean;
  /**
   * @available tampermonkey
   */
  silent?: boolean;
  /**
   * @available tampermonkey
   */
  timeout?: number;
  ondone?: () => void;
  onclick?: () => void;
};

/**
 * @available violentmonkey
 */
type GmNotificationControl = {
  /**
   * @available violentmonkey
   */
  remove: () => Promise<void>;
};

type GmNotificationFc = {
  (
    text: string,
    title?: string,
    image?: string,
    onclick?: () => void,
  ): GmNotificationControl;
  (details: GmNotificationDetails, ondone?: () => void): GmNotificationControl;
};

type GmDownloadErrorEvent = {
  /**
   * Error reason
   * - `not_enabled` - the download feature isn't enabled by the user
   * - `not_whitelisted` - the requested file extension is not
   * whitelisted
   * - `not_permitted` - the user enabled the download feature, but did
   * not give the downloads permission
   * - `not_supported` - the download feature isn't supported by the
   * browser/version
   * - `not_succeeded` - the download wasn't started or failed, the
   * details attribute may provide more information
   */
  error:
    | 'not_enabled'
    | 'not_whitelisted'
    | 'not_permitted'
    | 'not_supported'
    | 'not_succeeded';

  details?: string;
};
type GmRequestEventListener<Event> = (this: Event, event: Event) => void;

type GmProgressEventBase = {
  done: number;
  lengthComputable: boolean;
  loaded: number;
  position: number;
  total: number;
  totalSize: number;
};

type GmDownloadProgressEvent = GmProgressEventBase & {
  readonly finalUrl: string;
};

export type GmDownloadRequest = {
  /**
   * URL from where the data should be downloaded
   */
  url: string;
  /**
   * Filename - for security reasons the file extension needs to be
   * whitelisted at Tampermonkey options page
   */
  name: string;
  headers?: Record<string, string>;
  /**
   * Show 'Save As' dialog
   */
  saveAs?: boolean;
  timeout?: number;
  onerror?: GmRequestEventListener<GmDownloadErrorEvent>;
  ontimeout?(): void;
  onload?(): void;
  onprogress?: GmRequestEventListener<GmDownloadProgressEvent>;
};

type GmResponseTypeMap = {
  text: string;
  json: any;
  arraybuffer: ArrayBuffer;
  blob: Blob;
  document: Document;
  stream: ReadableStream<Uint8Array>;
};

type GmResponseType = keyof GmResponseTypeMap;

type GmAbortHandle<TReturn = void> = {
  abort(): TReturn;
};

type GmResponseEventBase<TResponseType extends GmResponseType> = {
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
};

type GmErrorEvent<TResponseType extends GmResponseType> =
  GmResponseEventBase<TResponseType> & {
    error: string;
  };

type GmResponseEvent<
  TContext,
  TResponseType extends GmResponseType,
> = GmResponseEventBase<TResponseType> & {
  finalUrl: string;
  context: TContext;
};

type ProgressResponse<
  TContext,
  TResponseType extends GmResponseType,
> = GmResponseEvent<TContext, TResponseType> & GmProgressEventBase;

export type GmXhrRequest<TContext, TResponseType extends GmResponseType> = {
  method?: string;
  url: string;
  headers?: Record<string, string>;

  data?:
    | string
    | URLSearchParams
    | FormData
    | ArrayBuffer
    | Blob
    | DataView
    | ReadableStream;

  /**
   * @available tampermonkey
   */
  redirect?: `follow` | `error` | `manual`;

  /**
   * @available tampermonkey
   */
  cookie?: string;

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

  onerror?: GmRequestEventListener<GmErrorEvent<TResponseType>>;

  /**
   * @available violentmonkey
   */
  onloadend?: GmRequestEventListener<GmResponseEvent<TContext, TResponseType>>;

  onloadstart?: GmRequestEventListener<
    GmResponseEvent<TContext, TResponseType>
  >;

  onprogress?: GmRequestEventListener<
    ProgressResponse<TContext, TResponseType>
  >;

  onreadystatechange?: GmRequestEventListener<
    GmResponseEvent<TContext, TResponseType>
  >;

  ontimeout?: () => void;

  onload?: GmRequestEventListener<GmResponseEvent<TContext, TResponseType>>;
};

type GmXhr = {
  <TContext, TResponseType extends GmResponseType = 'text'>(
    details: GmXhrRequest<TContext, TResponseType>,
  ): GmAbortHandle;

  /**
   * @available tampermonkey
   * @see [tampermonkey#1278](https://github.com/Tampermonkey/tampermonkey/issues/1278#issuecomment-884363078)
   */
  RESPONSE_TYPE_STREAM?: 'stream';
};

export type MonkeyWindow = typeof window & {
  unsafeWindow: typeof window;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.close
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   */
  close: () => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.focus
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   */
  focus: () => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
   * @available tampermonkey
   */
  onurlchange?: null;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
   * @available tampermonkey
   */
  addEventListener: (
    type: 'urlchange',
    cb: (data: { url: string }) => void,
  ) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
   * @available tampermonkey
   */
  removeEventListener: (
    type: 'urlchange',
    cb: (...args: unknown[]) => unknown,
  ) => void;

  GM: {
    addStyle: MonkeyWindow['GM_addStyle'];
    addElement: MonkeyWindow['GM_addElement'];

    /**
     * @see https://wiki.greasespot.net/GM.registerMenuCommand
     */
    registerMenuCommand: MonkeyWindow['GM_registerMenuCommand'];

    /**
     * @see https://wiki.greasespot.net/GM.info
     */
    info: MonkeyWindow['GM_info'];

    /**
     * @available tampermonkey
     */
    cookie: MonkeyWindow['GM_cookie'];

    /**
     * @see https://wiki.greasespot.net/GM.notification
     */
    notification: MonkeyWindow['GM_notification'];

    /**
     * @see https://wiki.greasespot.net/GM.openInTab
     */
    openInTab: MonkeyWindow['GM_openInTab'];

    /**
     * @see https://wiki.greasespot.net/GM.setClipboard
     */
    setClipboard: MonkeyWindow['GM_setClipboard'];

    /**
     * @see https://wiki.greasespot.net/GM.xmlHttpRequest
     */
    xmlHttpRequest: MonkeyWindow['GM_xmlhttpRequest'];

    /**
     * @see https://wiki.greasespot.net/GM.deleteValue
     */
    deleteValue: (key: string) => Promise<void>;

    /**
     * @see https://wiki.greasespot.net/GM.getResourceUrl
     */
    getResourceURL: (name: string, isBlobUrl?: boolean) => Promise<string>;

    /**
     * @see https://wiki.greasespot.net/GM.getValue
     */
    getValue: <T = unknown>(key: string, defaultValue: T) => Promise<T>;

    /**
     * @see https://wiki.greasespot.net/GM.listValues
     */
    listValues: () => Promise<string[]>;

    /**
     * @see https://wiki.greasespot.net/GM.setValue
     */
    setValue: (key: string, value: unknown) => Promise<void>;
  };

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_addElement
   * @see https://violentmonkey.github.io/api/gm/#gm_addelement
   */
  GM_addElement: GmAddElementFc;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
   * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
   */
  GM_addStyle: (css: string) => HTMLStyleElement;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   */
  GM_addValueChangeListener: <T = unknown>(
    name: string,
    callback: (
      name: string,
      oldValue?: T,
      newValue?: T,
      remote?: boolean,
    ) => void,
  ) => string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
   * @see https://www.tampermonkey.net/documentation.php##api:GM_cookie.set
   * @see https://www.tampermonkey.net/documentation.php##api:GM_cookie.delete
   * @available tampermonkey
   */
  GM_cookie: GmCookieFc;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_deleteValue
   * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
   */
  GM_deleteValue: (name: string) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getResourceText
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
   */
  GM_getResourceText: (name: string) => string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
   */
  GM_getResourceURL: (name: string, isBlobUrl?: boolean) => string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
   */
  GM_getValue: <T = unknown>(key: string, defaultValue?: T) => T;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getTab
   * @available tampermonkey
   */
  GM_getTab: <T = any>(callback: (tab: T) => void) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
   * @available tampermonkey
   */
  GM_getTabs: <T = any>(
    callback: (tabsMap: { [tabId: number]: T }) => void,
  ) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_info
   * @see https://violentmonkey.github.io/api/gm/#gm_info
   */
  GM_info: GmScriptInfo;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_listValues
   * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
   */
  GM_listValues: () => string[];

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_log
   * @available tampermonkey
   */
  GM_log: (...data: any[]) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_notification
   * @see https://violentmonkey.github.io/api/gm/#gm_notification
   */
  GM_notification: GmNotificationFc;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
   * @see https://violentmonkey.github.io/api/gm/#gm_openintab
   */
  GM_openInTab: GmOpenInTabFc;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
   */
  GM_registerMenuCommand: <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
    accessKey?: string,
  ) => string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_removeValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
   */
  GM_removeValueChangeListener: (listenerId: string) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_saveTab
   * @available tampermonkey
   */
  GM_saveTab: (tab: unknown) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_setClipboard
   * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
   */
  GM_setClipboard: (data: string, type: string) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_setValue
   * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
   */
  GM_setValue: (key: string, value: unknown) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_unregisterMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
   */
  GM_unregisterMenuCommand: (caption: string) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
   * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   */
  GM_xmlhttpRequest: GmXhr;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_download
   * @see https://violentmonkey.github.io/api/gm/#gm_download
   */
  GM_download: {
    (options: GmDownloadRequest): GmAbortHandle<boolean>;
    (url: string, name?: string): GmAbortHandle<boolean>;
  };

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   */
  GM_webRequest: (
    rules: WebRequestRule[],
    listener: WebRequestListener,
  ) => void;
};
