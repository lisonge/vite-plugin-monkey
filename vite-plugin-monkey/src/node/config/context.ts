import { normalizeConfig } from './resolve.ts';
import type {
  BuildState,
  MonkeyOptions,
  MonkeyContext,
} from '../utils/types.ts';
export const createBuildState = (): BuildState => ({
  collectRequireUrls: [],
  collectResource: Object.create(null),
  globalsPkg2VarName: Object.create(null),
});
export const createContext = async (
  input: MonkeyOptions,
  root: string,
): Promise<MonkeyContext> => ({
  config: await normalizeConfig(input, root),
  state: createBuildState(),
});
