/// <reference types="vite/client" />

/**
 * alias of vite-plugin-monkey/dist/client
 */
declare module '$' {
  export * from 'vite-plugin-monkey/dist/client';
}

// if set mountGmApi=true
// type MonkeyWindow = import('vite-plugin-monkey/dist/client').MonkeyWindow;
// declare const unsafeWindow: MonkeyWindow['unsafeWindow'];
// declare const GM_addStyle: MonkeyWindow['GM_addStyle'];
// declare const GM_addElement: MonkeyWindow['GM_addElement'];
// declare const GM_deleteValue: MonkeyWindow['GM_deleteValue'];
// declare const GM_listValues: MonkeyWindow['GM_listValues'];
// declare const GM_addValueChangeListener: MonkeyWindow['GM_addValueChangeListener'];
// declare const GM_removeValueChangeListener: MonkeyWindow['GM_removeValueChangeListener'];
// declare const GM_setValue: MonkeyWindow['GM_setValue'];
// declare const GM_getValue: MonkeyWindow['GM_getValue'];
// declare const GM_log: MonkeyWindow['GM_log'];
// declare const GM_getResourceText: MonkeyWindow['GM_getResourceText'];
// declare const GM_getResourceURL: MonkeyWindow['GM_getResourceURL'];
// declare const GM_registerMenuCommand: MonkeyWindow['GM_registerMenuCommand'];
// declare const GM_unregisterMenuCommand: MonkeyWindow['GM_unregisterMenuCommand'];
// declare const GM_openInTab: MonkeyWindow['GM_openInTab'];
// declare const GM_xmlhttpRequest: MonkeyWindow['GM_xmlhttpRequest'];
// declare const GM_download: MonkeyWindow['GM_download'];
// declare const GM_getTab: MonkeyWindow['GM_getTab'];
// declare const GM_saveTab: MonkeyWindow['GM_saveTab'];
// declare const GM_getTabs: MonkeyWindow['GM_getTabs'];
// declare const GM_notification: MonkeyWindow['GM_notification'];
// declare const GM_setClipboard: MonkeyWindow['GM_setClipboard'];
// declare const GM_info: MonkeyWindow['GM_info'];
// declare const GM_cookie: MonkeyWindow['GM_cookie'];
