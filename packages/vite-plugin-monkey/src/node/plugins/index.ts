import { buildBundleFactory } from './buildBundle';
import { configFactory } from './config';
import { externalGlobalsFactory } from './externalGlobals';
import { externalResourceFactory } from './externalResource';
import { fixAssetUrlFactory } from './fixAssetUrl';
import { fixClientFactory } from './fixClient';
import { fixCssUrlFactory } from './fixCssUrl';
import { perviewFactory } from './perview';
import { redirectClientFactory } from './redirectClient';
import { serverFactory } from './server';
import { virtualHtmlFactory } from './virtualHtml';
import { cssFactory } from './css';

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
  externalResourceFactory,
  cssFactory,
  buildBundleFactory,
];

export default factorys;
