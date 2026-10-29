import type { Plugin } from 'vite';

const getWorkerConstructor = (
  id: string,
): 'Worker' | 'SharedWorker' | undefined => {
  const queryIndex = id.indexOf('?');
  if (queryIndex === -1) return;
  const query = new URLSearchParams(id.slice(queryIndex + 1));
  if (query.has('url')) return;
  if (query.has('worker')) return 'Worker';
  if (query.has('sharedworker')) return 'SharedWorker';
};

const workerWrapper = (constructor: 'Worker' | 'SharedWorker') =>
  `
const dataUri = \`data:text/javascript;charset=utf-8,\${encodeURIComponent(
  \`import \${JSON.stringify(
    new URL('?worker_file&type=module', import.meta['url']).href,
  )};\`,
)}\`;

export default function WorkerWrapper(options) {
  return new ${constructor}(dataUri, {
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
      const constructor = getWorkerConstructor(id);
      if (constructor) return workerWrapper(constructor);
    },
  };
};
