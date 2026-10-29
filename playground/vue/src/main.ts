import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';
import 'uno.css';
import '../../shared.css';
import App from './App.vue';
const host = document.createElement('div');
document.body.append(host);
const app = createApp(App).use(createPinia());
app.mount(host);
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    app.unmount();
    host.remove();
  });
