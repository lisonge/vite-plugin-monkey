import type { MonkeyWindow } from './types';
export type { MonkeyWindow, XhrRequest } from './types';

// @ts-ignore
export const monkeyWindow: MonkeyWindow = document.__monkeyWindow ?? window;

// vite build see packages/vite-plugin-monkey/src/node/plugins/externalGlobals.ts

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
export const GM_setValue = monkeyWindow.GM_setValue;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_deleteValue
 * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
 */
export const GM_deleteValue = monkeyWindow.GM_deleteValue;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_listValues
 * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
 */
export const GM_listValues = monkeyWindow.GM_listValues;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
 */
export const GM_addValueChangeListener = monkeyWindow.GM_addValueChangeListener;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_removeValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
 */
export const GM_removeValueChangeListener =
  monkeyWindow.GM_removeValueChangeListener;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceText
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
 */
export const GM_getResourceText = monkeyWindow.GM_getResourceText;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
 */
export const GM_getResourceURL = monkeyWindow.GM_getResourceURL;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addElement
 * @see https://violentmonkey.github.io/api/gm/#gm_addelement
 */
export const GM_addElement = monkeyWindow.GM_addElement;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
 * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
 */
export const GM_addStyle = monkeyWindow.GM_addStyle;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
 * @see https://violentmonkey.github.io/api/gm/#gm_openintab
 */
export const GM_openInTab = monkeyWindow.GM_openInTab;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
 */
export const GM_registerMenuCommand = monkeyWindow.GM_registerMenuCommand;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_unregisterMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
 */
export const GM_unregisterMenuCommand = monkeyWindow.GM_unregisterMenuCommand;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_notification
 * @see https://violentmonkey.github.io/api/gm/#gm_notification
 */
export const GM_notification = monkeyWindow.GM_notification;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
 * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
 */
export const GM_xmlhttpRequest = monkeyWindow.GM_xmlhttpRequest;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setClipboard
 * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
 */
export const GM_setClipboard = monkeyWindow.GM_setClipboard;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_download
 * @see https://violentmonkey.github.io/api/gm/#gm_download
 */
export const GM_download = monkeyWindow.GM_download;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_log
 * @available tampermonkey
 */
export const GM_log = monkeyWindow.GM_log;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTab
 * @available tampermonkey
 */
export const GM_getTab = monkeyWindow.GM_getTab;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_saveTab
 * @available tampermonkey
 */
export const GM_saveTab = monkeyWindow.GM_saveTab;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
 * @available tampermonkey
 */
export const GM_getTabs = monkeyWindow.GM_getTabs;

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
 */
export const GM_getValue = monkeyWindow.GM_getValue;
