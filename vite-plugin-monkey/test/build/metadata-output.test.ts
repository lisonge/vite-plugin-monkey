import assert from 'node:assert/strict';
import monkey from '../../src/node/index.ts';
import { test } from '../support/fixture.ts';
import { buildOutput, userScript } from '../support/project.ts';

test('script and meta share metadata from the userscript object', async ({
  project,
}) => {
  await project.write({ 'main.js': 'globalThis.loaded = true;' });
  const result = await project.build({
    plugins: [
      monkey({
        entry: 'main.js',
        output: { script: 'fixture.user.js', meta: true },
        userscript: { name: 'Fixture', version: '1.2.3' },
      }),
    ],
  });
  const script = userScript(result);
  const meta = buildOutput(result).find(
    (item) => item.fileName === 'fixture.meta.js',
  );
  assert.ok(meta?.type === 'asset');
  const comment = script.code.match(
    /^\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/,
  )?.[0];
  assert.ok(comment);
  assert.equal(meta.source.toString(), comment);
  assert.match(comment, /@name\s+Fixture/);
});
