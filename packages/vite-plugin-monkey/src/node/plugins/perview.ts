import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizePath, PluginOption, ResolvedConfig } from 'vite';
import { fn2string, redirectFn } from '../inject_template';
import type { FinalMonkeyOption } from '../types';

async function* walk(dirPath: string) {
  const pathnameList = (await fs.readdir(dirPath)).map((s) =>
    path.join(dirPath, s),
  );
  while (pathnameList.length > 0) {
    const pathname = pathnameList.pop()!;
    const state = await fs.lstat(pathname);
    if (state.isFile()) {
      yield pathname;
    } else if (state.isDirectory()) {
      pathnameList.push(
        ...(await fs.readdir(pathname)).map((s) => path.join(pathname, s)),
      );
    }
  }
}

export const perviewPlugin = (finalOption: FinalMonkeyOption): PluginOption => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:perview',
    apply: 'serve',
    configResolved(config) {
      viteConfig = config;
    },
    async configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (['/', '/index.html'].includes((req.url ?? '').split('?')[0])) {
          const distDirPath = path.join(process.cwd(), viteConfig.build.outDir);
          for await (const pathname of walk(distDirPath)) {
            if (pathname.endsWith('.user.js')) {
              const fileName = normalizePath(
                path.relative(distDirPath, pathname),
              );
              Object.entries({
                'content-type': 'text/html; charset=utf-8',
              }).forEach(([k, v]) => {
                res.setHeader(k, String(v));
              });
              res.end(
                `<script type="module" data-source="vite-plugin-monkey">${fn2string(
                  redirectFn,
                  '/' + fileName,
                )}</script>`,
              );
              return;
            }
          }
        }
        next();
      });
    },
  };
};
