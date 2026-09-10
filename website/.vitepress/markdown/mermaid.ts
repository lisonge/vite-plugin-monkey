import type { MarkdownRenderer } from 'vitepress';

export function mermaidMarkdownPlugin(md: MarkdownRenderer): void {
  const renderFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const language = token.info.trim().split(/\s+/u, 1)[0];

    if (language !== 'mermaid') {
      return renderFence?.(tokens, index, options, env, self) ?? '';
    }

    const encodedCode = encodeURIComponent(token.content);
    return `<MermaidDiagram encoded-code="${encodedCode}" />\n`;
  };
}
