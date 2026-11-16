import type { Publication } from '../../src/lib/publications';

const link = (url: string | null) => (url ? { link_type: 'Web', url } : { link_type: 'Any' });

/** Builds the Migration API payload for a `publication` document (English master copy). */
export function toPrismicDocument(p: Publication) {
  return {
    type: 'publication' as const,
    lang: 'en-us',
    uid: p.id,
    data: {
      title: p.title,
      kind: p.kind,
      year: p.year,
      authors: p.authors.join('; '),
      venue: p.venue ?? '',
      status: p.status,
      summary: p.summary,
      arxiv: p.arxiv ?? '',
      doi: link(p.doi),
      pdf: link(p.pdf !== (p.arxiv ? `https://arxiv.org/pdf/${p.arxiv}` : null) ? p.pdf : null),
      bibtex_key: p.bibtexKey ?? '',
    },
  };
}
