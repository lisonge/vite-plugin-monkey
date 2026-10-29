import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from '../support/fixture.ts';
import { getProjectPkg } from '../../src/node/utils/pkg.ts';

test('looks up parent metadata only when the local package file is absent', async ({
  project,
}) => {
  await project.write({
    'package.json': JSON.stringify({ name: 'parent', version: '1.2.3' }),
    'child/main.js': '',
  });
  const child = path.join(project.root, 'child');
  assert.equal((await getProjectPkg(child)).name, 'parent');
  await project.write({ 'child/package.json': '{ invalid json' });
  await assert.rejects(
    getProjectPkg(child),
    (error: Error & { cause?: unknown }) => {
      assert.ok(error.message.includes(path.join(child, 'package.json')));
      assert.ok(error.cause instanceof SyntaxError);
      return true;
    },
  );
});

test('does not mask package file read errors with parent metadata', async ({
  project,
}) => {
  await project.write({ 'package.json': JSON.stringify({ name: 'parent' }) });
  const child = path.join(project.root, 'child');
  await fs.mkdir(path.join(child, 'package.json'), { recursive: true });
  await assert.rejects(getProjectPkg(child));
});
