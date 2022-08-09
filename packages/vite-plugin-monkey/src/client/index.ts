import type { MonkeyWindow } from './types';
export type { MonkeyWindow };

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
export const GM_setValue = (
  ...args: Parameters<typeof monkeyWindow.GM_setValue>
) => {
  return monkeyWindow.GM_setValue(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_deleteValue
 * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
 */
export const GM_deleteValue = (
  ...args: Parameters<typeof monkeyWindow.GM_deleteValue>
) => {
  return monkeyWindow.GM_deleteValue(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_listValues
 * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
 */
export const GM_listValues = (
  ...args: Parameters<typeof monkeyWindow.GM_listValues>
) => {
  return monkeyWindow.GM_listValues(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
 */
export const GM_addValueChangeListener = (
  ...args: Parameters<typeof monkeyWindow.GM_addValueChangeListener>
) => {
  return monkeyWindow.GM_addValueChangeListener(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_removeValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
 */
export const GM_removeValueChangeListener = (
  ...args: Parameters<typeof monkeyWindow.GM_removeValueChangeListener>
) => {
  return monkeyWindow.GM_removeValueChangeListener(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceText
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
 */
export const GM_getResourceText = (
  ...args: Parameters<typeof monkeyWindow.GM_getResourceText>
) => {
  return monkeyWindow.GM_getResourceText(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
 */
export const GM_getResourceURL = (
  ...args: Parameters<typeof monkeyWindow.GM_getResourceURL>
) => {
  return monkeyWindow.GM_getResourceURL(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addElement
 * @see https://violentmonkey.github.io/api/gm/#gm_addelement
 */
export const GM_addElement = (
  ...args: Parameters<typeof monkeyWindow.GM_addElement>
) => {
  return monkeyWindow.GM_addElement(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
 * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
 */
export const GM_addStyle = (
  ...args: Parameters<typeof monkeyWindow.GM_addStyle>
) => {
  return monkeyWindow.GM_addStyle(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
 * @see https://violentmonkey.github.io/api/gm/#gm_openintab
 */
export const GM_openInTab = (
  ...args: Parameters<typeof monkeyWindow.GM_openInTab>
) => {
  return monkeyWindow.GM_openInTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
 */
export const GM_registerMenuCommand = (
  ...args: Parameters<typeof monkeyWindow.GM_registerMenuCommand>
) => {
  return monkeyWindow.GM_registerMenuCommand(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_unregisterMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
 */
export const GM_unregisterMenuCommand = (
  ...args: Parameters<typeof monkeyWindow.GM_unregisterMenuCommand>
) => {
  return monkeyWindow.GM_unregisterMenuCommand(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_notification
 * @see https://violentmonkey.github.io/api/gm/#gm_notification
 */
export const GM_notification = (
  ...args: Parameters<typeof monkeyWindow.GM_notification>
) => {
  return monkeyWindow.GM_notification(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
 * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
 */
export const GM_xmlhttpRequest = (
  ...args: Parameters<typeof monkeyWindow.GM_xmlhttpRequest>
) => {
  return monkeyWindow.GM_xmlhttpRequest(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setClipboard
 * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
 */
export const GM_setClipboard = (
  ...args: Parameters<typeof monkeyWindow.GM_setClipboard>
) => {
  return monkeyWindow.GM_setClipboard(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_download
 * @see https://violentmonkey.github.io/api/gm/#gm_download
 */
export const GM_download = (
  ...args: Parameters<typeof monkeyWindow.GM_download>
) => {
  return monkeyWindow.GM_download(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_log
 * @available tampermonkey
 */
export const GM_log = (...args: Parameters<typeof monkeyWindow.GM_log>) => {
  return monkeyWindow.GM_log(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTab
 * @available tampermonkey
 */
export const GM_getTab = (
  ...args: Parameters<typeof monkeyWindow.GM_getTab>
) => {
  return monkeyWindow.GM_getTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_saveTab
 * @available tampermonkey
 */
export const GM_saveTab = (
  ...args: Parameters<typeof monkeyWindow.GM_saveTab>
) => {
  return monkeyWindow.GM_saveTab(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
 * @available tampermonkey
 */
export const GM_getTabs = (
  ...args: Parameters<typeof monkeyWindow.GM_getTabs>
) => {
  return monkeyWindow.GM_getTabs(...args);
};

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
 */
export const GM_getValue = (
  ...args: Parameters<typeof monkeyWindow.GM_getValue>
) => {
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
