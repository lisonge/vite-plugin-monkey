import type { GmWebRequestRule } from '../../client/types/webRequest';
import type { IArray, LocaleType } from '../types';

export type TamperRunAt =
  | 'document-start'
  | 'document-body'
  | 'document-end'
  | 'document-idle'
  | 'context-menu';

export interface AntifeatureType {
  tag?: string;
  type: 'ads' | 'tracking' | 'miner';
  description: string;
}

/**
 * @see https://www.tampermonkey.net/documentation.php
 */
export interface TampermonkeyUserScript {
  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:name
   *
   */
  name?: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:namespace
   */
  namespace?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:copyright
   */
  copyright?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:version
   *
   */
  version?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:author
   *
   */
  author?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:description
   *
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:homepage
   *
   */
  homepage?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:homepage
   *
   */
  homepageURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:homepage
   */
  website?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:homepage
   */
  source?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:icon
   */
  icon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:icon
   */
  iconURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:icon
   */
  defaulticon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:icon64
   */
  icon64?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:icon64
   */
  icon64URL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:updateURL
   */
  updateURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:downloadURL
   */
  downloadURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:supportURL
   */
  supportURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:include
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:require
   */
  require?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:resource
   */
  resource?: Record<string, string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:connect
   */
  connect?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:tag
   */
  tag?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php?locale=en#meta:run_in
   */
  'run-in'?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:sandbox
   */
  sandbox?: 'raw' | 'JavaScript' | 'DOM';

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:antifeature
   */
  antifeature?: IArray<AntifeatureType>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:noframes
   */
  noframes?: boolean;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:webRequest
   */
  webRequest?: IArray<GmWebRequestRule>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#meta:unwrap
   */
  unwrap?: boolean;
}
