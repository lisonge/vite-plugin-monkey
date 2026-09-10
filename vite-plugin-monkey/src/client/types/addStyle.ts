export interface GmAddStyleType {
  (css: string): HTMLStyleElement;
}

export interface GmAsyncAddStyleType {
  (css: string): Promise<HTMLStyleElement> | HTMLStyleElement;
}
