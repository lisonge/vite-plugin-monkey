import { IArray, LocaleType } from '../types';

export type GreaseRunAt = 'document-start' | 'document-end' | 'document-idle';

export type GreaseGrant =
  | 'GM.info'
  | 'GM.deleteValue'
  | 'GM.getValue'
  | 'GM.listValues'
  | 'GM.setValue'
  | 'GM.getResourceUrl'
  | 'GM.notification'
  | 'GM.openInTab'
  | 'GM.registerMenuCommand'
  | 'GM.setClipboard'
  | 'GM.xmlHttpRequest'
  | 'unsafeWindow';

export const GreaseGrantValueList: GreaseGrant[] = [
  'GM.info',
  'GM.deleteValue',
  'GM.getValue',
  'GM.listValues',
  'GM.setValue',
  'GM.getResourceUrl',
  'GM.notification',
  'GM.openInTab',
  'GM.registerMenuCommand',
  'GM.setClipboard',
  'GM.xmlHttpRequest',
  'unsafeWindow',
];

/**
 * @see https://wiki.greasespot.net/Metadata_Block
 */
export interface GreasemonkeyUserScript {
  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40name
   *
   */
  name?: string | LocaleType<string>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40namespace
   */
  namespace?: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40version
   *
   */
  version?: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40description
   *
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40icon
   */
  icon?: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40include
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40require
   */
  require?: IArray<string>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40resource
   */
  resource?: Record<string, string>;

  // /**
  //  * @see https://wiki.greasespot.net/Metadata_Block#.40run-at
  //  */
  // 'run-at'?: GreaseRunAt;

  // /**
  //  * @see https://wiki.greasespot.net/Metadata_Block#.40grant
  //  * @see https://wiki.greasespot.net/Greasemonkey_Manual:API
  //  */
  // grant?: IArray<GreaseGrant> | 'none' | '*';

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40noframes
   */
  noframes?: boolean;

  // extra?: [string, string][] | Record<string, IArray<string>>;
}
