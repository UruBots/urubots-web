export type PublicationKind = 'paper' | 'tdp';

export interface Publication {
  /** Unique slug, e.g. "arxiv-2411.05011" or "doi-10.1007-978-981-95-2379-5_7". */
  id: string;
  kind: PublicationKind;
  year: number;
  title: string;
  authors: string[];
  /** null when the venue is not confirmed yet. */
  venue: string | null;
  status: 'published' | 'accepted' | 'preprint';
  summary: string;
  /** arXiv identifier, e.g. "2411.05011". */
  arxiv: string | null;
  /** Full DOI URL, only when verified. */
  doi: string | null;
  pdf: string | null;
  bibtexKey: string | null;
}

type LinkLike = { link_type?: string; url?: string } | null | undefined;

const text = (v: string | null | undefined): string | null => (v && v.trim() ? v.trim() : null);
const link = (v: LinkLike): string | null => (v && 'url' in v && v.url ? v.url : null);

/** Maps a Prismic `publication` document (see customtypes/publication) to the UI model. */
export function fromPrismic(doc: {
  uid?: string | null;
  data: Record<string, any>;
}): Publication {
  const d = doc.data;
  const arxiv = text(d.arxiv);
  return {
    id: doc.uid ?? (arxiv ? `arxiv-${arxiv}` : String(d.title)),
    kind: d.kind === 'tdp' ? 'tdp' : 'paper',
    year: Number(d.year),
    title: String(d.title ?? ''),
    authors: String(d.authors ?? '')
      .split(';')
      .map((a) => a.trim())
      .filter(Boolean),
    venue: text(d.venue),
    status: d.status === 'published' || d.status === 'accepted' ? d.status : 'preprint',
    summary: String(d.summary ?? ''),
    arxiv,
    doi: link(d.doi),
    pdf: link(d.pdf) ?? (arxiv ? `https://arxiv.org/pdf/${arxiv}` : null),
    bibtexKey: text(d.bibtex_key),
  };
}

const FALLBACK_LOCALE = 'en-us';

/** Publications for a locale, falling back to the English master copy when that locale has none. */
export async function getPublications(
  client: { getAllByType: (type: 'publication', params: { lang: string }) => Promise<any[]> },
  lang: string | undefined,
): Promise<Publication[]> {
  const wanted = lang ?? FALLBACK_LOCALE;
  // Interrupted imports can leave empty published shells (no title); they are never shown.
  const usable = (docs: any[]) => docs.filter((d) => typeof d.data?.title === 'string' && d.data.title.trim());
  let docs = usable(await client.getAllByType('publication', { lang: wanted }));
  if (docs.length === 0 && wanted !== FALLBACK_LOCALE) {
    docs = usable(await client.getAllByType('publication', { lang: FALLBACK_LOCALE }));
  }
  const seen = new Set<string>();
  return docs
    .filter((d) => {
      const key = String(d.data.title).trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(fromPrismic);
}
