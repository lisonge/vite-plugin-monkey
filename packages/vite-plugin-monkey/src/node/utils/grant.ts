import * as acornWalk from 'acorn-walk';
import type { OutputChunk, PluginContext } from 'rollup';
import { grantNames } from './gmApi';

export const collectGrant = (
  context: PluginContext,
  chunks: OutputChunk[],
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
    acornWalk.simple(
      ast,
      {
        MemberExpression(node) {
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
          matchIdentifier(node.name);
        },
      },
      { ...acornWalk.base },
    );
    if (unusedMembers.size == 0 && unusedIdentifiers.size == 0) {
      break;
    }
  }
  return usedGm;
};
