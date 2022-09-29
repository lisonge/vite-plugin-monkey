import { transformWithEsbuild } from 'vite';
import { logger } from './_logger';
/*eslint @typescript-eslint/no-explicit-any: "off"*/

/**
 * transform function and parameter to iife code then mini code then transform code to data url string
 *
 * this tool function is used to make umd-cdn and iife-cdn work normally, such as element-plus and vue
 *
 * @example
 * // this example comes form playground/ex-vue-demi/vite.config.ts
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
 * @deprecated use fn2dataUrl
 */
export const encodeFn = async <T extends (...args: any[]) => any>(
  fn: T,
  args: Parameters<T>,
) => {
  logger.warn('util.encodeFn is deprecated, use util.fn2dataUrl');
  return fn2dataUrl(fn, ...args);
};
