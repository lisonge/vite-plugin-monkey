type HTMLElementTagName = keyof HTMLElementTagNameMap;

export interface GmAddElementType {
  <K extends HTMLElementTagName>(
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): HTMLElementTagNameMap[K];

  (tagName: string, attributes?: Partial<HTMLElement>): HTMLElement;

  <K extends HTMLElementTagName>(
    parentNode: Node | Element | ShadowRoot,
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): HTMLElementTagNameMap[K];
  (
    parentNode: Node | Element | ShadowRoot,
    tagName: string,
    attributes?: Partial<HTMLElement>,
  ): HTMLElement;
}

export interface GmAsyncAddElementType {
  <K extends HTMLElementTagName>(
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];

  (tagName: string, attributes?: Partial<HTMLElement>): HTMLElement;

  <K extends HTMLElementTagName>(
    parentNode: Node | Element | ShadowRoot,
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
  ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];
  (
    parentNode: Node | Element | ShadowRoot,
    tagName: string,
    attributes?: Partial<HTMLElement>,
  ): Promise<HTMLElement> | HTMLElement;
}
