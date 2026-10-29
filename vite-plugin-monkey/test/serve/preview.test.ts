import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { preview } from 'vite';
import monkey from '../../src/node/index.ts';
import { test } from '../support/fixture.ts';

test('preview encodes file names under base and forwards missing output errors', async ({
  project,
}) => {
  const file = 'space 中文 %.user.js';
  await project.write({ 'main.js': '', ['dist/' + file]: '// userscript' });
  const server = await preview({
    root: project.root,
    configFile: false,
    base: '/dev/',
    logLevel: 'silent',
    preview: { host: '127.0.0.1', port: 0, open: false },
    plugins: [monkey({ entry: 'main.js' })],
  });
  try {
    const address = server.httpServer.address();
    assert.ok(address && typeof address !== 'string');
    const origin = 'http://127.0.0.1:' + address.port;
    const response = await fetch(origin + '/dev/');
    assert.equal(response.status, 200);
    assert.ok(
      (await response.text()).includes('/dev/' + encodeURIComponent(file)),
    );
    assert.equal(
      await (await fetch(origin + '/dev/' + encodeURIComponent(file))).text(),
      '// userscript',
    );
    await fs.rename(
      path.join(project.root, 'dist'),
      path.join(project.root, 'moved-dist'),
    );
    assert.equal(
      (await fetch(origin + '/dev/', { signal: AbortSignal.timeout(3000) }))
        .status,
      500,
    );
  } finally {
    await server.close();
  }
});
