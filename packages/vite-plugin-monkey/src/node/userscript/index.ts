import { projectPkg } from '../_util';
import type { FinalMonkeyOption, IArray, LocaleType } from '../types';
import type { Format } from './common';
import type {
  GreaseGrant,
  GreasemonkeyUserScript,
  GreaseRunAt,
} from './greasemonkey';
import { GreaseGrantValueList } from './greasemonkey';
import type {
  AntifeatureType,
  TamperGrant,
  TampermonkeyUserScript,
  TamperRunAt,
} from './tampermonkey';
import { TamperGrantValueList } from './tampermonkey';
import { ViolentGrantValueList, ViolentInjectInto } from './violentmonkey';
import type {
  ViolentGrant,
  ViolentmonkeyUserScript,
  ViolentRunAt,
} from './violentmonkey';

export type {
  GreasemonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  Format,
};

/**
 * @see https://greasyfork.org/help/meta-keys
 */
type GreasyforkUserScript = {
  /**
   * @see https://greasyfork.org/help/meta-keys
   * @default package.json.license
   */
  license?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  contributionURL?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  contributionAmount?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  compatible?: string;

  /**
   * @see https://greasyfork.org/help/meta-keys
   */
  incompatible?: string;
};

type MergemonkeyUserScript = {
  /**
   * @default package.json.name??'monkey'
   * @default {...{'':package.json.name??'monkey'},...name} // if name is object
   */
  name?: string | LocaleType<string>;

  /**
   * @default package.json.version??'1.0.0'
   */
  version?: string;

  /**
   * @default package.json.description
   * @default {...{'':package.json.description},...description} // if description is object
   */
  description?: string | LocaleType<string>;

  /**
   * @default package.json.author??'monkey'
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
   * @see https://wiki.greasespot.net/Metadata_Block#.40grant
   *
   * @see https://www.tampermonkey.net/documentation.php#meta:grant
   *
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   *
   * if set '\*', will add all GM_* to UserScript
   */
  grant?: IArray<GreaseGrant | TamperGrant | ViolentGrant> | 'none' | '*';

  /**
   * custom extra meta
   */
  $extra?: [string, string][] | Record<string, IArray<string>>;
};

/**
 * UserScript, merge metadata from Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork
 */
export type MonkeyUserScript = GreasemonkeyUserScript &
  TampermonkeyUserScript &
  ViolentmonkeyUserScript &
  GreasyforkUserScript &
  MergemonkeyUserScript;

export type FinalUserScript = {
  name: LocaleType<string>;
  namespace: string;
  version: string;
  description: LocaleType<string>;
  icon?: string;
  include: string[];
  match: string[];
  exclude: string[];
  require: string[];
  resource: Record<string, string>;
  noframes: boolean;

  author: string;
  copyright?: string;
  homepage?: string;
  homepageURL?: string;
  website?: string;
  source?: string;
  iconURL?: string;
  defaulticon?: string;
  icon64?: string;
  icon64URL?: string;
  updateURL?: string;
  downloadURL?: string;
  supportURL?: string;
  connect: string[];
  antifeature: AntifeatureType[];

  'exclude-match': string[];
  'inject-into'?: ViolentInjectInto;
  'run-at'?: GreaseRunAt | TamperRunAt | ViolentRunAt;
  grant: Set<string>;
  $extra: [string, string][];
} & GreasyforkUserScript;

