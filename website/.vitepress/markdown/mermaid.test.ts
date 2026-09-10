import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';
import { mermaidMarkdownPlugin } from './mermaid.ts';

const sourceDirectory = fileURLToPath(new URL('../../', import.meta.url));

describe('Mermaid Markdown plugin', () => {
  it('converts Mermaid fences into encoded diagram components', async () => {
    const markdown = await createMarkdownRenderer(sourceDirectory, {
      config: mermaidMarkdownPlugin,
    });
    const html = await markdown.render(
      '```mermaid\ngraph LR;\n    A --> B\n```',
    );

    assert.equal(
      html.trim(),
      '<MermaidDiagram encoded-code="graph%20LR%3B%0A%20%20%20%20A%20--%3E%20B%0A" />',
    );
  });

  it('leaves other fenced code blocks to VitePress', async () => {
    const markdown = await createMarkdownRenderer(sourceDirectory, {
      config: mermaidMarkdownPlugin,
    });
    const html = await markdown.render('```ts\nconst answer = 42;\n```');

    assert.match(html, /language-ts/u);
    assert.doesNotMatch(html, /MermaidDiagram/u);
  });
});
