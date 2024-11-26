export interface GmGetValueType {
  <T = any>(key: string, defaultValue?: T): T;
}

export interface GmAsyncGetValueType {
  <T = any>(key: string, defaultValue?: T): Promise<T>;
}

export interface GmGetValuesType {
  (keys: string[]): any[];
  (keyValues: Record<string, any>): any[];
}

export interface GmAsyncGetValuesType {
  (keys: string[]): Promise<any[]>;
  (keyValues: Record<string, any>): Promise<any[]>;
}

export interface GmSetValueType {
  (key: string, value: unknown): void;
}

export interface GmAsyncSetValueType {
  (key: string, value: unknown): Promise<void>;
}

export interface GmSetValuesType {
  (values: Record<string, unknown>): void;
}

export interface GmAsyncSetValuesType {
  (values: Record<string, unknown>): Promise<void>;
}

export interface GmListValuesType {
  (): string[];
}

export interface GmAsyncListValuesType {
  (): Promise<string[]>;
}

export interface GmDeleteValueType {
  (name: string): void;
}

export interface GmAsyncDeleteValueType {
  (name: string): Promise<void>;
}

export interface GmDeleteValuesType {
  (keys: string[]): void;
}

export interface GmAsyncDeleteValuesType {
  (keys: string[]): Promise<void>;
}

export interface GmAddValueChangeListenerType {
  <T = any>(
    name: string,
    callback: (
      name: string,
      oldValue?: T,
      newValue?: T,
      remote?: boolean,
    ) => void,
  ): string;
}
export interface GmAsyncAddValueChangeListenerType {
  <T = any>(
    name: string,
    callback: (
      name: string,
      oldValue?: T,
      newValue?: T,
      remote?: boolean,
    ) => void,
  ): Promise<string>;
}

export interface GmRemoveValueChangeListenerType {
  (listenerId: string): void;
}
export interface GmAsyncRemoveValueChangeListenerType {
  (listenerId: string): Promise<void>;
}
