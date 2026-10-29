import assert from 'node:assert/strict';
import http from 'node:http';
import { test as base, expect } from 'playwright/test';
import type { Page } from 'playwright/test';
import type { Rolldown } from 'vite';
import { createDisposables, createTestProject } from './project.ts';
import type { Disposables, TestArtifacts, TestProject } from './project.ts';
export type { TestProject } from './project.ts';
export { expect };

export interface BrowserDiagnostics {
  errors: string[];
  requests: string[];
  logs: string[];
  failedRequests: string[];
}
export interface UserscriptManager {
  installDevelopment(
    installer: string,
    options?: { gmValues?: Record<string, unknown> },
  ): Promise<void>;
  runBuilt(
    script: Rolldown.OutputChunk,
    output: Rolldown.OutputBundle[string][],
    options?: { resourceFormat?: 'data' | 'blob'; missingResource?: boolean },
  ): Promise<{ calls(): Promise<string[]> }>;
}
export interface BrowserFixtures {
  page: Page;
  project: TestProject;
  host: string;
  diagnostics: BrowserDiagnostics;
  userscript: UserscriptManager;
  disposables: Disposables;
  artifacts: TestArtifacts;
}
export const test = base.extend<BrowserFixtures>({
  disposables: async ({ page, artifacts }, use) => {
    // Depending on page keeps it alive while Worker handles and blob URLs close.
    void page;
    void artifacts;
    const disposables = createDisposables();
    try {
      await use(disposables);
    } finally {
      await disposables.close();
    }
  },
  // Outlives the resources so teardown failures retain generated code too.
  // eslint-disable-next-line no-empty-pattern
  artifacts: async ({}, use, testInfo) => {
    const artifacts: TestArtifacts = new Map();
    try {
      await use(artifacts);
    } finally {
      if (testInfo.status !== testInfo.expectedStatus) {
        for (const [name, source] of artifacts) {
          await testInfo.attach(name, {
            body: Buffer.from(source),
            contentType: name.endsWith('.js')
              ? 'text/javascript'
              : 'application/octet-stream',
          });
        }
      }
    }
  },
  project: async ({ disposables, artifacts }, use) => {
    await use(await createTestProject(disposables, artifacts));
  },
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const diagnostics: BrowserDiagnostics = {
        errors: [],
        requests: [],
        logs: [],
        failedRequests: [],
      };
      page.on('pageerror', (error) =>
        diagnostics.errors.push(error.stack ?? error.message),
      );
      page.on('request', (request) => diagnostics.requests.push(request.url()));
      page.on('requestfailed', (request) =>
        diagnostics.failedRequests.push(
          request.url() + ': ' + request.failure()?.errorText,
        ),
      );
      page.on('console', (message) =>
        diagnostics.logs.push('[' + message.type() + '] ' + message.text()),
      );
      try {
        await use(diagnostics);
      } finally {
        if (testInfo.status !== testInfo.expectedStatus)
          await testInfo.attach('browser-diagnostics.json', {
            body: JSON.stringify(diagnostics, null, 2),
            contentType: 'application/json',
          });
      }
    },
    { auto: true },
  ],
  host: async ({ page, diagnostics, disposables }, use) => {
    void diagnostics;
    const server = http.createServer((_request, response) => {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(
        '<!doctype html><html><head><title>Userscript test host</title></head><body></body></html>',
      );
    });
    disposables.defer(
      () =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
          server.closeAllConnections();
        }),
    );
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    const origin = 'http://127.0.0.1:' + address.port;
    await page.goto(origin);
    await use(origin);
  },
  userscript: async ({ page, host, project, disposables }, use) => {
    void host;
    await use({
      async installDevelopment(installer, { gmValues = {} } = {}) {
        project.artifacts.set('development.install.user.js', installer);
        const inject = ({
          installer,
          gmValues,
        }: {
          installer: string;
          gmValues: Record<string, unknown>;
        }) => {
          const run = () =>
            new Function('window', installer)({
              GM: {},
              GM_getValue: (key: string, fallback?: unknown) =>
                Object.hasOwn(gmValues, key) ? gmValues[key] : fallback,
            });
          if (document.readyState === 'loading')
            document.addEventListener('DOMContentLoaded', run, { once: true });
          else run();
        };
        await page.addInitScript(inject, { installer, gmValues });
        await page.evaluate(inject, { installer, gmValues });
      },
      async runBuilt(
        script,
        output,
        { resourceFormat = 'blob', missingResource = false } = {},
      ) {
        const resources: Record<string, string> = {};
        const files = new Map(output.map((item) => [item.fileName, item]));
        const entries = script.code.matchAll(
          /^\/\/ @resource\s+(\S+)\s+(\S+)/gm,
        );
        for (const [, name] of entries) {
          const item = files.get(name);
          assert.ok(item, 'Missing emitted resource: ' + name);
          resources[name] = Buffer.from(
            item.type === 'chunk' ? item.code : item.source,
          ).toString('base64');
        }
        const manager = await page.evaluateHandle(
          ({ code, resources, resourceFormat, missingResource }) => {
            const calls: string[] = [];
            const urls: string[] = [];
            function GM_getResourceURL(name: string) {
              calls.push(name);
              if (missingResource || !Object.hasOwn(resources, name))
                throw new Error('Missing fixture resource: ' + name);
              if (resourceFormat === 'data')
                return 'data:application;base64,' + resources[name];
              const bytes = Uint8Array.from(atob(resources[name]), (char) =>
                char.charCodeAt(0),
              );
              const url = URL.createObjectURL(
                new Blob([bytes], { type: 'application/octet-stream' }),
              );
              urls.push(url);
              return url;
            }
            // GM APIs are lexical userscript globals, not properties of the host page.
            new Function('GM_getResourceURL', code)(GM_getResourceURL);
            return {
              calls: () => [...calls],
              close: () => urls.forEach((url) => URL.revokeObjectURL(url)),
            };
          },
          { code: script.code, resources, resourceFormat, missingResource },
        );
        disposables.defer(async () => {
          await manager.evaluate((manager) => manager.close());
          await manager.dispose();
        });
        return { calls: () => manager.evaluate((manager) => manager.calls()) };
      },
    });
  },
});
