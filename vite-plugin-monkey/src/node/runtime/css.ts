import type { GmAddStyleType } from '../../client/types/addStyle.ts';
declare const GM_addStyle: GmAddStyleType | undefined;
export const cssModuleId = 'virtual:monkey-css';
const defaultCssSideEffects = (c: string) => {
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(c);
  } else {
    // see #262
    (document.head || document.documentElement)
      .appendChild(document.createElement('style'))
      .append(c);
  }
};

export const getCssRuntimeCode = (
  mode: 'auto' | 'gm' | 'dom' | false,
): string => {
  const f =
    mode === 'auto'
      ? defaultCssSideEffects.toString()
      : mode === 'gm'
        ? '(css)=>GM_addStyle(css)'
        : mode === 'dom'
          ? '(css)=>(document.head||document.documentElement).appendChild(document.createElement("style")).append(css)'
          : '()=>{}';
  return `
const s = new Set;
const _css = async (t) => {
  if (s.has(t)) return;
  s.add(t);
  ${`(${f})(t);`}
};
`.trimStart();
};
export const getCssModuleCode = (
  mode: Parameters<typeof getCssRuntimeCode>[0],
) => getCssRuntimeCode(mode) + '\nexport { _css };';
