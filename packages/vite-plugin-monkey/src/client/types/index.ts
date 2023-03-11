import type { WebRequestRule } from '../../shared/types';
import type {
  CookieFn,
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
export type ScriptInfo = CommonInfo & TamperInfo & ViolentInfo;

// type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
//   T,
// >() => T extends Y ? 1 : 2
//   ? A
//   : B;

// type WritableKeys<T> = {
//   [P in keyof T]-?: IfEquals<
//     { [Q in P]: T[P] },
//     { -readonly [Q in P]: T[P] },
//     P
//   >;
// }[keyof T];

// type KV<T = unknown> = Partial<T>;
type HTMLElementTagName = keyof HTMLElementTagNameMap;

type AddElementFn = {
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

export type OpenInTabDetails = {
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

type OpenInTabFn = {
  (url: string, details?: OpenInTabDetails): {
    onclose?: () => void;
    closed: boolean;
    close: () => void;
  };
  (url: string, openInBackground?: boolean): {
    onclose?: () => void;
    closed: boolean;
    close: () => void;
  };
};

export type NotificationDetails = {
  text: string;
  title?: string;
  image?: string;
  /**
   * @available tampermonkey
   */
  highlight?: string;
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
type NotificationControl = {
  /**
   * @available violentmonkey
   */
  remove: () => Promise<void>;
};
type NotificationFn = {
  (
    text: string,
    title?: string,
    image?: string,
    onclick?: () => void,
  ): NotificationControl;
  (details: NotificationDetails, ondone?: () => void): NotificationControl;
};

type DownloadErrorResponse = {
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
  /** Detail about that error */
  details?: string;
};
type RequestEventListener<TResponse> = (
  this: TResponse,
  response: TResponse,
) => void;

type ProgressResponseBase = {
  done: number;
  lengthComputable: boolean;
  loaded: number;
  position: number;
  total: number;
  totalSize: number;
};
type DownloadProgressResponse = ProgressResponseBase & {
  readonly finalUrl: string;
};

export type DownloadRequest = {
  /** URL from where the data should be downloaded */
  url: string;
  /**
   * Filename - for security reasons the file extension needs to be
   * whitelisted at Tampermonkey options page
   */
  name: string;
  headers?: Record<string, string>;
  /** Show 'Save As' dialog */
  saveAs?: boolean;
  timeout?: number;
  /** Callback to be executed if this download ended up with an error */
  onerror?: RequestEventListener<DownloadErrorResponse>;
  /** Callback to be executed if this download finished */
  ontimeout?(): void;
  /** Callback to be executed if this download finished */
  onload?(): void;
  /** Callback to be executed if this download failed due to a timeout */
  onprogress?: RequestEventListener<DownloadProgressResponse>;
};

type AbortHandle<TReturn = void> = {
  abort(): TReturn;
};

type ResponseBase = {
  readonly responseHeaders: string;
  /**
   * Unsent = 0,
   * Opened = 1,
   * HeadersReceived = 2,
   * Loading = 3,
   * Done = 4
   */
  readonly readyState: 0 | 1 | 2 | 3 | 4;
  readonly response: any;
  readonly responseText: string;
  readonly responseXML: Document | null;
  readonly status: number;
  readonly statusText: string;
};

type ErrorResponse = ResponseBase & {
  readonly error: string;
};

type TResponse<TContext> = ResponseBase & {
  readonly finalUrl: string;
  readonly context: TContext;
};
type ProgressResponse<TContext> = TResponse<TContext> & ProgressResponseBase;
export type XhrRequest<TContext = object> = {
  method?: 'GET' | 'HEAD' | 'POST';
  /** Destination URL */
  url: string;
  /**
   * i.e. user-agent, referer... (some special headers are not supported
   * by Safari and Android browsers)
   */
  headers?: Record<string, string>;
  /**
   * @tampermonkey string
   * @violentmonkey string | FormData | Blob
   */
  data?: string | FormData | Blob;

  /**
   * @available tampermonkey
   */
  cookie?: string;
  /** Send the data string in binary mode */
  binary?: boolean;

  /**
   * @available tampermonkey
   */
  nocache?: boolean;

  /**
   * @available tampermonkey
   */
  revalidate?: boolean;
  /** Timeout in ms */
  timeout?: number;
  /** Property which will be added to the response object */
  context?: TContext;

  /**
   * @tampermonkey arraybuffer, blob, json, stream
   * @violentmonkey arraybuffer, blob, json, text, document
   * @default 'text' // violentmonkey
   */
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'json'
    | 'stream'
    | 'document'
    | 'text';
  /** MIME type for the request */
  overrideMimeType?: string;
  /** Don't send cookies with the requests (please see the fetch notes) */
  anonymous?: boolean;
  /**
   * (Beta) Use a fetch instead of a xhr request(at Chrome this causes
   * `xhr.abort`, `details.timeout` and `xhr.onprogress` to not work and
   * makes `xhr.onreadystatechange` receive only readyState 4 events)
   * @available tampermonkey
   */
  fetch?: boolean;

  user?: string;
  password?: string;

  // Events

  /** Callback to be executed if the request was aborted */
  onabort?: () => void;
  /** Callback to be executed if the request ended up with an error */
  onerror?: RequestEventListener<ErrorResponse>;

  /**
   * @available violentmonkey
   */
  onloadend?: RequestEventListener<TResponse<TContext>>;

  /** Callback to be executed if the request started to load */
  onloadstart?: RequestEventListener<TResponse<TContext>>;
  /** Callback to be executed if the request made some progress */
  onprogress?: RequestEventListener<ProgressResponse<TContext>>;
  /** Callback to be executed if the request's ready state changed */
  onreadystatechange?: RequestEventListener<TResponse<TContext>>;
  /** Callback to be executed if the request failed due to a timeout */
  ontimeout?: () => void;
  /** Callback to be executed if the request was loaded */
  onload?: RequestEventListener<TResponse<TContext>>;
};

export type MonkeyWindow = Window & {
  unsafeWindow: Window;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   */
  close: () => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   */
  focus: () => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
   * @available tampermonkey
   */
  onurlchange?: null;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
   * @available tampermonkey
   */
  addEventListener: (
    type: 'urlchange',
    cb: (data: { url: string }) => void,
  ) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
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
  GM_addElement: AddElementFn;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
   * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
   */
  GM_addStyle: (css: string) => HTMLStyleElement;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   */
  GM_addValueChangeListener: (
    name: string,
    callback: <T = unknown>(
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
  GM_cookie: CookieFn;

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
   * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
   */
  GM_getValue: <T = unknown>(key: string, defaultValue: T) => T;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getTab
   * @available tampermonkey
   */
  GM_getTab: (callback: (obj: unknown) => void) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
   * @available tampermonkey
   */
  GM_getTabs: (
    callback: (tabsMap: { [tabId: number]: unknown }) => void,
  ) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_info
   * @see https://violentmonkey.github.io/api/gm/#gm_info
   */
  GM_info: ScriptInfo;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_listValues
   * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
   */
  GM_listValues: () => string[];

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_log
   * @available tampermonkey
   */
  GM_log: (message: unknown) => void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_notification
   * @see https://violentmonkey.github.io/api/gm/#gm_notification
   */
  GM_notification: NotificationFn;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
   * @see https://violentmonkey.github.io/api/gm/#gm_openintab
   */
  GM_openInTab: OpenInTabFn;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
   */
  GM_registerMenuCommand: <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
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
  GM_saveTab: (tab: object) => void;

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
  GM_xmlhttpRequest: <TContext>(details: XhrRequest<TContext>) => AbortHandle;

  /**
   * @see https://www.tampermonkey.net/documentation.php#GM_download
   * @see https://violentmonkey.github.io/api/gm/#gm_download
   */
  GM_download: {
    (options: DownloadRequest): AbortHandle<boolean>;
    (url: string, name?: string): AbortHandle<boolean>;
  };

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   */
  GM_webRequest: (
    rules: WebRequestRule[],
    listener: WebRequestListener,
  ) => void;
};
