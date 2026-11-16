import { describe, it, expect } from 'vitest';
import { DEFAULT_LOCALE, LOCALES, hasLocalePrefix, ensureLocalePrefix } from './locales';

describe('locales', () => {
  it('defaults to en-us and lists the three locales', () => {
    expect(DEFAULT_LOCALE).toBe('en-us');
    expect([...LOCALES]).toEqual(['en-us', 'es-ar', 'pt-br']);
  });

  it('hasLocalePrefix detects a leading locale segment only', () => {
    expect(hasLocalePrefix('/en-us')).toBe(true);
    expect(hasLocalePrefix('/es-ar/about')).toBe(true);
    expect(hasLocalePrefix('/about')).toBe(false);
    expect(hasLocalePrefix('/')).toBe(false);
    expect(hasLocalePrefix('/es-arx')).toBe(false);
  });

  it('ensureLocalePrefix adds the prefix Prismic omits for the master language', () => {
    expect(ensureLocalePrefix('/about', 'es-ar')).toBe('/es-ar/about');
    expect(ensureLocalePrefix('/', 'es-ar')).toBe('/es-ar');
    expect(ensureLocalePrefix('/en-us/about', 'en-us')).toBe('/en-us/about');
    expect(ensureLocalePrefix('/es-ar', 'es-ar')).toBe('/es-ar');
  });
});

import { shouldLocalize } from './locales';
import { routes } from '@/lib/prismicRoutes';

describe('shouldLocalize', () => {
  it('rewrites page paths without a locale', () => {
    expect(shouldLocalize('/')).toBe(true);
    expect(shouldLocalize('/about')).toBe(true);
  });

  it('leaves locale-prefixed paths, files and internals alone', () => {
    expect(shouldLocalize('/en-us/about')).toBe(false);
    expect(shouldLocalize('/images/athome/robot.jpg')).toBe(false);
    expect(shouldLocalize('/docs/tdp-2027.pdf')).toBe(false);
    expect(shouldLocalize('/favicon.ico')).toBe(false);
    expect(shouldLocalize('/_next/image')).toBe(false);
    expect(shouldLocalize('/api/send')).toBe(false);
  });
});

describe('prismic routes', () => {
  it('always carry an explicit locale segment', () => {
    for (const r of (routes ?? []) as { type: string; path: string }[]) expect(r.path, r.type).not.toContain(':lang?');
  });
});
