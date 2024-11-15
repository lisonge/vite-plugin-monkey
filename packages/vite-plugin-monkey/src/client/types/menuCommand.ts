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
  ): string;
}

export interface GmUnregisterMenuCommandType {
  (captionOrId: string): void;
}
