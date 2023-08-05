import { build } from '@unocss/cli';
import fs from 'node:fs/promises';
import unocss from 'unocss/vite';
import type { ConfigEnv, Plugin } from 'vite';

const iframeTemplate = /* html */ `
<script type="module">
// base must be '/'
import '/@vite/client';
import '/__uno.css';

const unoStyle = document.querySelector(
  'head style[data-vite-dev-id="/__uno.css"]',
);
const update = ()=>{
  parent.postMessage(
    {
      type: '__unocss_update',
      textContent: unoStyle?.textContent,
    },
    '*',
  );
}
if (window != parent) {
  update();
  new MutationObserver(update).observe(unoStyle, {
    childList: true,
    attributes: true,
  });
}
</script>
`.trim();

const moduleTemplate = /* js */ `
const style = document.createElement('style');
style.textContent = __UNOCSS_TEXT__;
export default style;
if (import.meta.env.DEV) {
  const origin = new URL(import.meta.url).origin;
  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type == '__unocss_update') {
      style.textContent = data.textContent;
    }
  });
  const iframe = document.createElement('iframe');
  iframe.src = origin + '/__unocss_iframe';
  iframe.style.display = 'none';
  document.head.append(iframe);
}
`.trim();

export const unocssStyle = async (env: ConfigEnv): Promise<Plugin[]> => {
  const dev = env.command == 'serve';
  const unocss_text = await (async () => {
    if (!dev) {
      // or use createGenerator({},{}).generate(code)
      await build({
        cwd: process.cwd(),
        config: './unocss.config.ts',
        patterns: ['./src/**/*.{js,mjs,ts,jsx,tsx,vue,svelte}'],
        stdout: false,
        minify: true,
        outFile: './uno-prebuilt.css',
      });
      const text = (await fs.readFile('./uno-prebuilt.css', 'utf-8')).trim();
      await fs.unlink('./uno-prebuilt.css');
      return text;
    } else {
      return '';
    }
  })();

  return [
    {
      name: 'unocss:style',
      resolveId(source) {
        if (source == `unocss?style`) return `__unocss_style`;
      },
      async load(id) {
        if (id == `__unocss_style`) {
          return moduleTemplate.replace(
            '__UNOCSS_TEXT__',
            JSON.stringify(unocss_text),
          );
        }
      },
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith(`/__unocss_iframe`)) {
            res.setHeader('content-type', 'text/html');
            res.end(iframeTemplate);
            return;
          }
          next();
        });
      },
    },
    ...(dev ? unocss() : []),
  ];
};
