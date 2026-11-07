export const getSafeIdentifier = (
  prefix: string,
  code: string | ReadonlySet<string>,
  others?: string[],
  decimalSuffix = false,
): string => {
  let n = 0;
  let identifier = prefix;
  while (
    (typeof code === 'string'
      ? code.includes(identifier)
      : code.has(identifier)) ||
    (others && others.some((c) => c.includes(identifier)))
  ) {
    n++;
    identifier = `${prefix}${n.toString(decimalSuffix ? 10 : 16)}`;
  }
  return identifier;
};

const nameReg = /[0-9a-zA-Z_]+/g;
const autoPreUnderline = (v: string): string => {
  if (!v) return '_';
  return Number.isInteger(Number(v[0])) ? `_${v}` : v;
};

export const getUpperCaseName = (
  value: string | undefined,
): string | undefined => {
  if (!value) return;
  const list = value.match(nameReg);
  if (!list?.length) return;
  return list
    .map((v, i) => {
      if (i === 0) return autoPreUnderline(v);
      return v[0].toUpperCase() + v.substring(1);
    })
    .join('');
};
