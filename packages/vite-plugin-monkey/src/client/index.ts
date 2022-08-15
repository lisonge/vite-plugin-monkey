import type { MonkeyWindow } from './types';
export type { MonkeyWindow, ScriptInfo, XhrRequest } from './types';

export const monkeyWindow: MonkeyWindow =
  Reflect.get(document, '__monkeyWindow') ?? window;

export const GM = monkeyWindow.GM;

monkeyWindow.unsafeWindow = monkeyWindow.unsafeWindow ?? window;
export const unsafeWindow = monkeyWindow.unsafeWindow;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_info
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
export const GM_info = monkeyWindow.GM_info;

/**
 * @see https://github.com/Tampermonkey/tampermonkey/issues/465#issuecomment-429058294
 * @available tampermonkey
 */
export const GM_cookie = monkeyWindow.GM_cookie;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setValue
 * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
 */
export const GM_setValue: MonkeyWindow['GM_setValue'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_setValue(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_deleteValue
 * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
 */
export const GM_deleteValue: MonkeyWindow['GM_deleteValue'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_deleteValue(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_listValues
 * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
 */
export const GM_listValues: MonkeyWindow['GM_listValues'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_listValues(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
 */
export const GM_addValueChangeListener: MonkeyWindow['addEventListener'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_addValueChangeListener(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_removeValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
 */
export const GM_removeValueChangeListener: MonkeyWindow['removeEventListener'] =
  (...args: unknown[]) => {
    // @ts-ignore
    return monkeyWindow.GM_removeValueChangeListener(...args);
  };

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceText
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
 */
export const GM_getResourceText: MonkeyWindow['GM_getResourceText'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_getResourceText(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
 */
export const GM_getResourceURL: MonkeyWindow['GM_getResourceURL'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_getResourceURL(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addElement
 * @see https://violentmonkey.github.io/api/gm/#gm_addelement
 */
export const GM_addElement: MonkeyWindow['GM_addElement'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_addElement(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
 * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
 */
export const GM_addStyle: MonkeyWindow['GM_addStyle'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_addStyle(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
 * @see https://violentmonkey.github.io/api/gm/#gm_openintab
 */
export const GM_openInTab: MonkeyWindow['GM_openInTab'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_openInTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
 */
export const GM_registerMenuCommand: MonkeyWindow['GM_registerMenuCommand'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_registerMenuCommand(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_unregisterMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
 */
export const GM_unregisterMenuCommand: MonkeyWindow['GM_unregisterMenuCommand'] =
  (...args: unknown[]) => {
    // @ts-ignore
    return monkeyWindow.GM_unregisterMenuCommand(...args);
  };

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_notification
 * @see https://violentmonkey.github.io/api/gm/#gm_notification
 */
export const GM_notification: MonkeyWindow['GM_notification'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_notification(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
 * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
 */
export const GM_xmlhttpRequest: MonkeyWindow['GM_xmlhttpRequest'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_xmlhttpRequest(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setClipboard
 * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
 */
export const GM_setClipboard: MonkeyWindow['GM_setClipboard'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_setClipboard(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_download
 * @see https://violentmonkey.github.io/api/gm/#gm_download
 */
export const GM_download: MonkeyWindow['GM_download'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_download(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_log
 * @available tampermonkey
 */
export const GM_log: MonkeyWindow['GM_log'] = (...args: unknown[]) => {
  // @ts-ignore
  return monkeyWindow.GM_log(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTab
 * @available tampermonkey
 */
export const GM_getTab: MonkeyWindow['GM_getTab'] = (...args: unknown[]) => {
  // @ts-ignore
  return monkeyWindow.GM_getTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_saveTab
 * @available tampermonkey
 */
export const GM_saveTab: MonkeyWindow['GM_saveTab'] = (...args: unknown[]) => {
  // @ts-ignore
  return monkeyWindow.GM_saveTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
 * @available tampermonkey
 */
export const GM_getTabs: MonkeyWindow['GM_getTabs'] = (...args: unknown[]) => {
  // @ts-ignore
  return monkeyWindow.GM_getTabs(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
 */
export const GM_getValue: MonkeyWindow['GM_getValue'] = (
  ...args: unknown[]
) => {
  // @ts-ignore
  return monkeyWindow.GM_getValue(...args);
};

// export const {
// unsafeWindow,
// GM,
// GM_info,
// GM_cookie,
// GM_setValue,
// GM_deleteValue,
// GM_listValues,
// GM_addValueChangeListener,
// GM_removeValueChangeListener,
// GM_getResourceText,
// GM_getResourceURL,
// GM_addElement,
// GM_addStyle,
// GM_openInTab,
// GM_registerMenuCommand,
// GM_unregisterMenuCommand,
// GM_notification,
// GM_setClipboard,
// GM_xmlhttpRequest,
// GM_download,
// GM_log,
// GM_getTab,
// GM_saveTab,
// GM_getTabs,
// GM_getValue,
// } = monkeyWindow;
