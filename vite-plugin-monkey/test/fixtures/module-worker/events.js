export const events = [];
export function record(event) {
  events.push(event);
  globalThis.postMessage({ event });
}
export let release;
export const gate = new Promise((resolve) => {
  release = resolve;
});
