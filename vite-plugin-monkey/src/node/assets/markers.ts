import MagicString from 'magic-string';
import { Visitor } from 'vite';
import type { ESTree, Rolldown } from 'vite';

export interface AssetMarker {
  encode(filename: string): string;
  contains(value: string): boolean;
  expression(value: string, resolve: (name: string) => string): string;
}

export function createAssetMarker(name: string): AssetMarker {
  const start = '__MONKEY_' + name + '_START__';
  const end = '__MONKEY_' + name + '_END__';
  const pattern = new RegExp(start + '(.*?)' + end, 'g');
  return {
    encode: (filename) => start + Buffer.from(filename).toString('hex') + end,
    contains: (value) => value.includes(start),
    expression(value, resolve) {
      const parts: string[] = [];
      let offset = 0;
      for (const match of value.matchAll(pattern)) {
        const filename = Buffer.from(match[1], 'hex').toString();
        parts.push(
          JSON.stringify(value.slice(offset, match.index)),
          resolve(filename),
        );
        offset = match.index + match[0].length;
      }
      if (!parts.length) return JSON.stringify(value);
      parts.push(JSON.stringify(value.slice(offset)));
      return '(' + parts.join('+') + ')';
    },
  };
}

export interface RewriteAssetMarkersOptions {
  marker: AssetMarker;
  resolve(name: string): string;
  newExpression?(node: ESTree.NewExpression, result: MagicString): void;
}

/** Share string-node rewriting while leaving host-specific syntax to its adapter. */
export function rewriteAssetMarkers(
  context: Rolldown.PluginContext,
  code: string,
  { marker, resolve, newExpression }: RewriteAssetMarkersOptions,
): string {
  const result = new MagicString(code);
  new Visitor({
    'TemplateLiteral:exit'(node) {
      if (
        !node.quasis.some((part) =>
          marker.contains(part.value.cooked ?? part.value.raw),
        )
      )
        return;
      const parts: string[] = [];
      node.quasis.forEach((part, index) => {
        parts.push(
          marker.expression(part.value.cooked ?? part.value.raw, resolve),
        );
        const expression = node.expressions[index];
        if (expression)
          parts.push(
            '`${' + result.slice(expression.start, expression.end) + '}`',
          );
      });
      result.update(node.start, node.end, '(' + parts.join('+') + ')');
    },
    Literal(node) {
      if (typeof node.value === 'string' && marker.contains(node.value))
        result.update(
          node.start,
          node.end,
          marker.expression(node.value, resolve),
        );
    },
    'NewExpression:exit'(node) {
      newExpression?.(node, result);
    },
  }).visit(context.parse(code));
  return result.toString();
}
