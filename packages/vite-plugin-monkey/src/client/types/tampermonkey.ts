import type { WebRequestRule } from '../../shared/types';

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

type CookieDetails = {
  list: {
    url?: string;
    domain?: string;
    name?: string;
    path?: string;
  };
  set: ChromeCookie;
  delete: { name?: string; url?: string };
};
type CookieCallBack = {
  list: (cookies: CbCookie[], error: unknown) => void;
  set: (error: unknown) => void;
  delete: (error: unknown) => void;
};

type CookieResult = {
  list: Promise<CbCookie[]>;
  set: (error: unknown) => Promise<void>;
  delete: (error: unknown) => Promise<void>;
};

export type CookieFn = {
  list: (
    details: CookieDetails['list'],
    callback?: CookieCallBack['list'],
  ) => CookieResult['list'];
  set: (
    details: CookieDetails['set'],
    callback?: CookieCallBack['set'],
  ) => CookieResult['set'];
  delete: (
    details: CookieDetails['delete'],
    callback?: CookieCallBack['delete'],
  ) => CookieResult['delete'];
};

export type WebRequestListener = (
  info: 'cancel' | 'redirect',
  message: 'ok' | 'error',
  details: {
    rule: WebRequestRule;
    url: string;
    redirect_url: string;
    description: string;
  },
) => void;
