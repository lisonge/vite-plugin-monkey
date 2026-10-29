import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  build as viteBuild,
  createServer as viteCreateServer,
  mergeConfig,
} from 'vite';
import type { InlineConfig, Rolldown } from 'vite';
import monkey from '../../src/node/index.ts';
import type { MonkeyOptions } from '../../src/node/utils/types.ts';

export type Cleanup = () => void | Promise<void>;
export interface Disposables {
  defer(cleanup: Cleanup): void;
  close(): Promise<void>;
}
export function createDisposables(): Disposables {
  const callbacks: Cleanup[] = [];
  return {
    defer(cleanup) {
      callbacks.push(cleanup);
    },
    async close() {
      const errors: unknown[] = [];
      for (const cleanup of callbacks.splice(0).reverse()) {
        try {
          await cleanup();
        } catch (error) {
          errors.push(error);
        }
      }
      if (errors.length)
        throw new AggregateError(errors, 'Test resource cleanup failed');
    },
  };
}
export const repositoryRoot = fileURLToPath(
  new URL('../../../', import.meta.url),
);
const fixturesRoot = fileURLToPath(new URL('../fixtures/', import.meta.url));
function inside(root: string, name: string) {
  const target = path.resolve(root, name);
  assert.ok(
    target.startsWith(path.resolve(root) + path.sep),
    'Path escapes test project: ' + name,
  );
  return target;
}
async function writeFiles(
  root: string,
  files: Record<string, string | Uint8Array>,
) {
  for (const [name, source] of Object.entries(files)) {
    const target = inside(root, name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, source);
  }
}
async function copyFixture(root: string, name: string, subdirectory?: string) {
  await fs.cp(
    inside(fixturesRoot, name),
    subdirectory ? inside(root, subdirectory) : root,
    { recursive: true },
  );
}
export function buildOutput(
  result: Awaited<ReturnType<typeof viteBuild>>,
): Rolldown.OutputBundle[string][] {
  const results = Array.isArray(result) ? result : [result];
  assert.equal(results.length, 1, 'Expected one build output');
  const bundle = results[0];
  assert.ok('output' in bundle, 'Expected a completed build, not a watcher');
  return bundle.output;
}
export function userScript(
  result: Awaited<ReturnType<typeof viteBuild>>,
  fileName?: string,
): Rolldown.OutputChunk {
  const script = buildOutput(result).find((item) =>
    fileName ? item.fileName === fileName : item.fileName.endsWith('.user.js'),
  );
  assert.ok(script?.type === 'chunk');
  return script;
}
export function nextBuild(watcher: Awaited<ReturnType<typeof viteBuild>>) {
  assert.ok(!Array.isArray(watcher) && 'on' in watcher);
  return new Promise<void>((resolve, reject) => {
    const listener = (event: { code: string; error?: unknown }) => {
      if (event.code === 'END' || event.code === 'ERROR') {
        watcher.off('event', listener);
        if (event.code === 'ERROR') reject(event.error);
        else resolve();
      }
    };
    watcher.on('event', listener);
  });
}
export type TestArtifacts = Map<string, string | Uint8Array>;
export async function createTestProject(
  disposables: Disposables,
  artifacts: TestArtifacts = new Map(),
) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-test-'));
  disposables.defer(() =>
    fs.rm(root, { recursive: true, force: true, maxRetries: 3 }),
  );
  const defaults: InlineConfig = {
    root,
    configFile: false,
    logLevel: 'silent',
  };
  const build = async (config: InlineConfig = {}) => {
    const result = await viteBuild(
      mergeConfig({ ...defaults, build: { write: false } }, config),
    );
    if (!Array.isArray(result) && 'close' in result)
      disposables.defer(() => result.close());
    for (const bundle of Array.isArray(result) ? result : [result]) {
      if ('output' in bundle) {
        for (const item of bundle.output)
          artifacts.set(
            item.fileName,
            item.type === 'chunk' ? item.code : item.source,
          );
      }
    }
    return result;
  };
  const createServer = async (config: InlineConfig) => {
    const server = await viteCreateServer(mergeConfig(defaults, config));
    disposables.defer(() => server.close());
    return server;
  };
  return {
    root,
    artifacts,
    write: (files: Record<string, string | Uint8Array>) =>
      writeFiles(root, files),
    copy: (name: string, subdirectory?: string) =>
      copyFixture(root, name, subdirectory),
    async linkDependencies(names: string[]) {
      for (const name of names) {
        const target = inside(path.join(root, 'node_modules'), name);
        await fs.mkdir(path.dirname(target), { recursive: true });
        const source = await fs.realpath(
          inside(path.join(repositoryRoot, 'node_modules'), name),
        );
        await fs.symlink(
          source,
          target,
          process.platform === 'win32' ? 'junction' : 'dir',
        );
      }
    },
    build,
    async buildScript(
      option: Partial<MonkeyOptions> = {},
      config: InlineConfig = {},
    ) {
      return userScript(
        await build(
          mergeConfig(
            {
              plugins: [monkey({ entry: 'main.js', ...option })],
            },
            config,
          ),
        ),
        option.output?.script,
      );
    },
    createServer,
    async serve(
      option: Partial<MonkeyOptions> = {},
      config: InlineConfig = {},
    ) {
      const server = await createServer(
        mergeConfig(
          {
            server: {
              host: '127.0.0.1',
              port: 0,
              open: false,
              hmr: false,
              watch: null,
              fs: { allow: [root, repositoryRoot] },
            },
            optimizeDeps: { noDiscovery: true, entries: [] },
            plugins: [
              monkey({
                entry: 'main.js',

                ...option,
              }),
            ],
          },
          config,
        ),
      );
      await server.listen();
      const address = server.httpServer!.address();
      assert.ok(address && typeof address !== 'string');
      return { server, origin: 'http://127.0.0.1:' + address.port };
    },
  };
}
export type TestProject = Awaited<ReturnType<typeof createTestProject>>;
