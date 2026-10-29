import { createApiResolver, visitPatternIdentifiers } from './bindings.ts';
import { Visitor, type ESTree } from 'vite';
import type { Rolldown } from 'vite';
import { grantNames } from './names.ts';

export const collectGrant = (
  context: Rolldown.PluginContext,
  chunks: Rolldown.OutputChunk[],
  injectCssCode: string | undefined,
): Set<string> => {
  const codes = new Set<string>();
  if (injectCssCode) {
    codes.add(injectCssCode);
  }
  for (const chunk of chunks) {
    {
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
  for (const code of codes) {
    if (!code.trim()) continue;
    const ast = context.parse(code, { preserveParens: false });
    const { resolve: resolveApi, declarations: ignoredIdentifiers } =
      createApiResolver(ast);
    const ignorePattern = (node: ESTree.Node) =>
      visitPatternIdentifiers(node, (identifier) =>
        ignoredIdentifiers.add(identifier),
      );
    const ignoreKey = (node: { computed: boolean; key: ESTree.Node }) => {
      if (!node.computed) ignoredIdentifiers.add(node.key);
    };
    new Visitor({
      AssignmentExpression(node) {
        ignorePattern(node.left);
      },
      AssignmentPattern(node) {
        ignorePattern(node.left);
      },
      ImportSpecifier(node) {
        ignoredIdentifiers.add(node.local);
        ignoredIdentifiers.add(node.imported);
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
        const object = resolveApi(node.object);
        if (!object) return;
        const property =
          !node.computed && node.property.type === 'Identifier'
            ? node.property.name
            : node.computed &&
                node.property.type === 'Literal' &&
                typeof node.property.value === 'string'
              ? node.property.value
              : undefined;
        if (!property) {
          if (['GM', 'monkeyWindow'].includes(object))
            throw new Error(
              '[monkey] Cannot detect permissions for dynamic API access. Set userscript.grant to an explicit grant array.',
            );
          return;
        }
        if (object === 'monkeyWindow') {
          if (matchIdentifier(property)) return;
        }
        const namespace = object === 'monkeyWindow' ? 'window' : object;
        const name = namespace + '.' + property;
        if (unusedMembers.delete(name)) usedGm.add(name);
      },
      Identifier(node) {
        // only one layer
        if (!ignoredIdentifiers.has(node)) {
          const name = resolveApi(node);
          if (name) matchIdentifier(name);
        }
      },
    }).visit(ast);
    if (unusedMembers.size == 0 && unusedIdentifiers.size == 0) {
      break;
    }
  }
  return usedGm;
};
