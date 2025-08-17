import type { Plugin } from 'vite';
import type { ResolvedMonkeyOption } from '../utils/types';

// 扩展插件上下文以支持异步替换
declare module 'rollup' {
  interface PluginContext {
    replaceAsync(
      str: string,
      regex: RegExp,
      asyncFn: (match: string, ...args: any[]) => Promise<string>,
    ): Promise<string>;
  }
}

export const cssOnDemandFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  let viteConfig: any;
  const processedCssFiles = new Set<string>();
  const cssModuleMapping = new Map<string, string>();
  const cssContentCache = new Map<string, string>();

  return {
    name: 'monkey:cssOnDemand',
    apply: 'build',
    enforce: 'post', // 确保在其他CSS插件之后运行

    async config(_config) {
      option = await getOption();
      if (process.env.DEBUG) {
        console.log(
          `[cssOnDemand] Config loaded, cssOnDemand option:`,
          option.build?.cssOnDemand,
        );
        console.log(`[cssOnDemand] Full build options:`, option.build);
      }
    },

    configResolved(config) {
      viteConfig = config;
      if (process.env.DEBUG) {
        console.log(
          `[cssOnDemand] Saved Vite config, CSS config:`,
          config.css?.postcss,
        );
      }
    },

    buildStart() {
      // 添加异步替换辅助方法到插件上下文
      this.replaceAsync = async function (str, regex, asyncFn) {
        const promises: Promise<{
          index: number;
          length: number;
          replacement: string;
        }>[] = [];
        let match;

        // 重置正则表达式的 lastIndex 以避免状态问题
        regex.lastIndex = 0;

        while ((match = regex.exec(str)) !== null) {
          const index = match.index;
          const length = match[0].length;
          const promise = asyncFn(match[0], ...match.slice(1)).then(
            (replacement) => ({
              index,
              length,
              replacement,
            }),
          );
          promises.push(promise);
        }

        if (promises.length === 0) {
          return str;
        }

        const replacements = await Promise.all(promises);

        // 按索引从后往前排序，以避免替换时位置偏移
        replacements.sort((a, b) => b.index - a.index);

        let result = str;
        for (const { index, length, replacement } of replacements) {
          result =
            result.slice(0, index) + replacement + result.slice(index + length);
        }

        return result;
      };
    },

    async transform(code, id) {
      if (process.env.DEBUG) {
        console.log(`[cssOnDemand] Transform called for: ${id}`);
      }

      // 只处理 TypeScript 和 JavaScript 文件
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) {
        if (process.env.DEBUG) {
          console.log(`[cssOnDemand] Skipping non-JS/TS file: ${id}`);
        }
        return null;
      }

      // 只在启用 CSS on-demand 时处理
      if (!option.build?.cssOnDemand) {
        if (process.env.DEBUG) {
          console.log(`[cssOnDemand] CSS on-demand disabled for: ${id}`);
        }
        return null;
      }

      if (process.env.DEBUG) {
        console.log(
          `[cssOnDemand] Processing file: ${id}, cssOnDemand enabled: ${option.build?.cssOnDemand}`,
        );
      }

      // 匹配 CSS 导入语句的正则表达式，排除虚拟模块
      const staticCssImportRegex =
        /import\s+['"]([^'"]+\.css(?:\?[^'"]*)?)['"]\s*;?/g;
      const dynamicCssImportRegex =
        /import\s*\(\s*['"]([^'"]+\.css(?:\?[^'"]*)?)['"]\s*\)/g;

      let hasReplacement = false;
      let transformedCode = code;

      try {
        // 处理CSS导入的内部函数
        const processCssImport = async (
          cssPath: string,
          match: string,
          isDynamic = false,
        ) => {
          try {
            // 跳过虚拟模块（如 virtual:uno.css）
            if (cssPath.startsWith('virtual:')) {
              if (process.env.DEBUG) {
                console.log(
                  `[cssOnDemand] Skipping virtual module: ${cssPath}`,
                );
              }
              return match; // 保持原样，不处理虚拟模块
            }

            // 解析 CSS 文件路径
            const resolveResult = await this.resolve(cssPath, id);
            if (!resolveResult) {
              this.warn(`Cannot resolve CSS file: ${cssPath} in ${id}`);
              return match; // 保持原样
            }

            // 记录需要按需处理的 CSS 文件
            processedCssFiles.add(resolveResult.id);

            // 创建一个占位符，在 generateBundle 阶段替换为实际的注入代码
            const placeholder = `__CSS_ON_DEMAND_${Buffer.from(resolveResult.id).toString('base64').replace(/[+=]/g, '_')}__`;
            cssModuleMapping.set(placeholder, resolveResult.id);

            if (process.env.DEBUG) {
              console.log(
                `[cssOnDemand] Marking CSS for on-demand injection: ${cssPath} -> ${resolveResult.id}`,
              );
            }

            // 根据是否为动态导入返回不同的代码格式
            if (isDynamic) {
              // 对于动态导入，直接在transform阶段处理CSS并返回Promise
              try {
                const fs = await import('fs/promises');
                const rawCss = await fs.readFile(resolveResult.id, 'utf-8');

                // 尝试获取 Vite 的 CSS 处理配置
                const postcssConfig = viteConfig?.css?.postcss;
                let processedCss = rawCss;

                if (postcssConfig && postcssConfig.plugins) {
                  // 手动运行 PostCSS
                  try {
                    let postcssProcessor: any = null;
                    try {
                      const Module = await import('module');
                      const createRequire = Module.createRequire;
                      if (createRequire) {
                        const require = createRequire(
                          __filename || process.cwd() + '/index.js',
                        );
                        postcssProcessor = require('postcss');
                      }
                    } catch {
                      try {
                        // @ts-ignore
                        postcssProcessor = (await import('postcss')).default;
                      } catch {
                        console.warn(
                          '[cssOnDemand] PostCSS not available for dynamic import, using raw CSS',
                        );
                      }
                    }

                    if (postcssProcessor) {
                      const processor = postcssProcessor(postcssConfig.plugins);
                      const result = await processor.process(rawCss, {
                        from: resolveResult.id,
                        to: undefined,
                      });
                      processedCss = result.css;

                      if (process.env.DEBUG) {
                        console.log(
                          `[cssOnDemand] PostCSS processed dynamic import ${cssPath}: ${rawCss.length} -> ${processedCss.length} bytes`,
                        );
                      }
                    }
                  } catch (postcssError) {
                    console.warn(
                      `[cssOnDemand] PostCSS processing failed for dynamic import ${cssPath}:`,
                      postcssError,
                    );
                    processedCss = rawCss;
                  }
                }

                // 对于动态导入，直接返回Promise并立即注入CSS
                return `Promise.resolve().then(() => { ${await option.cssSideEffects(processedCss)} })`;
              } catch (error) {
                this.warn(
                  `[cssOnDemand] Failed to process dynamic CSS import ${cssPath}: ${error}`,
                );
                return `Promise.resolve()`;
              }
            } else {
              // 对于静态导入，包装为立即执行函数，使用占位符在generateBundle中处理
              return `(function() { ${placeholder} })();`;
            }
          } catch (error) {
            this.error(
              `Error processing CSS file ${cssPath} in ${id}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
            return match; // 保持原样
          }
        };

        // 处理静态 CSS 导入
        transformedCode = await this.replaceAsync(
          transformedCode,
          staticCssImportRegex,
          async (match, cssPath) => {
            hasReplacement = true;
            return processCssImport(cssPath, match, false);
          },
        );

        // 处理动态 CSS 导入
        transformedCode = await this.replaceAsync(
          transformedCode,
          dynamicCssImportRegex,
          async (match, cssPath) => {
            hasReplacement = true;
            if (process.env.DEBUG) {
              console.log(
                `[cssOnDemand] Processing dynamic import: ${match} in ${id}`,
              );
            }
            return processCssImport(cssPath, match, true);
          },
        );

        if (hasReplacement) {
          if (process.env.DEBUG) {
            console.log(`[cssOnDemand] Transformed CSS imports in: ${id}`);
          }
          return {
            code: transformedCode,
            map: null, // 可以考虑生成 source map
          };
        }

        return null;
      } catch (error) {
        this.error(
          `Error transforming CSS imports in ${id}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    },

    async generateBundle(_options, bundle) {
      if (!option.build?.cssOnDemand || cssModuleMapping.size === 0) {
        return;
      }

      // 收集所有CSS assets
      const cssContents = new Map<string, string>();

      Object.entries(bundle).forEach(([fileName, file]) => {
        if (file.type === 'asset' && fileName.endsWith('.css')) {
          const cssContent = file.source.toString();
          cssContents.set(fileName, cssContent);

          if (process.env.DEBUG) {
            console.log(
              `[cssOnDemand] Found CSS bundle: ${fileName}, length: ${cssContent.length}`,
            );
          }
        }
      });

      // 处理所有的 JavaScript chunk，替换 CSS 占位符
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'chunk') {
          let modified = false;
          let code = file.code;

          // 为每个占位符生成注入代码
          for (const [placeholder, cssFilePath] of Array.from(
            cssModuleMapping,
          )) {
            if (code.includes(placeholder)) {
              let cssContent = '';

              // 首先尝试从缓存获取
              if (cssContentCache.has(cssFilePath)) {
                cssContent = cssContentCache.get(cssFilePath)!;
                if (process.env.DEBUG) {
                  console.log(
                    `[cssOnDemand] Using cached processed CSS for ${cssFilePath}, length: ${cssContent.length}`,
                  );
                }
              } else {
                // 手动处理 CSS 文件通过 PostCSS
                try {
                  const fs = await import('fs/promises');
                  const rawCss = await fs.readFile(cssFilePath, 'utf-8');

                  // 尝试获取 Vite 的 CSS 处理配置
                  const postcssConfig = viteConfig?.css?.postcss;

                  if (process.env.DEBUG) {
                    console.log(`[cssOnDemand] PostCSS config:`, postcssConfig);
                  }

                  if (postcssConfig && postcssConfig.plugins) {
                    // 手动运行 PostCSS
                    try {
                      // 尝试动态加载 postcss - 它应该作为 Vite 的依赖存在
                      let postcssProcessor: any = null;
                      try {
                        // 尝试从 node_modules 中加载
                        const Module = await import('module');
                        const createRequire = Module.createRequire;
                        if (createRequire) {
                          const require = createRequire(
                            __filename || process.cwd() + '/index.js',
                          );
                          postcssProcessor = require('postcss');
                        }
                      } catch {
                        try {
                          // 尝试直接 import
                          // @ts-ignore
                          postcssProcessor = (await import('postcss')).default;
                        } catch {
                          console.warn(
                            '[cssOnDemand] PostCSS not available, using raw CSS',
                          );
                        }
                      }

                      if (postcssProcessor) {
                        const processor = postcssProcessor(
                          postcssConfig.plugins,
                        );
                        const result = await processor.process(rawCss, {
                          from: cssFilePath,
                          to: undefined,
                        });
                        cssContent = result.css;

                        if (process.env.DEBUG) {
                          console.log(
                            `[cssOnDemand] PostCSS processed ${cssFilePath}: ${rawCss.length} -> ${cssContent.length} bytes`,
                          );
                        }
                      } else {
                        cssContent = rawCss;
                      }
                    } catch (postcssError) {
                      console.warn(
                        `[cssOnDemand] PostCSS processing failed for ${cssFilePath}:`,
                        postcssError,
                      );
                      cssContent = rawCss;
                    }
                  } else {
                    cssContent = rawCss;
                  }

                  // 缓存处理后的CSS内容
                  cssContentCache.set(cssFilePath, cssContent);
                } catch (error) {
                  this.warn(
                    `[plugin monkey:cssOnDemand] Could not process CSS file ${cssFilePath}: ${error}`,
                  );
                  cssContent = '';
                }
              }

              if (cssContent) {
                // 生成 CSS 注入代码使用 cssSideEffects
                const injectCode = await option.cssSideEffects(cssContent);

                // 替换占位符
                code = code.replace(placeholder, injectCode);
                modified = true;

                if (process.env.DEBUG) {
                  console.log(
                    `[cssOnDemand] Replaced placeholder for ${cssFilePath} in ${fileName}`,
                  );
                }
              } else {
                this.warn(
                  `[plugin monkey:cssOnDemand] Could not find CSS content for ${cssFilePath}`,
                );
                // 移除空的占位符
                code = code.replace(placeholder, '');
                modified = true;
              }
            }
          }

          if (modified) {
            file.code = code;
          }
        }
      }

      // 导出处理过的 CSS 文件集合
      (option.build as any).processedCssFiles = processedCssFiles;
    },

    // 导出处理过的 CSS 文件集合，供其他插件使用
    buildEnd() {
      if (!option.build) {
        option.build = {} as any;
      }
      (option.build as any).processedCssFiles = processedCssFiles;
    },
  };
};
