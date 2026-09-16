import { Visitor, type ESTree } from 'vite';
import MagicString from 'magic-string';
import type { Rolldown } from 'vite';

interface AwaitCallExpression extends ESTree.CallExpression {
  callee: ESTree.IdentifierReference;
}

type FunctionNode = ESTree.Function | ESTree.ArrowFunctionExpression;

const awaitOffset = `await`.length;
const initTlaIdentifier = `_TLA_`;

export const getSafeTlaIdentifier = (rawBundle: Rolldown.OutputBundle) => {
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
  context: Rolldown.PluginContext,
  chunk: Rolldown.OutputAsset | Rolldown.OutputChunk,
  identifier: string,
) => {
  if (chunk.type == 'chunk') {
    const code = chunk.code;
    if (!code.includes(`await`)) {
      return;
    }
    const ast = context.parse(code);
    const tlaNodes: ESTree.AwaitExpression[] = [];
    const tlaForOfNodes: ESTree.ForOfStatement[] = [];
    let functionDepth = 0;
    const enterFunction = () => {
      functionDepth++;
    };
    const exitFunction = () => {
      functionDepth--;
    };
    new Visitor({
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      ArrowFunctionExpression: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      'FunctionExpression:exit': exitFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      'AwaitExpression:exit'(node) {
        // top level await
        if (functionDepth === 0) tlaNodes.push(node);
      },
      'ForOfStatement:exit'(node) {
        if (functionDepth === 0 && node.await === true) {
          tlaForOfNodes.push(node);
        }
      },
    }).visit(ast);
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
  context: Rolldown.PluginContext,
  chunk: Rolldown.OutputAsset | Rolldown.OutputChunk,
  identifier: string,
) => {
  if (chunk.type == 'chunk') {
    if (!chunk.code.includes(identifier)) {
      return;
    }

    const forIdentifier = identifier + `FOR`;

    const ast = context.parse(chunk.code);
    const tlaCallNodes: { node: AwaitCallExpression; needsParens: boolean }[] =
      [];
    const forTlaCallNodes: AwaitCallExpression[] = [];
    const topFnNodes: FunctionNode[] = [];
    let skippedFunctions = 0;
    const enterFunction = (node: FunctionNode) => {
      if (skippedFunctions === 0 && topFnNodes.length === 0)
        topFnNodes.push(node);
      if (!includes(chunk.code, node.start, node.end, identifier))
        skippedFunctions++;
    };
    const exitFunction = (node: FunctionNode) => {
      if (!includes(chunk.code, node.start, node.end, identifier))
        skippedFunctions--;
    };
    const needsParensNodes = new Set<ESTree.Node>();
    new Visitor({
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      ArrowFunctionExpression: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      'FunctionExpression:exit': exitFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      MemberExpression(node) {
        needsParensNodes.add(node.object);
      },
      TaggedTemplateExpression(node) {
        needsParensNodes.add(node.tag);
      },
      CallExpression(node) {
        needsParensNodes.add(node.callee);
      },
      'CallExpression:exit'(node) {
        if (skippedFunctions > 0) return;
        if ('name' in node.callee) {
          const { name, type } = node.callee;
          if (type === `Identifier`) {
            if (name === identifier) {
              // `await` has lower precedence than member access / call / tagged template,
              // so we need parens when the parent consumes this node in those positions:
              //   _TLA_(x()).y   -> (await(x())).y    (MemberExpression.object)
              //   _TLA_(x())()   -> (await(x()))()    (CallExpression.callee)
              //   _TLA_(x())`t`  -> (await(x()))`t`   (TaggedTemplateExpression.tag)
              // Optional chaining (?.  ?.[  ?.() ) is also covered because ESTree
              // represents it with the same parent node types inside ChainExpression.
              const needsParens = needsParensNodes.has(node);
              tlaCallNodes.push({
                node: { ...node, callee: node.callee },
                needsParens,
              });
            } else if (name === forIdentifier) {
              forTlaCallNodes.push({ ...node, callee: node.callee });
            }
          }
        }
      },
    }).visit(ast);
    if (tlaCallNodes.length > 0 || forTlaCallNodes.length > 0) {
      const ms = new MagicString(chunk.code, {});
      tlaCallNodes.forEach(({ node, needsParens }) => {
        const callee = node.callee;
        // __topLevelAwait__(xxx) -> await(xxx)  or  (await(xxx)) when parens needed
        ms.update(callee.start, callee.end, 'await');
        if (needsParens) {
          ms.appendLeft(node.start, '(');
          ms.appendRight(node.end, ')');
        }
      });
      forTlaCallNodes.forEach((node) => {
        // if vite minify is true, the parant expression will be a comma expression, so we need to keep it as an expression
        const arg0 = node.arguments[0];
        ms.update(node.start, arg0.start, 'await');
        ms.update(arg0.end, node.end, '');
      });
      topFnNodes.forEach((node) => {
        ms.appendLeft(node.start, `async\x20`);
      });
      chunk.code = ms.toString();
    }
  }
};
