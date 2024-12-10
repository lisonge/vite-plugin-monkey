export interface GmGetResourceTextType {
  (name: string): string;
}

export interface GmAsyncGetResourceTextType {
  (name: string): Promise<string>;
}
