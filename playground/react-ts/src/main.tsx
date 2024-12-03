import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import imgUrl3 from './assets/fluidicon.png';

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
