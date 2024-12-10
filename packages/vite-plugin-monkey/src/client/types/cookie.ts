interface GmPartitionKeyType {
  topLevelSite?: string;
}

interface GmCallbackCookie {
  domain: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  session: boolean;
  value: string;
}

interface GmCookieListOptions {
  url?: string;
  domain?: string;
  name?: string;
  path?: string;
  partitionKey?: GmPartitionKeyType;
}

interface GmCookieSetOptions {
  url?: string;
  name?: string;
  value?: string;
  domain?: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expirationDate?: number;
}

interface GmCookieDeleteOptions {
  url?: string;
  name?: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
}

interface GmCookieListCallback {
  (cookies: GmCallbackCookie[], error: string | null): void;
}
interface GmCookieCallback {
  (error: string | null): void;
}

export interface GmCookieType {
  list(details: GmCookieListOptions, callback?: GmCookieListCallback): void;
  set(details: GmCookieSetOptions, callback?: GmCookieCallback): void;
  delete(details: GmCookieDeleteOptions, callback?: GmCookieCallback): void;
}

export interface GmAsyncCookieType {
  list(details: GmCookieListOptions): Promise<GmCallbackCookie[]>;
  set(details: GmCookieSetOptions): Promise<void>;
  delete(details: { name?: string; url?: string }): Promise<void>;
}
