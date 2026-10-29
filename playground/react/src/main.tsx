import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../../shared.css';
const host = document.createElement('div');
document.body.append(host);
const root = createRoot(host);
root.render(<App />);
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    root.unmount();
    host.remove();
  });
