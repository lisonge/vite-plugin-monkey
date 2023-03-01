import type { Node as AcornNode } from 'acorn';
import * as acornWalk from 'acorn-walk';
import MagicString from 'magic-string';
import { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { isTopLevelAwaitAvailableTarget } from '../_util';

type CallAcornNode = AcornNode & {
  callee: AcornNode & { name: string };
  arguments: AcornNode[];
};

const awaitOffset = `await`.length;

export const topLevelAwaitPlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
  let targetSupportTla = false;
  return {
    name: 'monkey:topLevelAwait',
    apply: 'build',
    enforce: 'post',
    async configResolved(config) {
      targetSupportTla = await isTopLevelAwaitAvailableTarget(
        config.build.target || [],
      );
    },
    renderChunk(code, chunk, options, meta) {
      if (targetSupportTla || !code.includes(`await`)) {
        return;
      }
      const ast = this.parse(code);
      const tlaNodes: AcornNode[] = [];
      acornWalk.simple(
        ast,
        {
          AwaitExpression(node) {
            // top level await
            tlaNodes.push(node);
          },
        },
        { ...acornWalk.base, Function: () => {} },
      );
      if (tlaNodes.length > 0) {
        const ms = new MagicString(code);
        tlaNodes.forEach((node) => {
          // await xxx -> await (xxx)
          ms.appendLeft(node.start + awaitOffset, `(`);
          ms.appendRight(node.end, `)`);

          // await (xxx) -> __topLevelAwait__ (xxx)
          ms.update(node.start, node.start + awaitOffset, `__topLevelAwait__`);
        });
        return {
          code: ms.toString(),
          map: ms.generateMap(),
        };
      }
    },
    generateBundle(options, bundle, isWrite) {
      if (targetSupportTla) {
        return;
      }
      finalOption.hasTopLevelAwait = false; // reset when watch mode
      Object.entries(bundle).forEach(([name, chunk]) => {
        if (chunk.type == 'chunk') {
          if (!chunk.code.includes(`__topLevelAwait__`)) {
            return;
          }
          const ast = this.parse(chunk.code);
          const tlaCallNodes: CallAcornNode[] = [];
          acornWalk.simple(
            ast,
            {
              // @ts-ignore
              CallExpression(node: CallAcornNode) {
                // top level await
                if (
                  node.callee?.type === `Identifier` &&
                  node.callee?.name === `__topLevelAwait__`
                ) {
                  tlaCallNodes.push(node);
                }
              },
            },
            { ...acornWalk.base, Function: () => {} },
          );
          if (tlaCallNodes.length > 0) {
            finalOption.hasTopLevelAwait = true;
            const ms = new MagicString(chunk.code, {});
            tlaCallNodes.forEach((node) => {
              const callee = node.callee;
              const [argument] = node.arguments as AcornNode[];
              ms.update(callee.start, callee.end, '');
              ms.update(callee.end, argument.start, `(await\x20`);
            });
            chunk.code = ms.toString();
            // TODO sourcemap
            // https://github.com/keik/merge-source-map
            chunk.map;
          }
        }
      });
    },
  };
};
