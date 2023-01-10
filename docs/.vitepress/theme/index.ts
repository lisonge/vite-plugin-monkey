import mediumZoom from 'medium-zoom';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import './custom.css';

const zoomImages = () => {
  const images =
    document.querySelectorAll<HTMLImageElement>('img[data-zoomable]');
  for (const img of images) {
    if (!img.getAttribute('zoom-inited')) {
      img.setAttribute('zoom-inited', 'true');
      // https://github.com/vuejs/vitepress/issues/854#issuecomment-1232938474
      mediumZoom(img, { background: 'rgba(0,0,0,0.7)' });
    }
  }
};

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      zoomImages();
      setInterval(zoomImages, 2000);
    });
  },
};
