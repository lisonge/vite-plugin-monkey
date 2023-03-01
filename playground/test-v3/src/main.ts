import { createApp } from 'vue';
import './styles/b.scss';
import App from './App.vue';

const delay = (n = 0) => {
  return new Promise((res) => setTimeout(res, n));
};
// top level await
await delay();
createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
// polyfill at
console.log(location.href.at(-1));
if (location.href) {
  (await import('./chunk')).out();
}
