/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import './main.css';

render(
  () => <App />,
  (() => {
    const app = document.createElement('div');
    app.id = `app`;
    document.body.append(app);
    return app;
  })(),
);
