// node vite-plugin-monkey/scripts/probe-single-bundle.ts <prototype directory> [report.json]
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { version as vite, rolldownVersion as rolldown } from 'vite';
import baseline from '../src/node/index.ts';
import {
  createDisposables,
  createTestProject,
  buildOutput,
  userScript,
} from '../test/support/project.ts';

assert.ok(process.argv[2], 'Provide the saved single-file prototype directory');
const prototype: typeof baseline = (
  await import(
    pathToFileURL(path.resolve(process.argv[2], 'src/node/index.ts')).href
  )
).default;
const disposables = createDisposables();
const dynamicFailures = [];
const staticAwait = [];
try {
  for (const [name, monkey] of Object.entries({ baseline, prototype })) {
    for (const minify of [false, true]) {
      const project = await createTestProject(disposables);
      await project.write({
        'main.js': `globalThis.load = () => import('./fail.js');`,
        'fail.js': `calls.push('execute'); throw new Error('failure');`,
      });
      const script = userScript(
        await project.build({
          plugins: [monkey({ entry: 'main.js' })],
          build: { minify },
        }),
      );
      const context = vm.createContext({ calls: [] });
      await vm.runInContext(script.code, context);
      const outcomes = [];
      for (let i = 0; i < 2; i++)
        outcomes.push(
          await Promise.resolve()
            .then(() => context.load())
            .then(
              () => 'success',
              (error) => String(error),
            ),
        );
      dynamicFailures.push({ name, minify, outcomes, calls: context.calls });
    }
  }
  // This measures Rolldown's static-module flattening, not a baseline regression.
  for (const strictExecutionOrder of [false, true]) {
    const project = await createTestProject(disposables);
    await project.write({
      'entry.js': `import './waiting.js'; import './sibling.js'; events.push('entry');`,
      'waiting.js': `events.push('waiting'); await gate; events.push('resolved');`,
      'sibling.js': `events.push('sibling');`,
    });
    const output = buildOutput(
      await project.build({
        build: {
          target: 'esnext',
          minify: false,
          rolldownOptions: {
            input: path.join(project.root, 'entry.js'),
            output: {
              format: 'es',
              codeSplitting: false,
              strictExecutionOrder,
            },
          },
        },
      }),
    );
    assert.equal(output.length, 1);
    assert.equal(output[0].type, 'chunk');
    const gate = Promise.withResolvers<void>();
    const events: string[] = [];
    const done = vm.runInNewContext(`(async () => { ${output[0].code} })()`, {
      events,
      gate: gate.promise,
    });
    await Promise.resolve();
    const beforeGate = [...events];
    gate.resolve();
    await done;
    staticAwait.push({ strictExecutionOrder, beforeGate, afterGate: events });
  }
  const report = {
    environment: { node: process.version, vite, rolldown },
    dynamicFailures,
    staticAwait,
  };
  const reportPath =
    process.argv[3] ??
    new URL('../benchmarks/single-bundle-semantics.json', import.meta.url);
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await disposables.close();
}
