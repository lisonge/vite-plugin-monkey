export type IArray<T = unknown> = T | T[];

/**
 * @see https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 * key is language code
 */
export type LocaleType<T = unknown> = Record<string, T>;

/**
 * format userscript comment
 */
export type Format = {
  /**
   * @description note font_width/font_family, suggest fixed-width font
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

export type AlignFunc = (
  p0: [string, ...string[]][],
) => [string, ...string[]][];
