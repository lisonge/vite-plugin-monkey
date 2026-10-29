import type {
  GmResponseType,
  GmXmlhttpRequestOption,
  GmAsyncXmlhttpRequestReturnType,
} from './xmlhttpRequest.ts';
import type { GmOpenInTabType } from './tab.ts';
import type { GmRegisterMenuCommandType } from './menuCommand.ts';
import type { GmNotificationType } from './notification.ts';
import type { GmAddStyleType } from './addStyle.ts';
import type { GmAddElementType } from './addElement.ts';
import type { GmType } from './gm.ts';
import type { MonkeyWindow } from './_context.ts';
import type { ExcludedLegacyApi } from '../../shared/manager-capabilities.ts';
import type {
  TampermonkeyInfo,
  ViolentmonkeyInfo,
  GreasemonkeyInfo,
  GmInfoType,
} from './info.ts';
export interface CommonGM extends Pick<
  GmType,
  | 'getValue'
  | 'setValue'
  | 'deleteValue'
  | 'listValues'
  | 'getResourceUrl'
  | 'notification'
  | 'openInTab'
  | 'registerMenuCommand'
  | 'setClipboard'
  | 'xmlHttpRequest'
> {
  info: GmInfoType;
}
export interface PromiseRequest {
  <R extends GmResponseType = 'text', C = undefined, Json = unknown>(
    details: GmXmlhttpRequestOption<R, C, Json>,
  ): GmAsyncXmlhttpRequestReturnType<R, C, Json>;
}
export interface CallbackRequest {
  <R extends GmResponseType = 'text', C = undefined, Json = unknown>(
    details: GmXmlhttpRequestOption<R, C, Json>,
  ): void;
}
export interface TampermonkeyGM extends GmType {
  xmlHttpRequest: PromiseRequest;
  info: TampermonkeyInfo;
}
export interface ViolentmonkeyGM extends Pick<
  GmType,
  | 'cookie'
  | 'deleteValue'
  | 'deleteValues'
  | 'download'
  | 'getResourceUrl'
  | 'getValue'
  | 'getValues'
  | 'listValues'
  | 'setClipboard'
  | 'setValue'
  | 'setValues'
> {
  info: ViolentmonkeyInfo;
  xmlHttpRequest: PromiseRequest;
  openInTab: GmOpenInTabType;
  registerMenuCommand: GmRegisterMenuCommandType;
  notification: GmNotificationType;
  addStyle: GmAddStyleType;
  addElement: GmAddElementType;
}
export interface GreasemonkeyGM extends CommonGM {
  xmlHttpRequest: CallbackRequest;
  info: GreasemonkeyInfo;
}
export type CommonWindow = Omit<Window, 'GM' | `GM_${string}`> & {
  GM: CommonGM;
  unsafeWindow: typeof window;
};
export type TampermonkeyWindow = Omit<MonkeyWindow, 'GM' | 'GM_info'> & {
  GM: TampermonkeyGM;
  GM_info: TampermonkeyInfo;
};
export type ViolentmonkeyWindow = Omit<
  MonkeyWindow,
  'GM' | 'GM_info' | ExcludedLegacyApi<'violentmonkey'>
> & { GM: ViolentmonkeyGM; GM_info: ViolentmonkeyInfo };
export type GreasemonkeyWindow = Omit<CommonWindow, 'GM'> & {
  GM: GreasemonkeyGM;
};
