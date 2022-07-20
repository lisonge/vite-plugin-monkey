/**
 * `https://cdn.jsdelivr.net/npm/${name}@${version}/${basename}`
 * @param basename jsdelivr support file combine, normally you don't need set basename
 * @see https://www.jsdelivr.com/features
 */
export const jsdelivr = (
  umdVarName: string,
  basename?: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      if (basename) {
        return `https://cdn.jsdelivr.net/npm/${name}@${version}/${basename}`;
      } else {
        return `https://cdn.jsdelivr.net/npm/${name}@${version}`;
      }
    },
  ];
};

/**
 * `https://fastly.jsdelivr.net/npm/${name}@${version}/${basename}`
 * @param basename jsdelivr support file combine, normally you don't need set basename
 * @see https://www.jsdelivr.com/features
 */
export const jsdelivrFastly = (
  umdVarName: string,
  basename?: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      if (basename) {
        return `https://fastly.jsdelivr.net/npm/${name}@${version}/${basename}`;
      } else {
        return `https://fastly.jsdelivr.net/npm/${name}@${version}`;
      }
    },
  ];
};

/**
 * `https://unpkg.com/${name}@${version}/${basename}`
 * @see https://unpkg.com/
 */
export const unpkg = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://unpkg.com/${name}@${version}/${basename}`;
    },
  ];
};

/**
 * `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-10-y/${name}/${version}/${basename}`
 * @see https://cdn.bytedance.com/
 */
export const bytecdntp = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-10-y/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * `https://cdn.bootcdn.net/ajax/libs/${name}/${version}/${basename}`
 * @see https://www.bootcdn.cn/all/
 */
export const bootcdn = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://cdn.bootcdn.net/ajax/libs/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * `https://lib.baomitu.com/${name}/${version}/${basename}`
 * @see https://cdn.baomitu.com/
 */
export const baomitu = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://lib.baomitu.com/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * `https://cdn.staticfile.org/${name}/${version}/${basename}`
 * @see https://staticfile.org/
 */
export const staticfile = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://cdn.staticfile.org/${name}/${version}/${basename}`;
    },
  ];
};
/**
 * `https://cdnjs.cloudflare.com/ajax/libs/${name}/${version}/${basename}`
 * @see https://cdnjs.com/libraries
 */
export const cdnjs = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://cdnjs.cloudflare.com/ajax/libs/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * `https://unpkg.zhimg.com/${name}/${version}/${basename}`
 * @link https://unpkg.zhimg.com/
 */
export const zhimg = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://unpkg.zhimg.com/${name}/${version}/${basename}`;
    },
  ];
};

/**
 * `https://npm.elemecdn.com/${name}@${version}/${basename}`
 */
export const elemecdn = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://npm.elemecdn.com/${name}@${version}/${basename}`;
    },
  ];
};

/**
 * `https://code.bdstatic.com/npm/${name}@${version}/${basename}`
 */
export const bdstatic = (
  umdVarName: string,
  basename: string
): [string, (version: string, name: string) => string] => {
  return [
    umdVarName,
    (version: string, name: string): string => {
      return `https://code.bdstatic.com/npm/${name}@${version}/${basename}`;
    },
  ];
};
