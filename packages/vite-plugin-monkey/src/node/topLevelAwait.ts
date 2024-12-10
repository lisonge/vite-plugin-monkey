import * as acorn from 'acorn';
import * as acornWalk from 'acorn-walk';
import MagicString from 'magic-string';
import type {
  OutputAsset,
  OutputBundle,
  OutputChunk,
  PluginContext,
} from 'rollup';

interface AwaitCallExpression extends acorn.CallExpression {
  callee: acorn.Identifier;
}

const awaitOffset = `await`.length;
const initTlaIdentifier = `_TLA_`;

export const findSafeTlaIdentifier = (rawBundle: OutputBundle) => {
  const codes: string[] = [];
  for (const chunk of Object.values(rawBundle)) {
    if (chunk.type == 'chunk') {
      codes.push(chunk.code);
    }
  }
  let x = 0;
  let identifier = initTlaIdentifier;
  while (codes.some((code) => code.includes(identifier))) {
    x++;
    identifier = initTlaIdentifier + x.toString(36);
  }
  return identifier;
};

const startWith = (
  text: string,
  searchString: string,
  position = 0,
  ignoreString: string,
) => {
  for (let i = position; i < text.length; i++) {
    if (ignoreString.includes(text[i])) {
      continue;
    }
    return text.startsWith(searchString, i);
  }
  return false;
};

const includes = (
  str: string,
  start: number,
  end: number,
  substr: string,
): boolean => {
  const i = str.indexOf(substr, start);
  return i >= 0 && i + substr.length < end;
};

export const transformTlaToIdentifier = (
  context: PluginContext,
  chunk: OutputAsset | OutputChunk,
  identifier: string,
) => {
  if (chunk.type == 'chunk') {
    const code = chunk.code;
    if (!code.includes(`await`)) {
      return;
    }
    const ast = context.parse(code);
    const tlaNodes: acorn.AwaitExpression[] = [];
    const tlaForOfNodes: acorn.ForOfStatement[] = [];
    acornWalk.simple(
      ast,
      {
        AwaitExpression(node) {
          // top level await
          tlaNodes.push(node);
        },
        ForOfStatement(node) {
          if (node.await === true) {
            tlaForOfNodes.push(node);
          }
        },
      },
      { ...acornWalk.base, Function: () => {} },
    );
    if (tlaNodes.length > 0 || tlaForOfNodes.length > 0) {
      const ms = new MagicString(code);
      tlaNodes.forEach((node) => {
        if (
          !startWith(chunk.code, '(', node.start + awaitOffset, '\x20\t\r\n')
        ) {
          // await xxx -> await (xxx)
          ms.appendLeft(node.start + awaitOffset, `(`);
          ms.appendRight(node.end, `)`);
        }

        // await (xxx) -> __topLevelAwait__ (xxx)
        ms.update(node.start, node.start + awaitOffset, identifier);
      });
      tlaForOfNodes.forEach((node) => {
        // for await(const x of xxx){} -> __topLevelAwait_FOR ((async()=>{ /*start*/for await(const x of xxx){}/*end*/  })());
        ms.appendLeft(node.start, `${identifier + `FOR`}((async()=>{`);
        ms.appendRight(node.end, `})());`);
      });
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      };
    }
  }
};

export const transformIdentifierToTla = (
  context: PluginContext,
  chunk: OutputAsset | OutputChunk,
  identifier: string,
) => {
  if (chunk.type == 'chunk') {
    if (!chunk.code.includes(identifier)) {
      return;
    }

    const forIdentifier = identifier + `FOR`;

    const ast = context.parse(chunk.code);
    const tlaCallNodes: AwaitCallExpression[] = [];
    const forTlaCallNodes: AwaitCallExpression[] = [];
    const topFnNodes: acorn.Function[] = [];
    acornWalk.simple(
      ast,
      {
        CallExpression(node) {
          if ('name' in node.callee) {
            const { name, type } = node.callee;
            if (type === `Identifier`) {
              if (name === identifier) {
                // top level await
                tlaCallNodes.push({ ...node, callee: node.callee });
              } else if (name === forIdentifier) {
                // top level for await
                forTlaCallNodes.push({ ...node, callee: node.callee });
              }
            }
          }
        },
      },
      {
        ...acornWalk.base,
        Function: (node, state, callback) => {
          if (topFnNodes.length == 0) {
            topFnNodes.push(node);
          }
          if (includes(chunk.code, node.start, node.end, identifier)) {
            return acornWalk.base.Function?.(node, state, callback);
          }
        },
      },
    );
    if (tlaCallNodes.length > 0 || forTlaCallNodes.length > 0) {
      const ms = new MagicString(chunk.code, {});
      tlaCallNodes.forEach((node) => {
        const callee = node.callee;
        // __topLevelAwait__ (xxx) -> await (xxx)
        ms.update(callee.start, callee.end, 'await');
      });
      forTlaCallNodes.forEach((node) => {
        // __topLevelAwait_FOR ((async()=>{ /*start*/for await(const x of xxx){}/*end*/  })()); -> for await(const x of xxx){}
        // @ts-ignore
        const forOfNode = node.arguments?.[0]?.callee?.body
          ?.body?.[0] as acorn.ForOfStatement;
        ms.update(node.start, forOfNode.start, '');
        ms.update(forOfNode.end, node.end, '');
      });
      topFnNodes.forEach((node) => {
        ms.appendLeft(node.start, `async\x20`);
      });
      chunk.code = ms.toString();
    }
  }
};
