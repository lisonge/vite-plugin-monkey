import spawn from 'cross-spawn';
import { execSync } from 'node:child_process';
import path from 'node:path';
import type { Options } from 'open';
import colors from 'picocolors';
import type { Logger } from './_logger';
import { compatResolve } from './_util';

// https://github.com/sindresorhus/open#app
const OSX_CHROME = 'google chrome';

/**
 * Reads the BROWSER environment variable and decides what to do with it.
 * Returns true if it opened a browser or ran a node.js script, otherwise false.
 */
export function openBrowser(
  url: string,
  opt: string | true,
  logger: Logger,
): boolean {
  // The browser executable to open.
  // See https://github.com/sindresorhus/open#app for documentation.
  const browser = typeof opt === 'string' ? opt : process.env.BROWSER || '';
  if (browser.toLowerCase().endsWith('.js')) {
    return executeNodeScript(browser, url, logger);
  } else if (browser.toLowerCase() !== 'none') {
    return startBrowserProcess(browser, url);
  }
  return false;
}

function executeNodeScript(scriptPath: string, url: string, logger: Logger) {
  const extraArgs = process.argv.slice(2);
  const child = spawn(process.execPath, [scriptPath, ...extraArgs, url], {
    stdio: 'inherit',
  });
  child.on('close', (code: unknown) => {
    if (code !== 0) {
      logger.error(
        colors.red(
          `\nThe script specified as BROWSER environment variable failed.\n\n${colors.cyan(
            scriptPath,
          )} exited with code ${code}.`,
        ),
        { time: true },
      );
    }
  });
  return true;
}

function startBrowserProcess(browser: string | undefined, url: string) {
  // If we're on OS X, the user hasn't specifically
  // requested a different browser, we can try opening
  // Chrome with AppleScript. This lets us reuse an
  // existing tab when possible instead of creating a new one.
  const shouldTryOpenChromeWithAppleScript =
    process.platform === 'darwin' && (browser === '' || browser === OSX_CHROME);

  if (shouldTryOpenChromeWithAppleScript) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
        cwd: path.dirname(compatResolve('vite/bin/openChrome.applescript')),
        stdio: 'ignore',
      });
      return true;
    } catch {
      // Ignore errors
    }
  }

  // Another special case: on OS X, check if BROWSER has been set to "open".
  // In this case, instead of passing the string `open` to `open` function (which won't work),
  // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
  // https://github.com/facebook/create-react-app/pull/1690#issuecomment-283518768
  if (process.platform === 'darwin' && browser === 'open') {
    browser = undefined;
  }

  // Fallback to open
  // (It will always open new tab)
  try {
    const options: Options = browser ? { app: { name: browser } } : {};
    // open is esm only, cjs need
    import('open').then(({ default: open }) => {
      open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
    });
    return true;
  } catch {
    return false;
  }
}
