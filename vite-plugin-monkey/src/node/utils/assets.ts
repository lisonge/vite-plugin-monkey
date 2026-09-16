import { Visitor } from 'vite';
import MagicString from 'magic-string';
import { lookup } from 'mrmime';
import type { Rolldown } from 'vite';
import type { ResolvedMonkeyOption } from './types.ts';

export const assetMarker = (filename: string): string =>
  `__MONKEY_ASSET_START__${Buffer.from(filename).toString('hex')}__MONKEY_ASSET_END__`;

// Vite also renders URLs into CSS strings. Replace only our own delimiters,
// retaining surrounding CSS, URL fragments and the original expression type.
export const assetStringExpression = (
  value: string,
  option: ResolvedMonkeyOption,
  bundle: Rolldown.OutputBundle,
): string => {
  if (!option.build.assetsBaseUrl) return JSON.stringify(value);
  const parts: string[] = [];
  let offset = 0;
  for (const match of value.matchAll(
    /__MONKEY_ASSET_START__(.*?)__MONKEY_ASSET_END__/g,
  )) {
    const filename = Buffer.from(match[1], 'hex').toString();
    const suffixIndex = filename.search(/[?#]/);
    const name = suffixIndex < 0 ? filename : filename.slice(0, suffixIndex);
    const suffix = suffixIndex < 0 ? '' : filename.slice(suffixIndex);
    if (/\s/.test(name))
      throw new Error(
        `External asset names must not contain whitespace: ${name}`,
      );
    if (bundle[name]?.type !== 'asset')
      throw new Error(`Missing external asset: ${name}`);
    if (option.userscript.grant.has('none'))
      throw new Error(
        'External assets require GM_getResourceURL; remove grant: none',
      );
    const url = new URL(
      name.split('/').map(encodeURIComponent).join('/'),
      option.build.assetsBaseUrl,
    ).href;
    if (
      [option.collectResource[name], option.userscript.resource[name]].some(
        (previous) => previous !== undefined && previous !== url,
      )
    )
      throw new Error(`Conflicting resource name: ${name}`);
    option.collectResource[name] = url;
    parts.push(JSON.stringify(value.slice(offset, match.index)));
    const mime = lookup(name) ?? 'application/octet-stream';
    parts.push(
      `GM_getResourceURL(${JSON.stringify(name)}).replace(/^data:application;base64,/, ${JSON.stringify(`data:${mime};base64,`)})`,
    );
    if (suffix) parts.push(JSON.stringify(suffix));
    offset = match.index + match[0].length;
  }
  if (!parts.length) return JSON.stringify(value);
  parts.push(JSON.stringify(value.slice(offset)));
  return `(${parts.join('+')})`;
};

export const replaceAssetMarkers = (
  context: Rolldown.PluginContext,
  code: string,
  option: ResolvedMonkeyOption,
  bundle: Rolldown.OutputBundle,
): string => {
  if (!option.build.assetsBaseUrl || !code.includes('__MONKEY_ASSET_START__'))
    return code;
  const result = new MagicString(code);
  new Visitor({
    'TemplateLiteral:exit'(node) {
      if (
        node.quasis.some((q) =>
          q.value.cooked?.includes('__MONKEY_ASSET_START__'),
        )
      ) {
        const parts: string[] = [];
        node.quasis.forEach((q, i) => {
          parts.push(
            assetStringExpression(
              q.value.cooked ?? q.value.raw,
              option,
              bundle,
            ),
          );
          const expression = node.expressions[i];
          if (expression)
            parts.push(
              '`${' + result.slice(expression.start, expression.end) + '}`',
            );
        });
        result.update(node.start, node.end, `(${parts.join('+')})`);
      }
    },
    'NewExpression:exit'(node) {
      const first = node.arguments[0];
      const value =
        first?.type === 'Literal'
          ? first.value
          : first?.type === 'TemplateLiteral' && !first.expressions.length
            ? first.quasis[0].value.cooked
            : undefined;
      if (
        node.callee.type === 'Identifier' &&
        node.callee.name === 'URL' &&
        typeof value === 'string' &&
        value.includes('__MONKEY_ASSET_START__')
      ) {
        result.update(
          node.start,
          node.end,
          `new URL(${assetStringExpression(value, option, bundle)})`,
        );
      }
    },
    Literal(node) {
      if (
        typeof node.value === 'string' &&
        node.value.includes('__MONKEY_ASSET_START__')
      ) {
        result.update(
          node.start,
          node.end,
          assetStringExpression(node.value, option, bundle),
        );
      }
    },
  }).visit(context.parse(code));
  return result.toString();
};
