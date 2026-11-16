import { seedPublications } from './publications.seed.ts';
import { pressItems } from './press.seed.ts';
import type { Publication } from '../../src/lib/publications';
import type { PressItem } from './press.seed.ts';

type Doc = { id: string; uid: string | null; lang: string; data: Record<string, any> };

/** Finds published documents created by an interrupted import (empty shells) or missing their cover image. */
export function planRepairs(input: { publications: Doc[]; pressPosts: Doc[] }) {
  const pubById = new Map<string, Publication>(seedPublications.map((p) => [p.id, p]));
  const pressById = new Map<string, PressItem>(pressItems.map((p) => [p.id, p]));

  const publications = input.publications.flatMap((doc) => {
    const seed = doc.uid ? pubById.get(doc.uid) : undefined;
    return seed && !doc.data.title ? [{ doc, seed, lang: doc.lang }] : [];
  });
  const press = input.pressPosts.flatMap((doc) => {
    const item = doc.uid ? pressById.get(doc.uid) : undefined;
    return item && !doc.data.image?.url ? [{ doc, item, lang: doc.lang }] : [];
  });
  return { publications, press };
}
