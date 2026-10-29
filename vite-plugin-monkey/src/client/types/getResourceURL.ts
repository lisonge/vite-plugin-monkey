export interface GmGetResourceURLType {
  (name: string, isBlobUrl?: boolean): string;
}

export interface GmAsyncGetResourceURLType {
  (name: string, isBlobUrl?: boolean): Promise<string>;
}
