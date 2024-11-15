import type { GmAddElementType } from './addElement';
import type { GmAddStyleType } from './addStyle';
import type { GmAsyncCookieType } from './cookie';
import type { GmDownloadType } from './download';
import type { GmAsyncGetResourceTextType } from './getResourceText';
import type { GmAsyncGetResourceURLType } from './getResourceURL';
import type { GmInfoType } from './info';
import type { GmLogType } from './log';
import type {
  GmRegisterMenuCommandType,
  GmUnregisterMenuCommandType,
} from './menuCommand';
import type { GmSetClipboardType } from './setClipboard';
import type {
  GmAsyncGetTabsType,
  GmAsyncGetTabType,
  GmAsyncSaveTab,
  GmOpenInTabType,
} from './tab';
import type {
  GmAddValueChangeListenerType,
  GmAsyncDeleteValuesType,
  GmAsyncDeleteValueType,
  GmAsyncGetValuesType,
  GmAsyncGetValueType,
  GmAsyncListValuesType,
  GmAsyncSetValuesType,
  GmAsyncSetValueType,
  GmRemoveValueChangeListenerType,
} from './value';
import type { GmAsyncXmlhttpRequestType } from './xmlhttpRequest';

export interface GmType {
  info: GmInfoType;

  log: GmLogType;
  addStyle: GmAddStyleType;
  addElement: GmAddElementType;
  openInTab: GmOpenInTabType;
  setClipboard: GmSetClipboardType;
  addValueChangeListener: GmAddValueChangeListenerType;
  removeValueChangeListener: GmRemoveValueChangeListenerType;
  registerMenuCommand: GmRegisterMenuCommandType;
  unregisterMenuCommand: GmUnregisterMenuCommandType;
  download: GmDownloadType;

  cookie: GmAsyncCookieType;
  setValue: GmAsyncSetValueType;
  getValue: GmAsyncGetValueType;
  deleteValue: GmAsyncDeleteValueType;
  listValues: GmAsyncListValuesType;
  setValues: GmAsyncSetValuesType;
  getValues: GmAsyncGetValuesType;
  deleteValues: GmAsyncDeleteValuesType;
  getResourceText: GmAsyncGetResourceTextType;
  getResourceURL: GmAsyncGetResourceURLType;
  getTab: GmAsyncGetTabType;
  saveTab: GmAsyncSaveTab;
  getTabs: GmAsyncGetTabsType;
  xmlHttpRequest: GmAsyncXmlhttpRequestType;
}
