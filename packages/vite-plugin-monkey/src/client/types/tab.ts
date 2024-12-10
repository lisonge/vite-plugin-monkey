export interface GmOpenInTabOptions {
  active?: boolean;
  insert?: boolean;
  /**
   * @available tampermonkey
   */
  setParent?: boolean;
  /**
   * @available tampermonkey
   */
  incognito?: boolean;
  /**
   * @available violentmonkey
   */
  container?: 0 | 1 | 2;
  /**
   * @available violentmonkey
   */
  pinned?: boolean;
}

export interface GmTabControl {
  onclose?: () => void;
  closed: boolean;
  close: () => void;
}

export interface GmOpenInTabType {
  (url: string, details?: GmOpenInTabOptions): GmTabControl;
  (url: string, openInBackground?: boolean): GmTabControl;
}
export interface GmAsyncOpenInTabType {
  (
    url: string,
    details?: GmOpenInTabOptions,
  ): GmTabControl | Promise<GmTabControl>;
  (
    url: string,
    openInBackground?: boolean,
  ): GmTabControl | Promise<GmTabControl>;
}

export interface GmGetTabType {
  <T = any>(callback: (tab: T) => void): void;
}

export interface GmAsyncGetTabType {
  <T = any>(): T;
}

export interface GmSaveTab {
  (tab: unknown): void;
}

export interface GmAsyncSaveTab {
  (tab: unknown): Promise<void>;
}

export interface GmGetTabsType {
  <T = any>(callback: (tabsMap: { [tabId: number]: T }) => void): void;
}
export interface GmAsyncGetTabsType {
  <T = any>(): Promise<{ [tabId: number]: T }>;
}
