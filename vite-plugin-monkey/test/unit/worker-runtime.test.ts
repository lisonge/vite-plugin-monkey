import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import {
  workerBootstrap,
  workerRuntimeModule,
} from '../../src/node/workers/runtime.ts';

test.each(['startup', 'resource'])(
  'empty %s errors cross both Worker bridge endpoints',
  async (mode) => {
    const runtime = workerRuntimeModule(
      workerBootstrap(
        `() => ({ register() {}, importModule() { throw ''; } })`,
      ),
    ).replace('export function createWorker', 'function createWorker');
    const bootstrap = vm.runInNewContext(runtime + '; source;');
    const self = Object.assign(new EventTarget(), { close() {} });
    vm.runInNewContext(bootstrap, {
      self,
      URL,
      Blob,
      atob,
    });
    class Port {
      peer!: Port;
      onmessage?: (event: { data: unknown }) => void;
      postMessage(data: unknown) {
        queueMicrotask(() => this.peer.onmessage?.({ data }));
      }
      close() {
        this.onmessage = undefined;
      }
    }
    class Channel {
      port1 = new Port();
      port2 = new Port();
      constructor() {
        this.port1.peer = this.port2;
        this.port2.peer = this.port1;
      }
    }
    class Worker extends EventTarget {
      terminated = false;
      terminate() {
        this.terminated = true;
      }
      postMessage(data: unknown, ports: Port[]) {
        queueMicrotask(() =>
          self.dispatchEvent(
            Object.assign(new Event('message'), { data, ports }),
          ),
        );
      }
    }
    class ErrorEvent extends Event {
      message: string;
      constructor(type: string, options: { message: string }) {
        super(type);
        this.message = options.message;
      }
    }
    const createWorker = vm.runInNewContext(runtime + '; createWorker;', {
      URL,
      Blob,
      MessageChannel: Channel,
      Worker,
      ErrorEvent,
      AbortController,
      GM_getResourceURL: () => Promise.reject(''),
    });
    const worker: Worker = createWorker({
      entry: 'entry',
      modules: { entry: { source: '' } },
      assets:
        mode === 'resource'
          ? { asset: { resource: 'asset', mime: 'image/png' } }
          : {},
    });
    const failed = Promise.withResolvers<string>();
    worker.addEventListener('error', (event) =>
      failed.resolve((event as ErrorEvent).message),
    );
    try {
      assert.match(await failed.promise, /Worker initialization failed/);
      assert.equal(worker.terminated, true);
    } finally {
      worker.terminate();
    }
  },
);

test.each([null, undefined, '', 'failure'])(
  'Worker startup reports thrown %s through its private port',
  async (error) => {
    const bootstrap = workerBootstrap(
      `() => ({ register() {}, importModule() { throw error; } })`,
    );
    const reported = Promise.withResolvers<string>();
    const self = Object.assign(new EventTarget(), { close() {} });
    vm.runInNewContext(bootstrap, {
      self,
      error,
      URL,
      Blob,
      atob,
    });
    self.dispatchEvent(
      Object.assign(new Event('message'), {
        ports: [
          {
            postMessage(data: { fatal?: string }) {
              if ('fatal' in data) reported.resolve(data.fatal!);
            },
          },
        ],
        data: {
          entry: 'entry',
          modules: { entry: { source: '' } },
          assets: {},
        },
      }),
    );
    assert.equal(await reported.promise, String(error));
  },
);

test.each([null, undefined, ''])(
  'Worker resource bridge reports rejected %s',
  async (error) => {
    const reported = Promise.withResolvers<{ error: string }>();
    const port = {
      onmessage: undefined as unknown as (event: {
        data: { id: number; resource: string };
      }) => Promise<void>,
      close() {},
      postMessage: reported.resolve,
    };
    class Channel {
      port1 = port;
      port2 = { close() {} };
    }
    class Worker extends EventTarget {
      terminate() {}
      postMessage() {}
    }
    const createWorker = vm.runInNewContext(
      workerRuntimeModule().replace(
        'export function createWorker',
        'function createWorker',
      ) + '; createWorker;',
      {
        URL,
        Blob,
        MessageChannel: Channel,
        Worker,
        AbortController,
        GM_getResourceURL: () => Promise.reject(error),
      },
    );
    const worker = createWorker({
      entry: 'entry',
      modules: { entry: { resource: 'entry' } },
      assets: {},
    });
    try {
      await port.onmessage({ data: { id: 1, resource: 'entry' } });
      assert.equal((await reported.promise).error, String(error));
    } finally {
      worker.terminate();
    }
  },
);

test('Worker queues application messages until the parent acknowledges readiness', async () => {
  const bootstrap = workerBootstrap(
    `() => ({ register() {}, importModule() { importing.resolve(); return initialized.promise; } })`,
  );
  const importing = Promise.withResolvers<void>();
  const initialized = Promise.withResolvers<void>();
  const ready = Promise.withResolvers<void>();
  const self = Object.assign(new EventTarget(), { close() {} });
  const port = {
    onmessage: undefined as
      | ((event: { data: { ready: boolean } }) => void)
      | undefined,
    postMessage(data: { ready?: boolean }) {
      if (data.ready) ready.resolve();
    },
  };
  vm.runInNewContext(bootstrap, {
    self,
    importing,
    initialized,
    URL,
    MessageEvent,
    Blob,
    atob,
  });
  const delivered: string[] = [];
  self.addEventListener('message', (event) => {
    delivered.push((event as MessageEvent<string>).data);
  });
  self.dispatchEvent(
    Object.assign(new Event('message'), {
      ports: [port],
      data: { assets: {}, entry: 'entry', modules: { entry: { source: '' } } },
    }),
  );
  await importing.promise;
  self.dispatchEvent(new MessageEvent('message', { data: 'during startup' }));
  initialized.resolve();
  await ready.promise;
  assert.deepEqual(delivered, []);
  self.dispatchEvent(new MessageEvent('message', { data: 'before ack' }));
  assert.deepEqual(delivered, []);
  assert.ok(port.onmessage);
  port.onmessage({ data: { ready: true } });
  await Promise.resolve();
  assert.deepEqual(delivered, ['during startup', 'before ack']);
  self.dispatchEvent(new MessageEvent('message', { data: 'after ack' }));
  assert.deepEqual(delivered, ['during startup', 'before ack', 'after ack']);
});
