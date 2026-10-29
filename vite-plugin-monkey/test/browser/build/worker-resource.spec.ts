import { expect, test } from '../../support/browser.ts';
import {
  buildWorkerFixture,
  publicPath,
  runWorkerFixture,
  type WorkerImport,
} from '../../support/worker-resource.ts';

const settle = (promise: Promise<unknown>) =>
  promise.then(
    (value) => ({ value }),
    (error: unknown) => ({ error: String(error) }),
  );

const cases = (['inline', 'resource'] as const).flatMap((mode) =>
  (['query', 'inline-query', 'constructor'] satisfies WorkerImport[]).map(
    (form) => ({ mode, form }),
  ),
);
for (const { mode, form } of cases) {
  test.describe(`${mode} / ${form}`, () => {
    test('preserves production environment, modules, assets and isolation', async ({
      project,
      page,
      diagnostics,
      userscript,
      disposables,
    }) => {
      const { output, script } = await buildWorkerFixture(project, mode, form, {
        build: { minify: form === 'constructor' },
        ...(mode === 'resource' && form === 'constructor'
          ? {
              worker: {
                rolldownOptions: {
                  output: {
                    entryFileNames: 'workers/[name]-[hash].js',
                    chunkFileNames: 'chunks/[name]-[hash].js',
                    assetFileNames: 'media/[name]-[hash][extname]',
                  },
                },
              },
            }
          : {}),
      });
      const harness = await runWorkerFixture(
        { page, diagnostics, userscript, disposables },
        script,
        output,
        form === 'constructor' ? 'data' : 'blob',
      );
      const productionEnvironment = {
        dev: false,
        prod: true,
        node: 'production',
      };
      expect(await harness.environment()).toEqual(productionEnvironment);
      expect(await harness.call(0, 'environment')).toEqual(
        productionEnvironment,
      );
      expect(await harness.call(1, 'environment')).toEqual(
        productionEnvironment,
      );
      expect(await harness.initial()).toMatchObject({ count: 0, events: [] });
      expect(await harness.transfer()).toEqual({
        detached: true,
        bytes: [3, 5, 8],
      });
      expect(await harness.call(0, 'context')).toEqual({
        name: 'first-worker',
        gm: 'undefined',
      });
      expect(await harness.call(1, 'context')).toEqual({
        name: 'second-worker',
        gm: 'undefined',
      });
      const lazyResource = output.find(
        (item) =>
          item.type === 'asset' &&
          item.fileName.endsWith('.js') &&
          String(item.source).includes('lazy:execute'),
      );
      if (mode === 'resource' && form !== 'inline-query') {
        expect(lazyResource).toBeDefined();
        expect(await harness.calls()).not.toContain(lazyResource!.fileName);
      }
      expect(await harness.call(0, 'lazy')).toMatchObject({
        sameNamespace: true,
        sameAsPrevious: true,
        value: 11,
        events: ['lazy:execute'],
      });
      if (mode === 'resource' && form !== 'inline-query') {
        expect(
          (await harness.calls()).filter(
            (name) => name === lazyResource!.fileName,
          ),
        ).toHaveLength(1);
      }
      expect(await harness.call(0, 'lazy')).toMatchObject({
        sameNamespace: true,
        sameAsPrevious: true,
        value: 12,
        events: ['lazy:execute'],
      });
      await harness.call(0, 'mutate', 4);
      expect(await harness.call(0, 'bindings')).toEqual({
        direct: 5,
        reexported: 5,
        namespace: 5,
      });
      expect(await harness.call(0, 'mutateCycle')).toMatchObject({
        cycle: { a: 'A1', b: 'B1', fromA: 'B1', fromB: 'A1' },
      });
      expect(await harness.call(1, 'snapshot')).toMatchObject({
        count: 0,
        events: [],
        cycle: { a: 'A0', b: 'B0', fromA: 'B0', fromB: 'A0' },
      });
      const firstTla = settle(harness.call(0, 'loadTla'));
      const secondTla = settle(harness.call(1, 'loadTla'));
      await Promise.all([
        harness.event(0, 'tla:waiting'),
        harness.event(1, 'tla:waiting'),
      ]);
      await harness.call(0, 'releaseTla');
      expect(await firstTla).toEqual({ value: 42 });
      expect(await harness.call(1, 'snapshot')).toMatchObject({
        events: ['tla:waiting'],
      });
      await harness.call(1, 'releaseTla');
      expect(await secondTla).toEqual({ value: 42 });
      expect(await harness.call(1, 'snapshot')).toMatchObject({
        events: ['tla:waiting', 'tla:complete', 'tla:importer', 'tla:resolved'],
      });
      await expect(harness.call(0, 'rejectTla')).rejects.toThrow(
        'TLA rejected',
      );
      expect(await harness.call(0, 'resources')).toEqual({
        image: expect.stringMatching(
          /^<svg xmlns=['"]http:\/\/www\.w3\.org\/2000\/svg['"]><symbol id=['"]symbol['"]\/><\/svg>\s*$/,
        ),
        mime: 'image/svg+xml',
        sameImage: true,
        fragment: '#symbol',
        bytes: [0, 1, 127, 128, 254, 255],
        initialized: 42,
        streamed: 42,
      });
      expect(await harness.call(1, 'resources')).toMatchObject({
        initialized: 42,
        streamed: 42,
      });
      expect(await harness.unexpected()).toEqual([]);
      expect(harness.errors).toEqual([]);
      expect(
        harness.requests.filter((url) => url.startsWith(publicPath)),
      ).toEqual([]);
      if (mode === 'resource') {
        if (form === 'constructor') {
          for (const directory of ['workers/', 'chunks/', 'media/']) {
            expect(
              output.some((item) => item.fileName.startsWith(directory)),
            ).toBe(true);
          }
        }
        const resources = [
          ...script.code.matchAll(/@resource\s+(\S+)\s+(\S+)/g),
        ];
        expect(resources.length).toBeGreaterThanOrEqual(3);
        expect(resources.some(([, name]) => name.endsWith('.js'))).toBe(
          form !== 'inline-query',
        );
        for (const [, name, url] of resources) {
          expect(output.some((item) => item.fileName === name)).toBe(true);
          expect(url).toBe(publicPath + name);
        }
        const calls = await harness.calls();
        expect(calls.length).toBeGreaterThanOrEqual(3);
        expect(
          calls.every((name) => resources.some((entry) => entry[1] === name)),
        ).toBe(true);
        expect(script.code).toMatch(/@grant\s+GM_getResourceURL/);
        const meta = output.find((item) => item.fileName.endsWith('.meta.js'));
        expect(meta?.type).toBe('asset');
        if (meta?.type === 'asset')
          expect(String(meta.source).match(/@resource[^\n]*/g)).toEqual(
            script.code.match(/@resource[^\n]*/g),
          );
      } else {
        expect(await harness.calls()).toEqual([]);
        expect(script.code).not.toMatch(/@resource\s|@grant\s+GM_getResource/);
      }
    });
  });
}

test('resource bridge failure reaches Worker error listeners', async ({
  project,
  page,
  diagnostics,
  userscript,
  disposables,
}) => {
  const { output, script } = await buildWorkerFixture(project, 'resource');
  const harness = await runWorkerFixture(
    { page, diagnostics, userscript, disposables },
    script,
    output,
    'data',
    true,
  );
  await expect(harness.initial()).rejects.toThrow(/Missing fixture resource/);
  expect(harness.requests.filter((url) => url.startsWith(publicPath))).toEqual(
    [],
  );
});

test('application errors do not close the Worker resource bridge', async ({
  project,
  page,
  diagnostics,
  userscript,
  disposables,
}) => {
  const { output, script } = await buildWorkerFixture(project, 'resource');
  const harness = await runWorkerFixture(
    { page, diagnostics, userscript, disposables },
    script,
    output,
  );
  expect(await harness.initial()).toMatchObject({ events: [] });
  expect(await harness.call(0, 'snapshot')).toMatchObject({ events: [] });
  expect(await harness.applicationError(0)).toContain(
    'Intentional Worker application error',
  );
  expect(await harness.call(0, 'lazy')).toMatchObject({
    sameNamespace: true,
    value: 11,
    events: ['lazy:execute'],
  });
  expect(await harness.call(0, 'resources')).toMatchObject({
    initialized: 42,
    streamed: 42,
  });
  expect(harness.errors).toEqual([]);
  expect(await harness.unexpected()).toEqual([]);
});

test('queued application errors preserve the Worker and its lazy resources', async ({
  project,
  page,
  host,
  diagnostics,
  userscript,
  disposables,
}) => {
  const gateUrl = host + '/worker-startup-gate';
  const entered = Promise.withResolvers<void>();
  const release = Promise.withResolvers<void>();
  let waiting = 0;
  disposables.defer(() => release.resolve());
  await page.context().route(gateUrl, async (route) => {
    if (++waiting === 2) entered.resolve();
    await release.promise;
    await route.fulfill({ status: 200, body: 'ready' });
  });
  const { output, script } = await buildWorkerFixture(
    project,
    'resource',
    'query',
    {
      define: {
        'import.meta.env.VITE_TEST_WORKER_STARTUP_GATE':
          JSON.stringify(gateUrl),
      },
    },
  );
  const harness = await runWorkerFixture(
    { page, diagnostics, userscript, disposables },
    script,
    output,
  );
  await entered.promise;
  const queuedError = await page.evaluateHandle(() => ({
    response: (
      window as Window &
        typeof globalThis & {
          __workerTest: { applicationError(index: number): Promise<string> };
        }
    ).__workerTest.applicationError(0),
  }));
  disposables.defer(() => queuedError.dispose());
  release.resolve();
  expect(await queuedError.evaluate(({ response }) => response)).toContain(
    'Intentional Worker application error',
  );
  expect(await harness.initial()).toMatchObject({ events: [] });
  expect(await harness.call(0, 'lazy')).toMatchObject({
    sameNamespace: true,
    value: 11,
    events: ['lazy:execute'],
  });
  expect(await harness.call(0, 'resources')).toMatchObject({
    initialized: 42,
    streamed: 42,
  });
  expect(harness.errors).toEqual([]);
  expect(await harness.unexpected()).toEqual([]);
});

test('entry initialization failure terminates Workers and closes their bridges', async ({
  project,
  page,
  host,
  diagnostics,
  userscript,
  disposables,
}) => {
  const gateUrl = host + '/worker-startup-failure';
  await page
    .context()
    .route(gateUrl, (route) =>
      route.fulfill({ status: 503, body: 'startup failed' }),
    );
  const { output, script } = await buildWorkerFixture(
    project,
    'resource',
    'query',
    {
      define: {
        'import.meta.env.VITE_TEST_WORKER_STARTUP_GATE':
          JSON.stringify(gateUrl),
      },
    },
  );
  const cleanup = await page.evaluateHandle(() => {
    const urls = new Set<string>();
    const terminated = new Set<Worker>();
    const closed = new Set<MessagePort>();
    const aborted = new Set<AbortSignal>();
    const revoked = new Set<string>();
    const NativeWorker = Worker;
    window.Worker = class extends NativeWorker {
      constructor(url: string | URL, options?: WorkerOptions) {
        super(url, options);
        urls.add(String(url));
      }
      terminate() {
        terminated.add(this);
        super.terminate();
      }
    };
    const NativeChannel = MessageChannel;
    window.MessageChannel = class extends NativeChannel {
      constructor() {
        super();
        for (const port of [this.port1, this.port2]) {
          const close = port.close.bind(port);
          port.close = () => {
            closed.add(port);
            close();
          };
        }
      }
    };
    const abort = AbortController.prototype.abort;
    AbortController.prototype.abort = function (reason) {
      aborted.add(this.signal);
      abort.call(this, reason);
    };
    const revoke = URL.revokeObjectURL;
    URL.revokeObjectURL = (url) => {
      revoked.add(url);
      revoke.call(URL, url);
    };
    return {
      snapshot: () => ({
        workers: urls.size,
        terminated: terminated.size,
        closedPorts: closed.size,
        aborted: aborted.size,
        bootstrapRevoked: [...urls].every((url) => revoked.has(url)),
      }),
    };
  });
  disposables.defer(() => cleanup.dispose());
  const harness = await runWorkerFixture(
    { page, diagnostics, userscript, disposables },
    script,
    output,
  );
  await expect(harness.initial()).rejects.toThrow(
    'Worker startup gate rejected',
  );
  await expect
    .poll(() => cleanup.evaluate((value) => value.snapshot()))
    .toEqual({
      workers: 2,
      terminated: 2,
      closedPorts: 4,
      aborted: 2,
      bootstrapRevoked: true,
    });
});
