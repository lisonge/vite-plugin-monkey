import { buildBundleFactory } from './buildBundle';
import { configFactory } from './config';
import { cssOnDemandFactory } from './cssOnDemand';
import { externalGlobalsFactory } from './externalGlobals';
import { externalLoaderFactory } from './externalLoader';
import { externalResourcePlugin } from './externalResource';
import { fixAssetUrlFactory } from './fixAssetUrl';
import { fixClientFactory } from './fixClient';
import { fixCssUrlFactory } from './fixCssUrl';
import { perviewFactory } from './perview';
import { redirectClientFactory } from './redirectClient';
import { serverFactory } from './server';
import { virtualHtmlFactory } from './virtualHtml';

const factorys = [
  configFactory,

  virtualHtmlFactory,
  fixClientFactory,
  fixAssetUrlFactory,
  fixCssUrlFactory,
  serverFactory,
  perviewFactory,

  redirectClientFactory,
  externalGlobalsFactory,
  externalLoaderFactory,
  externalResourcePlugin,
  cssOnDemandFactory,
  buildBundleFactory,
];

export default factorys;
