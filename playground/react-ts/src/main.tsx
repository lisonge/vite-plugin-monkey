import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import imgUrl3 from './assets/fluidicon.png';
import './index.css';
import { GM_getTab } from '$';

console.log(GM_getTab);

console.log({ imgUrl3 });

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
