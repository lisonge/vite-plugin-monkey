import type { IPromise } from '../types';

/**
 * format userscript comment
 */
export type Format = {
  /**
   * @description note font_width/font_family, suggest fixed-width font
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

/**
 * @example
 * // input/output
 * [
 *   [ 'name', 'example' ],
 *   [ 'name:ja', 'hentai' ],
 *   [ 'name:zh', '测试_' ],
 *   [ 'namespace', 'https://github.com/lisonge' ],
 *   [ 'version', '1.0.1' ],
 *   [ 'author', 'lisonge' ],
 *   [ 'description', 'default description zh' ],
 *   [ 'description:zh', '描述' ],
 *   [ 'description:en', 'description' ],
 *   [ 'description:ja', '説明z' ],
 *   [ 'description:zh-CN', '描述' ],
 *   [ 'license', 'MIT' ],
 *   [ 'icon', 'https://vitejs.dev/logo.svg' ],
 *   [
 *     'homepage',
 *     'https://github.com/lisonge/vite-plugin-monkey#readme'
 *   ],
 *   [
 *     'homepageURL',
 *     'https://github.com/lisonge/vite-plugin-monkey#readme'
 *   ],
 *   [ 'source', 'https://github.com/lisonge/vite-plugin-monkey.git' ],
 *   [
 *     'supportURL',
 *     'https://github.com/lisonge/vite-plugin-monkey/issues'
 *   ],
 *   [ 'match', 'https://i.songe.li/' ],
 *   [ 'require', 'https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0' ],
 *   [
 *     'require',
 *     'https://cdn.jsdelivr.net/npm/prettier@2.7.1/standalone.js'
 *   ],
 *   [
 *     'require',
 *     'https://cdn.jsdelivr.net/npm/prettier@2.7.1/parser-babel.js'
 *   ],
 *   [ 'grant', 'GM_addElement' ],
 *   [ 'grant', 'GM_cookie' ],
 *   [ 'grant', 'unsafeWindow' ]
 * ]
 */
export type AlignFunc = (
  p0: [string, ...string[]][],
) => IPromise<[string, ...string[]][]>;
