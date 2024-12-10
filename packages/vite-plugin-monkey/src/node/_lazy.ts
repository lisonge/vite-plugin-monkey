type AnyFunction = (...args: any[]) => any;

const lazyValuePlaceholder = {};

/**
 * lazy side effect by `__PURE__` comment
 */
export const lazy = <T extends object>(fn: () => T) => {
  let temp: T | undefined = undefined;
  const o = {
    get k() {
      if (temp === undefined) {
        temp = fn();
      }
      return temp;
    },
  };
  const wm = lazyValue(() => new WeakMap<AnyFunction, AnyFunction>());
  return new Proxy(lazyValuePlaceholder as T, {
    get(_, p, receiver) {
      const v: unknown = Reflect.get(o.k, p, receiver);
      if (typeof v == 'function') {
        const f = v as AnyFunction;
        let fBind = wm.value.get(f);
        if (fBind === undefined) {
          fBind = f.bind(o.k);
          wm.value.set(f, fBind);
        }
        return fBind;
      }
      return v;
    },
    set(_, p, newValue, receiver) {
      return Reflect.set(o.k, p, newValue, receiver);
    },
    has(_, p) {
      return Reflect.has(o.k, p);
    },
    ownKeys() {
      return Reflect.ownKeys(o.k);
    },
    isExtensible() {
      return Reflect.isExtensible(o.k);
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(o.k, p);
    },
    setPrototypeOf(_, v) {
      return Reflect.setPrototypeOf(o.k, v);
    },
    getOwnPropertyDescriptor(_, p) {
      return Reflect.getOwnPropertyDescriptor(o.k, p);
    },
    defineProperty(_, property, attributes) {
      return Reflect.defineProperty(o.k, property, attributes);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(o.k);
    },
    preventExtensions() {
      return Reflect.preventExtensions(o.k);
    },
    apply(_, thisArg, argArray) {
      // @ts-ignore
      return Reflect.apply(o.k, thisArg, argArray);
    },
    construct(_, argArray, newTarget) {
      // @ts-ignore
      return Reflect.construct(o.k, argArray, newTarget);
    },
  });
};

export const lazyValue = <T>(fn: () => T) => {
  let temp: T | typeof lazyValuePlaceholder = lazyValuePlaceholder;
  return {
    get value() {
      if (temp === lazyValuePlaceholder) {
        temp = fn();
      }
      return temp as T;
    },
  };
};
