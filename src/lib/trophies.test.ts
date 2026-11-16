import { describe, it, expect } from 'vitest';
import { groupTrophiesByYear, medalStyle } from './trophies';

const t = (year: string, medal: string, place = 'x') => ({ year, medal, place }) as any;

describe('groupTrophiesByYear', () => {
  it('groups by year, newest first, keeping the original order inside a year', () => {
    const groups = groupTrophiesByYear([t('2024', 'bronze', 'a'), t('2026', 'gold', 'b'), t('2024', 'bronze', 'c'), t('2026', 'laurel', 'd')]);
    expect(groups.map((g) => g.year)).toEqual(['2026', '2024']);
    expect(groups[0].items.map((i: any) => i.place)).toEqual(['b', 'd']);
    expect(groups[1].items.map((i: any) => i.place)).toEqual(['a', 'c']);
  });

  it('ignores items without a year and returns [] for empty input', () => {
    expect(groupTrophiesByYear([t('', 'gold'), t('2025', 'gold')]).map((g) => g.year)).toEqual(['2025']);
    expect(groupTrophiesByYear([])).toEqual([]);
  });
});

describe('medalStyle', () => {
  it('has a distinct look for gold, silver, bronze and laurel', () => {
    const looks = ['gold', 'silver', 'bronze', 'laurel'].map((m) => medalStyle(m).icon);
    expect(new Set(looks).size).toBe(4);
  });

  it('falls back to laurel for unknown or empty values', () => {
    expect(medalStyle(null)).toEqual(medalStyle('laurel'));
    expect(medalStyle('platinum')).toEqual(medalStyle('laurel'));
  });
});
