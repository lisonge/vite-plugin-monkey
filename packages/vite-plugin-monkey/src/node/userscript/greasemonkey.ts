import type { IArray, LocaleType } from '../utils/types';

export type GreaseRunAt = 'document-start' | 'document-end' | 'document-idle';

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

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40noframes
   */
  noframes?: boolean;
}
