import assert from 'node:assert/strict';
import MagicString from 'magic-string';
import { moduleRunnerTransform, parseSync, Visitor, type ESTree } from 'vite';
import { moduleIdentifiers, moduleNames } from './names.ts';

interface ImportBinding {
  namespace: boolean;
}

/** Inspect original syntax so generated import awaits never make a module async. */
export function analyzeModule(code: string, filename = 'userscript.js') {
  const ast = parseSync(filename, code, { sourceType: 'module' }).program;
  const imports = new Map<string, ImportBinding>();
  const importedNames = new Set<string>();
  let needsRegistry = false;
  for (const node of ast.body) {
    if (node.type.startsWith('Export')) needsRegistry = true;
    if (node.type !== 'ImportDeclaration') continue;
    const id = node.source.value;
    const binding = imports.get(id) ?? { namespace: false };
    binding.namespace ||= node.specifiers.some(
      (specifier) =>
        specifier.type !== 'ImportSpecifier' ||
        (specifier.imported.type === 'Identifier'
          ? specifier.imported.name
          : specifier.imported.value) === 'default',
    );
    imports.set(id, binding);
    for (const specifier of node.specifiers)
      if (specifier.type !== 'ImportNamespaceSpecifier')
        importedNames.add(specifier.local.name);
  }
  let depth = 0;
  let asynchronous = false;
  const source = new MagicString(code);
  new Visitor({
    FunctionDeclaration() {
      depth++;
    },
    FunctionExpression() {
      depth++;
    },
    ArrowFunctionExpression() {
      depth++;
    },
    'FunctionDeclaration:exit'() {
      depth--;
    },
    'FunctionExpression:exit'() {
      depth--;
    },
    'ArrowFunctionExpression:exit'() {
      depth--;
    },
    AwaitExpression() {
      if (!depth) asynchronous = true;
    },
    ForOfStatement(node) {
      if (!depth && node.await) asynchronous = true;
    },
    ImportExpression() {
      needsRegistry = true;
    },
    MetaProperty(node) {
      if (node.meta.name === 'import')
        throw new Error(
          `[monkey] Unresolved import.meta in ${filename}: userscript and Worker bundles have no stable module URL. Use a static asset import or new URL('./asset', import.meta.url) that Vite can resolve at build time.`,
        );
    },
    TaggedTemplateExpression(node) {
      // Capture before substitutions and call unbound. Terser can fold a comma
      // expression tag back into a bound member call.
      if (node.tag.type === 'Identifier' && importedNames.has(node.tag.name))
        source.update(
          node.tag.start,
          node.tag.end,
          `((tag) => (...args) => tag(...args))(${node.tag.name})`,
        );
    },
  }).visit(ast);
  return { code: source.toString(), imports, asynchronous, needsRegistry };
}

function isCall(node: ESTree.Node | null | undefined, name: string): boolean {
  return (
    node?.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === name
  );
}

/** The only adapter for Vite's generated module-runner protocol. */
export async function transformModule(
  analysis: ReturnType<typeof analyzeModule>,
  filename = 'userscript.js',
) {
  const names = moduleNames(analysis.code);
  const transformed = await moduleRunnerTransform(
    names.input,
    { mappings: '' },
    filename,
    names.input,
  );
  if (!transformed) throw new Error(`Cannot transform module: ${filename}`);
  transformed.code = names.restore(transformed.code);
  const ast = parseSync(filename, transformed.code, {
    sourceType: 'module',
  }).program;
  const code = new MagicString(transformed.code);
  const references = new Map<string, number>();
  new Visitor({
    Identifier(node) {
      references.set(node.name, (references.get(node.name) ?? 0) + 1);
    },
  }).visit(ast);
  const imports: {
    name: string;
    bound: boolean;
    specifier: string;
    argument: ESTree.Node;
    statement: ESTree.Statement;
  }[] = [];
  const linking: ESTree.Statement[] = [];
  const dynamicImports: { specifier: string; argument: ESTree.Node }[] = [];
  for (const statement of ast.body) {
    if (statement.type === 'VariableDeclaration') {
      const declaration = statement.declarations[0];
      const init = declaration.init;
      if (
        init?.type === 'AwaitExpression' &&
        init.argument.type === 'CallExpression' &&
        isCall(init.argument, names.helpers.import)
      ) {
        const argument = init.argument.arguments[0];
        assert.ok(
          argument.type === 'Literal' &&
            typeof argument.value === 'string' &&
            declaration.id.type === 'Identifier',
        );
        // Generated namespace names are unique; one occurrence is the declaration.
        const bound = references.get(declaration.id.name)! > 1;
        imports.push({
          name: declaration.id.name,
          bound,
          specifier: argument.value,
          argument,
          statement,
        });
        if (bound) linking.push(statement);
        code.remove(init.start, init.argument.start);
        // Vite's importedNames metadata is unused by our closed registry.
        if (init.argument.arguments.length > 1)
          code.remove(argument.end, init.argument.end - 1);
      }
    }
    if (
      statement.type === 'ExpressionStatement' &&
      statement.expression.type === 'CallExpression' &&
      isCall(statement.expression, names.helpers.exportName)
    ) {
      linking.push(statement);
      const getter = statement.expression.arguments[1];
      if (
        getter?.type === 'ArrowFunctionExpression' &&
        getter.body.type === 'BlockStatement' &&
        getter.body.body.length === 1
      ) {
        const guard = getter.body.body[0];
        // Vite catches uninitialized export reads for its module runner. Keep
        // native TDZ errors in our linked factories; leave user catches alone.
        if (
          guard.type === 'TryStatement' &&
          guard.handler &&
          !guard.handler.param &&
          guard.handler.body.body.length === 0 &&
          !guard.finalizer &&
          guard.block.body.length === 1 &&
          guard.block.body[0].type === 'ReturnStatement'
        )
          code.overwrite(
            getter.body.start,
            getter.body.end,
            transformed.code.slice(guard.block.start, guard.block.end),
          );
      }
    }
  }
  new Visitor({
    CallExpression(node) {
      if (isCall(node, names.helpers.exportAll))
        throw new Error(
          `[monkey] Module output requires explicit exports in ${filename}`,
        );
      if (!isCall(node, names.helpers.dynamicImport)) return;
      const argument = node.arguments[0];
      const specifier =
        argument?.type === 'Literal' && typeof argument.value === 'string'
          ? argument.value
          : argument?.type === 'TemplateLiteral' &&
              argument.expressions.length === 0
            ? argument.quasis[0].value.cooked
            : undefined;
      if (specifier == null)
        throw new Error(
          `[monkey] Module output requires a statically known import in ${filename}`,
        );
      dynamicImports.push({ specifier, argument });
    },
  }).visit(ast);
  return {
    parameters: Object.entries(names.helpers)
      .filter(([role, name]) =>
        role === 'import'
          ? imports.some(({ bound }) => bound)
          : role !== 'exportAll' && references.has(name),
      )
      .map(([role, name]) => {
        const key = moduleIdentifiers[role as keyof typeof names.helpers];
        return key === name ? name : `${key}: ${name}`;
      }),
    code,
    imports,
    dynamicImports,
    linking,
    asynchronous: analysis.asynchronous,
  };
}
