export const gmIdentifiers = [
  'GM_addElement',
  'GM_addStyle',
  'GM_addValueChangeListener',
  'GM_cookie',
  'GM_deleteValue',
  'GM_deleteValues',
  'GM_download',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_getTab',
  'GM_getTabs',
  'GM_getValue',
  'GM_getValues',
  'GM_info',
  'GM_listValues',
  'GM_log',
  'GM_notification',
  'GM_openInTab',
  'GM_registerMenuCommand',
  'GM_removeValueChangeListener',
  'GM_saveTab',
  'GM_setClipboard',
  'GM_setValue',
  'GM_setValues',
  'GM_unregisterMenuCommand',
  'GM_webRequest',
  'GM_xmlhttpRequest',
] as const;

const gmMembers = [
  'GM.addElement',
  'GM.addStyle',
  'GM.addValueChangeListener',
  'GM.cookie',
  'GM.deleteValue',
  'GM.deleteValues',
  'GM.download',
  'GM.getResourceText',
  // https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
  'GM.getResourceUrl',
  'GM.getTab',
  'GM.getTabs',
  'GM.getValue',
  'GM.getValues',
  'GM.info',
  'GM.listValues',
  'GM.log',
  'GM.notification',
  'GM.openInTab',
  'GM.registerMenuCommand',
  'GM.removeValueChangeListener',
  'GM.saveTab',
  'GM.setClipboard',
  'GM.setValue',
  'GM.setValues',
  'GM.unregisterMenuCommand',
  'GM.webRequest',
  'GM.xmlHttpRequest',
] as const;

const othersGrantNames = [
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange',
] as const;

export type GrantType =
  | (typeof gmIdentifiers)[number]
  | (typeof gmMembers)[number]
  | (typeof othersGrantNames)[number];

export const grantNames = [...gmMembers, ...gmIdentifiers, ...othersGrantNames];
