import type { GmAbortHandle } from './_share';

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
 */
export interface GmWebRequestRule {
  selector:
    | string
    | {
        include?: string | string[];
        match?: string | string[];
        exclude?: string | string[];
      };
  action:
    | string
    | {
        cancel?: boolean;
        redirect?:
          | string
          | {
              url: string;
              from?: string;
              to?: string;
            };
      };
}

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
 */
export interface GmWebRequestListener {
  (
    /**
     * 'cancel' | 'redirect'
     */
    info: string,
    /**
     * 'ok' | 'error'
     */
    message: string,
    details: {
      rule: GmWebRequestRule;
      url: string;
      redirect_url: string;
      description: string;
    },
  ): void;
}

export interface GmWebRequestType {
  (rules: GmWebRequestRule[], listener: GmWebRequestListener): GmAbortHandle;
}
export interface GmAsyncWebRequestType {
  (
    rules: GmWebRequestRule[],
    listener: GmWebRequestListener,
  ): Promise<GmAbortHandle>;
}
