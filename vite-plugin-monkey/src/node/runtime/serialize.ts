export const stringifyFunction = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  ...args: NoInfer<Args>
) => {
  return `;(${fn})(${args
    .map((value) =>
      value === undefined
        ? 'void 0'
        : (JSON.stringify(value, (_key, item) => {
            if (['function', 'symbol', 'bigint'].includes(typeof item))
              throw new TypeError(
                '[monkey] Function arguments must be JSON-serializable or undefined',
              );
            return item;
          }) ?? 'void 0'),
    )
    .join(',')});`;
};
