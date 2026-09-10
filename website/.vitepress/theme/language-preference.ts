export type WebsiteLocale = 'en' | 'zh';

export const languagePreferenceKey = 'vite-plugin-monkey-language';

export function localeFromLanguageTag(
  language: string | null | undefined,
): WebsiteLocale | null {
  const primaryLanguage = language?.trim().toLowerCase().split(/[-_]/u)[0];

  if (primaryLanguage === 'en' || primaryLanguage === 'zh') {
    return primaryLanguage;
  }

  return null;
}

export function resolvePreferredLocale(
  storedLocale: string | null,
  browserLanguages: readonly string[],
): WebsiteLocale {
  if (storedLocale === 'en' || storedLocale === 'zh') {
    return storedLocale;
  }

  for (const language of browserLanguages) {
    const locale = localeFromLanguageTag(language);
    if (locale !== null) return locale;
  }

  return 'en';
}

export function localeFromSitePath(sitePath: string): WebsiteLocale {
  return sitePath === '/zh' || sitePath.startsWith('/zh/') ? 'zh' : 'en';
}

export function localizeSitePath(
  sitePath: string,
  targetLocale: WebsiteLocale,
): string {
  const normalizedPath = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;

  if (targetLocale === 'zh') {
    if (localeFromSitePath(normalizedPath) === 'zh') return normalizedPath;
    return normalizedPath === '/' ? '/zh/' : `/zh${normalizedPath}`;
  }

  if (normalizedPath === '/zh' || normalizedPath === '/zh/') return '/';
  if (normalizedPath.startsWith('/zh/')) {
    return normalizedPath.slice('/zh'.length);
  }
  return normalizedPath;
}

export function removeBase(pathname: string, base: string): string | null {
  const normalizedPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`;
  const normalizedBase = normalizeBase(base);

  if (normalizedBase === '/') return normalizedPathname;

  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);
  if (normalizedPathname === baseWithoutTrailingSlash) return '/';
  if (!normalizedPathname.startsWith(normalizedBase)) return null;

  return `/${normalizedPathname.slice(normalizedBase.length)}`;
}

export function applyBase(sitePath: string, base: string): string {
  const normalizedPath = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;
  const normalizedBase = normalizeBase(base);

  if (normalizedBase === '/') return normalizedPath;
  return `${normalizedBase.slice(0, -1)}${normalizedPath}`;
}

function normalizeBase(base: string): string {
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}