export const finalMonkeyOptionToComment = async ({
  userscript,
  format = { align: 2 },
  collectGrantSet,
  collectRequireUrls,
  collectResource,
}: FinalMonkeyOption): Promise<string> => {
  let attrList: [string, ...string[]][] = [];
  const {
    name,
    namespace,
    version,
    author,
    description,
    license,
    copyright,

    icon,
    iconURL,
    icon64,
    icon64URL,
    defaulticon,

    homepage,
    homepageURL,
    website,
    source,

    supportURL,
    downloadURL,
    updateURL,

    include,
    match,
    exclude,
    require,
    'exclude-match': excludeMatch,

    'inject-into': injectInto,
    'run-at': runAt,

    compatible,
    incompatible,

    antifeature,
    contributionAmount,
    contributionURL,

    connect,
    resource,
    grant,
    noframes,
    $extra,
  } = userscript;
  Object.entries({
    namespace,
    version,
    author,
    license,
    copyright,
    icon,
    iconURL,
    icon64,
    icon64URL,
    defaulticon,
    homepage,
    homepageURL,
    website,
    source,
    supportURL,
    downloadURL,
    updateURL,
    'inject-into': injectInto,
    'run-at': runAt,
    compatible,
    incompatible,
    contributionAmount,
    contributionURL,
  }).forEach(([k, v]) => {
    if (typeof v == 'string') {
      attrList.push([k, v]);
    }
  });
  Object.entries(name).forEach(([k, v]) => {
    if (k == '') {
      attrList.push(['name', v]);
    } else {
      attrList.push(['name:' + k, v]);
    }
  });
  Object.entries(description).forEach(([k, v]) => {
    if (k == '') {
      attrList.push(['description', v]);
    } else {
      attrList.push(['description:' + k, v]);
    }
  });

  Object.entries({
    include,
    match,
    exclude,
    'exclude-match': excludeMatch,
  }).forEach(([k, v]) => {
    v.forEach((v2) => {
      attrList.push([k, v2]);
    });
  });

  [...require, ...collectRequireUrls].forEach((s) => {
    attrList.push(['require', s]);
  });

  Object.entries({ ...resource, ...collectResource }).forEach(([k, v]) => {
    attrList.push(['resource', k, v]);
  });

  connect.forEach((s) => {
    attrList.push(['connect', s]);
  });

  if (grant.has('none')) {
    attrList.push(['grant', 'none']);
  } else if (grant.has('*')) {
    new Set([
      ...GreaseGrantValueList,
      ...ViolentGrantValueList,
      ...TamperGrantValueList,
    ]).forEach((s) => {
      attrList.push(['grant', s]);
    });
  } else {
    new Set([...Array.from(collectGrantSet.values()).flat(), ...grant]).forEach(
      (s) => {
        attrList.push(['grant', s]);
      },
    );
  }
  antifeature.forEach(({ description, type, tag }) => {
    attrList.push([
      tag ? `antifeature:${tag}` : 'antifeature',
      type,
      description,
    ]);
  });
  if (noframes) {
    attrList.push(['noframes']);
  }
  attrList.push(...$extra);

  attrList = defaultSortFormat(attrList);

  let { align = 2 } = format;

  if (align === true) {
    align = 2;
  }

  // format
  if (typeof align == 'number' && Number.isInteger(align) && align >= 1) {
    const alignN = align;
    let maxLen = 0;

    // format resource key value
    attrList
      .filter((s) => s[0] == 'resource')
      .map((s) => {
        if (s[1].length > maxLen) {
          maxLen = s[1].length;
        }
        return s;
      })
      .forEach((s) => {
        s[1] += '\x20'.repeat(alignN + maxLen - s[1].length);
      });

    // format all
    maxLen = 0;
    attrList.forEach((s) => {
      if (s[0].length > maxLen) {
        maxLen = s[0].length;
      }
    });
    attrList.forEach((s) => {
      if (s[1]) {
        s[0] = s[0].padEnd(alignN + maxLen, '\x20');
      }
    });
  } else if (typeof align == 'function') {
    attrList = await align(attrList);
  }

  return [
    '==UserScript==',
    ...attrList.map((s) => '@' + s.join('')),
    '==/UserScript==',
  ]
    .map((s) => '//\x20' + s)
    .join('\n');
};

const stringSort = (a: [string, ...string[]], b: [string, ...string[]]) => {
  const v1 = a[1] ?? '';
  const v2 = b[1] ?? '';
  if (v1 == v2) return 0;
  for (let i = 0; i < v1.length; i++) {
    if (i >= v2.length) {
      return 1;
    }
    if (v1.charCodeAt(i) > v2.charCodeAt(i)) {
      return 1;
    } else if (v1.charCodeAt(i) < v2.charCodeAt(i)) {
      return -1;
    }
  }
  return 0;
};

const defaultSortFormat = (p0: [string, ...string[]][]) => {
  const filter = (
    predicate: (value: [string, ...string[]], index: number) => boolean,
  ): [string, ...string[]][] => {
    const notMatchList: [string, ...string[]][] = [];
    const matchList: [string, ...string[]][] = [];
    p0.forEach((value, index) => {
      if (!predicate(value, index)) {
        notMatchList.push(value);
      } else {
        matchList.push(value);
      }
    });
    p0 = notMatchList;
    return matchList;
  };
  return [
    filter(([k]) => k == 'name'),
    filter(([k]) => k.startsWith('name:')),
    filter(([k]) => k == 'namespace'),
    filter(([k]) => k == 'version'),
    filter(([k]) => k == 'author'),
    filter(([k]) => k == 'description'),
    filter(([k]) => k.startsWith('description:')),
    filter(([k]) => k == 'license'),
    filter(([k]) => k == 'copyright'),

    filter(([k]) => k == 'icon'),
    filter(([k]) => k == 'iconURL'),
    filter(([k]) => k == 'icon64'),
    filter(([k]) => k == 'icon64URL'),
    filter(([k]) => k == 'defaulticon'),

    filter(([k]) => k == 'homepage'),
    filter(([k]) => k == 'homepageURL'),
    filter(([k]) => k == 'website'),
    filter(([k]) => k == 'source'),

    filter(([k]) => k == 'supportURL'),
    filter(([k]) => k == 'downloadURL'),
    filter(([k]) => k == 'updateURL'),

    filter(([k]) => k == 'include'),
    filter(([k]) => k == 'match'),
    filter(([k]) => k == 'exclude'),
    filter(([k]) => k == 'exclude-match'),

    filter(([k]) => k == 'require'),

    filter(([k]) => k == 'resource').sort(stringSort),

    filter(([k]) => k == 'connect'),

    filter(([k]) => k == 'grant').sort(stringSort),

    filter(([k]) => k == 'inject-into'),
    filter(([k]) => k == 'run-at'),

    filter(([k]) => k == 'compatible'),
    filter(([k]) => k == 'incompatible'),
    filter(([k]) => k == 'antifeature'),
    filter(([k]) => k == 'contributionAmount'),
    filter(([k]) => k == 'contributionURL'),
    filter(([k]) => k == 'noframes'),
    p0,
  ].flat(1);
};
