import { describe, it, expect } from 'vitest';
import { youtubeEmbedUrl } from './youtube';

describe('youtubeEmbedUrl', () => {
  it('converts watch, short and embed URLs', () => {
    const want = 'https://www.youtube.com/embed/abc123XYZ_-';
    expect(youtubeEmbedUrl('https://www.youtube.com/watch?v=abc123XYZ_-&t=5')).toBe(want);
    expect(youtubeEmbedUrl('https://youtu.be/abc123XYZ_-')).toBe(want);
    expect(youtubeEmbedUrl('https://www.youtube.com/embed/abc123XYZ_-')).toBe(want);
  });

  it('returns null for empty, null or non-YouTube input', () => {
    expect(youtubeEmbedUrl(null)).toBeNull();
    expect(youtubeEmbedUrl('')).toBeNull();
    expect(youtubeEmbedUrl('https://example.com/watch?v=abc')).toBeNull();
    expect(youtubeEmbedUrl('not a url')).toBeNull();
  });
});
