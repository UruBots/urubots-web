import { describe, it, expect } from 'vitest';
import { formatPostDate, sortByPublication, postDate } from './press';

const post = (id: string, first: string, date?: string | null) =>
  ({ id, first_publication_date: first, data: { publication_date: date } }) as any;

describe('formatPostDate', () => {
  it('formats in the page locale without timezone shifts', () => {
    expect(formatPostDate('2026-07-21', 'es-ar')).toBe('21 de julio de 2026');
    expect(formatPostDate('2026-07-21', 'en-us')).toBe('July 21, 2026');
    expect(formatPostDate('2026-07-21', 'pt-br')).toBe('21 de julho de 2026');
    expect(formatPostDate('2026-01-01', 'en-us')).toBe('January 1, 2026');
  });

  it('returns an empty string for missing or invalid dates', () => {
    expect(formatPostDate(null, 'en-us')).toBe('');
    expect(formatPostDate('nope', 'en-us')).toBe('');
  });
});

describe('postDate / sortByPublication', () => {
  it('prefers publication_date and falls back to first_publication_date', () => {
    expect(postDate(post('a', '2026-11-16T10:00:00+0000', '2026-07-21'))).toBe('2026-07-21');
    expect(postDate(post('b', '2025-09-03T13:03:59+0000', null))).toBe('2025-09-03');
  });

  it('orders newest first by the real date, not by the import day', () => {
    const docs = [
      post('old-blog', '2025-09-03T13:03:59+0000'),
      post('press-june', '2026-11-16T10:00:00+0000', '2026-06-08'),
      post('press-aug', '2026-11-16T10:00:00+0000', '2026-08-18'),
    ];
    expect(sortByPublication(docs).map((d) => d.id)).toEqual(['press-aug', 'press-june', 'old-blog']);
  });

  it('does not mutate its input', () => {
    const docs = [post('a', '2025-01-01T00:00:00+0000'), post('b', '2026-01-01T00:00:00+0000')];
    sortByPublication(docs);
    expect(docs.map((d) => d.id)).toEqual(['a', 'b']);
  });
});
