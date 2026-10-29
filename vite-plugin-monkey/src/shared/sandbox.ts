import type { MonkeyWindow } from '../client/types/_context.ts';
export interface SandboxBridge {
  version: number;
  project: string;
  sandbox: MonkeyWindow;
}
export type SandboxDocument = Document &
  Record<string, SandboxBridge | undefined>;
