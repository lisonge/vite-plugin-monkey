export default new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});
