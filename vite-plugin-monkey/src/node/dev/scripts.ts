import path from 'node:path';
import { normalizePath } from 'vite';
import type { MonkeyContext } from '../config/context.ts';
import { finalMonkeyOptionToComment } from '../metadata/index.ts';
import { stringifyFunction } from '../runtime/serialize.ts';
import { serverInjectFn } from '../runtime/templates.ts';
import { parserHtmlScriptResult } from './html.ts';
import { entryPath, pullPath } from './paths.ts';
import type { DevBridge } from './bridge.ts';

export function installationScript(
  context: MonkeyContext,
  bridge: DevBridge,
  base: string,
  origin: string,
) {
  return [
    finalMonkeyOptionToComment(context, new Set(), 'serve'),
    stringifyFunction(
      serverInjectFn,
      new URL(base + entryPath.slice(1), origin).href,
      bridge.monkeyWindowKey,
      bridge.bridgeVersion,
      bridge.bridgeProject,
    ),
    '',
  ].join('\n\n');
}

export function entryScript(
  html: string,
  root: string,
  entry: string,
  base: string,
) {
  const urls = parserHtmlScriptResult(html).map(
    (v) =>
      v.src ||
      `${base}${pullPath.slice(1)}?text=${Buffer.from(v.text, 'utf-8').toString('base64url')}`,
  );
  const relativeEntry = normalizePath(path.relative(root, entry));
  const entryUrl =
    relativeEntry === '..' ||
    relativeEntry.startsWith('../') ||
    path.isAbsolute(relativeEntry)
      ? path.posix.join('@fs', normalizePath(entry))
      : relativeEntry;
  urls.push(base + encodeURI(entryUrl).replace(/[?#]/g, encodeURIComponent));
  return urls
    .map(
      (s) =>
        `await import(new URL(${JSON.stringify(s)}, import.meta.url).href);`,
    )
    .join('\n');
}
