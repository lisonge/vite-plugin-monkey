import type { AxiosAdapter } from 'axios';
import { GM_xmlhttpRequest } from 'vite-plugin-monkey/dist/client';

export const gmAxiosAdapter: AxiosAdapter = async (config) => {
  const method = (config.method || 'GET') as 'GET';
  const u = new URL(config.url ?? ``, config.baseURL);
  Object.entries(config.params ?? {}).forEach(([k, v]) => {
    if (v === undefined) return;
    u.searchParams.set(k, String(v));
  });
  const headers = config.headers.toJSON(true) as Record<string, string>;
  GM_xmlhttpRequest({
    method,
    url: u.href,
    headers,
    data: config.data,

    timeout: config.timeout,
    responseType: config.responseType,
    onprogress(response) {
      response.total;
    },
    onload(response) {
      response.statusText;
    },
  });
  config.onUploadProgress;

  return {
    status: 200,
    statusText: ``,
    headers: {},
    data: undefined,

    config,
  };
};
