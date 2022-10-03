import fs from 'node:fs/promises';
import path from 'node:path';
import { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { logger } from '../_logger';
import { existFile } from '../_util';
import pc from 'picocolors';

const htmlText = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://vitejs.dev/logo.svg" />
    <title>Vite</title>
    <!-- /index.html 必须存在, 否则 vite 无法注入 hmr 代码, plugin-monkey 以及其他插件(比如 @vitejs/plugin-react) 也无法注入相关辅助代码 -->
    <!-- /index.html must exist, if not, vite will not inject hmr code, plugin-monkey and others(like @vitejs/plugin-react) will not inject theirs related auxiliary code -->
  </head>
</html>
`.trimStart();

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  return {
    name: 'monkey:addHtml',
    apply: 'serve',
    async configResolved(config) {
      const htmlPathList = [path.join(config.root, 'index.html')];
      if (typeof config.publicDir == 'string') {
        htmlPathList.push(
          path.join(config.root, config.publicDir, 'index.html'),
        );
      }
      for (const htmlPath of htmlPathList) {
        if (await existFile(htmlPath)) {
          return;
        }
      }
      await fs.writeFile(htmlPathList[0], htmlText);
      logger.info(`create ${pc.green(htmlPathList[0])} for vite serve`);
    },
  };
};
