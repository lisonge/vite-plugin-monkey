import { virtualHtmlPlugin } from './virtualHtml';
import { fixViteAssetPlugin } from './fixViteAsset';
import { fixViteClientPlugin } from './fixViteClient';
import { serverPlugin } from './server';
import { windowPlugin } from './window';
import { autoGrantPlugin } from './autoGrant';
import { externalGlobalsPlugin } from './externalGlobals';
import { externalLoaderPlugin } from './externalLoader';
import { externalResourcePlugin } from './externalResource';
import { extraToBundlePlugin } from './extraToBundle';
import { perviewPlugin } from './perview';

const monkeyPluginList = [
  virtualHtmlPlugin,
  fixViteAssetPlugin,
  fixViteClientPlugin,
  serverPlugin,
  windowPlugin,
  autoGrantPlugin,
  externalGlobalsPlugin,
  externalLoaderPlugin,
  externalResourcePlugin,
  extraToBundlePlugin,
  perviewPlugin,
];
export default monkeyPluginList;
