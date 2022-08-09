export type TamperScriptMeta = {
  name_i18n: Record<string, string>;
  description_i18n: Record<string, string>;
  antifeatures: Record<string, Record<string, string>>;
  blockers: unknown[];
  'run-at': string;
  options: object;
  icon64?: string;
  sync: { imported: number };
  webRequest?: string[];
  requires: { textContent: string }[];
};
export type TamperInfo = {
  downloadMode: 'native' | 'browser' | 'disabled';
  isIncognito: boolean;
  isFirstPartyIsolation?: boolean;
  scriptSource: string;
};

/**
 * @see https://developer.chrome.com/docs/extensions/reference/cookies/#type-Cookie
 */
type ChromeCookie = {
  domain?: string;
  expirationDate?: number;
  httpOnly?: boolean;
  name?: string;
  path?: string;
  sameSite?: 'no_restriction' | 'lax' | 'strict' | 'unspecified';
  secure?: boolean;
  storeId?: string;
  url?: string;
  value?: string;
};

type CbCookie = {
  domain: string;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  session: boolean;
  value: string;
};

export type CookieFn = {
  delete: (details: { name?: string; url?: string }) => void;
  list: (
    details: {
      url?: string;
      domain?: string;
      name?: string;
      path?: string;
    },
    cb: (cookies: CbCookie[], error: unknown) => void,
  ) => void;
  set: (details: ChromeCookie, callback: (error: unknown) => void) => void;
};
