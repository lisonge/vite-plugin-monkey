import { monkeyWindow, monkeyApi } from './window';
export { monkeyWindow };
export type {
  MonkeyWindow,
  GmXhrRequest,
  GmDownloadRequest,
  GmNotificationDetails,
  GmOpenInTabDetails,
  GmScriptInfo,
} from './types';

export const GM = /* @__PURE__ */ (() => monkeyWindow.GM ?? monkeyApi.GM)();

export const unsafeWindow = /* @__PURE__ */ (() => {
  return monkeyWindow.unsafeWindow ?? monkeyApi.unsafeWindow;
})();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_info
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
export const GM_info = /* @__PURE__ */ (() =>
  monkeyWindow.GM_info ?? monkeyApi.GM_info)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
 * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.set
 * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.delete
 * @available tampermonkey
 */
export const GM_cookie = /* @__PURE__ */ (() =>
  monkeyWindow.GM_cookie ?? monkeyApi.GM_cookie)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
 * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
 */
export const GM_setValue = /* @__PURE__ */ (() =>
  monkeyWindow.GM_setValue ?? monkeyApi.GM_setValue)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValue
 * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
 */
export const GM_deleteValue = /* @__PURE__ */ (() =>
  monkeyWindow.GM_deleteValue ?? monkeyApi.GM_deleteValue)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_listValues
 * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
 */
export const GM_listValues = /* @__PURE__ */ (() =>
  monkeyWindow.GM_listValues ?? monkeyApi.GM_listValues)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_addValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
 */
export const GM_addValueChangeListener = /* @__PURE__ */ (() =>
  monkeyWindow.GM_addValueChangeListener ??
  monkeyApi.GM_addValueChangeListener)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_removeValueChangeListener
 * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
 */
export const GM_removeValueChangeListener = /* @__PURE__ */ (() =>
  monkeyWindow.GM_removeValueChangeListener ??
  monkeyApi.GM_removeValueChangeListener)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceText
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
 */
export const GM_getResourceText = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getResourceText ?? monkeyApi.GM_getResourceText)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
 * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
 */
export const GM_getResourceURL = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getResourceURL ?? monkeyApi.GM_getResourceURL)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_addElement
 * @see https://violentmonkey.github.io/api/gm/#gm_addelement
 */
export const GM_addElement = /* @__PURE__ */ (() =>
  monkeyWindow.GM_addElement ?? monkeyApi.GM_addElement)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_addStyle
 * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
 */
export const GM_addStyle = /* @__PURE__ */ (() =>
  monkeyWindow.GM_addStyle ?? monkeyApi.GM_addStyle)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_openInTab
 * @see https://violentmonkey.github.io/api/gm/#gm_openintab
 */
export const GM_openInTab = /* @__PURE__ */ (() =>
  monkeyWindow.GM_openInTab ?? monkeyApi.GM_openInTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_registerMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
 */
export const GM_registerMenuCommand = /* @__PURE__ */ (() =>
  monkeyWindow.GM_registerMenuCommand ?? monkeyApi.GM_registerMenuCommand)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_unregisterMenuCommand
 * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
 */
export const GM_unregisterMenuCommand = /* @__PURE__ */ (() =>
  monkeyWindow.GM_unregisterMenuCommand ??
  monkeyApi.GM_unregisterMenuCommand)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_notification
 * @see https://violentmonkey.github.io/api/gm/#gm_notification
 */
export const GM_notification = /* @__PURE__ */ (() =>
  monkeyWindow.GM_notification ?? monkeyApi.GM_notification)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
 * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
 */
export const GM_xmlhttpRequest = /* @__PURE__ */ (() =>
  monkeyWindow.GM_xmlhttpRequest ?? monkeyApi.GM_xmlhttpRequest)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_setClipboard
 * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
 */
export const GM_setClipboard = /* @__PURE__ */ (() =>
  monkeyWindow.GM_setClipboard ?? monkeyApi.GM_setClipboard)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_download
 * @see https://violentmonkey.github.io/api/gm/#gm_download
 */
export const GM_download = /* @__PURE__ */ (() =>
  monkeyWindow.GM_download ?? monkeyApi.GM_download)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_log
 * @available tampermonkey
 */
export const GM_log = /* @__PURE__ */ (() =>
  monkeyWindow.GM_log ?? monkeyApi.GM_log)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_getTab
 * @available tampermonkey
 */
export const GM_getTab = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getTab ?? monkeyApi.GM_getTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_saveTab
 * @available tampermonkey
 */
export const GM_saveTab = /* @__PURE__ */ (() =>
  monkeyWindow.GM_saveTab ?? monkeyApi.GM_saveTab)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_getTabs
 * @available tampermonkey
 */
export const GM_getTabs = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getTabs ?? monkeyApi.GM_getTabs)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
 * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
 */
export const GM_getValue = /* @__PURE__ */ (() =>
  monkeyWindow.GM_getValue ?? monkeyApi.GM_getValue)();

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
 * @available tampermonkey
 */
export const GM_webRequest = /* @__PURE__ */ (() =>
  monkeyWindow.GM_webRequest ?? monkeyApi.GM_webRequest)();
