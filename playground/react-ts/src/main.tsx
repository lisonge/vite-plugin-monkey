import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import imgUrl from 'base64-img/test/img/car.svg';
import imgUrl2 from 'base64-img/test/img/car.svg?url';
import 'element-plus/dist/index.css';
import cssUrl from 'element-plus/dist/index.css?url';

console.log({ imgUrl, imgUrl2, cssUrl });

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
