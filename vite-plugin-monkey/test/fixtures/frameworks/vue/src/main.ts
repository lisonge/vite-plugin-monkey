import { createApp } from 'vue';
import App from './App.vue';

const host = document.createElement('div');
document.body.append(host);
const app = createApp(App);
app.mount(host);
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    app.unmount();
    host.remove();
  });
}
