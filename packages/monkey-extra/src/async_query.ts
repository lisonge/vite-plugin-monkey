export async function querySelector<K extends keyof HTMLElementTagNameMap>(
  root: ParentNode,
  selectors: K,
  timeout?: number,
): Promise<HTMLElementTagNameMap[K] | null>;
export async function querySelector<K extends keyof SVGElementTagNameMap>(
  root: ParentNode,
  selectors: K,
  timeout?: number,
): Promise<SVGElementTagNameMap[K] | null>;
export async function querySelector<E extends Element = Element>(
  root: ParentNode,
  selectors: string,
  timeout?: number,
): Promise<E | null> {
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
}

export async function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
  root: ParentNode,
  selectors: K,
  timeout?: number,
): Promise<NodeListOf<HTMLElementTagNameMap[K]>>;
export async function querySelectorAll<K extends keyof SVGElementTagNameMap>(
  root: ParentNode,
  selectors: K,
  timeout?: number,
): Promise<NodeListOf<SVGElementTagNameMap[K]>>;
export async function querySelectorAll<E extends Element = Element>(
  root: ParentNode,
  selectors: string,
  timeout?: number,
): Promise<NodeListOf<E>> {
  const nodes = root.querySelectorAll<E>(selectors);
  if (nodes.length > 0) {
    return nodes;
  }
  return new Promise<NodeListOf<E>>((res) => {
    let task: number | undefined = undefined;
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.target instanceof Element) {
          const nodes = mutation.target.querySelectorAll<E>(selectors);
          nodes.length;
          if (nodes.length > 0) {
            observer.disconnect();
            window.clearTimeout(task);
            return res(nodes);
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
        const nodes = document.createDocumentFragment()
          .childNodes as NodeListOf<E>;
        res(nodes);
      }, timeout);
    }
  });
}
