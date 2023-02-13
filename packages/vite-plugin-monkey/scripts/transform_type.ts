import ts from 'typescript';
import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';
import prettier from 'prettier';

console.log(`[script] transform start`);

const relativeFp = (p: string) => {
  return url.fileURLToPath(new URL(p, import.meta.url));
};

const format = (s = '') => {
  return prettier.format(s, {
    parser: 'babel-ts',
  });
};

const fp = relativeFp('../dist/client/index.d.ts');

const code = await fs.readFile(fp, 'utf-8');

const source = ts.createSourceFile(
  path.basename(fp),
  code,
  ts.ScriptTarget.Latest,
);

const nodeToString = (() => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return (node: ts.Node | string) => {
    if (typeof node == 'string') return node;
    return printer.printNode(ts.EmitHint.Unspecified, node, source);
  };
})();

const clientNodeList: (ts.Node | string)[] = [];

ts.forEachChild(source, (node) => {
  const commentRanges = ts.getLeadingCommentRanges(code, node.pos) ?? [];

  if (ts.isVariableStatement(node)) {
    clientNodeList.push(
      ...commentRanges.map((r) => code.substring(r.pos, r.end)),
    );
    clientNodeList.push(node.declarationList, '\n');
  } else {
    clientNodeList.push(node, '\n');
  }
});

const clientDtsCode = format(`
/**
 * the alias of \`vite-plugin-monkey/dist/client\`
 */
declare module '$' {

${clientNodeList.map((n) => nodeToString(n)).join('\n')}

}`);
await fs.writeFile(relativeFp('../client.d.ts'), clientDtsCode);
console.log(`[script] transform ./dist/client/index.d.ts to ./client.d.ts`);

// ------------------

const topNodeList: (ts.Node | string)[] = [];
const globalNodeList: (ts.Node | string)[] = [];
const windowNodeList: (ts.Node | string)[] = [];

const exportNameList: string[] = [];

ts.forEachChild(source, (node) => {
  if (
    ts.isExportDeclaration(node) &&
    node.exportClause &&
    ts.isNamedExports(node.exportClause)
  ) {
    node.exportClause.elements.forEach((n) => {
      const name = n.name.escapedText.toString();
      if (name != 'monkeyWindow') {
        exportNameList.push(name);
      }
    });
  }
});
ts.forEachChild(source, (node) => {
  if (ts.isTypeAliasDeclaration(node)) {
    const name = node.name.escapedText.toString();
    if (name != 'MonkeyWindow' && exportNameList.includes(name)) {
      globalNodeList.push(node);
    } else {
      topNodeList.push(node);
    }
  } else if (ts.isVariableStatement(node)) {
    const commentRanges = ts.getLeadingCommentRanges(code, node.pos) ?? [];
    const nodes = [
      ...commentRanges.map((r) => code.substring(r.pos, r.end)),
      node.declarationList,
    ];
    const [identifierNode] = node.declarationList.declarations;
    if (ts.isIdentifier(identifierNode.name)) {
      const name = identifierNode.name.escapedText.toString();
      if (name == 'monkeyWindow') {
        return;
      }
      if (exportNameList.includes(identifierNode.name.escapedText.toString())) {
        globalNodeList.push(...nodes);
        windowNodeList.push(
          ...commentRanges.map((r) => code.substring(r.pos, r.end)),
          identifierNode,
        );
      } else {
        topNodeList.push(...nodes);
      }
    }
  }
});

const globalDtsCode = format(`
export {};

${topNodeList.map((n) => nodeToString(n)).join('\n')}

declare global {

${globalNodeList.map((n) => nodeToString(n)).join('\n')}

  interface Window {

${windowNodeList.map((n) => nodeToString(n)).join('\n')}

  }
}`);
await fs.writeFile(relativeFp('../global.d.ts'), globalDtsCode);
console.log(`[script] transform ./dist/client/index.d.ts to ./global.d.ts`);

console.log(`[script] transform end`);
