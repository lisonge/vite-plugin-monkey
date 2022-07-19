/**
 * @see https://www.jsdelivr.com/
 */
export const jsdelivr = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://cdn.jsdelivr.net/npm/${name}@${version}/${basename}`;
    },
  ];
};

/**
 * @see https://unpkg.com/
 */
export const unpkg = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://unpkg.com/${name}@${version}/${basename}`;
    },
  ];
};

/**
 * @see https://cdn.bytedance.com/
 */
export const bytecdntp = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-10-y/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * @see https://www.bootcdn.cn/all/
 */
export const bootcdn = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://cdn.bootcdn.net/ajax/libs/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * @see https://cdn.baomitu.com/
 */
export const baomitu = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://lib.baomitu.com/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * @see https://staticfile.org/
 */
export const staticfile = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://cdn.staticfile.org/${name}/${version}/${basename}`;
    },
  ];
};
/**
 * @see https://cdnjs.com/libraries
 */
export const cdnjs = (
  umdName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdName,
    (version: string, name: string): string => {
      return `https://cdnjs.cloudflare.com/ajax/libs/${name}/${version}/${basename}`;
    },
  ];
};
