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
  (error: unknown): void;
}

export type GmAnyFuntion<
  Args extends unknown[] = unknown[],
  Result = unknown,
> = (...args: Args) => Result;
