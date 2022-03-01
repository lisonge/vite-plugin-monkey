// could get cjs instead of brower js

export const jsdelivr = (name: string, version: string) => {
  return `https://cdn.jsdelivr.net/npm/${name}@${version}`;
};

export const unpkg = (name: string, version: string) => {
  return `https://unpkg.com/${name}@${version}`;
};
