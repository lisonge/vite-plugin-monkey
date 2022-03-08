import { Format } from './common';
import {
  GreaseGrantValueList,
  GreasemonkeyUserScript,
  userscript2comment4greasemonkey,
} from './greasemonkey';
import {
  TamperGrantValueList,
  TampermonkeyUserScript,
  userscript2comment4tampermonkey,
} from './tampermonkey';
import {
  userscript2comment4violentmonkey,
  ViolentGrantValueList,
  ViolentmonkeyUserScript,
} from './violentmonkey';

export type {
  GreasemonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  Format,
};

export type CommonmonkeyUserScript =
  | (GreasemonkeyUserScript & {
      /**
       *
       * @default 'common'
       */
      monkey?: 'grease' | 'common';
    })
  | (TampermonkeyUserScript & {
      monkey?: 'tamper' | 'common';
    })
  | (ViolentmonkeyUserScript & {
      monkey?: 'violent' | 'common';
    });

export const userscript2comment = (
  userscript: CommonmonkeyUserScript,
  format: Format = { align: 2 }
) => {
  if (userscript.monkey == 'grease') {
    return userscript2comment4greasemonkey(userscript, format);
  } else if (userscript.monkey == 'tamper') {
    return userscript2comment4tampermonkey(userscript, format);
  } else if (userscript.monkey == 'violent') {
    return userscript2comment4violentmonkey(userscript, format);
  }
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
