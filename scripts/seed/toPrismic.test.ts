import { describe, it, expect } from 'vitest';
import { fromPrismic } from '../../src/lib/publications';
import { seedPublications } from './publications.seed';
import { toPrismicDocument } from './toPrismic';

describe('toPrismicDocument', () => {
  it('round-trips every seed publication through the Prismic shape', () => {
    for (const p of seedPublications) {
      const doc = toPrismicDocument(p);
      expect(doc.type).toBe('publication');
      expect(doc.lang).toBe('en-us');
      expect(doc.uid).toBe(p.id);
      expect(fromPrismic({ uid: doc.uid, data: doc.data as any }), p.id).toEqual(p);
    }
  });

  it('uses empty Prismic link objects for missing links', () => {
    const p = seedPublications.find((x) => x.doi === null && x.pdf === null) ?? { ...seedPublications[0], doi: null, pdf: null };
    const { data } = toPrismicDocument({ ...p, doi: null, pdf: null, arxiv: null });
    expect(data.doi).toEqual({ link_type: 'Any' });
    expect(data.pdf).toEqual({ link_type: 'Any' });
  });
});
