import type { GrantType } from '../permissions/names.ts';
import { serializeMetadata } from './schema.ts';
import type { MonkeyContext, IArray, LocaleType } from '../utils/types.ts';
import type { GreasemonkeyUserScript, GreaseRunAt } from './greasemonkey.ts';
import type { TampermonkeyUserScript, TamperRunAt } from './tampermonkey.ts';
import type { ViolentmonkeyUserScript, ViolentRunAt } from './violentmonkey.ts';

export type {
  GreasemonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
};

/**
 * @see https://greasyfork.org/help/meta-keys
 */
interface GreasyforkUserScript {
  /**
   * @see https://greasyfork.org/help/meta-keys
   * @default package.json.license
   */
  license?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  installURL?: string;

  contributionURL?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  contributionAmount?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  compatible?: IArray<string>;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  incompatible?: IArray<string>;
}

interface MergemonkeyUserScript {
  /** Omit for production detection and all development grants. Arrays are exact. */
  grant?: 'none' | GrantType[];
  /**
   * @default package.json.name??'monkey'
   * @default {...{'':package.json.name??'monkey'},...name} // if name is object
   */
  name?: string | LocaleType<string>;

  namespace?: string;

  /**
   * @default package.json.version
   */
  version?: string;

  /**
   * @default package.json.description
   * @default {...{'':package.json.description},...description} // if description is object
   */
  description?: string | LocaleType<string>;

  /**
   * @default package.json.author
   */
  author?: string;

  /**
   * @default package.json.homepage
   */
  homepage?: string;

  /**
   * @default package.json.homepage
   */
  homepageURL?: string;

  /**
   * @default package.json.repository
   */
  source?: string;

  /**
   * @default package.json.bugs
   */
  supportURL?: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40run-at
   *
   * @see https://www.tampermonkey.net/documentation.php#meta:run_at
   *
   * @see https://violentmonkey.github.io/api/metadata-block/#run-at
   *
   */
  'run-at'?: GreaseRunAt | TamperRunAt | ViolentRunAt;

  /**
   * custom extra meta
   * @example
   * [['antifeature', ['miner', 'hello233']]]
   * // -->
   * // \@antifeature  miner     hello233
   */
  $extra?: [string, IArray<string>][] | Record<string, IArray<string>>;
}

/**
 * UserScript, merge metadata from Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork
 */
export type MonkeyUserScript = GreasemonkeyUserScript &
  TampermonkeyUserScript &
  ViolentmonkeyUserScript &
  GreasyforkUserScript &
  MergemonkeyUserScript;

export const finalMonkeyOptionToComment = (
  context: MonkeyContext,
  collectGrantSet: Set<string>,
  mode: 'serve' | 'build',
): string => {
  const attrList = serializeMetadata(context, collectGrantSet, mode);

  // format
  {
    const formatKey = (subAttrList: [string, ...string[]][]) => {
      if (subAttrList.length == 0) return;
      const maxLen = Math.max(...subAttrList.map((s) => s[1].length));
      subAttrList.forEach((s) => {
        s[1] = s[1].padEnd(2 + maxLen);
      });
    };

    formatKey(attrList.filter((s) => s[0] == 'resource'));
    formatKey(
      attrList.filter(
        (s) => s[0] == 'antifeature' || s[0].startsWith('antifeature:'),
      ),
    );
    // format all
    const maxLen = Math.max(...attrList.map((s) => s[0].length));
    attrList.forEach((s) => {
      s[0] = s[0].padEnd(2 + maxLen);
    });
  }

  const uString = [
    '==UserScript==',
    ...attrList.map(
      (attr) =>
        '@' +
        attr
          .map((v) => {
            return v.endsWith('\x20') ? v : v + '\x20';
          })
          .join('')
          .trimEnd(),
    ),
    '==/UserScript==',
  ]
    .map((s) => '//\x20' + s)
    .join('\n');

  return uString;
};
