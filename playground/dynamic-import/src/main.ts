if (location.href.includes('animate.css=on')) {
  import('animate.css');
  document.querySelectorAll('div').forEach((div) => {
    div.classList.add('animate__shakeX');
    div.classList.add('animate__animated');
  });
  console.log('dynamic import animate.css');
}

(async () => {
  if (location.href.includes('md5=on')) {
    const md5 = (await import('md5')).default;
    console.log(`md5('xx')=${md5('xx')}`);
    console.log('dynamic import md5');
  }
  const Vue = await import('vue');
  const ElementPlus = await import('element-plus');
  console.log({
    Vue,
    ElementPlus,
    default: ElementPlus.default,
  });
})();
