export interface GmLogType {
  (message: any): void;
}
export interface GmAsyncLogType {
  (message: any): Promise<void> | void;
}
