import { IArray, LocaleType } from '../types';
import { AntifeatureType } from './tampermonkey';

/**
 * @see https://docs.scriptcat.org/docs/dev/meta/
 */
export interface ScriptcatUserScript {
  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#name
   *
   */
  name?: string | LocaleType<string>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#namespace
   */
  namespace?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#version
   *
   */
  version?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#author
   *
   */
  author?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#description
   *
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#homepage-homepageurl-website
   *
   */
  homepage?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#homepage-homepageurl-website
   *
   */
  homepageURL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#homepage-homepageurl-website
   */
  website?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#source
   */
  source?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#icon-iconurl-defaulticon
   */
  icon?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#icon-iconurl-defaulticon
   */
  iconURL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#icon-iconurl-defaulticon
   */
  defaulticon?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#icon64-icon64url
   */
  icon64?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#icon64-icon64url
   */
  icon64URL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#updateurl
   */
  updateURL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#downloadurl
   */
  downloadURL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#supporturl
   */
  supportURL?: string;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#include
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#require
   */
  require?: IArray<string>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#resource
   */
  resource?: Record<string, string>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#connect
   */
  connect?: IArray<string>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#antifeature
   */
  antifeature?: IArray<AntifeatureType>;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#noframes
   */
  noframes?: boolean;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#background
   */
  background?: boolean;

  /**
   * @see https://docs.scriptcat.org/docs/dev/meta/#crontab
   */
  crontab?: string;
}
