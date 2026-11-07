import type { Plugin, ResolvedConfig } from 'vite';
import type { MonkeyContext } from '../../config/context.ts';
import { prepareBuild } from '../../build/prepare.ts';
import { renderScript } from '../../build/render.ts';
import { emitUserscript } from '../../build/emit.ts';
import { getGlobalBindings } from '../../dependencies/global-modules.ts';

export const buildBundleFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:buildBundle',
    apply: 'build',
    enforce: 'post',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
      },
    },
    configResolved(config) {
      viteConfig = config;
    },
    async generateBundle(_, bundle) {
      const input = await prepareBuild(this, context, bundle, viteConfig);
      const globals = getGlobalBindings(context.config.dependencies);
      const usedGlobals = Object.fromEntries(
        Array.from(this.getModuleIds())
          .filter((id) => Object.hasOwn(globals, id))
          .map((id) => [id, globals[id]]),
      );
      const rendered = await renderScript(input, usedGlobals, viteConfig);
      emitUserscript(
        this,
        context.config,
        context.state,
        bundle,
        input,
        rendered,
      );
    },
  };
};
