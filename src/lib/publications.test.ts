import { describe, it, expect } from 'vitest';
import { fromPrismic } from './publications';

const doc = (data: Record<string, unknown>, uid = 'arxiv-2410.07209') =>
  ({ id: 'X', uid, type: 'publication', lang: 'en-us', data }) as any;

const full = {
  title: 'Behavior Cloning for Mini Autonomous Car Path Following',
  kind: 'paper',
  year: 2024,
  authors: 'Pablo Moraes; Hiago Sodre ;Ricardo Bedin Grando',
  venue: '2024 IEEE URUCON (Montevideo), pp. 1-5',
  status: 'published',
  summary: 'Applies behavior cloning.',
  arxiv: '2410.07209',
  doi: { link_type: 'Web', url: 'https://doi.org/10.1109/URUCON63440.2024.10850290' },
  pdf: { link_type: 'Web', url: 'https://arxiv.org/pdf/2410.07209' },
  bibtex_key: 'moraes2024behaviorcloning',
};

describe('fromPrismic', () => {
  it('maps a full document', () => {
    expect(fromPrismic(doc(full))).toEqual({
      id: 'arxiv-2410.07209',
      kind: 'paper',
      year: 2024,
      title: 'Behavior Cloning for Mini Autonomous Car Path Following',
      authors: ['Pablo Moraes', 'Hiago Sodre', 'Ricardo Bedin Grando'],
      venue: '2024 IEEE URUCON (Montevideo), pp. 1-5',
      status: 'published',
      summary: 'Applies behavior cloning.',
      arxiv: '2410.07209',
      doi: 'https://doi.org/10.1109/URUCON63440.2024.10850290',
      pdf: 'https://arxiv.org/pdf/2410.07209',
      bibtexKey: 'moraes2024behaviorcloning',
    });
  });

  it('turns empty fields into null, never empty strings', () => {
    const p = fromPrismic(
      doc({ ...full, venue: null, doi: { link_type: 'Any' }, pdf: { link_type: 'Any' }, arxiv: '', bibtex_key: null }),
    );
    expect(p.venue).toBeNull();
    expect(p.doi).toBeNull();
    expect(p.pdf).toBeNull();
    expect(p.arxiv).toBeNull();
    expect(p.bibtexKey).toBeNull();
  });

  it('falls back to the arxiv pdf url when pdf is empty', () => {
    expect(fromPrismic(doc({ ...full, pdf: { link_type: 'Any' } })).pdf).toBe('https://arxiv.org/pdf/2410.07209');
  });

  it('defaults kind to paper and status to preprint when missing', () => {
    const p = fromPrismic(doc({ ...full, kind: null, status: null }));
    expect(p.kind).toBe('paper');
    expect(p.status).toBe('preprint');
  });

  it('ignores blank author entries', () => {
    expect(fromPrismic(doc({ ...full, authors: 'A; ; B;' })).authors).toEqual(['A', 'B']);
  });
});
