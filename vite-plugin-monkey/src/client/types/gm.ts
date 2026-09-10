import type { GmAsyncAddElementType } from './addElement.ts';
import type { GmAsyncAddStyleType } from './addStyle.ts';
import type { GmAsyncAudioType } from './audio.ts';
import type { GmAsyncCookieType } from './cookie.ts';
import type { GmAsyncDownloadType } from './download.ts';
import type { GmAsyncGetResourceTextType } from './getResourceText.ts';
import type { GmAsyncGetResourceURLType } from './getResourceURL.ts';
import type { GmInfoType } from './info.ts';
import type { GmAsyncLogType } from './log.ts';
import type {
  GmAsnycUnregisterMenuCommandType,
  GmAsyncRegisterMenuCommandType,
} from './menuCommand.ts';
import type { GmAsyncNotificationType } from './notification.ts';
import type { GmAsyncSetClipboardType } from './setClipboard.ts';
import type {
  GmAsyncGetTabsType,
  GmAsyncGetTabType,
  GmAsyncOpenInTabType,
  GmAsyncSaveTab,
} from './tab.ts';
import type {
  GmAsyncAddValueChangeListenerType,
  GmAsyncDeleteValuesType,
  GmAsyncDeleteValueType,
  GmAsyncGetValuesType,
  GmAsyncGetValueType,
  GmAsyncListValuesType,
  GmAsyncRemoveValueChangeListenerType,
  GmAsyncSetValuesType,
  GmAsyncSetValueType,
} from './value.ts';
import type { GmAsyncWebRequestType } from './webRequest.ts';
import type { GmAsyncXmlhttpRequestType } from './xmlhttpRequest.ts';

export interface GmType {
  info: GmInfoType;
  log: GmAsyncLogType;
  getValue: GmAsyncGetValueType;
  getValues: GmAsyncGetValuesType;
  setValue: GmAsyncSetValueType;
  setValues: GmAsyncSetValuesType;
  listValues: GmAsyncListValuesType;
  deleteValue: GmAsyncDeleteValueType;
  deleteValues: GmAsyncDeleteValuesType;
  addValueChangeListener: GmAsyncAddValueChangeListenerType;
  removeValueChangeListener: GmAsyncRemoveValueChangeListenerType;
  getResourceText: GmAsyncGetResourceTextType;
  getResourceUrl: GmAsyncGetResourceURLType;
  addElement: GmAsyncAddElementType;
  addStyle: GmAsyncAddStyleType;
  getTab: GmAsyncGetTabType;
  saveTab: GmAsyncSaveTab;
  getTabs: GmAsyncGetTabsType;
  openInTab: GmAsyncOpenInTabType;
  registerMenuCommand: GmAsyncRegisterMenuCommandType;
  unregisterMenuCommand: GmAsnycUnregisterMenuCommandType;
  notification: GmAsyncNotificationType;
  setClipboard: GmAsyncSetClipboardType;
  xmlHttpRequest: GmAsyncXmlhttpRequestType;
  download: GmAsyncDownloadType;
  cookie: GmAsyncCookieType;
  webRequest: GmAsyncWebRequestType;
  audio: GmAsyncAudioType;
}
