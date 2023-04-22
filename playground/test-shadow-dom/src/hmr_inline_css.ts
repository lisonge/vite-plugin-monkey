import text from './style.css?inline';

const style = document.createElement('style');
style.textContent = text;
export default style;

if (import.meta.hot) {
  import.meta.hot.accept('./style.css?inline', (newModule) => {
    const text2 = newModule?.default as string;
    style.textContent = text2 ?? ``;
  });
}
