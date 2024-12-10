import type { GmAsyncAddElementType } from './addElement';
import type { GmAsyncAddStyleType } from './addStyle';
import type { GmAsyncCookieType } from './cookie';
import type { GmAsyncDownloadType } from './download';
import type { GmAsyncGetResourceTextType } from './getResourceText';
import type { GmAsyncGetResourceURLType } from './getResourceURL';
import type { GmInfoType } from './info';
import type { GmAsyncLogType } from './log';
import type {
  GmAsnycUnregisterMenuCommandType,
  GmAsyncRegisterMenuCommandType,
} from './menuCommand';
import type { GmAsyncNotificationType } from './notification';
import type { GmAsyncSetClipboardType } from './setClipboard';
import type {
  GmAsyncGetTabsType,
  GmAsyncGetTabType,
  GmAsyncOpenInTabType,
  GmAsyncSaveTab,
} from './tab';
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
} from './value';
import type { GmAsyncWebRequestType } from './webRequest';
import type { GmAsyncXmlhttpRequestType } from './xmlhttpRequest';

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
}
