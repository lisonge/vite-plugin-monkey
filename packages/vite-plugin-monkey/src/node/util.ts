import { transformWithEsbuild } from 'vite';
// eslint-disable-next-line
export const encodeFn = async <T extends (...args: any[]) => any>(
  fn: T,
  args: Parameters<T>,
) => {
  return (
    'data:application/javascript,' +
    encodeURIComponent(
      (
        await transformWithEsbuild(
          `;(${fn})(...${JSON.stringify(args)})`,
          'any_name.js',
          {
            minify: true,
            sourcemap: false,
            legalComments: 'none',
          },
        )
      ).code.trimEnd(),
    )
  );
};
