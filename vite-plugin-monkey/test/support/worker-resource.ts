import fs from 'node:fs/promises';
import type { InlineConfig, Rolldown } from 'vite';
import monkey from '../../src/node/index.ts';
import type { BrowserFixtures } from './browser.ts';
import { buildOutput, userScript, type TestProject } from './project.ts';

export const publicPath = 'https://releases.invalid/worker/v1/';
export type WorkerImport = 'query' | 'inline-query' | 'constructor';
export async function buildWorkerFixture(
  project: TestProject,
  mode: 'inline' | 'resource',
  form: WorkerImport = 'query',
  config: InlineConfig = {},
) {
  await project.copy('worker-resource');
  await project.copy('systemjs-worker', 'semantics');
  await project.copy('shared', 'shared');
  const mainFile = `${project.root}/main.js`;
  const main = await fs.readFile(mainFile, 'utf8');
  if (form !== 'query') {
    await fs.writeFile(
      mainFile,
      main.replace(
        "import ProbeWorker from './worker.js?worker';",
        form === 'inline-query'
          ? "import ProbeWorker from './worker.js?worker&inline';"
          : "function ProbeWorker(options) { return new Worker(new URL('./worker.js', import.meta.url), { ...options, type: 'module' }); }",
      ),
    );
  }
  await project.write({
    'package.json': '{"name":"worker-resource-test","type":"module"}',
    'answer.wasm': Buffer.from(
      'AGFzbQEAAAABBQFgAAF/AwIBAAcKAQZhbnN3ZXIAAAoGAQQAQSoL',
      'base64',
    ),
    'payload.bin': Uint8Array.from([0, 1, 127, 128, 254, 255]),
  });
  const result = await project.build({
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      monkey({
        entry: 'main.js',
        output: { meta: true },
        assets: mode === 'resource' ? { publicPath } : {},
      }),
    ],
  });
  const output = buildOutput(result);
  const script = userScript(result);
  return { output, script };
}

interface WorkerHarness {
  environment: { dev: boolean; prod: boolean; node: string };
  initial: Promise<unknown>;
  initialTransfer: { detached: boolean; response: Promise<unknown> };
  call(index: number, method: string, ...args: unknown[]): Promise<unknown>;
  event(index: number, name: string): Promise<void>;
  applicationError(index: number): Promise<string>;
  unexpected(): unknown[];
  close(): void;
}
type TestWindow = Window & typeof globalThis & { __workerTest: WorkerHarness };

export async function runWorkerFixture(
  {
    page,
    diagnostics,
    userscript,
    disposables,
  }: Pick<
    BrowserFixtures,
    'page' | 'diagnostics' | 'userscript' | 'disposables'
  >,
  script: Rolldown.OutputChunk,
  output: Rolldown.OutputBundle[string][],
  resourceFormat: 'data' | 'blob' = 'blob',
  missingResource = false,
) {
  const manager = await userscript.runBuilt(script, output, {
    resourceFormat,
    missingResource,
  });
  disposables.defer(async () => {
    await page.evaluate(() => (window as TestWindow).__workerTest?.close());
  });
  return {
    errors: diagnostics.errors,
    requests: diagnostics.requests,
    environment: () =>
      page.evaluate(() => (window as TestWindow).__workerTest.environment),
    initial: () =>
      page.evaluate(() => (window as TestWindow).__workerTest.initial),
    transfer: () =>
      page.evaluate(async () => {
        const { detached, response } = (window as TestWindow).__workerTest
          .initialTransfer;
        return { detached, bytes: await response };
      }),
    call: (index: number, method: string, ...args: unknown[]) =>
      page.evaluate(
        ({ index, method, args }) =>
          (window as TestWindow).__workerTest.call(index, method, ...args),
        { index, method, args },
      ),
    event: (index: number, name: string) =>
      page.evaluate(
        ({ index, name }) =>
          (window as TestWindow).__workerTest.event(index, name),
        { index, name },
      ),
    applicationError: (index: number) =>
      page.evaluate(
        (index) => (window as TestWindow).__workerTest.applicationError(index),
        index,
      ),
    calls: () => manager.calls(),
    unexpected: () =>
      page.evaluate(() => (window as TestWindow).__workerTest.unexpected()),
  };
}
