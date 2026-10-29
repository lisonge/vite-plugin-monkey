import assert from 'node:assert/strict';
import { test } from '../support/fixture.ts';

for (const transformer of ['postcss', 'lightningcss'] as const) {
  test.for(['/', '/dev/'])(
    `${transformer} CSS resources inline after compilation with base=%s`,
    async (base, { project }) => {
      await project.write({
        'main.js': '',
        'icon space.png': Buffer.from([1, 2, 3]),
        'public/icon.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
        'font.woff2': Buffer.from([4, 5, 6]),
        'panel.css': `@font-face {font-family: fixture; src: url('./font.woff2')} .panel {background: url('./icon space.png'); mask: url('/icon.svg#shape')} .remote {background: url('https://example.test/a.png')} .fragment {filter: url('#local')} .embedded {background: url('data:image/png;base64,AQID')}`,
        'panel.module.css': '.panel {background: url("./icon space.png")}',
        'postcss.config.cjs': `module.exports = {plugins: [{postcssPlugin: 'fixture', Declaration(decl) {if (decl.prop === '--fixture') decl.value = 'configured'}}]}`,
        'config.css': ':root {--fixture: original}',
      });
      const { origin } = await project.serve(
        {},
        {
          base,
          css: { transformer, devSourcemap: true },
          server: {
            origin: base === '/' ? undefined : 'https://proxy.example.test',
          },
        },
      );
      for (const suffix of [
        'panel.css',
        'panel.css?inline',
        'panel.module.css',
        'panel.css?style',
      ]) {
        let response = await fetch(origin + base + suffix);
        let code = await response.text();
        if (suffix.endsWith('?style')) {
          assert.match(code, /createStyle/);
          response = await fetch(origin + base + 'panel.css?inline');
          code = await response.text();
        }
        assert.equal(response.status, 200);
        assert.ok(code.includes('data:image/png;base64,AQID'), code);
        if (!suffix.includes('.module.')) {
          assert.ok(code.includes('data:font/woff2;base64,BAUG'), code);
          assert.ok(
            code.includes(
              'base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=#shape',
            ),
            code,
          );
          assert.ok(code.includes('https://example.test/a.png'), code);
          assert.ok(code.includes('#local'), code);
        }
      }
      if (transformer === 'postcss') {
        const code = await (
          await fetch(origin + base + 'config.css?inline')
        ).text();
        assert.match(code, /configured/);
        assert.doesNotMatch(code, /original/);
      }
    },
  );
}
