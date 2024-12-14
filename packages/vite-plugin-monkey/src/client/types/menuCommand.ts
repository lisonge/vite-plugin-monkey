export interface GmMenuCommandOptions {
  id: number | string;
  accessKey?: string;
  autoClose?: boolean;
  title?: string;
}

export interface GmRegisterMenuCommandType {
  <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
    accessKey?: string,
    options?: GmMenuCommandOptions,
  ): string | number;
}
export interface GmAsyncRegisterMenuCommandType {
  <T extends MouseEvent | KeyboardEvent>(
    caption: string,
    onClick: (event: T) => void,
    accessKey?: string,
    options?: GmMenuCommandOptions,
  ): string | number | Promise<string | number>;
}

export interface GmUnregisterMenuCommandType {
  (captionOrId: string | number): void;
}
export interface GmAsnycUnregisterMenuCommandType {
  (captionOrId: string | number): void;
}
