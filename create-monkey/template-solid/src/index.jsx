/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

render(
  () => <App />,
  (() => {
    const app = document.createElement('div');
    app.style.flex = '1';
    document.body.append(app);
    return app;
  })(),
);
