const values = [];
for await (const value of [Promise.resolve(1), Promise.resolve(2)]) {
  values.push(value);
}
const lazy = await import('./lazy.js');
const member = (await Promise.resolve({ value: 7 })).value;
const call = (await Promise.resolve(() => 8))();
globalThis.done([...values, lazy.default, member, call]);
