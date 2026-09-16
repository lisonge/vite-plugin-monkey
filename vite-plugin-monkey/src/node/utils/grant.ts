import { Visitor, type ESTree } from 'vite';
import type { Rolldown } from 'vite';
import { grantNames } from './gmApi.ts';

export const collectGrant = (
  context: Rolldown.PluginContext,
  chunks: Rolldown.OutputChunk[],
  injectCssCode: string | undefined,
  minify: boolean,
): Set<string> => {
  const codes = new Set<string>();
  if (injectCssCode) {
    codes.add(injectCssCode);
  }
  for (const chunk of chunks) {
    if (minify) {
      // https://github.com/lisonge/vite-plugin-monkey/issues/166
      const modules = Object.values(chunk.modules);
      modules.forEach((m) => {
        const code = m.code;
        if (code) {
          codes.add(code);
        }
      });
    }
    codes.add(chunk.code);
  }
  const unusedMembers = new Set<string>(
    grantNames.filter((s) => s.includes(`.`)),
  );
  const endsWithWin = (a: string, b: string): boolean => {
    if (a.endsWith(b)) {
      return a === 'monkeyWindow.' + b || a === '_monkeyWindow.' + b;
    }
    return false;
  };
  const memberHandleMap = Object.fromEntries(
    grantNames
      .filter((s) => s.startsWith('window.'))
      .map((name) => [name, (v: string) => endsWithWin(v, name.split('.')[1])]),
  );
  const unusedIdentifiers = new Set<string>(
    grantNames.filter((s) => !s.includes(`.`)),
  );
  const usedGm = new Set<string>();
  const matchIdentifier = (name: string): boolean => {
    if (unusedIdentifiers.has(name)) {
      usedGm.add(name);
      unusedIdentifiers.delete(name);
      return true;
    }
    return false;
  };
  const matchMember = (name: string): boolean => {
    for (const unusedName of unusedMembers.values()) {
      if (name.endsWith(unusedName) || memberHandleMap[unusedName]?.(name)) {
        usedGm.add(unusedName);
        unusedMembers.delete(unusedName);
        return true;
      }
    }
    return false;
  };
  for (const code of codes) {
    if (!code.trim()) continue;
    const ast = context.parse(code);
    const ignoredIdentifiers = new Set<ESTree.Node>();
    const ignorePattern = (node: ESTree.Node | null | undefined): void => {
      if (!node) return;
      switch (node.type) {
        case 'Identifier':
          ignoredIdentifiers.add(node);
          break;
        case 'ObjectPattern':
          for (const property of node.properties)
            ignorePattern(
              property.type === 'RestElement'
                ? property.argument
                : property.value,
            );
          break;
        case 'ArrayPattern':
          node.elements.forEach(ignorePattern);
          break;
        case 'RestElement':
          ignorePattern(node.argument);
          break;
        case 'AssignmentPattern':
          ignorePattern(node.left);
          break;
      }
    };
    const ignoreFunctionBindings = (
      node: ESTree.Function | ESTree.ArrowFunctionExpression,
    ) => {
      if ('id' in node) ignorePattern(node.id);
      node.params.forEach(ignorePattern);
    };
    const ignoreKey = (node: { computed: boolean; key: ESTree.Node }) => {
      if (!node.computed) ignoredIdentifiers.add(node.key);
    };
    new Visitor({
      VariableDeclarator(node) {
        ignorePattern(node.id);
      },
      AssignmentExpression(node) {
        ignorePattern(node.left);
      },
      AssignmentPattern(node) {
        ignorePattern(node.left);
      },
      CatchClause(node) {
        ignorePattern(node.param);
      },
      FunctionDeclaration: ignoreFunctionBindings,
      FunctionExpression: ignoreFunctionBindings,
      ArrowFunctionExpression: ignoreFunctionBindings,
      ClassDeclaration(node) {
        ignorePattern(node.id);
      },
      ClassExpression(node) {
        ignorePattern(node.id);
      },
      ImportSpecifier(node) {
        ignoredIdentifiers.add(node.local);
        ignoredIdentifiers.add(node.imported);
      },
      ImportDefaultSpecifier(node) {
        ignoredIdentifiers.add(node.local);
      },
      ImportNamespaceSpecifier(node) {
        ignoredIdentifiers.add(node.local);
      },
      ExportSpecifier(node) {
        ignoredIdentifiers.add(node.local);
        ignoredIdentifiers.add(node.exported);
      },
      Property(node) {
        if (node.key !== node.value) ignoreKey(node);
      },
      MethodDefinition: ignoreKey,
      PropertyDefinition: ignoreKey,
      LabeledStatement(node) {
        ignoredIdentifiers.add(node.label);
      },
      BreakStatement(node) {
        if (node.label) ignoredIdentifiers.add(node.label);
      },
      ContinueStatement(node) {
        if (node.label) ignoredIdentifiers.add(node.label);
      },
      MetaProperty(node) {
        ignoredIdentifiers.add(node.meta);
        ignoredIdentifiers.add(node.property);
      },
      MemberExpression(node) {
        if (!node.computed) ignoredIdentifiers.add(node.property);
        if (unusedMembers.size === 0) return;
        if (
          node.computed ||
          node.object.type !== 'Identifier' ||
          node.property.type !== 'Identifier'
        ) {
          return;
        }
        if (
          node.object.name === 'monkeyWindow' ||
          node.object.name === '_monkeyWindow'
        ) {
          if (matchIdentifier(node.property.name)) {
            return;
          }
        }
        const name = node.object.name + '.' + node.property.name;
        matchMember(name);
      },
      Identifier(node) {
        // only one layer
        if (!ignoredIdentifiers.has(node)) matchIdentifier(node.name);
      },
    }).visit(ast);
    if (unusedMembers.size == 0 && unusedIdentifiers.size == 0) {
      break;
    }
  }
  return usedGm;
};
