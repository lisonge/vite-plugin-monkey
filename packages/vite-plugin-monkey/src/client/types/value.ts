export interface GmGetValueType {
  <T = any>(key: string, defaultValue?: T): T;
}

export interface GmAsyncGetValueType {
  <T = any>(key: string, defaultValue?: T): Promise<T>;
}

export interface GmGetValuesType {
  <T extends Record<string, any>>(): T;
  /**
   * @example
   * const values1 = GM_getValues(['key1', 'key2']); // { key1: any; key2: any }
   * const values2 = GM_getValues<{ key1: string; key2: number }>(['key1', 'key2']);
   */
  <T extends Record<string, any>>(keys: (keyof T)[]): T;
  <T extends Record<string, any>>(keyValues: T): T;
}

export interface GmAsyncGetValuesType {
  <T extends Record<string, any>>(): Promise<T>;
  /**
   * @example
   * const values1 = await GM.getValues(['key1', 'key2']); // { key1: any; key2: any }
   * const values2 = await GM.getValues<{ key1: string; key2: number }>(['key1', 'key2']);
   */
  <T extends Record<string, any>>(keys: (keyof T)[]): Promise<T>;
  <T extends Record<string, any>>(keyValues: T): Promise<T>;
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
  ): string | number | Promise<string | number>;
}

export interface GmRemoveValueChangeListenerType {
  (listenerId: string | number): void;
}
export interface GmAsyncRemoveValueChangeListenerType {
  (listenerId: string | number): void;
}
