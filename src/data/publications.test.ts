import { describe, it, expect } from 'vitest';
import { publications } from './publications';

const find = (arxiv: string) => publications.find((p) => p.arxiv === arxiv);

describe('publications dataset', () => {
  it('ids are unique', () => {
    const ids = publications.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('arxiv ids are unique', () => {
    const ids = publications.filter((p) => p.arxiv).map((p) => p.arxiv);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every entry has title, authors, a plausible year and an arxiv or doi', () => {
    for (const p of publications) {
      expect(p.title.length, p.id).toBeGreaterThan(0);
      expect(p.authors.length, p.id).toBeGreaterThan(0);
      expect(p.year, p.id).toBeGreaterThanOrEqual(2022);
      expect(p.year, p.id).toBeLessThanOrEqual(2026);
      expect(Boolean(p.arxiv || p.doi), p.id).toBe(true);
    }
  });

  it('contains exactly 28 entries (duplicates #5/#19 and #9/#20 counted once)', () => {
    expect(publications).toHaveLength(28);
  });

  it('keeps the crossed arXiv links apart (audit 1.4)', () => {
    expect(find('2411.05011')?.title.startsWith('De la Extensión')).toBe(true);
    expect(find('2410.17453')?.title).toContain('Clearpath Husky A200');
  });

  it('never leaks POR CONFIRMAR into any field', () => {
    expect(JSON.stringify(publications)).not.toContain('POR CONFIRMAR');
  });
});
