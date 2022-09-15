import type { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import nodeFetch, { Response as nodeResponse } from 'node-fetch';
import { logger } from '../_logger';
import pc from 'picocolors';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let checkCdnPromiseList: Array<{
    url: string;
    responsePromise: Promise<nodeResponse | unknown>;
  }> = [];
  return {
    name: 'monkey:checkCdn',
    apply: 'build',
    async generateBundle() {
      if (finalPluginOption.build.checkCDN) {
        const { require = [] } = finalPluginOption.userscript;
        const requireUrlList: string[] = [];
        if (typeof require == 'string') {
          requireUrlList.push(require);
        } else {
          requireUrlList.push(...require);
        }

        checkCdnPromiseList = requireUrlList.map((url) => ({
          url,
          responsePromise: nodeFetch(url, {
            timeout: 3000,
          }).catch((e) => e),
        }));
      }
    },
    async closeBundle() {
      if (checkCdnPromiseList.length > 0) {
        logger.info(
          `checking CDN*${checkCdnPromiseList.length} for availability`,
        );
        await new Promise<void>((res) => {
          let n = 0;
          let failedNum = 0;
          checkCdnPromiseList.forEach(async ({ url, responsePromise }) => {
            const response = await responsePromise;
            if (response instanceof nodeResponse) {
              if (!response.ok) {
                failedNum++;
                logger.error(`CDN HTTP ${response.status}, ${pc.red(url)}`);
              } else {
                logger.info(`${pc.green('CDN ok,')} ${pc.gray(url)}`);
              }
            } else {
              const error = response as unknown;
              failedNum++;
              if (error instanceof Error) {
                if (error.message.includes(url)) {
                  logger.error(`${error.name}:${error.message}`);
                } else {
                  logger.error(`${error.name}:${error.message}, ${url}`);
                }
              } else {
                const message = String(error);
                if (message.includes(url)) {
                  logger.error(`unknown error:${message}`);
                } else {
                  logger.error(`unknown error:${message}, ${url}`);
                }
              }
            }
            n++;
            if (n == checkCdnPromiseList.length) {
              if (failedNum > 0) {
                logger.error(
                  `check finished, CDN*${failedNum} are not available, you need fix it`,
                );
              } else {
                logger.info(
                  `check finished, All CDN*${checkCdnPromiseList.length} are available`,
                );
              }
              res();
            }
          });
        });
      }
    },
  };
};
