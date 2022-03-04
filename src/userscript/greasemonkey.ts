import { Format, IArray, LocaleType } from './common';

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
   */
  name: string | LocaleType<string>;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40namespace
   */
  namespace: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40version
   */
  version: string;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40description
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
   * @see https://wiki.greasespot.net/Metadata_Block#.40run-at
   */
  'run-at'?: GreaseRunAt;

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40grant
   * @see https://wiki.greasespot.net/Greasemonkey_Manual:API
   */
  grant?: IArray<GreaseGrant> | 'none' | '*';

  /**
   * @see https://wiki.greasespot.net/Metadata_Block#.40noframes
   */
  noframes?: boolean;

  extra?: [string, string][] | Record<string, IArray<string>>;
}

export const userscript2comment4greasemonkey = (
  userscript: GreasemonkeyUserScript,
  format: Format = {}
) => {
  let attrList: [string, ...string[]][] = [];
  const {
    name,
    namespace,
    version,
    description,
    icon,
    include,
    match,
    exclude,
    require,
    resource,
    grant,
    noframes,
    extra,
  } = userscript;

  let { align } = format;

  {
    // name
    if (typeof name == 'string') {
      attrList.push(['name', name]);
    } else if (name && typeof name == 'object') {
      Object.entries(name).forEach(([k, v]) => {
        if (k.length == 0) {
          attrList.push(['name', v]);
        } else {
          attrList.push(['name:' + k, v]);
        }
      });
    }
  }
  {
    // namespace
    attrList.push(['namespace', namespace]);

    // version
    attrList.push(['version', version]);
  }

  {
    // description
    if (typeof description == 'string') {
      attrList.push(['description', description]);
    } else if (description && typeof description == 'object') {
      Object.entries(description).forEach(([k, v]) => {
        if (k.length == 0) {
          attrList.push(['description', v]);
        } else {
          attrList.push(['description:' + k, v]);
        }
      });
    }
  }

  {
    Object.entries({
      icon,
    }).forEach(([k, v]) => {
      if (typeof v == 'string') {
        attrList.push([k, v]);
      }
    });
  }

  {
    Object.entries({ include, match, exclude, require }).forEach(([k, v]) => {
      if (v instanceof Array) {
        v.forEach((s) => {
          if (s instanceof RegExp) {
            attrList.push([k, s.source]);
          } else if (typeof s == 'string') {
            attrList.push([k, s]);
          }
        });
      } else if (typeof v == 'string') {
        attrList.push([k, v]);
      } else if (v instanceof RegExp) {
        attrList.push([k, v.source]);
      }
    });
  }

  if (resource) {
    Object.entries(resource).forEach(([k, v]) => {
      attrList.push(['resource', k, v]);
    });
  }

  if (typeof userscript['run-at'] == 'string') {
    attrList.push(['run-at', userscript['run-at']]);
  }

  if (typeof grant == 'string') {
    if (grant == '*') {
      GreaseGrantValueList.forEach((s) => {
        attrList.push(['grant', s]);
      });
    } else {
      attrList.push(['grant', grant]);
    }
  } else if (Array.isArray(grant)) {
    grant.forEach((s) => {
      attrList.push(['grant', s]);
    });
  }

  if (noframes === true) {
    attrList.push(['noframes']);
  }

  if (extra instanceof Array) {
    attrList.push(...extra);
  } else if (extra && typeof extra == 'object') {
    Object.entries(extra).forEach(([k, v]) => {
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
    attrList = align(attrList);
  }

  return [
    '==UserScript==',
    ...attrList.map((s) => '@' + s.join('\x20')),
    '==/UserScript==',
  ]
    .map((s) => '//\x20' + s)
    .join('\n');
};
