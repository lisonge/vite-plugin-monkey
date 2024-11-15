export interface GmGetResourceURLType {
  (name: string): string;
}

export interface GmAsyncGetResourceURLType {
  (name: string): Promise<string>;
}
