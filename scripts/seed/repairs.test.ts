import { describe, it, expect } from 'vitest';
import { planRepairs } from './repairs';
import { seedPublications } from './publications.seed';
import { pressItems } from './press.seed';

const pubDoc = (uid: string, lang: string, title: string | null) => ({ id: `id-${uid}-${lang}`, uid, lang, type: 'publication', data: { title } }) as any;
const pressDoc = (uid: string, lang: string, image: string | null) =>
  ({ id: `id-${uid}-${lang}`, uid, lang, type: 'blogpost', data: { image: image ? { url: image } : {} } }) as any;

describe('planRepairs', () => {
  it('flags publications with an empty title and ignores complete ones', () => {
    const [a, b] = seedPublications;
    const plan = planRepairs({ publications: [pubDoc(a.id, 'en-us', ''), pubDoc(b.id, 'en-us', 'Done')], pressPosts: [] });
    expect(plan.publications.map((p) => p.doc.uid)).toEqual([a.id]);
    expect(plan.publications[0].seed.id).toBe(a.id);
  });

  it('flags press posts without an image and ignores the ones that have it', () => {
    const [a, b] = pressItems;
    const plan = planRepairs({
      publications: [],
      pressPosts: [pressDoc(a.id, 'pt-br', null), pressDoc(b.id, 'es-ar', 'https://images.prismic.io/x.jpg'), pressDoc('prensa-unknown', 'en-us', null)],
    });
    expect(plan.press.map((p) => `${p.doc.lang}:${p.item.id}`)).toEqual([`pt-br:${a.id}`]);
  });

  it('skips documents whose uid is not in the seed (never touches other content)', () => {
    const plan = planRepairs({ publications: [pubDoc('not-ours', 'en-us', '')], pressPosts: [] });
    expect(plan.publications).toEqual([]);
  });

  it('reports locales of publications that are not en-us so they get their translated summary', () => {
    const p = seedPublications[0];
    const plan = planRepairs({ publications: [pubDoc(p.id, 'es-ar', '')], pressPosts: [] });
    expect(plan.publications[0].lang).toBe('es-ar');
  });
});
