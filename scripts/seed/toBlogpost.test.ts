import { describe, it, expect } from 'vitest';
import { pressItems, LOCALES } from './press.seed';
import { toBlogpostDocument } from './toBlogpost';

const laDiaria = pressItems.find((p) => p.outlet === 'la diaria')!;
const yt = pressItems.find((p) => p.id.endsWith('la-diaria-radio'))!;

describe('toBlogpostDocument', () => {
  it('builds a localized document with a UID shared across locales', () => {
    const uids = LOCALES.map((l) => toBlogpostDocument(laDiaria, l).uid);
    expect(new Set(uids).size).toBe(1);
    expect(uids[0]).toBe('prensa-2026-07-21-la-diaria');
    const d = toBlogpostDocument(laDiaria, 'pt-br');
    expect(d.type).toBe('blogpost');
    expect(d.lang).toBe('pt-br');
    expect(d.data.title).toBe(laDiaria.title['pt-br']);
    expect(d.data.source_label).toBe(laDiaria.sourceLabel['pt-br']);
  });

  it('keeps the real date, kind and source', () => {
    const d = toBlogpostDocument(laDiaria, 'es-ar');
    expect(d.data.publication_date).toBe('2026-07-21');
    expect(d.data.post_kind).toBe('press');
    expect(d.data.source_name).toBe('la diaria');
    expect(d.data.source_url).toEqual({ link_type: 'Web', url: laDiaria.url });
    expect(d.data.video_url).toEqual({ link_type: 'Any' });
  });

  it('sets video_url only for video items', () => {
    expect(toBlogpostDocument(yt, 'en-us').data.video_url).toEqual({ link_type: 'Web', url: yt.videoUrl });
  });

  it('writes summary as rich text in paragraph and content, with the original headline for en/pt', () => {
    const en = toBlogpostDocument(laDiaria, 'en-us');
    expect(en.data.paragraph[0]).toMatchObject({ type: 'paragraph', text: laDiaria.summary['en-us'] });
    const texts = en.data.content.map((b: any) => b.text);
    expect(texts).toContain(laDiaria.summary['en-us']);
    expect(texts.some((t: string) => t.includes(laDiaria.headline))).toBe(true);
    const es = toBlogpostDocument(laDiaria, 'es-ar');
    expect(es.data.content.map((b: any) => b.text).some((t: string) => t.includes('Titular original'))).toBe(false);
  });

  it('fills SEO fields from title and summary', () => {
    const d = toBlogpostDocument(laDiaria, 'es-ar');
    expect(d.data.meta_title).toBe(laDiaria.title['es-ar']);
    expect(d.data.meta_description).toBe(laDiaria.summary['es-ar']);
  });

  it('attaches the given image asset to the image field and leaves it out otherwise', () => {
    const asset = { id: 'asset-1' } as any;
    expect(toBlogpostDocument(laDiaria, 'es-ar', asset).data.image).toBe(asset);
    expect('image' in toBlogpostDocument(laDiaria, 'es-ar').data).toBe(false);
  });
});
