import type { ESTree } from 'vite';

interface Binding {
  name?: string;
  value?: ESTree.Node;
}
interface Scope {
  parent?: Scope;
  varScope: boolean;
  bindings: Map<string, Binding>;
}

/** Collect declarations before resolving references, including hoisted declarations. */
export function createApiResolver(program: ESTree.Program) {
  const scopes = new Map<ESTree.Node, Scope>();
  const root: Scope = { varScope: true, bindings: new Map() };
  const declarations = new Set<ESTree.Node>();
  function bind(
    node: ESTree.Node | null,
    scope: Scope,
    binding: Binding = {},
    preserve = false,
  ) {
    visitPatternIdentifiers(node, (identifier) => {
      declarations.add(identifier);
      if (!preserve || !scope.bindings.has(identifier.name))
        scope.bindings.set(identifier.name, binding);
    });
  }
  function visit(node: ESTree.Node, parent: Scope) {
    let scope = parent;
    if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration')
      bind(node.id, parent);
    const isFunction =
      node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression';
    if (
      isFunction ||
      [
        'BlockStatement',
        'CatchClause',
        'ForStatement',
        'ForInStatement',
        'ForOfStatement',
        'SwitchStatement',
        'ClassExpression',
        'ClassDeclaration',
        'StaticBlock',
      ].includes(node.type)
    ) {
      scope = {
        parent,
        varScope: isFunction || node.type === 'StaticBlock',
        bindings: new Map(),
      };
    }
    scopes.set(node, scope);
    if (isFunction) {
      if ('id' in node) bind(node.id, scope);
      node.params.forEach((param) => bind(param, scope));
    }
    if (node.type === 'ClassExpression' || node.type === 'ClassDeclaration')
      bind(node.id, scope);
    if (node.type === 'CatchClause') bind(node.param, scope);
    if (node.type === 'VariableDeclaration') {
      let target = scope;
      if (node.kind === 'var')
        while (!target.varScope && target.parent) target = target.parent;
      node.declarations.forEach((declaration) =>
        bind(
          declaration.id,
          target,
          { value: declaration.init ?? undefined },
          node.kind === 'var' && !declaration.init,
        ),
      );
    }
    if (node.type === 'ImportDeclaration') {
      for (const specifier of node.specifiers) {
        const name =
          node.source.value === '$' && specifier.type === 'ImportSpecifier'
            ? specifier.imported.type === 'Identifier'
              ? specifier.imported.name
              : String(specifier.imported.value)
            : undefined;
        bind(specifier.local, scope, { name });
      }
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        for (const child of value)
          if (child && typeof child === 'object' && 'type' in child)
            visit(child, scope);
      } else if (value && typeof value === 'object' && 'type' in value)
        visit(value as ESTree.Node, scope);
    }
  }
  visit(program, root);
  function resolve(
    node: ESTree.Node,
    seen = new Set<Binding>(),
  ): string | undefined {
    if (node.type === 'Identifier') {
      for (let scope = scopes.get(node); scope; scope = scope.parent) {
        const binding = scope.bindings.get(node.name);
        if (!binding) continue;
        if (seen.has(binding)) return;
        seen.add(binding);
        return (
          binding.name ??
          (binding.value ? resolve(binding.value, seen) : undefined)
        );
      }
      return node.name;
    }
    // Pure guarded globals from the $ runtime may be inlined or renamed by Rolldown.
    if (
      node.type === 'CallExpression' &&
      node.arguments.length === 0 &&
      node.callee.type === 'ArrowFunctionExpression'
    ) {
      const body = node.callee.body;
      if (body.type === 'ConditionalExpression') return resolve(body, seen);
      if (body.type === 'Identifier' && resolve(body, seen) === 'window')
        return 'monkeyWindow';
    }
    if (
      node.type === 'ConditionalExpression' &&
      node.test.type === 'BinaryExpression' &&
      node.test.left.type === 'UnaryExpression' &&
      node.test.left.operator === 'typeof' &&
      node.test.left.argument.type === 'Identifier' &&
      node.consequent.type === 'Identifier' &&
      node.consequent.name === node.test.left.argument.name
    )
      return resolve(node.consequent, seen);
  }
  return { resolve, declarations };
}

/** Visit only binding/write identifiers, leaving default values and computed keys as references. */
export function visitPatternIdentifiers(
  node: ESTree.Node | null,
  visit: (node: Extract<ESTree.Node, { type: 'Identifier' }>) => void,
): void {
  if (!node) return;
  if (node.type === 'Identifier') visit(node);
  else if (node.type === 'RestElement')
    visitPatternIdentifiers(node.argument, visit);
  else if (node.type === 'AssignmentPattern')
    visitPatternIdentifiers(node.left, visit);
  else if (node.type === 'ArrayPattern')
    node.elements.forEach((value) => visitPatternIdentifiers(value, visit));
  else if (node.type === 'ObjectPattern')
    node.properties.forEach((property) =>
      visitPatternIdentifiers(
        property.type === 'RestElement' ? property.argument : property.value,
        visit,
      ),
    );
}
