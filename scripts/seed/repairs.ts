import { seedPublications } from './publications.seed.ts';
import type { Publication } from '../../src/lib/publications';

type Doc = { id: string; uid: string | null; lang: string; data: Record<string, any> };

/** Published documents cannot be updated through the Migration API, so a replacement gets a new UID. */
export const replacementUid = (seedId: string, lang: string) => `${seedId}-${lang.slice(0, 2)}`;

const hasTitle = (d: Doc) => typeof d.data.title === 'string' && d.data.title.trim().length > 0;

/**
 * Finds published `publication` documents left empty by an interrupted import and plans a replacement
 * document (new UID) for each, unless a complete replacement already exists in the same locale.
 */
export function planRepairs(input: { publications: Doc[] }) {
  const seedById = new Map<string, Publication>(seedPublications.map((p) => [p.id, p]));
  const complete = new Set(input.publications.filter(hasTitle).map((d) => `${d.lang}:${d.uid}`));

  return input.publications.flatMap((doc) => {
    const seed = doc.uid ? seedById.get(doc.uid) : undefined;
    if (!seed || hasTitle(doc)) return [];
    const newUid = replacementUid(seed.id, doc.lang);
    return complete.has(`${doc.lang}:${newUid}`) ? [] : [{ doc, seed, lang: doc.lang, newUid }];
  });
}
