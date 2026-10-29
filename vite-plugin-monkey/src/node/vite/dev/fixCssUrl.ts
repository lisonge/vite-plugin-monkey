import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import { lookup } from 'mrmime';
import { isFileServingAllowed, type Plugin, type ResolvedConfig } from 'vite';
import { existFile } from '../../utils/others.ts';

// Normal user transforms run after Vite compiles CSS and before it wraps CSS as JS.
export const fixCssUrlFactory = (): Plugin => {
  let config: ResolvedConfig;
  return {
    name: 'monkey:fixCssUrl',
    apply: 'serve',
    configResolved(value) {
      config = value;
    },
    async transform(code, id) {
      if (
        !/\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)|[?&]type=style(?:&|$)/.test(
          id,
        )
      )
        return;
      const query = new URLSearchParams(id.split('?')[1]);
      if (query.has('raw') || query.has('url')) return;
      const root = postcss.parse(code, { from: id });
      const tasks: Promise<void>[] = [];
      root.walkDecls((decl) => {
        const value = valueParser(decl.value);
        const replacements: Promise<void>[] = [];
        value.walk((node) => {
          if (node.type !== 'function' || node.value.toLowerCase() !== 'url')
            return;
          const argument = node.nodes[0];
          if (
            !argument ||
            (argument.type !== 'string' && argument.type !== 'word')
          )
            return false;
          replacements.push(
            (async () => {
              let url = argument.value;
              if (
                config.server.origin &&
                url.startsWith(config.server.origin + '/')
              )
                url = url.slice(config.server.origin.length);
              if (!url.startsWith('/') || url.startsWith('//')) return;
              if (!url.startsWith(config.base)) return;
              url = '/' + url.slice(config.base.length);
              const hashIndex = url.indexOf('#');
              const fragment = hashIndex < 0 ? '' : url.slice(hashIndex);
              const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
              const publicFile =
                config.publicDir &&
                path.join(config.publicDir, pathname.slice(1));
              let file: string;
              if (publicFile && (await existFile(publicFile)))
                file = publicFile;
              else {
                file = pathname.startsWith('/@fs/')
                  ? pathname.slice(5)
                  : path.join(config.root, pathname.slice(1));
                if (!isFileServingAllowed(config, file))
                  throw new Error(
                    '[monkey] CSS resource is outside Vite server.fs.allow: ' +
                      file,
                  );
              }
              const bytes = await fs.readFile(file);
              this.addWatchFile(file);
              argument.value = `data:${lookup(file) ?? 'application/octet-stream'};base64,${bytes.toString('base64')}${fragment}`;
            })(),
          );
          return false;
        });
        if (replacements.length)
          tasks.push(
            Promise.all(replacements).then(() => {
              decl.value = value.toString();
            }),
          );
      });
      await Promise.all(tasks);
      const result = root.toResult({
        map: { inline: false, annotation: false, sourcesContent: true },
      });
      return { code: result.css, map: result.map?.toString() };
    },
  };
};
