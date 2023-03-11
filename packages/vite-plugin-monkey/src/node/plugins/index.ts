import { virtualHtmlPlugin } from './virtualHtml';
import { fixViteAssetPlugin } from './fixViteAsset';
import { fixViteClientPlugin } from './fixViteClient';
import { serverPlugin } from './server';
import { windowPlugin } from './window';
import { autoGrantPlugin } from './autoGrant';
import { externalGlobalsPlugin } from './externalGlobals';
import { externalLoaderPlugin } from './externalLoader';
import { externalResourcePlugin } from './externalResource';
import { finalBundlePlugin } from './finalBundle';
import { perviewPlugin } from './perview';
import { topLevelAwaitPlugin } from './topLevelAwait';
import { collectCssPlugin } from './collectCss';

const monkeyPluginList = [
  // only serve
  virtualHtmlPlugin,
  fixViteAssetPlugin,
  fixViteClientPlugin,
  serverPlugin,

  // common
  windowPlugin,

  // only build
  autoGrantPlugin,
  externalGlobalsPlugin,
  externalLoaderPlugin,
  externalResourcePlugin,
  topLevelAwaitPlugin,
  collectCssPlugin,

  // only build, final build
  finalBundlePlugin,

  // only preview
  perviewPlugin,
];
export default monkeyPluginList;