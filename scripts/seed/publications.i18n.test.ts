import { describe, it, expect } from 'vitest';
import { seedPublications } from './publications.seed';
import { summaryTranslations } from './publications.i18n';
import { toPrismicDocument } from './toPrismic';

describe('publication translations', () => {
  it('covers every seed publication in es-ar and pt-br with a different text', () => {
    for (const p of seedPublications) {
      const t = summaryTranslations[p.id];
      expect(t, p.id).toBeDefined();
      for (const lang of ['es-ar', 'pt-br'] as const) {
        expect(t[lang].length, `${p.id} ${lang}`).toBeGreaterThan(20);
        expect(t[lang], `${p.id} ${lang}`).not.toBe(p.summary);
      }
    }
  });

  it('has no translations for unknown ids', () => {
    const ids = new Set(seedPublications.map((p) => p.id));
    for (const id of Object.keys(summaryTranslations)) expect(ids.has(id), id).toBe(true);
  });

  it('builds a localized document with the translated summary and the same UID', () => {
    const p = seedPublications[0];
    const doc = toPrismicDocument(p, 'es-ar');
    expect(doc.lang).toBe('es-ar');
    expect(doc.uid).toBe(p.id);
    expect(doc.data.summary).toBe(summaryTranslations[p.id]['es-ar']);
    expect(doc.data.title).toBe(p.title);
    expect(toPrismicDocument(p).data.summary).toBe(p.summary);
  });
});
