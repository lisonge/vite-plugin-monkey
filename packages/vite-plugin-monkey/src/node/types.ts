export type IPromise<T> = T | Promise<T>;

export type IArray<T = unknown> = T | T[];

/**
 * key is language code or ''
 * @see https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 * @example
 * {
 *   '':'default_name',
 *   'zh-CN':'名字',
 *   ja: '名前'
 * }
 */
export type LocaleType<T = unknown> = Record<string, T>;
