import type { Plugin } from 'vite';

const isWorkerRequest = (id: string): boolean => {
  const queryIndex = id.indexOf('?');
  if (queryIndex === -1) return false;
  const query = new URLSearchParams(id.slice(queryIndex + 1));
  return query.has('worker') && !query.has('url');
};

const workerWrapper = `
const dataUri = \`data:text/javascript;charset=utf-8,\${encodeURIComponent(
  \`import \${JSON.stringify(
    new URL('?worker_file&type=module', import.meta['url']).href,
  )};\`,
)}\`;

export default function WorkerWrapper(options) {
  return new Worker(dataUri, {
    type: 'module',
    name: options?.name,
  });
}
`.trimStart();

export const fixWorkerFactory = (): Plugin => {
  // https://github.com/lisonge/vite-plugin-monkey/issues/217
  return {
    name: 'monkey:fixWorker',
    enforce: 'pre',
    apply: 'serve',
    load(id) {
      if (isWorkerRequest(id)) return workerWrapper;
    },
  };
};
