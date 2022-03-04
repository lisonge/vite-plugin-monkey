import { Format, IArray, LocaleType } from './common';

export type ViolentRunAt = 'document-end' | 'document-start' | 'document-idle';
export type ViolentInjectInto = 'page' | 'content' | 'auto';

export type ViolentGrant =
  | 'window.close'
  | 'window.focus'
  | 'GM_info'
  | 'GM_getValue'
  | 'GM_setValue'
  | 'GM_deleteValue'
  | 'GM_listValues'
  | 'GM_addValueChangeListener'
  | 'GM_removeValueChangeListener'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_addElement'
  | 'GM_addStyle'
  | 'GM_openInTab'
  | 'GM_registerMenuCommand'
  | 'GM_unregisterMenuCommand'
  | 'GM_notification'
  | 'GM_setClipboard'
  | 'GM_xmlhttpRequest'
  | 'GM_download'
  | 'GM.addStyle'
  | 'GM.addElement'
  | 'GM.registerMenuCommand'
  | 'GM.deleteValue'
  | 'GM.getResourceUrl'
  | 'GM.getValue'
  | 'GM.info'
  | 'GM.listValues'
  | 'GM.notification'
  | 'GM.openInTab'
  | 'GM.setClipboard'
  | 'GM.setValue'
  | 'GM.xmlHttpRequest';

export const ViolentGrantValueList: ViolentGrant[] = [
  'window.close',
  'window.focus',
  'GM_info',
  'GM_getValue',
  'GM_setValue',
  'GM_deleteValue',
  'GM_listValues',
  'GM_addValueChangeListener',
  'GM_removeValueChangeListener',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_addElement',
  'GM_addStyle',
  'GM_openInTab',
  'GM_registerMenuCommand',
  'GM_unregisterMenuCommand',
  'GM_notification',
  'GM_setClipboard',
  'GM_xmlhttpRequest',
  'GM_download',
  'GM.addStyle',
  'GM.addElement',
  'GM.registerMenuCommand',
  'GM.deleteValue',
  'GM.getResourceUrl',
  'GM.getValue',
  'GM.info',
  'GM.listValues',
  'GM.notification',
  'GM.openInTab',
  'GM.setClipboard',
  'GM.setValue',
  'GM.xmlHttpRequest',
];

/**
 * @see https://violentmonkey.github.io/api/metadata-block/
 */
export interface ViolentmonkeyUserScript {
  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#name
   */
  name: string | LocaleType<string>;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#namespace
   */
  namespace: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#version
   */
  version: string;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#description
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
   * @see https://violentmonkey.github.io/api/metadata-block/#resource
   */
  'run-at'?: ViolentRunAt;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#grant
   * @see https://violentmonkey.github.io/api/gm/
   */
  grant?: IArray<ViolentGrant> | 'none' | '*';

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#noframes
   */
  noframes?: boolean;

  /**
   * @see https://violentmonkey.github.io/api/metadata-block/#inject-into
   */
  'inject-into'?: ViolentInjectInto;

  extra?: [string, string][] | Record<string, IArray<string>>;
}

export const userscript2comment4violentmonkey = (
  userscript: ViolentmonkeyUserScript,
  format: Format = {}
) => {
  let attrList: [string, ...string[]][] = [];
  const {
    name,
    namespace,
    version,
    description,
    homepageURL,
    icon,
    downloadURL,
    supportURL,
    include,
    match,
    exclude,
    require,
    resource,
    grant,
    noframes,
    extra,
    'exclude-match': excludeMatch,
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
      homepageURL,
      icon,
      downloadURL,
      supportURL,
    }).forEach(([k, v]) => {
      if (typeof v == 'string') {
        attrList.push([k, v]);
      }
    });
  }

  {
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

  if (typeof userscript['inject-into'] == 'string') {
    attrList.push(['inject-into', userscript['inject-into']]);
  }

  if (typeof grant == 'string') {
    if (grant == '*') {
      ViolentGrantValueList.forEach((s) => {
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
