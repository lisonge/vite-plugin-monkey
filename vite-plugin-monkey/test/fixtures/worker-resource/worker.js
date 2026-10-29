import * as semantics from './semantics/entry.js';

/* global process */

// Entry evaluation itself is asynchronous, before message listeners exist.
await Promise.resolve();
const startupGate = import.meta.env.VITE_TEST_WORKER_STARTUP_GATE;
if (startupGate) {
  const response = await globalThis.fetch(startupGate);
  if (!response.ok) throw new Error('Worker startup gate rejected');
}

const methods = {
  ...semantics,
  transfer(buffer) {
    return [...new Uint8Array(buffer)];
  },
  async resources() {
    const { read } = await import('./resources.js');
    return read();
  },
  context() {
    return { name: globalThis.name, gm: typeof globalThis.GM_getResourceURL };
  },
  environment() {
    return {
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      node: process.env.NODE_ENV,
    };
  },
};
globalThis.addEventListener('message', ({ data }) => {
  if (data.applicationError) {
    throw new Error('Intentional Worker application error');
  }
  void handle(data);
});
async function handle(data) {
  const { id, method, args } = data;
  try {
    globalThis.postMessage({ id, value: await methods[method](...args) });
  } catch (error) {
    globalThis.postMessage({ id, error: String(error.stack || error) });
  }
}
