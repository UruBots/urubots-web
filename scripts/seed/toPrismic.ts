import type { Publication } from '../../src/lib/publications';
import { summaryTranslations, type Lang } from './publications.i18n.ts';

const link = (url: string | null) => (url ? { link_type: 'Web', url } : { link_type: 'Any' });

/** Builds the Migration API payload for a `publication` document (English master copy). */
export function toPrismicDocument(p: Publication, lang: 'en-us' | Lang = 'en-us') {
  return {
    type: 'publication' as const,
    lang,
    uid: p.id,
    data: {
      title: p.title,
      kind: p.kind,
      year: p.year,
      authors: p.authors.join('; '),
      venue: p.venue ?? '',
      status: p.status,
      summary: lang === 'en-us' ? p.summary : summaryTranslations[p.id][lang],
      arxiv: p.arxiv ?? '',
      doi: link(p.doi),
      pdf: link(p.pdf !== (p.arxiv ? `https://arxiv.org/pdf/${p.arxiv}` : null) ? p.pdf : null),
      bibtex_key: p.bibtexKey ?? '',
    },
  };
}
