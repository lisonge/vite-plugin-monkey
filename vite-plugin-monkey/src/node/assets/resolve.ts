import { lookup } from 'mrmime';
import type { Rolldown } from 'vite';
import type { MonkeyContext } from '../utils/types.ts';
import { createAssetMarker, rewriteAssetMarkers } from './markers.ts';
import { registerResource } from './resources.ts';

const marker = createAssetMarker('ASSET');
export const assetMarker = marker.encode;

export function registerAssetResource(
  name: string,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
): void {
  if (/\s/.test(name))
    throw new Error(
      `External asset names must not contain whitespace: ${name}`,
    );
  if (bundle[name]?.type !== 'asset')
    throw new Error(`Missing external asset: ${name}`);
  if (context.config.userscript.grant === 'none')
    throw new Error(
      'External assets require GM_getResourceURL; remove grant: none',
    );
  const url = new URL(
    name.split('/').map(encodeURIComponent).join('/'),
    context.config.assets.publicPath,
  ).href;
  registerResource(
    context.state.collectResource,
    context.config.userscript.resource,
    name,
    url,
  );
}

function resourceExpression(
  name: string,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
) {
  registerAssetResource(name, context, bundle);
  const mime = lookup(name) ?? 'application/octet-stream';
  return `GM_getResourceURL(${JSON.stringify(name)}).replace(/^data:application;base64,/, ${JSON.stringify(`data:${mime};base64,`)})`;
}

// Vite also renders URLs into CSS strings. Preserve the surrounding text and suffixes.
export const assetStringExpression = (
  value: string,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
): string =>
  context.config.assets.publicPath
    ? marker.expression(value, (name) =>
        resourceExpression(name, context, bundle),
      )
    : JSON.stringify(value);

export const replaceAssetMarkers = (
  pluginContext: Rolldown.PluginContext,
  code: string,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
): string => {
  if (!context.config.assets.publicPath || !marker.contains(code)) return code;
  const resolve = (name: string) => resourceExpression(name, context, bundle);
  return rewriteAssetMarkers(pluginContext, code, {
    marker,
    resolve,
    newExpression(node, result) {
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
        marker.contains(value)
      )
        result.update(
          node.start,
          node.end,
          `new URL(${marker.expression(value, resolve)})`,
        );
    },
  });
};
