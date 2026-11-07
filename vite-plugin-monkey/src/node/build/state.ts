export interface BuildState {
  collectRequireUrls: string[];
  collectResource: Record<string, string>;
}

export const createBuildState = (): BuildState => ({
  collectRequireUrls: [],
  collectResource: Object.create(null),
});
