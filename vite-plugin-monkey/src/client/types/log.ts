export interface GmLogType {
  (...data: any[]): void;
}
export interface GmAsyncLogType {
  (...data: any[]): Promise<void> | void;
}
