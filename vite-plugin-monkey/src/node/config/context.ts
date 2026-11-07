import { normalizeConfig } from './resolve.ts';
import type { MonkeyOptions } from './types.ts';
import type { NormalizedConfig } from './resolved.ts';
import { createBuildState, type BuildState } from '../build/state.ts';
export interface MonkeyContext {
  readonly config: NormalizedConfig;
  state: BuildState;
}
export const createContext = async (
  input: MonkeyOptions,
  root: string,
): Promise<MonkeyContext> => ({
  config: await normalizeConfig(input, root),
  state: createBuildState(),
});
