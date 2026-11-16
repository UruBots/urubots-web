import { describe, it, expect } from 'vitest';
import { pressItems, LOCALES } from './press.seed';
import { youtubeEmbedUrl } from '../../src/lib/youtube';

describe('press seed', () => {
  it('has the 8 readable items of the PRENSA list', () => {
    expect(pressItems).toHaveLength(8);
  });

  it('ids are unique, lowercase and UID-safe', () => {
    const ids = pressItems.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it('dates are real ISO dates in 2026-06..2026-08', () => {
    for (const p of pressItems) {
      expect(p.date, p.id).toMatch(/^2026-0[6-8]-\d{2}$/);
      expect(Number.isNaN(Date.parse(p.date)), p.id).toBe(false);
    }
  });

  it('uses the date shown by the article for Montevideo Portal, not the PDF one', () => {
    expect(pressItems.find((p) => p.outlet === 'Montevideo Portal')?.date).toBe('2026-08-13');
  });

  it('every item has an original headline and title, summary and button label in the 3 locales', () => {
    for (const p of pressItems) {
      expect(p.headline.length, p.id).toBeGreaterThan(10);
      for (const l of LOCALES) {
        expect(p.title[l].length, `${p.id} title ${l}`).toBeGreaterThan(10);
        expect(p.summary[l].length, `${p.id} summary ${l}`).toBeGreaterThan(40);
        expect(p.sourceLabel[l].length, `${p.id} label ${l}`).toBeGreaterThan(3);
      }
      expect(p.summary['en-us'], p.id).not.toBe(p.summary['es-ar']);
      expect(p.summary['pt-br'], p.id).not.toBe(p.summary['es-ar']);
    }
  });

  it('every item links to its source; YouTube items also embed', () => {
    for (const p of pressItems) {
      expect(p.url, p.id).toMatch(/^https:\/\//);
      if (p.kind === 'video') expect(youtubeEmbedUrl(p.videoUrl), p.id).not.toBeNull();
      else expect(p.videoUrl, p.id).toBeNull();
    }
  });

  it('every item has a cover image with https url, credit and alt text', () => {
    for (const p of pressItems) {
      expect(p.image, p.id).not.toBeNull();
      expect(p.image!.url, p.id).toMatch(/^https:\/\//);
      expect(p.image!.credit.length, p.id).toBeGreaterThan(2);
      expect(p.image!.alt.length, p.id).toBeGreaterThan(5);
    }
  });

  it('uses a photo already hosted in Prismic for the Diario NORTE posts (no outlet image available)', () => {
    const norte = pressItems.filter((p) => p.outlet === 'Diario NORTE');
    expect(norte).toHaveLength(2);
    for (const p of norte) expect(p.image!.url, p.id).toMatch(/^https:\/\/images\.prismic\.io\/urubots\//);
  });

  it('does not repeat the facts that outlets got wrong', () => {
    const all = JSON.stringify(pressItems).toLowerCase();
    expect(all).not.toContain('16 equipos');
    expect(all).not.toContain('de junio');
    expect(all).not.toContain('tres vehículos');
  });
});
