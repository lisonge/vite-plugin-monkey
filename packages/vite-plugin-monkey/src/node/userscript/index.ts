import { logger } from '../_logger';
import { delay, projectPkg } from '../_util';
import { IArray, LocaleType } from '../types';
import { Format } from './common';
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
   * @deprecated since version 1.0.0, use $extra replace it, extra will be removed in the future version
   */
  extra?: [string, string][] | Record<string, IArray<string>>;

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

  const { extra } = userscript;
  let { $extra } = userscript;
  if (extra) {
    delay().then(() => {
      logger.warn(
        'userscript#extra is deprecated, just use $extra repalce it',
        { time: true },
      );
    });
  }
  $extra = $extra ?? extra;

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

  attrList.sort((a, b) => {
    return getOrder(a[0]) - getOrder(b[0]);
  });

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

  if (align === true) {
    align = 2;
  }

  // format
  if (typeof align == 'number' && Number.isInteger(align) && align >= 1) {
    let maxLen = 0;
    attrList.forEach((s) => {
      if (s[0].length > maxLen) {
        maxLen = s[0].length;
      }
    });
    const len = maxLen + align;
    attrList.forEach((s) => {
      s[0] += Array(len - s[0].length - 1)
        .fill('\x20')
        .join('');
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

const sortMap: Record<string, number> = (() => {
  const tempMap: Record<string, number> = {};
  [
    'name',
    'namespace',
    'version',
    'author',
    'description',
    'license',

    'icon',
    'iconURL',
    'icon64',
    'icon64URL',
    'defaulticon',

    'homepage',
    'homepageURL',
    'website',
    'source',

    'supportURL',
    'downloadURL',
    'updateURL',

    'include',
    'match',
    'exclude',
    'require',
    'exclude-match',

    'connect',
    'resource',
    'grant',

    'inject-into',
    'run-at',

    'compatible',
    'incompatible',

    'antifeature',
    'contributionAmount',
    'contributionURL',

    'noframes',
  ].forEach((v, i) => {
    tempMap[v] = i;
  });
  return tempMap;
})();

const getOrder = (value: string) => {
  value = value.split(':')[0];
  if (value in sortMap) {
    return sortMap[value];
  }
  return Number.MIN_SAFE_INTEGER;
};
