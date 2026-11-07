import type { Plugin } from 'vite';
import type { MonkeyContext } from '../config/context.ts';
export interface PluginFactory {
  (getContext: (root?: string) => Promise<MonkeyContext>): Plugin;
}
