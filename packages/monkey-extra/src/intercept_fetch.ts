import { monkeyWindow } from 'vite-plugin-monkey/dist/client';
import type { FetchType, IPromise } from './types';
import { lazy } from './util';

type InterceptorChain = {
  request: Request;
  /**
   * @param request if not set, use chain.request
   */
  proceed: (request?: Request) => IPromise<Response>;
};

type NetworkInterceptor = (chain: InterceptorChain) => IPromise<Response>;

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
          const chain = produceChain(
            originalFetch,
            interceptors,
            req,
            index + 1,
          );
          return await target(chain);
        }
        index++;
      }
      return originalFetch(req);
    },
  };
};

export const buildFetchInterceptorManager = (originalFetch: FetchType) => {
  const interceptors: (NetworkInterceptor | null)[] = [];
  const fakeFetch: FetchType = async (input, init) => {
    return produceChain(
      originalFetch,
      [...interceptors],
      new Request(input, init),
    ).proceed();
  };
  return {
    fetch: fakeFetch,
    use: (interceptor: NetworkInterceptor): number => {
      interceptors.push(interceptor);
      return interceptors.length - 1;
    },
    eject: (id: number) => {
      interceptors[id] = null;
    },
    clear: () => {
      for (let i = 0; i < interceptors.length; i++) {
        interceptors[i] = null;
      }
    },
  };
};

export const UnsafeWindowInterceptorManager = /* @__PURE__ */ lazy(() => {
  const t = buildFetchInterceptorManager(monkeyWindow.unsafeWindow.fetch);
  monkeyWindow.unsafeWindow.fetch = t.fetch;
  return t;
});
