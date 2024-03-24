import type { InlinePreset } from 'unimport';
import { transformWithEsbuild } from 'vite';
import { preset } from './unimport';

/**
 * transform function and parameter to iife code then mini code then transform code to data url string
 *
 * this tool function is used to make umd-cdn and iife-cdn work normally, such as element-plus and vue
 *
 * @example
 * // this example comes form https://github.com/lisonge/vite-plugin-monkey/blob/main/playground/ex-vue-demi/vite.config.ts
 * const externalGlobals = [
 *   [
 *     'vue',
 *     cdn
 *       .jsdelivr('Vue', 'dist/vue.global.prod.js')
 *       .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
 *       .concat(
 *         await util.fn2dataUrl(() => {
 *           // \@ts-ignore
 *           window.Vue = Vue; // work with element-plus
 *         }),
 *       ),
 *   ],
 *   ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
 *   ['element-plus', cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js')],
 * ];
 */
export const fn2dataUrl = async <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => {
  return (
    'data:application/javascript,' +
    encodeURIComponent(
      (
        await transformWithEsbuild(
          `;(${fn})(...${JSON.stringify(args)})`,
          'any_name.js',
          {
            minify: true,
            sourcemap: false,
            legalComments: 'none',
          },
        )
      ).code.trimEnd(),
    )
  );
};

/**
 * string -> javascript data url
 */
export function dataUrl(code: string): string;
/**
 * function and it parameters -> iife -> mini_iife -> javascript data url
 */
export function dataUrl<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): Promise<string>;
export function dataUrl(p0: any, ...args: any[]): string | Promise<string> {
  if (typeof p0 == 'string') {
    return `data:application/javascript,` + encodeURIComponent(p0);
  }
  return fn2dataUrl(p0, ...args);
}

/**
 * GM api preset when you use unimport/unplugin-auto-import
 *
 * Note, there is not comment in unimport.d.ts/auto-imports.d.ts file
 */
export const unimportPreset: InlinePreset = preset;
