import { Visitor, type ESTree } from 'vite';
export interface ImportNodeItem {
  node: ESTree.ImportExpression | ESTree.ImportDeclaration;
  value: string;
}

export const getProgramImportNodes = (
  program: ESTree.Program,
): ImportNodeItem[] => {
  const nodes: ImportNodeItem[] = [];
  const collect = (node: ImportNodeItem['node']) => {
    const source = node.source;
    const value =
      source.type === 'Literal'
        ? source.value
        : source.type === 'TemplateLiteral' && !source.expressions.length
          ? source.quasis[0].value.cooked
          : undefined;
    if (typeof value === 'string' && value) nodes.push({ node, value });
  };
  new Visitor({
    'ImportDeclaration:exit': collect,
    'ImportExpression:exit': collect,
  }).visit(program);
  return nodes;
};
