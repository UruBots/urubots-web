import { describe, it, expect } from 'vitest';
import { seedPublications as publications } from '../../scripts/seed/publications.seed';
import { groupPublications } from './groupPublications';

describe('groupPublications', () => {
  it('returns every publication for filter "all", grouped by year descending', () => {
    const groups = groupPublications(publications, 'all');
    expect(groups.reduce((n, g) => n + g.items.length, 0)).toBe(publications.length);
    const years = groups.map((g) => g.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it('keeps only TDPs for filter "tdp"', () => {
    const items = groupPublications(publications, 'tdp').flatMap((g) => g.items);
    expect(items).toHaveLength(6);
    expect(items.every((p) => p.kind === 'tdp')).toBe(true);
  });

  it('keeps only papers for filter "paper" and drops empty years', () => {
    const groups = groupPublications(publications, 'paper');
    expect(groups.flatMap((g) => g.items).every((p) => p.kind === 'paper')).toBe(true);
    expect(groups.every((g) => g.items.length > 0)).toBe(true);
  });
});
