export interface GmSetClipboardType {
  (data: string, type: string): void;
}

export interface GmAsyncSetClipboardType {
  (data: string, type: string): Promise<void> | void;
}
