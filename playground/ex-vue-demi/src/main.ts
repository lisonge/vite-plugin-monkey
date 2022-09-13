import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.mount(
  (() => {
    const div = document.createElement('div');
    document.body.append(div);
    return div;
  })(),
);
