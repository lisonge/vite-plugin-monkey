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
const globalNodeList: (ts.Node | string)[] = [];

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

  if (!ts.isExportDeclaration(node)) {
    globalNodeList.push(node, '\n');
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

const globalDtsCode = format(
  globalNodeList.map((n) => nodeToString(n)).join('\n'),
);
await fs.writeFile(relativeFp('../global.d.ts'), globalDtsCode);
console.log(`[script] transform ./dist/client/index.d.ts to ./global.d.ts`);

console.log(`[script] transform end`);
