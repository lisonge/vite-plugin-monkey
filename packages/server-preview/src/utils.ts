import { produce } from 'immer';
import { createSignal } from 'solid-js';

export const delay = async (n = 0) => {
  await new Promise<void>((res) => {
    setTimeout(res, n);
  });
};

export const throttle = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  let loading = false;
  return async (...args: Parameters<T>) => {
    if (loading) return;
    loading = true;
    await fn(...args).catch(console.error);
    loading = false;
  };
};

export const createState = function <T extends object>(v: T) {
  const [value, setValue] = createSignal(v);
  return [
    new Proxy(v, {
      set(target, p, newValue, receiver) {
        return false;
      },
      get(target, p, receiver) {
        return Reflect.get(value(), p, receiver);
      },
    }),
    (recipe: ((draft: T) => void) | T) => {
      if (typeof recipe == 'function') {
        setValue((s) => produce(s, recipe));
      } else {
        setValue(() => recipe);
      }
    },
  ] as const;
};
