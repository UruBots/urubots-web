export type Medal = 'gold' | 'silver' | 'bronze' | 'laurel';

export interface TrophyLike {
  year?: string | null;
  medal?: string | null;
}

/** Groups trophies by year, newest first; inside a year the original order is kept. Items without year are dropped. */
export function groupTrophiesByYear<T extends TrophyLike>(items: T[]): { year: string; items: T[] }[] {
  const byYear = new Map<string, T[]>();
  for (const item of items) {
    const year = item.year?.trim();
    if (!year) continue;
    byYear.set(year, [...(byYear.get(year) ?? []), item]);
  }
  return Array.from(byYear.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, list]) => ({ year, items: list }));
}

export interface MedalStyle {
  /** Tailwind color of the trophy drawing. */
  icon: string;
  card: string;
  badge: string;
  /** "cup" for podium trophies, "rosette" for overall rankings. */
  shape: 'cup' | 'rosette';
}

const STYLES: Record<Medal, MedalStyle> = {
  gold: {
    icon: 'text-amber-500',
    card: 'border-amber-300/70 bg-gradient-to-br from-amber-50 to-white dark:border-amber-400/30 dark:from-amber-400/10 dark:to-gray-900',
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200',
    shape: 'cup',
  },
  silver: {
    icon: 'text-slate-400',
    card: 'border-slate-300/80 bg-gradient-to-br from-slate-100 to-white dark:border-slate-400/30 dark:from-slate-400/10 dark:to-gray-900',
    badge: 'bg-slate-200 text-slate-800 dark:bg-slate-400/20 dark:text-slate-200',
    shape: 'cup',
  },
  bronze: {
    icon: 'text-orange-700 dark:text-orange-500',
    card: 'border-orange-300/70 bg-gradient-to-br from-orange-50 to-white dark:border-orange-500/30 dark:from-orange-500/10 dark:to-gray-900',
    badge: 'bg-orange-100 text-orange-900 dark:bg-orange-500/20 dark:text-orange-200',
    shape: 'cup',
  },
  laurel: {
    icon: 'text-blue-700 dark:text-blue-400',
    card: 'border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:border-blue-400/30 dark:from-blue-400/10 dark:to-gray-900',
    badge: 'bg-blue-100 text-blue-900 dark:bg-blue-400/20 dark:text-blue-200',
    shape: 'rosette',
  },
};

export function medalStyle(medal: string | null | undefined): MedalStyle {
  return STYLES[(medal as Medal) in STYLES ? (medal as Medal) : 'laurel'];
}
