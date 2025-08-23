import type { MonkeyPluginFactory } from '../utils/types';
import { buildBundleFactory } from './buildBundle';
import { configFactory } from './config';
import { cssFactory } from './css';
import { externalGlobalsFactory } from './externalGlobals';
import { externalResourceFactory } from './externalResource';
import { fixAssetUrlFactory } from './fixAssetUrl';
import { fixClientFactory } from './fixClient';
import { fixCssUrlFactory } from './fixCssUrl';
import { perviewFactory } from './perview';
import { redirectClientFactory } from './redirectClient';
import { serverFactory } from './server';
import { styleFactory } from './style';
import { virtualHtmlFactory } from './virtualHtml';

const factorys: MonkeyPluginFactory[] = [
  configFactory,

  virtualHtmlFactory,
  fixClientFactory,
  fixAssetUrlFactory,
  fixCssUrlFactory,
  serverFactory,
  perviewFactory,

  styleFactory,
  redirectClientFactory,
  externalGlobalsFactory,
  externalResourceFactory,
  cssFactory,
  buildBundleFactory,
];

export default factorys;
