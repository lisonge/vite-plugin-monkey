export const safeURL = (
  url: string | URL | undefined | null,
  base?: string | URL,
): URL | undefined => {
  if (!url) return undefined;
  try {
    return new URL(url, base);
  } catch {}
};
