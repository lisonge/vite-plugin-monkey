import { monkeyWindow } from './window';
export { monkeyWindow };
export type { MonkeyWindow, XhrRequest } from './types';
export { GM_fetch } from './fetch';

export const GM = /* @__PURE__ */ (() => monkeyWindow.GM)();

export const unsafeWindow = /* @__PURE__ */ (() => {
  monkeyWindow.unsafeWindow = monkeyWindow.unsafeWindow ?? window;
  return monkeyWindow.unsafeWindow;
})();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_info
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
export const GM_info = /* @__PURE__ */ (() => monkeyWindow.GM_info)();

/**
 * @see https://github.com/Tampermonkey/tampermonkey/issues/465#issuecomment-429058294
 * @available tampermonkey
 */
export const GM_cookie = /* @__PURE__ */ (() => monkeyWindow.GM_cookie)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setValue
 * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
 */
export const GM_setValue = /* @__PURE__ */ (() => monkeyWindow.GM_setValue)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_deleteValue
 * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
 */
export const GM_deleteValue = /* @__PURE__ */ (() =>
  monkeyWindow.GM_deleteValue)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_listValues
 * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
 */
export const GM_listValues = /* @__PURE__ */ (() =>
  monkeyWindow.GM_listValues)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
 */
export const GM_addValueChangeListener = /* @__PURE__ */ (() =>
  monkeyWindow.GM_addValueChangeListener)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_removeValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
 */
export const GM_removeValueChangeListener = /* @__PURE__ */ (() =>
  monkeyWindow.GM_removeValueChangeListener)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceText
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
 */
export const GM_getResourceText = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getResourceText)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
 */
export const GM_getResourceURL = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getResourceURL)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addElement
 * @see https://violentmonkey.github.io/api/gm/#gm_addelement
 */
export const GM_addElement = /* @__PURE__ */ (() =>
  monkeyWindow.GM_addElement)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_addStyle
 * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
 */
export const GM_addStyle = /* @__PURE__ */ (() => monkeyWindow.GM_addStyle)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_openInTab
 * @see https://violentmonkey.github.io/api/gm/#gm_openintab
 */
export const GM_openInTab = /* @__PURE__ */ (() => monkeyWindow.GM_openInTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_registerMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
 */
export const GM_registerMenuCommand = /* @__PURE__ */ (() =>
  monkeyWindow.GM_registerMenuCommand)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_unregisterMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
 */
export const GM_unregisterMenuCommand = /* @__PURE__ */ (() =>
  monkeyWindow.GM_unregisterMenuCommand)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_notification
 * @see https://violentmonkey.github.io/api/gm/#gm_notification
 */
export const GM_notification = /* @__PURE__ */ (() =>
  monkeyWindow.GM_notification)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
 * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
 */
export const GM_xmlhttpRequest = /* @__PURE__ */ (() =>
  monkeyWindow.GM_xmlhttpRequest)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_setClipboard
 * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
 */
export const GM_setClipboard = /* @__PURE__ */ (() =>
  monkeyWindow.GM_setClipboard)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_download
 * @see https://violentmonkey.github.io/api/gm/#gm_download
 */
export const GM_download = /* @__PURE__ */ (() => monkeyWindow.GM_download)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_log
 * @available tampermonkey
 */
export const GM_log = /* @__PURE__ */ (() => monkeyWindow.GM_log)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTab
 * @available tampermonkey
 */
export const GM_getTab = /* @__PURE__ */ (() => monkeyWindow.GM_getTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_saveTab
 * @available tampermonkey
 */
export const GM_saveTab = /* @__PURE__ */ (() => monkeyWindow.GM_saveTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getTabs
 * @available tampermonkey
 */
export const GM_getTabs = /* @__PURE__ */ (() => monkeyWindow.GM_getTabs)();

/**
 * @see https://www.tampermonkey.net/documentation.php#GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
 */
export const GM_getValue = /* @__PURE__ */ (() => monkeyWindow.GM_getValue)();
