export const LOCALES = ['en-us', 'es-ar', 'pt-br'] as const;
export const DEFAULT_LOCALE = 'en-us';

export function hasLocalePrefix(pathname: string): boolean {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

/** Prismic omits the locale for the master language (es-ar); the site now needs it explicit. */
export function ensureLocalePrefix(path: string, lang: string): string {
  if (hasLocalePrefix(path)) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** True when the middleware should prefix the default locale: page paths only, never files or internals. */
export function shouldLocalize(pathname: string): boolean {
  if (hasLocalePrefix(pathname)) return false;
  if (/\.[^/]+$/.test(pathname)) return false; // any file with an extension (public/ assets)
  return !/^\/(api|_next)(\/|$)/.test(pathname);
}
