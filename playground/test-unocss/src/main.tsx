import { render, Portal } from 'solid-js/web';
import style from 'unocss?style';
import App from './App';

render(
  () => (
    <Portal useShadow>
      <App />
      {style}
    </Portal>
  ),
  (() => {
    const div = document.createElement('div');
    document.body.append(div);
    return div;
  })(),
);
