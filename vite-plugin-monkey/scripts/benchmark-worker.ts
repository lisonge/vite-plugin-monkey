// node vite-plugin-monkey/scripts/benchmark-worker.ts <baseline directory> [report.json] [baseline label] [prototype directory]
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { version as viteVersion, rolldownVersion } from 'vite';
import monkey from '../src/node/index.ts';
import {
  createDisposables,
  createTestProject,
  buildOutput,
  userScript,
} from '../test/support/project.ts';

const baselineDirectory = process.argv[2];
assert.ok(
  baselineDirectory,
  'Provide a separate baseline package directory with its dependencies installed',
);
const snapshot = path.resolve(baselineDirectory);
const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const prototypeRoot = process.argv[5]
  ? path.resolve(process.argv[5])
  : packageRoot;
assert.notEqual(snapshot, path.resolve(packageRoot));
const revision = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: snapshot,
  encoding: 'utf8',
}).trim();
const disposables = createDisposables();
const reportPath = path.resolve(
  process.argv[3] ?? path.join(packageRoot, 'benchmarks/modules.json'),
);
try {
  const baseline: typeof monkey = (
    await import(pathToFileURL(path.join(snapshot, 'src/node/index.ts')).href)
  ).default;
  const prototype: typeof monkey =
    prototypeRoot === packageRoot
      ? monkey
      : (
          await import(
            pathToFileURL(path.join(prototypeRoot, 'src/node/index.ts')).href
          )
        ).default;
  const implementations = { baseline, prototype };
  const results = [];
  for (const fixture of [
    'minimal',
    'resource-and-modules',
    'main-dynamic',
    'main-simple',
    'main-css',
    'main-tla',
    'main-external',
    'main-external-default',
    'main-external-namespace',
    'main-external-dynamic',
  ] as const) {
    const project = await createTestProject(disposables);
    if (fixture === 'minimal') {
      await project.write({
        'main.js': `import W from './worker.js?worker'; new W();`,
        'worker.js': `self.onmessage = () => self.postMessage(42);`,
      });
    } else if (fixture.startsWith('main-external')) {
      await project.write({
        'main.js':
          fixture === 'main-external-default'
            ? `import value from 'fixture-lib'; globalThis.answer = value;`
            : fixture === 'main-external-namespace'
              ? `import * as value from 'fixture-lib'; globalThis.answer = value;`
              : `import { answer } from 'fixture-lib'; globalThis.answer = answer;${fixture === 'main-external-dynamic' ? " globalThis.load = () => import('./lazy.js');" : ''}`,
        'lazy.js': `import * as library from 'fixture-lib'; export { library };`,
        'node_modules/fixture-lib/package.json':
          '{"name":"fixture-lib","version":"1.0.0","main":"index.js"}',
        'node_modules/fixture-lib/index.js': 'export const answer = 42;',
      });
    } else if (fixture === 'main-simple') {
      await project.write({ 'main.js': `globalThis.answer = 42;` });
    } else if (fixture === 'main-css') {
      await project.write({
        'main.js': `import './style.css'; globalThis.answer = 42;`,
        'style.css': `body { color: red; }`,
      });
    } else if (fixture === 'main-tla') {
      await project.write({
        'main.js': `globalThis.answer = await Promise.resolve(42);`,
      });
    } else if (fixture === 'main-dynamic') {
      await project.copy('async');
    } else {
      await project.copy('worker-resource');
      await project.copy('module-worker', 'semantics');
      await project.copy('shared', 'shared');
      await project.write({
        'answer.wasm': Buffer.from(
          'AGFzbQEAAAABBQFgAAF/AwIBAAcKAQZhbnN3ZXIAAAoGAQQAQSoL',
          'base64',
        ),
        'payload.bin': Uint8Array.from([0, 1, 127, 128, 254, 255]),
      });
    }
    await project.write({
      'package.json': '{"name":"worker-benchmark","type":"module"}',
    });
    const modes = fixture.startsWith('main-')
      ? (['inline'] as const)
      : (['inline', 'resource'] as const);
    for (const mode of modes)
      for (const minify of [false, true]) {
        const measurements = {
          baseline: [] as number[],
          prototype: [] as number[],
        };
        const sizes: Record<string, unknown> = {};
        // Two warmups, then nine measured rounds. Alternate order to reduce drift bias.
        for (let round = -2; round < 9; round++) {
          const order = (
            round % 2 === 0
              ? ['baseline', 'prototype']
              : ['prototype', 'baseline']
          ) as (keyof typeof implementations)[];
          for (const implementation of order) {
            const started = performance.now();
            const result = await project.build({
              plugins: [
                implementations[implementation]({
                  entry: 'main.js',
                  output: { script: 'benchmark.user.js' },
                  dependencies: fixture.startsWith('main-external')
                    ? {
                        'fixture-lib': {
                          kind: 'global',
                          global: 'FixtureLib',
                          urls: ['https://example.test/library.js'],
                        },
                      }
                    : {},
                  assets:
                    mode === 'resource'
                      ? { publicPath: 'https://releases.invalid/benchmark/' }
                      : {},
                }),
              ],
              build: { minify },
            });
            const elapsed = performance.now() - started;
            if (round >= 0) measurements[implementation].push(elapsed);
            if (round === 8) {
              const script = userScript(result);
              const output = buildOutput(result);
              const bytes = output.map((item) =>
                Buffer.from(item.type === 'chunk' ? item.code : item.source),
              );
              sizes[implementation] = {
                outputHash: createHash('sha256')
                  .update(
                    JSON.stringify(
                      output
                        .map((item) => [
                          item.fileName,
                          Buffer.from(
                            item.type === 'chunk' ? item.code : item.source,
                          ).toString('base64'),
                        ])
                        .sort(([a], [b]) => a.localeCompare(b)),
                    ),
                  )
                  .digest('hex'),
                scriptBytes: Buffer.byteLength(script.code),
                totalBytes: bytes.reduce((sum, value) => sum + value.length, 0),
                totalGzipBytes: bytes.reduce(
                  (sum, value) => sum + gzipSync(value).length,
                  0,
                ),
                files: output.length,
              };
              // Keep the final output for manual inspection without extra builds.
              const artifactRoot = path.join(
                path.dirname(reportPath),
                '.codex-worker-output',
                `${fixture}-${mode}-${minify}`,
                implementation,
              );
              for (const item of output) {
                const target = path.join(artifactRoot, item.fileName);
                await fs.mkdir(path.dirname(target), { recursive: true });
                await fs.writeFile(
                  target,
                  item.type === 'chunk' ? item.code : item.source,
                );
              }
            }
            project.artifacts.clear();
          }
        }
        const timing = Object.fromEntries(
          Object.entries(measurements).map(([name, samples]) => {
            const sorted = [...samples].sort((a, b) => a - b);
            return [
              name,
              {
                medianMs: sorted[4],
                minMs: sorted[0],
                maxMs: sorted[8],
                samplesMs: samples,
              },
            ];
          }),
        );
        const row = { fixture, mode, minify, sizes, timing };
        results.push(row);
        console.log(JSON.stringify(row));
      }
  }
  async function sourceMetrics(root: string) {
    const files = [];
    const names = (
      await fs.readdir(path.join(root, 'src/node'), { recursive: true })
    )
      .filter((name) => name.endsWith('.ts'))
      .sort();
    const hash = createHash('sha256');
    for (const relative of names) {
      const name = 'src/node/' + relative.replaceAll('\\', '/');
      const source = await fs.readFile(path.join(root, name), 'utf8');
      hash.update(name).update(source);
      files.push({
        name,
        bytes: Buffer.byteLength(source),
        nonblankLines: source.split(/\r?\n/).filter((line) => line.trim())
          .length,
      });
    }
    return {
      sourceHash: hash.digest('hex'),
      files,
      nonblankLines: files.reduce((sum, file) => sum + file.nonblankLines, 0),
    };
  }
  const report = {
    baselineRevision: revision,
    baselineLabel: process.argv[4] ?? 'Installed baseline checkout',
    date: new Date().toISOString(),
    environment: {
      node: process.version,
      vite: viteVersion,
      rolldown: rolldownVersion,
      platform: process.platform,
      arch: process.arch,
    },
    method:
      'Same process and fixture root; two warmups per case, nine samples, alternating implementation order; build.write=false. Gzip totals compress each output file separately. Not a startup/runtime benchmark.',
    scope:
      'Worker and main-thread simple, CSS, TLA and dynamic-import fixtures comparing the supplied baseline and candidate sources.',
    limitations: [
      'The adapter depends on the helper protocol emitted by Vite moduleRunnerTransform.',
      'Emitted chunks must have explicit exports and statically resolvable imports; remaining export-star or computed imports are rejected.',
      'Source metrics count all src/node TypeScript files, including unchanged code, not third-party implementation size.',
      'Existing contracts and targeted tests are not an exhaustive ECMAScript module conformance suite.',
    ],
    source: {
      baseline: await sourceMetrics(snapshot),
      prototype: await sourceMetrics(prototypeRoot),
    },
    results,
  };
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log('Report: ' + reportPath);
} finally {
  await disposables.close();
}
