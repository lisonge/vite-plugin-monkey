export interface GmLogType {
  (...data: unknown[]): void;
}
export interface GmAsyncLogType {
  (...data: unknown[]): Promise<void> | void;
}
