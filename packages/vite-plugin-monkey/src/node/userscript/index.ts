import { projectPkg } from '../_util';
import type { IArray, LocaleType } from '../types';
import type { AlignFunc, Format } from './common';
import type {
  GreaseGrant,
  GreasemonkeyUserScript,
  GreaseRunAt,
} from './greasemonkey';
import { GreaseGrantValueList } from './greasemonkey';
import type {
  TamperGrant,
  TampermonkeyUserScript,
  TamperRunAt,
} from './tampermonkey';
import { TamperGrantValueList } from './tampermonkey';
import { ViolentGrantValueList } from './violentmonkey';
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
   * @see https://www.tampermonkey.net/documentation.php#_run_at
   *
   * @see https://violentmonkey.github.io/api/metadata-block/#run-at
   *
   */
  'run-at'?: GreaseRunAt | TamperRunAt | ViolentRunAt;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40grant
   *
   * @see https://www.tampermonkey.net/documentation.php#_grant
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

export const userscript2comment = async (
  userscript: MonkeyUserScript,
  format: Format = { align: 2 },
) => {
  let attrList: [string, ...string[]][] = [];
  const {
    name = projectPkg.name,
    namespace,
    version = projectPkg.version,
    author = projectPkg.author,
    description = projectPkg.description,
    license = projectPkg.license,

    icon,
    iconURL,
    icon64,
    icon64URL,
    defaulticon,

    homepage = projectPkg.homepage,
    homepageURL = projectPkg.homepage,
    website,
    source = projectPkg.repository,

    supportURL = projectPkg.bugs,
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
  } = userscript;

  const { $extra } = userscript;

  let { align } = format;

  Object.entries<string | undefined>({
    namespace,
    version,
    author,
    license,
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

  Object.entries({ name, description }).forEach(([k, v]) => {
    if (typeof v == 'string') {
      attrList.push([k, v]);
    } else if (v && typeof v == 'object') {
      if (!('' in v)) {
        if (k == 'name') {
          // keep key sort
          v = { '': projectPkg.name, ...v };
        } else if (k == 'description' && projectPkg.description) {
          v = { '': projectPkg.description, ...v };
        }
      } else {
        v = { '': v[''], ...v };
      }

      Object.entries(v).forEach(([k2, v2]) => {
        if (k2.length == 0) {
          attrList.push([k, v2]);
        } else {
          attrList.push([k + ':' + k2, v2]);
        }
      });
    }
  });

  Object.entries({
    include,
    match,
    exclude,
    require,
    'exclude-match': excludeMatch,
  }).forEach(([k, v]) => {
    if (v instanceof Array) {
      v.forEach((s) => {
        if (s instanceof RegExp) {
          attrList.push([k, String(s)]);
        } else if (typeof s == 'string') {
          attrList.push([k, s]);
        }
      });
    } else if (typeof v == 'string') {
      attrList.push([k, v]);
    } else if (v instanceof RegExp) {
      attrList.push([k, String(v)]);
    }
  });

  if (resource) {
    Object.entries(resource).forEach(([k, v]) => {
      attrList.push(['resource', k, v]);
    });
  }

  if (typeof connect == 'string') {
    attrList.push(['connect', connect]);
  } else if (connect instanceof Array) {
    connect.forEach((s) => {
      attrList.push(['connect', s]);
    });
  }

  if (antifeature instanceof Array) {
    antifeature.forEach(({ tag, type, description }) => {
      if (tag) {
        attrList.push(['antifeature:' + tag, type, description]);
      } else {
        attrList.push(['antifeature', type, description]);
      }
    });
  } else if (antifeature && typeof antifeature == 'object') {
    const { tag, type, description } = antifeature;
    if (tag) {
      attrList.push(['antifeature:' + tag, type, description]);
    } else {
      attrList.push(['antifeature', type, description]);
    }
  }

  if (typeof grant == 'string') {
    if (grant == '*') {
      new Set([
        ...GreaseGrantValueList,
        ...ViolentGrantValueList,
        ...TamperGrantValueList,
      ]).forEach((s) => {
        attrList.push(['grant', s]);
      });
    } else {
      attrList.push(['grant', grant]);
    }
  } else if (Array.isArray(grant)) {
    new Set(grant).forEach((s) => {
      attrList.push(['grant', s]);
    });
  }

  if (noframes === true) {
    attrList.push(['noframes']);
  }

  if ($extra instanceof Array) {
    attrList.push(...$extra);
  } else if ($extra && typeof $extra == 'object') {
    Object.entries($extra).forEach(([k, v]) => {
      if (typeof v == 'string') {
        attrList.push([k, v]);
      } else if (v instanceof Array) {
        v.forEach((s) => {
          attrList.push([k, s]);
        });
      }
    });
  }

  attrList = defaultSortFormat(attrList);

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
        s[1] += '\x20'.repeat(alignN + maxLen - s[1].length - 1);
      });

    // format all
    maxLen = 0;
    attrList.forEach((s) => {
      if (s[0].length > maxLen) {
        maxLen = s[0].length;
      }
    });
    attrList.forEach((s) => {
      s[0] += '\x20'.repeat(alignN + maxLen - s[0].length - 1);
    });
  } else if (typeof align == 'function') {
    attrList = await align(attrList);
  }

  return [
    '==UserScript==',
    ...attrList.map((s) => '@' + s.join('\x20')),
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
