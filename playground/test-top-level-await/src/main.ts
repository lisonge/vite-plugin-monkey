// bugs reproduction
// top level await
console.log(await window?.fetch(`/`));
export {};

for await (const v of [Promise.resolve(1), Promise.resolve(2)]) {
  console.log(v);
}

console.log((+(await fetch(`/`)) || (await fetch(`/`))) && (await fetch(`/`)));
