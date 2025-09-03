export interface GmAbortHandle<TReturn = void> {
  abort(): TReturn;
}

export interface GmProgressEventBase {
  done: number;
  lengthComputable: boolean;
  loaded: number;
  position: number;
  total: number;
  totalSize: number;
}

export interface GmReponseEventListener<Event> {
  (this: Event, event: Event): void;
}

export interface GmVoidCallback {
  (error: any): void;
}

export type GmAnyFuntion = (...args: any[]) => any;
