import { render, Portal } from 'solid-js/web';
import unocssText from 'virtual:uno.css?inline';

import App from './App';
import style from './hmr_inline_css';
import style2Text from './style2.scss?inline';

render(
  () => (
    <Portal useShadow>
      {style}
      <style>
        {unocssText}
        {style2Text}
      </style>
      <App />
    </Portal>
  ),
  document.body,
);

console.log(unocssText);
