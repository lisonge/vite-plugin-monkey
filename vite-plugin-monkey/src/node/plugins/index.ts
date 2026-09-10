import type { MonkeyPluginFactory } from '../utils/types.ts';
import { buildBundleFactory } from './buildBundle.ts';
import { configFactory } from './config.ts';
import { cssFactory } from './css.ts';
import { externalGlobalsFactory } from './externalGlobals.ts';
import { externalResourceFactory } from './externalResource.ts';
import { fixAssetUrlFactory } from './fixAssetUrl.ts';
import { fixClientFactory } from './fixClient.ts';
import { fixCssUrlFactory } from './fixCssUrl.ts';
import { fixWorkerFactory } from './fixWorker.ts';
import { perviewFactory } from './perview.ts';
import { removePreloadFactory } from './removePreload.ts';
import { redirectClientFactory } from './redirectClient.ts';
import { serverFactory } from './server.ts';
import { styleFactory } from './style.ts';
import { virtualHtmlFactory } from './virtualHtml.ts';

const factorys: MonkeyPluginFactory[] = [
  configFactory,

  virtualHtmlFactory,
  fixClientFactory,
  fixAssetUrlFactory,
  fixCssUrlFactory,
  fixWorkerFactory,
  serverFactory,
  perviewFactory,

  removePreloadFactory,
  styleFactory,
  redirectClientFactory,
  externalGlobalsFactory,
  externalResourceFactory,
  cssFactory,
  buildBundleFactory,
];

export default factorys;
