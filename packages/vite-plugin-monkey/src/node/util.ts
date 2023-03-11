import type { InlinePreset } from 'unimport';
import { transformWithEsbuild } from 'vite';
import { logger } from './_logger';

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
export function toDataUrl(code: string): string;
/**
 * function and it parameters -> iife -> mini_iife -> javascript data url
 */
export function toDataUrl<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): Promise<string>;
export function toDataUrl(p0: any, ...args: any[]): string | Promise<string> {
  if (typeof p0 == 'string') {
    return `data:application/javascript,` + encodeURIComponent(p0);
  }
  return fn2dataUrl(p0, ...args);
}

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

/**
 * GM api preset when you use unimport/unplugin-auto-import
 *
 * Note, there is not comment in unimport.d.ts/auto-imports.d.ts file
 */
export const unimportPreset: InlinePreset = {
  from: 'vite-plugin-monkey/dist/client',
  imports: [
    'GM',
    'GM_addElement',
    'GM_addStyle',
    'GM_addValueChangeListener',
    'GM_cookie',
    'GM_deleteValue',
    'GM_download',
    'GM_getResourceText',
    'GM_getResourceURL',
    'GM_getTab',
    'GM_getTabs',
    'GM_getValue',
    'GM_info',
    'GM_listValues',
    'GM_log',
    'GM_notification',
    'GM_openInTab',
    'GM_registerMenuCommand',
    'GM_removeValueChangeListener',
    'GM_saveTab',
    'GM_setClipboard',
    'GM_setValue',
    'GM_unregisterMenuCommand',
    'GM_xmlhttpRequest',
    'GM_webRequest',
    'unsafeWindow',
    'monkeyWindow',
  ],
};
