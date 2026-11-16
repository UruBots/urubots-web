import type { Publication } from '@/lib/publications';

export type PublicationFilter = 'all' | 'paper' | 'tdp';

export interface YearGroup {
  year: number;
  items: Publication[];
}

export function groupPublications(list: Publication[], filter: PublicationFilter): YearGroup[] {
  const byYear = new Map<number, Publication[]>();
  for (const p of list) {
    if (filter !== 'all' && p.kind !== filter) continue;
    byYear.set(p.year, [...(byYear.get(p.year) ?? []), p]);
  }
  return Array.from(byYear.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, items }));
}
