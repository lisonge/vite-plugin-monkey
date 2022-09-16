import { transformWithEsbuild } from 'vite';
/*eslint @typescript-eslint/no-explicit-any: "off"*/

/**
 * transform function and parameter to iife function string, then transform this string to dataUrl
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
 *         await util.encodeFn(() => {
 *           // \@ts-ignore
 *           window.Vue = Vue; // work with element-plus
 *         }, []),
 *       ),
 *   ],
 *   ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
 *   ['element-plus', cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js')],
 * ];
 */
export const encodeFn = async <T extends (...args: any[]) => any>(
  fn: T,
  args: Parameters<T>,
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
