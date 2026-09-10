type HTMLElementTagName = keyof HTMLElementTagNameMap;

export interface GmAddElementAttributes {
  class?: string;
  style?: string;
  textContent?: string;
  [key: string]: any;
}

export interface GmAddElementType {
  <K extends HTMLElementTagName>(
    tagName: K,
    attributes?: GmAddElementAttributes,
  ): HTMLElementTagNameMap[K];

  (tagName: string, attributes?: GmAddElementAttributes): HTMLElement;

  <K extends HTMLElementTagName>(
    parentNode: Node | Element | ShadowRoot,
    tagName: K,
    attributes?: GmAddElementAttributes,
  ): HTMLElementTagNameMap[K];
  (
    parentNode: Node | Element | ShadowRoot,
    tagName: string,
    attributes?: GmAddElementAttributes,
  ): HTMLElement;
}

export interface GmAsyncAddElementType {
  <K extends HTMLElementTagName>(
    tagName: K,
    attributes?: GmAddElementAttributes,
  ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];

  (tagName: string, attributes?: GmAddElementAttributes): HTMLElement;

  <K extends HTMLElementTagName>(
    parentNode: Node | Element | ShadowRoot,
    tagName: K,
    attributes?: GmAddElementAttributes,
  ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];
  (
    parentNode: Node | Element | ShadowRoot,
    tagName: string,
    attributes?: GmAddElementAttributes,
  ): Promise<HTMLElement> | HTMLElement;
}
