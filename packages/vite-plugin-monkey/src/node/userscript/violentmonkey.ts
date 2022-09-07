import { IArray, LocaleType } from '../types';

export type ViolentRunAt = 'document-end' | 'document-start' | 'document-idle';
export type ViolentInjectInto = 'page' | 'content' | 'auto';

export type ViolentGrant =
  | 'window.close'
  | 'window.focus'
  | 'GM_info'
  | 'GM_getValue'
  | 'GM_setValue'
  | 'GM_deleteValue'
  | 'GM_listValues'
  | 'GM_addValueChangeListener'
  | 'GM_removeValueChangeListener'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_addElement'
  | 'GM_addStyle'
  | 'GM_openInTab'
  | 'GM_registerMenuCommand'
  | 'GM_unregisterMenuCommand'
  | 'GM_notification'
  | 'GM_setClipboard'
  | 'GM_xmlhttpRequest'
  | 'GM_download'
  | 'GM.addStyle'
  | 'GM.addElement'
  | 'GM.registerMenuCommand'
  | 'GM.deleteValue'
  | 'GM.getResourceUrl'
  | 'GM.getValue'
  | 'GM.info'
  | 'GM.listValues'
  | 'GM.notification'
  | 'GM.openInTab'
  | 'GM.setClipboard'
  | 'GM.setValue'
  | 'GM.xmlHttpRequest';

export const ViolentGrantValueList: ViolentGrant[] = [
  'window.close',
  'window.focus',
  'GM_info',
  'GM_getValue',
  'GM_setValue',
  'GM_deleteValue',
  'GM_listValues',
  'GM_addValueChangeListener',
  'GM_removeValueChangeListener',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_addElement',
  'GM_addStyle',
  'GM_openInTab',
  'GM_registerMenuCommand',
  'GM_unregisterMenuCommand',
  'GM_notification',
  'GM_setClipboard',
  'GM_xmlhttpRequest',
  'GM_download',
  'GM.addStyle',
  'GM.addElement',
  'GM.registerMenuCommand',
  'GM.deleteValue',
  'GM.getResourceUrl',
  'GM.getValue',
  'GM.info',
  'GM.listValues',
  'GM.notification',
  'GM.openInTab',
  'GM.setClipboard',
  'GM.setValue',
  'GM.xmlHttpRequest',
];

/**
 * @see https://violentmonkey.github.io/api/metadata-block/
 */
export interface ViolentmonkeyUserScript {
  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#name
   *
   */
  name?: string | LocaleType<string>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#namespace
   */
  namespace: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#version
   *
   */
  version?: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#description
   *
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#icon
   */
  icon?: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#downloadurl
   */
  downloadURL?: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#supporturl
   */
  supportURL?: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#homepageurl
   *
   */
  homepageURL?: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#include--exclude
   * @see https://violentmonkey.github.io/api/matching/#include--exclude
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#match--exclude-match
   * @see https://violentmonkey.github.io/api/matching/#match--exclude-match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#match--exclude-match
   * @see https://violentmonkey.github.io/api/matching/#match--exclude-match
   */
  'exclude-match'?: IArray<string | RegExp>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#include--exclude
   * @see https://violentmonkey.github.io/api/matching/#include--exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#require
   */
  require?: IArray<string>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#resource
   */
  resource?: Record<string, string>;

  // /**
  //  * @see https://violentmonkey.github.io/api/metadata-block/#resource
  //  */
  // 'run-at'?: ViolentRunAt;

  // /**
  //  * @see https://violentmonkey.github.io/api/metadata-block/#grant
  //  * @see https://violentmonkey.github.io/api/gm/
  //  */
  // grant?: IArray<ViolentGrant> | 'none' | '*';

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#noframes
   */
  noframes?: boolean;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#inject-into
   */
  'inject-into'?: ViolentInjectInto;

  // extra?: [string, string][] | Record<string, IArray<string>>;
}
