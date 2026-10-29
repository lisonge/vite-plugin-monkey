import { stringifyFunction } from './utils/others.ts';

const dataJsUrl = (code: string): string => {
  return 'data:application/javascript,' + encodeURIComponent(code);
};

/**
 * string -> javascript data url
 * @example
 * scriptDataUrl('console.log("hello world")')
 * // => data:application/javascript,console.log(%22hello%20world%22)
 */
export function scriptDataUrl(code: string): string;
/**
 * Serialize a function and JSON arguments into a JavaScript Data URL.
 * The function cannot capture variables from the configuration scope.
 * Top-level undefined preserves argument positions and defaults. Unsupported
 * function, symbol, bigint and circular values throw during serialization.
 *
 * @example
 * scriptDataUrl((a)=>{console.log(a)}, 'world')
 */
export function scriptDataUrl<Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  ...args: NoInfer<Args>
): string;
export function scriptDataUrl<Args extends unknown[]>(
  p0: string | ((...args: Args) => unknown),
  ...args: NoInfer<Args>
): string {
  if (typeof p0 == 'string') {
    return dataJsUrl(p0);
  }
  return dataJsUrl(stringifyFunction(p0, ...args));
}
