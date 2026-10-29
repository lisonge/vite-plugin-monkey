import type { PluginFactory } from '../utils/types.ts';
import { buildBundleFactory } from './build/buildBundle.ts';
import { configFactory } from './build/config.ts';
import { cssFactory } from './build/css.ts';
import { externalGlobalsFactory } from '../dependencies/globals.ts';
import { externalResourceFactory } from '../dependencies/resources.ts';
import { fixAssetUrlFactory } from './dev/fixAssetUrl.ts';
import { fixClientFactory } from './dev/fixClient.ts';
import { fixCssUrlFactory } from './dev/fixCssUrl.ts';
import { fixWorkerFactory } from './dev/fixWorker.ts';
import { previewFactory } from './shared/preview.ts';
import { removePreloadFactory } from './build/removePreload.ts';
import { redirectClientFactory } from './build/redirectClient.ts';
import { serverFactory } from './dev/server.ts';
import { styleFactory } from './shared/style.ts';
import { virtualHtmlFactory } from './dev/virtualHtml.ts';
import { workerFactory } from '../workers/plugin.ts';

const factories: PluginFactory[] = [
  configFactory,

  virtualHtmlFactory,
  fixClientFactory,
  fixAssetUrlFactory,
  fixCssUrlFactory,
  fixWorkerFactory,
  serverFactory,
  previewFactory,

  removePreloadFactory,
  styleFactory,
  redirectClientFactory,
  externalGlobalsFactory,
  externalResourceFactory,
  cssFactory,
  workerFactory,
  buildBundleFactory,
];

export default factories;
