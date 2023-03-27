import { virtualHtmlPlugin } from './virtualHtml';
import { fixViteAssetPlugin } from './fixViteAsset';
import { fixViteClientPlugin } from './fixViteClient';
import { serverPlugin } from './server';
import { autoGrantPlugin } from './autoGrant';
import { externalGlobalsPlugin } from './externalGlobals';
import { externalLoaderPlugin } from './externalLoader';
import { externalResourcePlugin } from './externalResource';
import { finalBundlePlugin } from './finalBundle';
import { perviewPlugin } from './perview';
import { collectCssPlugin } from './collectCss';
import { redirectClientPlugin } from './redirectClient';
import { inlinesAssetPlugin } from './inlinesAsset';

const monkeyPluginList = [
  // only serve
  virtualHtmlPlugin,
  fixViteAssetPlugin,
  fixViteClientPlugin,
  serverPlugin,

  // only build pre
  redirectClientPlugin,
  externalLoaderPlugin,
  externalResourcePlugin,
  externalGlobalsPlugin,

  // only build post
  autoGrantPlugin,
  inlinesAssetPlugin,
  collectCssPlugin,

  // only build, final build
  finalBundlePlugin,

  // only preview
  perviewPlugin,
];
export default monkeyPluginList;
