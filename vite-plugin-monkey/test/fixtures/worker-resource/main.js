import ProbeWorker from './worker.js?worker';
import { createWorkerRequests } from './shared/worker-requests.ts';

/* global process */

function createProbe(name) {
  const worker = new ProbeWorker({ name });
  const requests = createWorkerRequests(name);
  const unexpected = [];
  worker.addEventListener('error', (event) => {
    if (
      requests.isWaiting('application:error') &&
      event.message.includes('Intentional Worker application error')
    ) {
      event.preventDefault();
      requests.resolveEvent('application:error', event.message);
      return;
    }
    requests.fail(new Error(event.message));
  });
  worker.addEventListener('message', ({ data }) => {
    if (!requests.receive(data)) unexpected.push(data);
  });
  return {
    call(method, ...args) {
      const { id, response } = requests.request();
      worker.postMessage({ id, method, args });
      return response;
    },
    transfer() {
      const { id, response } = requests.request();
      const bytes = new Uint8Array([3, 5, 8]);
      worker.postMessage({ id, method: 'transfer', args: [bytes.buffer] }, [
        bytes.buffer,
      ]);
      return { detached: bytes.byteLength === 0, response };
    },
    event: requests.event,
    applicationError() {
      const response = requests.waitEvent('application:error');
      worker.postMessage({ applicationError: true });
      return response;
    },
    unexpected,
    close() {
      worker.terminate();
      requests.fail(new Error('Worker terminated'));
    },
  };
}

const workers = [createProbe('first-worker'), createProbe('second-worker')];
globalThis.__workerTest = {
  environment: {
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    node: process.env.NODE_ENV,
  },
  call(index, method, ...args) {
    return workers[index].call(method, ...args);
  },
  event(index, name) {
    return workers[index].event(name);
  },
  applicationError(index) {
    return workers[index].applicationError();
  },
  unexpected() {
    return workers.flatMap((worker) => worker.unexpected);
  },
  close() {
    workers.forEach((worker) => worker.close());
  },
};
// Exercise messages posted immediately after construction, before async startup.
globalThis.__workerTest.initial = workers[0].call('snapshot');
globalThis.__workerTest.initial.catch(() => {});
globalThis.__workerTest.initialTransfer = workers[0].transfer();
globalThis.__workerTest.initialTransfer.response.catch(() => {});
