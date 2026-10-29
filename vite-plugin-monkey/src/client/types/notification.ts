export type GmNotificationOptions = GmNotificationBaseOptions &
  ({ text: string; highlight?: boolean } | { text?: string; highlight: true });

export interface GmNotificationBaseOptions {
  title?: string;
  tag?: string;
  image?: string;
  /**
   * @available tampermonkey
   */
  highlight?: boolean;
  /**
   * @available tampermonkey
   */
  silent?: boolean;
  /**
   * @available tampermonkey
   */
  timeout?: number;
  /**
   * @available tampermonkey
   */
  url?: string;
  /**
   * @available violentmonkey
   */
  zombieTimeout?: number;
  /**
   * @available violentmonkey
   */
  zombieUrl?: string;
  onclick?: (event?: Event) => void;
  ondone?: () => void;
}

export interface GmNotificationControl {
  /**
   * @available violentmonkey
   */
  remove: () => Promise<void>;
}

export interface GmNotificationType {
  (
    details: GmNotificationOptions,
    ondone?: () => void,
  ): GmNotificationControl | void;
  (
    text: string,
    title?: string,
    image?: string,
    onclick?: () => void,
  ): GmNotificationControl | void;
}
export interface GmAsyncNotificationType {
  (
    details: GmNotificationOptions,
  ): Promise<boolean> | GmNotificationControl | void;
  (
    text: string,
    title?: string,
    image?: string,
    onclick?: () => void,
  ): Promise<boolean> | GmNotificationControl | void;
}
