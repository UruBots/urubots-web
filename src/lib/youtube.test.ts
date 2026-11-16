import { describe, it, expect } from 'vitest';
import { youtubeEmbedUrl } from './youtube';

describe('youtubeEmbedUrl', () => {
  it('converts watch, short and embed URLs', () => {
    const want = 'https://www.youtube.com/embed/abc123XYZ_-';
    expect(youtubeEmbedUrl('https://www.youtube.com/watch?v=abc123XYZ_-')).toBe(want);
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

describe('youtubeEmbedUrl start offset', () => {
  it('keeps the start time from t= (seconds, with or without s) and start=', () => {
    expect(youtubeEmbedUrl('https://www.youtube.com/watch?v=qezef09y3WY&t=401s')).toBe('https://www.youtube.com/embed/qezef09y3WY?start=401');
    expect(youtubeEmbedUrl('https://www.youtube.com/watch?v=qezef09y3WY&t=401')).toBe('https://www.youtube.com/embed/qezef09y3WY?start=401');
    expect(youtubeEmbedUrl('https://youtu.be/qezef09y3WY?start=12')).toBe('https://www.youtube.com/embed/qezef09y3WY?start=12');
  });
});
