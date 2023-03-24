import { monkeyWindow } from 'vite-plugin-monkey/dist/client';
import type { FetchType, WindowLike } from './types';
import { lazy } from './util';

type InterceptorChain = {
  request: Request;
  /**
   * @param request if not set, use chain.request
   */
  proceed: (request?: Request) => Promise<Response> | Response;
};

type NetworkInterceptor = (
  chain: InterceptorChain,
) => Response | Promise<Response>;

const produceChain = (
  originalFetch: FetchType,
  interceptors: (NetworkInterceptor | null)[],
  request: Request,
  index = 0,
): InterceptorChain => {
  return {
    request,
    proceed: async (req = request) => {
      while (index < interceptors.length) {
        const target = interceptors[index];
        if (target) {
          return target(
            produceChain(originalFetch, interceptors, req, index + 1),
          );
        }
        index++;
      }
      return originalFetch(req);
    },
  };
};

export class InterceptorManager {
  private interceptors: (NetworkInterceptor | null)[] = [];
  private backupFetchMap = new WeakMap<object, FetchType>();

  use = (interceptor: NetworkInterceptor): number => {
    this.interceptors.push(interceptor);
    return this.interceptors.length - 1;
  };
  eject = (id: number) => {
    this.interceptors[id] = null;
  };
  clear = () => {
    for (let i = 0; i < this.interceptors.length; i++) {
      this.interceptors[i] = null;
    }
  };

  // (() => {
  //   const t = document.createElement('iframe');
  //   document.body.append(t);
  //   return t;
  // })().contentWindow.fetch;

  hook = (target: WindowLike, baseFetch: FetchType = target.fetch) => {
    const backupFetch = this.backupFetchMap.get(target);
    if (backupFetch) {
      return target.fetch != backupFetch;
    }
    const fakeFetch: FetchType = async (input, init) => {
      return produceChain(
        baseFetch,
        this.interceptors,
        new Request(input, init),
      ).proceed();
    };
    this.backupFetchMap.set(target, target.fetch);
    target.fetch = fakeFetch;
    return target.fetch == fakeFetch;
  };

  unhook = (target: WindowLike) => {
    const backupFetch = this.backupFetchMap.get(target);
    this.backupFetchMap.delete(target);
    if (!backupFetch) {
      return true;
    }
    target.fetch = backupFetch;
    return target.fetch == backupFetch;
  };
}

export const UnsafeWindowInterceptorManager = /* @__PURE__ */ lazy(() => {
  const t = new InterceptorManager();
  t.hook(monkeyWindow.unsafeWindow ?? window);
  return t;
});
