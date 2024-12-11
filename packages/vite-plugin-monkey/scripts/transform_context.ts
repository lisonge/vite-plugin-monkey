import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';
import ts from 'typescript';
import prettier from 'prettier';

console.log(`[script] transform context start`);

const format = (s = '') => {
  return prettier.format(s, {
    parser: 'babel-ts',
    singleQuote: true,
  });
};

const tsFile = process.cwd() + '/src/client/types/_context.ts';
const code = await fs.readFile(tsFile, 'utf-8');
const source = ts.createSourceFile(
  path.basename(tsFile),
  code,
  ts.ScriptTarget.Latest,
);

const GmContextType = source.statements.find((node) => {
  return (
    ts.isInterfaceDeclaration(node) && node.name.escapedText === 'GmContextType'
  );
}) as ts.InterfaceDeclaration;

if (!GmContextType) {
  throw new Error('GmContextType not found');
}

const isContextMember = (node: ts.Node) => {
  if (ts.isIdentifier(node)) {
    const text = node.escapedText.toString();
    return text.startsWith('GM') || text === 'unsafeWindow';
  }
};
const members = GmContextType.members.filter(
  (v) => ts.isPropertySignature(v) && isContextMember(v.name),
);

const getNodeLeadingComment = (node: ts.Node) => {
  const commentRanges = ts.getLeadingCommentRanges(code, node.pos);
  if (commentRanges) {
    return commentRanges
      .map((r) => code.substring(r.pos, r.end))
      .filter(Boolean)
      .join('\n');
  }
  return '';
};

const targetCode = [
  `export {}`,
  `import { monkeyWindow as w } from './window';`,
].concat(
  members.map((node) => {
    const comment = getNodeLeadingComment(node);
    const name = (node.name as ts.Identifier).escapedText.toString();
    return `${comment}\nexport const ${name} = /* @__PURE__ */ (() => w.${name})();`;
  }),
);

const targetFormatCode = await format(targetCode.join('\n\n'));
const targetTsFile = process.cwd() + '/src/client/context.ts';
await fs.writeFile(targetTsFile, targetFormatCode, 'utf-8');

console.log(`[script] transform context end`);
