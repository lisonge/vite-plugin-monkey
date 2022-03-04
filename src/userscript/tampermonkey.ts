import { Format, IArray, LocaleType } from './common';

export type TamperRunAt =
  | 'document-start'
  | 'document-body'
  | 'document-end'
  | 'document-idle'
  | 'context-menu';

export type TamperGrant =
  | 'unsafeWindow'
  | 'window.close'
  | 'window.focus'
  | 'window.onurlchange'
  | 'GM_addStyle'
  | 'GM_addElement'
  | 'GM_deleteValue'
  | 'GM_listValues'
  | 'GM_addValueChangeListener'
  | 'GM_removeValueChangeListener'
  | 'GM_setValue'
  | 'GM_getValue'
  | 'GM_log'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_registerMenuCommand'
  | 'GM_unregisterMenuCommand'
  | 'GM_openInTab'
  | 'GM_xmlhttpRequest'
  | 'GM_download'
  | 'GM_getTab'
  | 'GM_saveTab'
  | 'GM_getTabs'
  | 'GM_notification'
  | 'GM_setClipboard'
  | 'GM_info';

export const TamperGrantValueList: TamperGrant[] = [
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange',
  'GM_addStyle',
  'GM_addElement',
  'GM_deleteValue',
  'GM_listValues',
  'GM_addValueChangeListener',
  'GM_removeValueChangeListener',
  'GM_setValue',
  'GM_getValue',
  'GM_log',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_registerMenuCommand',
  'GM_unregisterMenuCommand',
  'GM_openInTab',
  'GM_xmlhttpRequest',
  'GM_download',
  'GM_getTab',
  'GM_saveTab',
  'GM_getTabs',
  'GM_notification',
  'GM_setClipboard',
  'GM_info',
];

export type AntifeatureType = {
  tag?: string;
  type: 'ads' | 'tracking' | 'miner';
  description: string;
};

/**
 * @see https://www.tampermonkey.net/documentation.php
 */
export interface TampermonkeyUserScript {
  /**
   * @see https://www.tampermonkey.net/documentation.php#_name
   */
  name: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_namespace
   */
  namespace: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_version
   */
  version: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_author
   */
  author: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_description
   */
  description?: string | LocaleType<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  homepage?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  homepageURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  website?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_homepage
   */
  source?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  icon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  iconURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon
   */
  defaulticon?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon64_and_icon64URL
   */
  icon64?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_icon64_and_icon64URL
   */
  icon64URL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_updateURL
   */
  updateURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_downloadURL
   */
  downloadURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_supportURL
   */
  supportURL?: string;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_include
   */
  include?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_match
   */
  match?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_exclude
   */
  exclude?: IArray<string | RegExp>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_require
   */
  require?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_resource
   */
  resource?: Record<string, string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_connect
   */
  connect?: IArray<string>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_run_at
   */
  'run-at'?: TamperRunAt;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_grant
   *
   * @example {grant:'*'} // equal to {grant: GrantValueList}
   */
  grant?: IArray<TamperGrant> | 'none' | '*';

  /**
   * @see https://www.tampermonkey.net/documentation.php#_antifeature
   */
  antifeature?: IArray<AntifeatureType>;

  /**
   * @see https://www.tampermonkey.net/documentation.php#_noframes
   */
  noframes?: boolean;

  extra?: [string, string][] | Record<string, IArray<string>>;
}

export type UserScript = Format & TampermonkeyUserScript;

export const userscript2comment4tampermonkey = (
  userscript: TampermonkeyUserScript,
  format: Format = {}
) => {
  let attrList: [string, ...string[]][] = [];
  const {
    name,
    namespace,
    version,
    author,
    description,
    homepage,
    homepageURL,
    website,
    source,
    icon,
    iconURL,
    defaulticon,
    icon64,
    icon64URL,
    updateURL,
    downloadURL,
    supportURL,
    include,
    match,
    exclude,
    require,
    resource,
    connect,
    grant,
    antifeature,
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

    // author
    attrList.push(['author', author]);
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
      homepage,
      homepageURL,
      website,
      source,
      icon,
      iconURL,
      defaulticon,
      icon64,
      icon64URL,
      updateURL,
      downloadURL,
      supportURL,
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

  if (typeof connect == 'string') {
    attrList.push(['connect', connect]);
  } else if (connect instanceof Array) {
    connect.forEach((s) => {
      attrList.push(['connect', s]);
    });
  }

  if (typeof userscript['run-at'] == 'string') {
    attrList.push(['run-at', userscript['run-at']]);
  }

  if (typeof grant == 'string') {
    if (grant == '*') {
      TamperGrantValueList.forEach((s) => {
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
