export const delay = async (n = 0) =>
  new Promise((res) => {
    setTimeout(res, n);
  });
