export const querySelector = async <E extends Element = Element>(
  root: ParentNode,
  selectors: string,
  timeout?: number,
): Promise<E | null> => {
  const node = root.querySelector<E>(selectors);
  if (node) {
    return node;
  }
  return new Promise<E | null>((res) => {
    let task: number | undefined = undefined;
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.target instanceof Element) {
          const node = mutation.target.querySelector<E>(selectors);
          if (node) {
            observer.disconnect();
            window.clearTimeout(task);
            return res(node);
          }
        }
      }
    });
    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    if (timeout !== undefined) {
      task = window.setTimeout(() => {
        observer.disconnect();
        res(null);
      }, timeout);
    }
  });
};
