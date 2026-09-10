export interface GmSetClipboardType {
  (data: string, type: string, cb?: () => void): void;
}

export interface GmAsyncSetClipboardType {
  (data: string, type: string, cb?: () => void): Promise<void> | void;
}
