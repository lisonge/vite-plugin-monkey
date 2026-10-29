// Both sides use a private MessagePort. Application messages stay on Worker.
export function workerRuntimeModule(systemjs: string): string {
  const bootstrap = `${systemjs}
const base = 'https://vite-plugin-monkey.invalid/worker/';
const queued = [];
let channel;
let sequence = 0;
const pending = new Map();
const assetUrls = new Map();
const decode = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
function read(file) {
  if (file.source !== undefined) return Promise.resolve(decode(file.source));
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    channel.postMessage({ id, resource: file.resource });
  });
}
function queue(event) {
  event.stopImmediatePropagation();
  queued.push(event);
}
self.addEventListener('message', initialize, { once: true });
self.addEventListener('message', queue);
async function initialize(event) {
  event.stopImmediatePropagation();
  channel = event.ports[0];
  if (!channel) throw new Error('[monkey] Missing Worker resource channel');
  const definition = event.data;
  const acknowledged = new Promise(resolve => {
    channel.onmessage = ({ data }) => {
      if (data.ready) { resolve(); return; }
      const task = pending.get(data.id);
      if (!task) return;
      pending.delete(data.id);
      if ('error' in data) task.reject(new Error(data.error));
      else task.resolve(data.bytes);
    };
  });
  channel.postMessage({ started: true });
  const nativeClose = self.close.bind(self);
  self.close = () => { channel.postMessage({ closed: true }); nativeClose(); };
  try {
    await Promise.all(Object.entries(definition.assets).map(async ([name, file]) => {
      const bytes = await read(file);
      assetUrls.set(name, URL.createObjectURL(new Blob([bytes], { type: file.mime })));
    }));
    self.__MONKEY_WORKER_ASSET_URL__ = (name) => {
      const url = assetUrls.get(name);
      if (!url) throw new Error('[monkey] Unknown Worker asset: ' + name);
      return url;
    };
    const modules = new Map(Object.entries(definition.modules).map(([name, file]) => [new URL(name, base).href, file]));
    const instantiate = System.instantiate;
    System.instantiate = async function(id, parent, meta) {
      const file = modules.get(id);
      if (!file) throw new Error('[monkey] Unknown Worker module: ' + id);
      const bytes = await read(file);
      const url = URL.createObjectURL(new Blob([bytes], { type: 'text/javascript' }));
      try { return await instantiate.call(this, url, parent, meta); }
      finally { URL.revokeObjectURL(url); }
    };
    await System.import(new URL(definition.entry, base).href);
    channel.postMessage({ ready: true });
    // Worker errors and MessagePort messages use different task sources.
    // Wait until the parent has changed state before replaying application code.
    await acknowledged;
    self.removeEventListener('message', queue);
    for (const message of queued.splice(0)) {
      self.dispatchEvent(new MessageEvent('message', {
        data: message.data, ports: message.ports, origin: message.origin,
        lastEventId: message.lastEventId,
      }));
    }
  } catch (error) {
    channel.postMessage({ fatal: String(error?.stack ?? error) });
  }
}
`;
  return `
const source = ${JSON.stringify(bootstrap)};
export function createWorker(definition, options) {
  const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
  const channel = new MessageChannel();
  let worker;
  try { worker = new Worker(url, { ...options, type: 'classic' }); }
  catch (error) { URL.revokeObjectURL(url); channel.port1.close(); channel.port2.close(); throw error; }
  const terminate = worker.terminate.bind(worker);
  const controller = new AbortController();
  const cache = new Map();
  const allowed = new Set([...Object.values(definition.modules), ...Object.values(definition.assets)].map(file => file.resource).filter(Boolean));
  let disposed = false;
  let ready = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    controller.abort();
    channel.port1.close();
    channel.port2.close();
    cache.clear();
    URL.revokeObjectURL(url);
  }
  worker.terminate = () => { dispose(); terminate(); };
  worker.addEventListener('error', () => { if (!ready) worker.terminate(); });
  channel.port1.onmessage = async ({ data }) => {
    if (data.started) { URL.revokeObjectURL(url); return; }
    if (data.ready) { ready = true; channel.port1.postMessage({ ready: true }); return; }
    if (data.closed) { dispose(); return; }
    if ('fatal' in data) {
      worker.dispatchEvent(new ErrorEvent('error', { message: '[monkey] Worker initialization failed: ' + data.fatal }));
      worker.terminate();
      return;
    }
    try {
      const name = data.resource;
      if (!allowed.has(name)) throw new Error('[monkey] Unknown Worker resource: ' + name);
      let bytes = cache.get(name);
      if (!bytes) {
        bytes = (async () => {
          if (typeof GM_getResourceURL !== 'function') throw new Error('[monkey] Worker resources require GM_getResourceURL');
          const resourceUrl = await GM_getResourceURL(name);
          if (typeof resourceUrl !== 'string' || !/^(data:|blob:)/.test(resourceUrl)) throw new Error('[monkey] Missing local Worker resource: ' + name);
          const response = await fetch(resourceUrl, { signal: controller.signal });
          if (!response.ok) throw new Error('[monkey] Cannot read Worker resource: ' + name);
          return response.arrayBuffer();
        })();
        cache.set(name, bytes);
      }
      const copy = (await bytes).slice(0);
      if (!disposed) channel.port1.postMessage({ id: data.id, bytes: copy }, [copy]);
    } catch (error) {
      if (!disposed) channel.port1.postMessage({ id: data.id, error: String(error?.message ?? error) });
    }
  };
  worker.postMessage(definition, [channel.port2]);
  return worker;
}
`;
}
