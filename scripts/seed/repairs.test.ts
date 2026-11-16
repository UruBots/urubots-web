import { describe, it, expect } from 'vitest';
import { planRepairs, replacementUid } from './repairs';
import { seedPublications } from './publications.seed';

const pubDoc = (uid: string, lang: string, title: string | null) => ({ id: `id-${uid}-${lang}`, uid, lang, type: 'publication', data: { title } }) as any;
const [a, b] = seedPublications;

describe('replacementUid', () => {
  it('suffixes the seed id with the language code', () => {
    expect(replacementUid(a.id, 'en-us')).toBe(`${a.id}-en`);
    expect(replacementUid(a.id, 'pt-br')).toBe(`${a.id}-pt`);
  });
});

describe('planRepairs', () => {
  it('plans a replacement for an empty published shell, under a new uid', () => {
    const plan = planRepairs({ publications: [pubDoc(a.id, 'en-us', '')] });
    expect(plan).toHaveLength(1);
    expect(plan[0]).toMatchObject({ lang: 'en-us', newUid: `${a.id}-en` });
    expect(plan[0].seed.id).toBe(a.id);
  });

  it('ignores complete documents', () => {
    expect(planRepairs({ publications: [pubDoc(a.id, 'en-us', 'Done')] })).toEqual([]);
  });

  it('does not plan twice: skips shells that already have a complete replacement', () => {
    const plan = planRepairs({
      publications: [pubDoc(a.id, 'en-us', ''), pubDoc(`${a.id}-en`, 'en-us', 'Replacement'), pubDoc(b.id, 'en-us', '')],
    });
    expect(plan.map((p) => p.seed.id)).toEqual([b.id]);
  });

  it('a complete replacement in another locale does not hide a shell', () => {
    const plan = planRepairs({ publications: [pubDoc(a.id, 'en-us', ''), pubDoc(`${a.id}-en`, 'es-ar', 'Other locale')] });
    expect(plan).toHaveLength(1);
  });

  it('never touches documents that are not in the seed', () => {
    expect(planRepairs({ publications: [pubDoc('not-ours', 'en-us', '')] })).toEqual([]);
  });
});
