type Namespace = Record<string, unknown>;
type ModuleIterator =
  | Generator<unknown, unknown>
  | AsyncGenerator<unknown, unknown>;
type Declare = (context: {
  linkage: (index: number) => Namespace;
  acquire: (id: string) => Promise<Namespace>;
  publish: (name: string, get: () => unknown) => void;
}) => ModuleIterator;

/** Self-contained: shared by userscripts and Workers, with no eval or external loader. */
export function createModuleRegistry(load?: (id: string) => Promise<void>) {
  interface Record {
    namespace: Namespace;
    dependencies: string[];
    iterator?: ModuleIterator;
    linking?: Promise<void>;
    linked?: boolean;
    completion?: Promise<Namespace>;
    execution?: Promise<void>;
    state: 'new' | 'executing' | 'done' | 'failed';
    error?: unknown;
  }
  const records = new Map<string, Record>();
  function record(id: string): Record {
    let value = records.get(id);
    if (!value) {
      value = {
        namespace: Object.create(null),
        dependencies: [],
        state: 'new',
      };
      Object.defineProperty(value.namespace, Symbol.toStringTag, {
        value: 'Module',
      });
      records.set(id, value);
    }
    return value;
  }
  function register(id: string, dependencies: string[], declare: Declare) {
    const module = record(id);
    module.dependencies = dependencies;
    module.iterator = declare({
      linkage: (index) => record(dependencies[index]).namespace,
      acquire: importModule,
      publish(name, get) {
        Object.defineProperty(module.namespace, name, {
          enumerable: true,
          get,
        });
      },
    });
  }
  function link(id: string, seen: Set<string>): void | Promise<void> {
    if (seen.has(id)) return;
    seen.add(id);
    const module = record(id);
    if (module.state === 'done') return;
    const dependencies = () => {
      const pending = module.dependencies
        .map((dependency) => link(dependency, seen))
        .filter((value) => value !== undefined);
      if (pending.length) return Promise.all(pending).then(() => {});
    };
    const initialize = () => {
      if (!module.iterator)
        throw new Error('[monkey] Missing module registration: ' + id);
      const step = module.iterator.next();
      if ('then' in step)
        return step.then(() => {
          module.linked = true;
        });
      module.linked = true;
    };
    if (!module.linked) {
      const linking =
        module.linking ??
        (module.iterator || !load ? initialize() : load(id).then(initialize));
      if (linking) {
        module.linking = linking;
        return linking.then(dependencies);
      }
    }
    return dependencies();
  }
  function execute(id: string, ancestors: Set<string>): void | Promise<void> {
    if (ancestors.has(id)) return;
    const module = record(id);
    if (module.state === 'failed') throw module.error;
    if (module.state !== 'new') return module.execution;
    ancestors.add(id);
    module.state = 'executing';
    const fail = (error: unknown): never => {
      module.state = 'failed';
      module.error = error;
      throw error;
    };
    const run = () => {
      const step = module.iterator!.next();
      if ('then' in step)
        return step.then(() => {
          module.state = 'done';
        });
      module.state = 'done';
    };
    try {
      const pending = module.dependencies
        .map((dependency) => execute(dependency, ancestors))
        .filter((value) => value !== undefined);
      const execution = pending.length ? Promise.all(pending).then(run) : run();
      if (execution) module.execution = execution.catch(fail);
      return module.execution;
    } catch (error) {
      fail(error);
    } finally {
      ancestors.delete(id);
    }
  }
  function start(id: string): Namespace | Promise<Namespace> {
    const module = record(id);
    const run = () => {
      const pending = execute(id, new Set());
      return pending ? pending.then(() => module.namespace) : module.namespace;
    };
    const linking = link(id, new Set());
    return linking ? linking.then(run) : run();
  }
  function importModule(id: string): Promise<Namespace> {
    const module = record(id);
    return (module.completion ??= Promise.resolve().then(() => start(id)));
  }
  function set(id: string, namespace: Namespace) {
    const module = record(id);
    module.namespace = namespace;
    module.state = 'done';
  }
  return { register, set, start, importModule };
}
