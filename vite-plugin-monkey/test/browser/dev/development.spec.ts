import { test, expect } from '../../support/browser.ts';

test('installed sandbox survives restart with optimized GM imports, workers, WASM and HMR', async ({
  project,
  page,
  diagnostics,
  userscript,
}) => {
  expect(process.env.NODE_ENV).toBe('development');
  await project.write({
    'node_modules/bridge-consumer/package.json': JSON.stringify({
      name: 'bridge-consumer',
      version: '1.0.0',
      type: 'module',
      main: 'index.js',
    }),
    'node_modules/bridge-consumer/index.js': `import { GM_getValue } from '$'; export const readAnswer = () => GM_getValue('answer');`,
    'worker.js': 'self.onmessage = () => self.postMessage(8);',
    'main.js': `
      import { readAnswer } from 'bridge-consumer';
      import InlineWorker from './worker.js?worker&inline';
      import Worker from './worker.js?worker';
      import value from './value.js';
      import './style.css';
      import { GM_getValue } from '$';

      document.body.dataset.dev = String(import.meta.env.DEV);
      document.body.dataset.prod = String(import.meta.env.PROD);
      document.body.dataset.nodeEnv = process.env.NODE_ENV;
      document.body.dataset.value = String(value);
      document.body.dataset.gm = String(GM_getValue('answer'));
      document.body.dataset.optimizedGm = String(readAnswer());
      for (const [Constructor, key] of [[InlineWorker, 'inlineWorker'], [Worker, 'worker']]) {
        const worker = new Constructor();
        worker.onmessage = ({ data }) => {
          document.body.dataset[key] = String(data);
          worker.terminate();
        };
        worker.postMessage('run');
      }
      import('./lazy.js').then((module) => {
        document.body.dataset.lazy = String(module.default);
      });
      if (import.meta.hot) import.meta.hot.accept();
    `,
    'value.js': 'export default 1;',
    'lazy.js': `
      import { answer } from './answer.wasm';
      const values = [];
      for await (const value of [Promise.resolve(answer())]) values.push(value);
      export default await Promise.resolve(values[0] - 35);
      if (import.meta.hot) import.meta.hot.accept((module) => {
        document.body.dataset.lazy = String(module.default);
      });
    `,
    'answer.wasm': Buffer.from(
      'AGFzbQEAAAABBQFgAAF/AwIBAAcKAQZhbnN3ZXIAAAoGAQQAQSoL',
      'base64',
    ),
    'style.css': 'body { color: rgb(1, 2, 3); }',
  });
  const { origin, server } = await project.serve(
    {},
    {
      base: '/dev/',
      optimizeDeps: {
        noDiscovery: false,
        entries: ['main.js'],
        include: ['bridge-consumer'],
      },
      server: { watch: {}, hmr: true },
    },
  );
  const response = await fetch(
    `${origin}/dev/__vite-plugin-monkey.install.user.js`,
  );
  expect(response.ok).toBe(true);
  const installer = await response.text();

  // A userscript manager keeps the installed bootstrap across Vite restarts.
  await server.restart();
  await userscript.installDevelopment(installer, { gmValues: { answer: 42 } });
  const body = page.locator('body');
  await expect(body).toHaveAttribute('data-dev', 'true');
  await expect(body).toHaveAttribute('data-prod', 'false');
  await expect(body).toHaveAttribute('data-node-env', 'development');
  await expect(body).toHaveAttribute('data-value', '1');
  await expect(body).toHaveAttribute('data-gm', '42');
  await expect(body).toHaveAttribute('data-optimized-gm', '42');
  await expect(body).toHaveAttribute('data-worker', '8');
  await expect(body).toHaveAttribute('data-inline-worker', '8');
  await expect(body).toHaveAttribute('data-lazy', '7');
  await expect(body).toHaveCSS('color', 'rgb(1, 2, 3)');
  expect(
    diagnostics.requests.some((url) =>
      url.includes('/.vite/deps/bridge-consumer.js'),
    ),
    'GM API consumer must run from an optimized dependency',
  ).toBe(true);

  await project.write({
    'value.js': 'export default 2;',
    'lazy.js': `
      import { answer } from './answer.wasm';
      export default await Promise.resolve(answer() - 33);
      if (import.meta.hot) import.meta.hot.accept((module) => {
        document.body.dataset.lazy = String(module.default);
      });
    `,
    'style.css': 'body { color: rgb(4, 5, 6); }',
  });
  await expect(body).toHaveAttribute('data-value', '2');
  await expect(body).toHaveAttribute('data-lazy', '9');
  await expect(body).toHaveCSS('color', 'rgb(4, 5, 6)');

  await page.reload();
  await expect(body).toHaveAttribute('data-gm', '42');
  await expect(body).toHaveAttribute('data-lazy', '9');
  expect(diagnostics.errors).toEqual([]);
});
