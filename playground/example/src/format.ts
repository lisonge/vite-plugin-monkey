import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import type { BuiltInParserName, Plugin } from 'prettier';

// console.log(prettier.getSupportInfo().languages);

const plugins: Plugin[] = [parserBabel];

const lang2parser: Record<string, BuiltInParserName> = {
  js: 'babel',
  jsx: 'babel',
  ts: 'babel-ts',
  tsx: 'babel-ts',
  json: 'json',
  json5: 'json5',
};
Object.assign(lang2parser, {
  java: 'java',
});

export const formatCode = (code: string, lang: string) => {
  if (lang2parser[lang]) {
    try {
      return prettier.format(code, {
        parser: lang2parser[lang],
        plugins,
      });
    } catch {}
  }
  return code;
};
