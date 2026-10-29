export interface GmMenuCommandOptions {
  id?: number | string;
  accessKey?: string;
  autoClose?: boolean;
  title?: string;
  /** Violentmonkey 2.31.1+: menu icon URL. */
  icon?: string;
  /** Tampermonkey 5.6.6242+: invoke only in the clicked frame. */
  clickedFrame?: boolean;
}

export interface GmRegisterMenuCommandType {
  <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
    optionsOrAccessKey?: string | GmMenuCommandOptions,
  ): string | number;
}
export interface GmAsyncRegisterMenuCommandType {
  <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
    optionsOrAccessKey?: string | GmMenuCommandOptions,
  ): string | number | void | Promise<string | number>;
}

export interface GmUnregisterMenuCommandType {
  (captionOrId: string | number): void;
}
export interface GmAsnycUnregisterMenuCommandType {
  (captionOrId: string | number): void;
}
