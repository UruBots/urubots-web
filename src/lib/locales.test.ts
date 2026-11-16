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
