const value = (await Promise.resolve({ answer: 42 })).answer;
const values: number[] = [];
for await (const item of [Promise.resolve(1), Promise.resolve(2)])
  values.push(item);
export async function run(host: HTMLElement) {
  const section = document.createElement('section');
  section.textContent = `${value === 42 && values.join() === '1,2' ? 'PASS' : 'FAIL'} · 动态模块 / 顶层 await / for-await: ${value}, ${values}`;
  host.append(section);
}
