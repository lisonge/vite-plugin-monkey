type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

export const expectTypeOf = <Actual>(_value: Actual) => ({
  toEqualTypeOf<Expected>(
    ..._check: Equal<Actual, Expected> extends true ? [] : [never]
  ) {},
});
