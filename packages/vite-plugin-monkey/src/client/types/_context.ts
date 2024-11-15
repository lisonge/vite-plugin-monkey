import type { GmAddElementType } from './addElement';
import type { GmAddStyleType } from './addStyle';
import type { GmCookieType } from './cookie';
import type { GmDownloadType } from './download';
import type { GmGetResourceTextType } from './getResourceText';
import type { GmGetResourceURLType } from './getResourceURL';
import type { GmType } from './gm';
import type { GmInfoType } from './info';
import type { GmLogType } from './log';
import type {
  GmRegisterMenuCommandType,
  GmUnregisterMenuCommandType,
} from './menuCommand';
import type { GmNotificationType } from './notification';
import type { GmSetClipboardType } from './setClipboard';
import type {
  GmGetTabsType,
  GmGetTabType,
  GmOpenInTabType,
  GmSaveTab,
} from './tab';
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
} from './value';
import type { GmWebRequestType } from './webRequest';
import type { GmXmlhttpRequestType } from './xmlhttpRequest';

export interface GmContextType {
  unsafeWindow: typeof window;
  GM: GmType;
  GM_info: GmInfoType;
  GM_log: GmLogType;
  GM_getValue: GmGetValueType;
  GM_getValues: GmGetValuesType;
  GM_setValue: GmSetValueType;
  GM_setValues: GmSetValuesType;
  GM_deleteValue: GmDeleteValueType;
  GM_deleteValues: GmDeleteValuesType;
  GM_listValues: GmListValuesType;
  GM_addValueChangeListener: GmAddValueChangeListenerType;
  GM_removeValueChangeListener: GmRemoveValueChangeListenerType;
  GM_getResourceText: GmGetResourceTextType;
  GM_getResourceURL: GmGetResourceURLType;
  GM_addElement: GmAddElementType;
  GM_addStyle: GmAddStyleType;
  GM_openInTab: GmOpenInTabType;
  GM_getTab: GmGetTabType;
  GM_saveTab: GmSaveTab;
  GM_getTabs: GmGetTabsType;
  GM_registerMenuCommand: GmRegisterMenuCommandType;
  GM_unregisterMenuCommand: GmUnregisterMenuCommandType;
  GM_notification: GmNotificationType;
  GM_setClipboard: GmSetClipboardType;
  GM_xmlhttpRequest: GmXmlhttpRequestType;
  GM_download: GmDownloadType;
  GM_webRequest: GmWebRequestType;
  GM_cookie: GmCookieType;

  onurlchange?: null;
  addEventListener(
    type: 'urlchange',
    cb: (data: { url: string }) => void,
  ): void;
  removeEventListener(type: 'urlchange', cb: (...args: any[]) => any): void;
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/57467
export type MonkeyWindow = typeof window & GmContextType;
