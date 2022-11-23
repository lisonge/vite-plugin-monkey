import { monkeyWindow } from 'vite-plugin-monkey/dist/client';

type InterceptorChain = {
  request: Request;
  /**
   * @param request if not set, use chain.request
   */
  proceed: (request?: Request) => Promise<Response>;
};

type NetworkInterceptor = (
  chain: InterceptorChain,
) => Response | Promise<Response>;

const win = /* @__PURE__ */ (() => monkeyWindow.unsafeWindow ?? window)();
const originalFetch = /* @__PURE__ */ (() => win.fetch.bind(win))();
const interceptors: (NetworkInterceptor | null)[] = [];

const produceChain = (request: Request, index = 0): InterceptorChain => {
  return {
    request,
    proceed: async (req = request) => {
      let target = interceptors[index];
      while (!target && index < interceptors.length) {
        index++;
        target = interceptors[index];
      }
      if (target) {
        return target(produceChain(req, index + 1));
      }
      return originalFetch(req);
    },
  };
};

const fakeFetch: typeof fetch = async (input, init) => {
  return produceChain(new Request(input, init)).proceed();
};

export const InterceptorManager = {
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
  get enable() {
    return win.fetch == fakeFetch;
  },
  set enable(value) {
    if (value) {
      win.fetch = fakeFetch;
    } else {
      win.fetch = originalFetch;
    }
  },
};
