import { inBrowser, type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import MermaidDiagram from './MermaidDiagram.vue';
import {
  applyBase,
  languagePreferenceKey,
  localeFromLanguageTag,
  localeFromSitePath,
  localizeSitePath,
  removeBase,
  resolvePreferredLocale,
  type WebsiteLocale,
} from './language-preference.ts';

function readStoredLocale(): string | null {
  try {
    return window.localStorage.getItem(languagePreferenceKey);
  } catch {
    return null;
  }
}

function storeLocale(locale: WebsiteLocale): void {
  try {
    window.localStorage.setItem(languagePreferenceKey, locale);
  } catch {
    // Language detection still works when storage is unavailable.
  }
}

function rememberLanguageSwitch(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest<HTMLAnchorElement>(
    'a[hreflang][rel~="alternate"]',
  );
  if (link === null) return;

  const locale = localeFromLanguageTag(link.hreflang);
  if (locale !== null) storeLocale(locale);
}

const theme: Theme = {
  extends: DefaultTheme,
  async enhanceApp({ app, siteData }) {
    app.component('MermaidDiagram', MermaidDiagram);

    if (!inBrowser) return;

    document.addEventListener('click', rememberLanguageSwitch, true);

    const sitePath = removeBase(window.location.pathname, siteData.value.base);
    if (sitePath === null) return;

    const browserLanguages =
      navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    const preferredLocale = resolvePreferredLocale(
      readStoredLocale(),
      browserLanguages,
    );
    if (localeFromSitePath(sitePath) === preferredLocale) return;

    const localizedPath = applyBase(
      localizeSitePath(sitePath, preferredLocale),
      siteData.value.base,
    );
    window.location.replace(
      `${localizedPath}${window.location.search}${window.location.hash}`,
    );

    // Do not hydrate server-rendered HTML from the previous locale while the
    // browser loads the localized page.
    await new Promise<never>(() => {});
  },
};

export default theme;
