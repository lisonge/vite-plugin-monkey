import type { Plugin } from 'vite';
import type { MonkeyOptions } from '../vite-plugin-monkey/src/node/utils/types.ts';
export const userscript = (name: string): MonkeyOptions['userscript'] => ({
  name: `Monkey playground · ${name}`,
  namespace: 'vite-plugin-monkey/playground',
  match: ['https://songe.li/*'],
});
// Direct users to the shared external page for manual userscript checks.
const hostPage = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>Monkey 联调页面</title><body><p>安装脚本后，打开 <a href="https://songe.li/">https://songe.li/</a> 进行联调。</p></body></html>`;
export function hostPagePlugin(): Plugin {
  return {
    name: 'playground:host-page',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/host') return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(hostPage);
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'host.html', source: hostPage });
    },
  };
}
export const server = {
  host: '0.0.0.0',
  port: 5173,
  strictPort: true,
  origin: 'http://localhost:5173',
};
export const preview = { host: 'localhost', port: 4173, strictPort: true };
