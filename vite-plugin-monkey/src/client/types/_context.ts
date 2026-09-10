import type { GmAddElementType } from './addElement.ts';
import type { GmAddStyleType } from './addStyle.ts';
import type { GmAudioType } from './audio.ts';
import type { GmCookieType } from './cookie.ts';
import type { GmDownloadType } from './download.ts';
import type { GmGetResourceTextType } from './getResourceText.ts';
import type { GmGetResourceURLType } from './getResourceURL.ts';
import type { GmType } from './gm.ts';
import type { GmInfoType } from './info.ts';
import type { GmLogType } from './log.ts';
import type {
  GmRegisterMenuCommandType,
  GmUnregisterMenuCommandType,
} from './menuCommand.ts';
import type { GmNotificationType } from './notification.ts';
import type { GmSetClipboardType } from './setClipboard.ts';
import type {
  GmGetTabsType,
  GmGetTabType,
  GmOpenInTabType,
  GmSaveTab,
} from './tab.ts';
import type {
  GmAddValueChangeListenerType,
  GmDeleteValuesType,
  GmDeleteValueType,
  GmGetValuesType,
  GmGetValueType,
  GmListValuesType,
  GmRemoveValueChangeListenerType,
  GmSetValuesType,
  GmSetValueType,
} from './value.ts';
import type { GmWebRequestType } from './webRequest.ts';
import type { GmXmlhttpRequestType } from './xmlhttpRequest.ts';

export interface GmContextType {
  unsafeWindow: typeof window;
  GM: GmType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_info
   * @see https://violentmonkey.github.io/api/gm/#gm_info
   */
  GM_info: GmInfoType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_log
   * @available tampermonkey
   */
  GM_log: GmLogType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
   */
  GM_getValue: GmGetValueType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getValues
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalues
   */
  GM_getValues: GmGetValuesType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
   * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
   */
  GM_setValue: GmSetValueType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setValues
   * @see https://violentmonkey.github.io/api/gm/#gm_setvalues
   */
  GM_setValues: GmSetValuesType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValue
   * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
   */
  GM_deleteValue: GmDeleteValueType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValues
   * @see https://violentmonkey.github.io/api/gm/#gm_deletevalues
   */
  GM_deleteValues: GmDeleteValuesType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_listValues
   * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
   */
  GM_listValues: GmListValuesType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   */
  GM_addValueChangeListener: GmAddValueChangeListenerType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_removeValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
   */
  GM_removeValueChangeListener: GmRemoveValueChangeListenerType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceText
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
   */
  GM_getResourceText: GmGetResourceTextType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
   */
  GM_getResourceURL: GmGetResourceURLType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addElement
   * @see https://violentmonkey.github.io/api/gm/#gm_addelement
   */
  GM_addElement: GmAddElementType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addStyle
   * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
   */
  GM_addStyle: GmAddStyleType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_openInTab
   * @see https://violentmonkey.github.io/api/gm/#gm_openintab
   */
  GM_openInTab: GmOpenInTabType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getTab
   * @available tampermonkey
   */
  GM_getTab: GmGetTabType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_saveTab
   * @available tampermonkey
   */
  GM_saveTab: GmSaveTab;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getTabs
   * @available tampermonkey
   */
  GM_getTabs: GmGetTabsType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_registerMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
   */
  GM_registerMenuCommand: GmRegisterMenuCommandType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_unregisterMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
   */
  GM_unregisterMenuCommand: GmUnregisterMenuCommandType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_notification
   * @see https://violentmonkey.github.io/api/gm/#gm_notification
   */
  GM_notification: GmNotificationType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setClipboard
   * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
   */
  GM_setClipboard: GmSetClipboardType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
   * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   */
  GM_xmlhttpRequest: GmXmlhttpRequestType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_download
   * @see https://violentmonkey.github.io/api/gm/#gm_download
   */
  GM_download: GmDownloadType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   * @available tampermonkey
   */
  GM_webRequest: GmWebRequestType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.set
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.delete
   * @available tampermonkey
   */
  GM_cookie: GmCookieType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.setMute
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.getState
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.addStateChangeListener
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.removeStateChangeListener
   * @available tampermonkey
   */
  GM_audio: GmAudioType;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
   */
  onurlchange?: null;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
   */
  addEventListener(
    type: 'urlchange',
    cb: (data: { url: string }) => void,
  ): void;
  removeEventListener(type: 'urlchange', cb: (...args: any[]) => any): void;

  /**
   * @see https://www.tampermonkey.net/documentation.php#api:window.focus
   */
  focus(): void;
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/57467
export type MonkeyWindow = typeof window & GmContextType;
