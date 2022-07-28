import { IArray, LocaleType } from './common';

export type TamperRunAt =
  | 'document-start'
  | 'document-body'
  | 'document-end'
  | 'document-idle'
  | 'context-menu';

export type TamperGrant =
  | 'unsafeWindow'
  | 'window.close'
  | 'window.focus'
  | 'window.onurlchange'
  | 'GM_addStyle'
  | 'GM_addElement'
  | 'GM_deleteValue'
  | 'GM_listValues'
  | 'GM_addValueChangeListener'
  | 'GM_removeValueChangeListener'
  | 'GM_setValue'
  | 'GM_getValue'
  | 'GM_log'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_registerMenuCommand'
  | 'GM_unregisterMenuCommand'
  | 'GM_openInTab'
  | 'GM_xmlhttpRequest'
  | 'GM_download'
  | 'GM_getTab'
  | 'GM_saveTab'
  | 'GM_getTabs'
  | 'GM_notification'
  | 'GM_setClipboard'
  | 'GM_info';

export const TamperGrantValueList: TamperGrant[] = [
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange',
  'GM_addStyle',
  'GM_addElement',
  'GM_deleteValue',
  'GM_listValues',
  'GM_addValueChangeListener',
  'GM_removeValueChangeListener',
  'GM_setValue',
  'GM_getValue',
  'GM_log',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_registerMenuCommand',
  'GM_unregisterMenuCommand',
  'GM_openInTab',
  'GM_xmlhttpRequest',
  'GM_download',
  'GM_getTab',
  'GM_saveTab',
  'GM_getTabs',
  'GM_notification',
  'GM_setClipboard',
  'GM_info',
];

export type AntifeatureType = {
  tag?: string;
  type: 'ads' | 'tracking' | 'miner';
  description: string;
};

/**
 * @see https://www.tampermonkey.net/documentation.php
 */
export interface TampermonkeyUserScript {
  /**
   * @see https://www.tampermonkey.net/documentation.php#_name
   *
   */
  name?: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_namespace
   */
  namespace: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_version
   *
   */
  version?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_author
   *
   */
  author?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_description
   *
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   *
   */
  homepage?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   *
   */
  homepageURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  website?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  source?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  icon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  iconURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  defaulticon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon64_and_icon64URL
   */
  icon64?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon64_and_icon64URL
   */
  icon64URL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_updateURL
   */
  updateURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_downloadURL
   */
  downloadURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_supportURL
   */
  supportURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_include
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_require
   */
  require?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_resource
   */
  resource?: Record<string, string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_connect
   */
  connect?: IArray<string>;

  // /**
  //  * @see https://www.tampermonkey.net/documentation.php#_run_at
  //  */
  // 'run-at'?: TamperRunAt;

  // /**
  //  * @see https://www.tampermonkey.net/documentation.php#_grant
  //  *
  //  */
  // grant?: IArray<TamperGrant> | 'none' | '*';

  /**
   * @see https://www.tampermonkey.net/documentation.php#_antifeature
   */
  antifeature?: IArray<AntifeatureType>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_noframes
   */
  noframes?: boolean;

  // extra?: [string, string][] | Record<string, IArray<string>>;
}
