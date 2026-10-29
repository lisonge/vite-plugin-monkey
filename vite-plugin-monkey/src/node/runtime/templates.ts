import type { MonkeyWindow } from '../../client/types/_context.ts';
import type { SandboxDocument } from '../../shared/sandbox.ts';
interface TrustedScriptUrl {
  toString(): string;
}
interface TrustedTypesWindow {
  trustedTypes?: {
    createPolicy(
      name: string,
      rules: { createScriptURL(input: string): string },
    ): {
      createScriptURL(input: string): TrustedScriptUrl;
    };
  };
}
import { stringifyFunction } from '../utils/others.ts';

const htmlText = /* html */ `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://vite.dev/logo.svg" />
    <title>Vite</title>
  </head>
  <script type="module" data-source="vite-plugin-monkey">
  __CODE__
  </script>
</html>
`.trimStart();

export const fcToHtml = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  ...args: NoInfer<Args>
) => {
  return htmlText.replace(`__CODE__`, stringifyFunction(fn, ...args));
};

export const serverInjectFn = (
  entrySrc: string,
  key: string,
  version: number,
  project: string,
) => {
  const sandbox = window as MonkeyWindow & TrustedTypesWindow;
  void sandbox.GM; // must exist, see Tampermonkey/tampermonkey#1567

  (document as SandboxDocument)[key] = { version, project, sandbox };

  // GM_addElement is not wokring, see #254
  const script = document.createElement('script');
  script.type = 'module';
  if (sandbox.trustedTypes) {
    const policy = sandbox.trustedTypes.createPolicy(key, {
      createScriptURL: (input: string) => input,
    });
    // lib.dom types src as string; browsers also accept TrustedScriptURL.
    script.src = policy.createScriptURL(entrySrc) as string;
  } else {
    script.src = entrySrc;
  }
  // see #262
  // document.head may be null when run-at document-start
  (document.head || document.documentElement).append(script);
};

export const installationTemplate = async (
  urls: string[],
  development = false,
) => {
  const links = urls
    .map((url) => {
      const target = new URL(url, location.origin);
      if (development) target.searchParams.set('origin', target.origin);
      return target.href;
    })
    .sort();
  if (window === window.parent && links.length === 1) {
    location.href = links[0];
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    window.close();
    return;
  }
  const style = document.createElement('style');
  document.head.append(style);
  style.innerText = /* css */ `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
  }
  .App {
    margin: 25px;
  }
  p {
    font-size: 1.5em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.5em;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  a {
    color: blue;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`.trim();
  if (links.length === 0) {
    document.body.innerHTML = /* html */ `
    <div class="App">
      <h1> There is no script to install </h1>
    </div>
    `.trim();
    return;
  }
  document.body.innerHTML = /* html */ `
    <div class="App">
      <h1>PREVIEW PAGE</h1>
      <p>Click the links below to install userscripts:</p>
      <table>
        <tr>
          <th>No.</th>
          <th>Install Link</th>
        </tr>
      </table>
    </div>
    `.trim();
  const table = document.querySelector('table')!;
  links.forEach((url, index) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const a = document.createElement('a');
    td1.innerText = `${index + 1}`;
    if (window !== window.parent) a.target = '_blank';
    a.href = url;
    a.textContent = url;
    td2.append(a);
    tr.append(td1, td2);
    table.append(tr);
  });
};
