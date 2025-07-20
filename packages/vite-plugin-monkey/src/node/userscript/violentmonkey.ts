import type { IArray, LocaleType } from '../utils/types';

export type ViolentRunAt = 'document-end' | 'document-start' | 'document-idle';
export type ViolentInjectInto = 'page' | 'content' | 'auto';

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
  namespace?: string;

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

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#noframes
   */
  noframes?: boolean;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#inject-into
   */
  'inject-into'?: ViolentInjectInto;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#unwrap
   */
  unwrap?: boolean;
}
