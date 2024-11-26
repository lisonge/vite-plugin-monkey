import type { GmAddElementType } from './addElement';
import type { GmAddStyleType } from './addStyle';
import type { GmAsyncCookieType } from './cookie';
import type { GmAsyncDownloadType } from './download';
import type { GmAsyncGetResourceTextType } from './getResourceText';
import type { GmAsyncGetResourceURLType } from './getResourceURL';
import type { GmInfoType } from './info';
import type { GmLogType } from './log';
import type {
  GmRegisterMenuCommandType,
  GmUnregisterMenuCommandType,
} from './menuCommand';
import type { GmAsyncNotificationType } from './notification';
import type { GmAsyncSetClipboardType } from './setClipboard';
import type {
  GmAsyncGetTabsType,
  GmAsyncGetTabType,
  GmAsyncSaveTab,
  GmOpenInTabType,
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
import type { GmAsyncXmlhttpRequestType } from './xmlhttpRequest';

export interface GmType {
  info: GmInfoType;

  log: GmLogType;
  addStyle: GmAddStyleType;
  addElement: GmAddElementType;
  openInTab: GmOpenInTabType;
  registerMenuCommand: GmRegisterMenuCommandType;
  unregisterMenuCommand: GmUnregisterMenuCommandType;

  setClipboard: GmAsyncSetClipboardType;
  addValueChangeListener: GmAsyncAddValueChangeListenerType;
  removeValueChangeListener: GmAsyncRemoveValueChangeListenerType;
  download: GmAsyncDownloadType;
  notification: GmAsyncNotificationType;
  setValue: GmAsyncSetValueType;
  getValue: GmAsyncGetValueType;
  deleteValue: GmAsyncDeleteValueType;
  listValues: GmAsyncListValuesType;
  setValues: GmAsyncSetValuesType;
  getValues: GmAsyncGetValuesType;
  deleteValues: GmAsyncDeleteValuesType;
  getResourceText: GmAsyncGetResourceTextType;
  getResourceUrl: GmAsyncGetResourceURLType;
  getTab: GmAsyncGetTabType;
  saveTab: GmAsyncSaveTab;
  getTabs: GmAsyncGetTabsType;
  cookie: GmAsyncCookieType;
  xmlHttpRequest: GmAsyncXmlhttpRequestType;
}
