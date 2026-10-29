import { render } from 'solid-js/web';
import App from './App.tsx';

const host = document.createElement('div');
document.body.append(host);
const dispose = render(() => <App />, host);
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    dispose();
    host.remove();
  });
}
