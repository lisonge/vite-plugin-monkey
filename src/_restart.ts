const get_vite_start_time = () => {
  // @see https://github.com/vitejs/vite/blob/c703a3348adeaad9dc92d805a381866917f2a03b/packages/vite/src/node/server/index.ts#L741
  // @ts-ignore
  const n: unknown = global.__vite_start_time;
  if (typeof n != 'number') {
    return 0;
  } else {
    return n;
  }
};

export const isRestart = (n = 1000) => get_vite_start_time() > n;
