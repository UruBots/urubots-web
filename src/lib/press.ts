type PostLike = { first_publication_date: string; data: { publication_date?: string | null } };

/** Real date of a post: the editor-set publication_date, else the day it was first published in Prismic. */
export function postDate(doc: PostLike): string {
  return doc.data.publication_date || doc.first_publication_date.slice(0, 10);
}

/** Newest first by real date. Returns a new array. */
export function sortByPublication<T extends PostLike>(docs: T[]): T[] {
  return [...docs].sort((a, b) => postDate(b).localeCompare(postDate(a)));
}

/** "21 de julio de 2026" in the page locale; UTC so the day never shifts with the server timezone. */
export function formatPostDate(iso: string | null | undefined, lang: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return '';
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(d);
}

type ImageDoc = { uid?: string | null; lang: string; data: { image?: { url?: string | null } | null } };

/**
 * Posts of one locale; when a post has no cover image, reuse the image of the same post (same uid)
 * in another locale, so translated copies stay consistent. Returns new objects, input untouched.
 */
export function withFallbackImages<T extends ImageDoc>(all: T[], lang: string): T[] {
  const imageByUid = new Map<string, unknown>();
  for (const d of all) if (d.uid && d.data.image?.url && !imageByUid.has(d.uid)) imageByUid.set(d.uid, d.data.image);
  return all
    .filter((d) => d.lang === lang)
    .map((d) => {
      if (d.data.image?.url || !d.uid || !imageByUid.has(d.uid)) return d;
      return { ...d, data: { ...d.data, image: imageByUid.get(d.uid) } } as T;
    });
}
