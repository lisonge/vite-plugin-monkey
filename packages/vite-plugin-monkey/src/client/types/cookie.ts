import type { GmVoidCallback } from './_share';

interface GmPartitionKeyType {
  topLevelSite?: string;
}

interface GmCallbackCookie {
  domain: string;
  expirationDate?: number;
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
  name: string;
  value: string;
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
  name: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
}

interface GmCookieListCallback {
  (cookies: GmCallbackCookie[], error: any): void;
}

export interface GmCookieType {
  list(details: GmCookieListOptions, callback?: GmCookieListCallback): void;
  set(details: GmCookieSetOptions, callback?: GmVoidCallback): void;
  delete(details: GmCookieDeleteOptions, callback?: GmVoidCallback): void;
}

export interface GmAsyncCookieType {
  list(): Promise<GmCallbackCookie[]>;
  list(details: GmCookieListOptions): Promise<GmCallbackCookie[]>;
  set(details: GmCookieSetOptions): Promise<void>;
  delete(details: GmCookieDeleteOptions): Promise<void>;
}
