import type { AxiosAdapter } from 'axios';
import { GM_xmlhttpRequest } from 'vite-plugin-monkey/dist/client';

export const gmAxiosAdapter: AxiosAdapter = async (config) => {
  GM_xmlhttpRequest;
  return {
    config,
    data: undefined,
    headers: {},
    status: 200,
    statusText: ``,
  };
};
