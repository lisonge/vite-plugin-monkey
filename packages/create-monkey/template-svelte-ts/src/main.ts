import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const app = mount(App, {
  target: (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
});

export default app;
