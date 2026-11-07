import assert from 'node:assert/strict';
import MagicString from 'magic-string';
import { parseSync, Visitor } from 'vite';
import { getSafeIdentifier } from '../utils/code.ts';

const vitePrefix = '__vite_ssr_';
export const moduleIdentifiers = {
  registry: 'catalogue',
  register: 'enroll',
  namespace: 'assimilate',
  import: 'linkage',
  dynamicImport: 'acquire',
  exportAll: 'relay',
  exportName: 'publish',
  defaultExport: 'principal',
} as const;

const reservedBindings = new Set(
  'arguments eval await break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield'.split(
    ' ',
  ),
);

function inspectIdentifiers(code: string) {
  const identifiers = new Set<string>();
  const names: string[] = [];
  new Visitor({
    Identifier(node) {
      identifiers.add(node.name);
      names.push(node.name);
    },
    Literal(node) {
      if (typeof node.value === 'string') names.push(node.value);
    },
  }).visit(parseSync('module.js', code, { sourceType: 'module' }).program);
  return { source: code + '\n' + names.join('\n'), identifiers };
}

/** Include decoded spellings so escaped identifiers cannot bypass name allocation. */
export function identifierSource(code: string) {
  return inspectIdentifiers(code).source;
}

/** Vite hardcodes its helper prefix. Temporarily protect user spellings, then
 * rename generated helpers before restoring user code (including public names). */
export function moduleNames(code: string) {
  const { source: reserved, identifiers } = inspectIdentifiers(code);
  const allocated: string[] = [];
  const allocate = (base: string) => {
    const name = getSafeIdentifier(base, reserved, allocated);
    allocated.push(name);
    return name;
  };
  const helpers = {
    import: allocate(moduleIdentifiers.import),
    dynamicImport: allocate(moduleIdentifiers.dynamicImport),
    exportAll: allocate(moduleIdentifiers.exportAll),
    exportName: allocate(moduleIdentifiers.exportName),
  };
  const replacements = new Map([
    ['__vite_ssr_import__', helpers.import],
    ['__vite_ssr_dynamic_import__', helpers.dynamicImport],
    ['__vite_ssr_exportAll__', helpers.exportAll],
    ['__vite_ssr_exportName__', helpers.exportName],
    ['__vite_ssr_export_default__', allocate(moduleIdentifiers.defaultExport)],
  ]);
  const rename = (
    output: string,
    restoreSpecifier = (value: string) => value,
  ) => {
    // Read Vite's generated import declarations, including re-exports, before
    // replacing references which may appear earlier than their declarations.
    for (const statement of parseSync('module.js', output, {
      sourceType: 'module',
    }).program.body) {
      if (statement.type !== 'VariableDeclaration') continue;
      const declaration = statement.declarations[0];
      const init = declaration.init;
      if (
        declaration.id.type !== 'Identifier' ||
        init?.type !== 'AwaitExpression' ||
        init.argument.type !== 'CallExpression' ||
        init.argument.callee.type !== 'Identifier' ||
        init.argument.callee.name !== '__vite_ssr_import__'
      )
        continue;
      const source = init.argument.arguments[0];
      assert.ok(source.type === 'Literal' && typeof source.value === 'string');
      let base =
        restoreSpecifier(source.value)
          .replace(/[^a-zA-Z0-9$]+/g, '_')
          .replace(/^_+|_+$/g, '') || '_';
      if (/^[0-9]/.test(base)) base = '_' + base;
      // Package specifiers and longer identifiers are not binding collisions.
      const name = getSafeIdentifier(
        base,
        new Set([...identifiers, ...allocated, ...reservedBindings]),
        undefined,
        true,
      );
      allocated.push(name);
      replacements.set(declaration.id.name, name);
    }
    return output.replace(
      /\b__vite_ssr_(?:exports|import|dynamic_import|exportAll|exportName|import_meta|export_default|import_\d+)__\b/g,
      (original) => {
        const name = replacements.get(original);
        assert.ok(name, `Missing generated import name: ${original}`);
        return name;
      },
    );
  };
  if (!reserved.includes(vitePrefix))
    return { input: code, restore: rename, helpers };
  const placeholder = getSafeIdentifier(
    '__monkey_preserved_',
    reserved,
    allocated,
  );
  const source = new MagicString(code);
  new Visitor({
    Identifier(node) {
      if (node.name.includes(vitePrefix))
        source.overwrite(node.start, node.end, node.name);
    },
    Literal(node) {
      if (typeof node.value === 'string' && node.value.includes(vitePrefix))
        source.overwrite(node.start, node.end, JSON.stringify(node.value));
    },
  }).visit(parseSync('module.js', code, { sourceType: 'module' }).program);
  return {
    input: source.toString().replaceAll(vitePrefix, placeholder),
    restore: (output: string) =>
      rename(output, (value) =>
        value.replaceAll(placeholder, vitePrefix),
      ).replaceAll(placeholder, vitePrefix),
    helpers,
  };
}
