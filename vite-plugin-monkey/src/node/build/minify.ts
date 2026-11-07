import { minify, type ResolvedConfig } from 'vite';
import { resolve } from 'import-meta-resolve';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Compress the finished script without invoking another bundler. */
export async function minifyScript(
  code: string,
  config: Pick<ResolvedConfig, 'build' | 'root'>,
) {
  if (!config.build.minify) return code;
  if (config.build.minify === 'terser') {
    const { maxWorkers: _, ...options } = config.build.terserOptions ?? {};
    const terser = await import(
      resolve(
        'terser',
        pathToFileURL(path.join(config.root, 'package.json')).href,
      )
    );
    return (
      await terser.minify(code, {
        safari10: true,
        ...options,
        module: false,
        toplevel: false,
        sourceMap: false,
      })
    ).code as string;
  }
  return (await minify('userscript.js', code)).code;
}
