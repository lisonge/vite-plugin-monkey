import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';

const delay = async (n = 0) => {
  return new Promise((res) => {
    setTimeout(res, n);
  });
};

const throttle = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  let loading = false;
  return async (...args: Parameters<T>) => {
    if (loading) return;
    loading = true;
    await fn(...args).catch((e) => {
      console.error(e);
    });
    loading = false;
  };
};

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const doubleCount = () => count() * 2;
  console.log('App invoke');
  const increase = throttle(async () => {
    console.log(`count():` + count());
    setCount(count() + 1);
    await delay(1000);
  });
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div
          style={{ color: 'white', 'font-size': '50px', cursor: 'pointer' }}
          onClick={increase}
        >
          {count()}
        </div>

        <p>
          Edit <code>src/App.tsx,{doubleCount()}</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
