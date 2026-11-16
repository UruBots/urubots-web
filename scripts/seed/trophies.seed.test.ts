import { describe, it, expect } from 'vitest';
import { trophyItems, trophiesIntro, LOCALES } from './trophies.seed';
import { trophiesSlice, insertTrophies } from './toTrophiesSlice';

describe('trophies seed', () => {
  it('has the 9 trophies of the FIRA RoboWorld Cup and RoboCup history', () => {
    expect(trophyItems).toHaveLength(9);
    expect(trophyItems.filter((t) => t.event === 'FIRA RoboWorld Cup')).toHaveLength(7);
    expect(trophyItems.filter((t) => t.event === 'RoboCup')).toHaveLength(2);
    expect(trophyItems.filter((t) => t.year === '2026')).toHaveLength(2);
    expect(trophyItems.filter((t) => t.year === '2025')).toHaveLength(4);
    expect(trophyItems.filter((t) => t.year === '2024')).toHaveLength(2);
    expect(trophyItems.filter((t) => t.year === '2023')).toHaveLength(1);
  });

  it('has valid medals and every text in the 3 locales', () => {
    for (const t of trophyItems) {
      expect(['gold', 'silver', 'bronze', 'laurel']).toContain(t.medal);
      for (const l of LOCALES) {
        expect(t.location[l].length, `${t.year} location ${l}`).toBeGreaterThan(3);
        expect(t.place[l].length, `${t.year} place ${l}`).toBeGreaterThan(3);
        expect(t.category[l].length, `${t.year} category ${l}`).toBeGreaterThan(3);
      }
    }
    for (const l of LOCALES) {
      expect(trophiesIntro.title[l].length).toBeGreaterThan(10);
      expect(trophiesIntro.subtitle[l].length).toBeGreaterThan(10);
    }
  });

  it('keeps the facts given by the team', () => {
    const y = (n: string) => trophyItems.filter((t) => t.year === n);
    expect(y('2026').map((t) => t.medal)).toEqual(['gold', 'laurel']);
    expect(y('2026')[0].description!['es-ar']).toContain('Canadá y Malasia');
    const robocup = y('2025').filter((t) => t.event === 'RoboCup');
    expect(robocup.map((t) => t.medal)).toEqual(['gold', 'laurel']);
    expect(robocup[0].category['es-ar']).toContain('Movilidad');
    expect(robocup[0].description!['es-ar']).toContain('mayor puntaje');
    expect(robocup[1].place['es-ar']).toContain('5');
    const fira2025 = y('2025').filter((t) => t.event === 'FIRA RoboWorld Cup');
    expect(fira2025.map((t) => t.medal)).toEqual(['gold', 'laurel']);
    expect(fira2025[0].location['es-ar']).toBe('Corea del Sur');
    expect(fira2025[0].category['es-ar']).toContain('Movilidad');
    expect(fira2025[1].place['es-ar']).toContain('5');
    expect(JSON.stringify(trophyItems).toLowerCase()).not.toContain('drones');
    expect(y('2024').map((t) => t.medal)).toEqual(['bronze', 'bronze']);
    expect(y('2023')[0].category['es-ar']).toContain('Misión Imposible');
  });
});

describe('trophiesSlice / insertTrophies', () => {
  it('builds the slice with title, subtitle and one item per trophy in the requested locale', () => {
    const s = trophiesSlice('en-us');
    expect(s.slice_type).toBe('trophies');
    expect(s.primary.title).toBe(trophiesIntro.title['en-us']);
    expect(s.items).toHaveLength(9);
    expect(s.items[0]).toMatchObject({ year: '2026', event: 'FIRA RoboWorld Cup', medal: 'gold', place: '1st place' });
    expect(s.items.filter((i: any) => i.event === 'RoboCup')).toHaveLength(2);
    expect(s.items.every((i: any) => typeof i.description === 'string')).toBe(true);
  });

  it('inserts the slice right after section_image_left, keeping the others in order', () => {
    const slices = [{ slice_type: 'hero' }, { slice_type: 'section_image_left' }, { slice_type: 'section_image_right' }] as any[];
    const out = insertTrophies(slices, 'es-ar');
    expect(out.map((s: any) => s.slice_type)).toEqual(['hero', 'section_image_left', 'trophies', 'section_image_right']);
    expect(slices).toHaveLength(3);
  });

  it('is idempotent: replaces an existing trophies slice instead of adding another', () => {
    const once = insertTrophies([{ slice_type: 'hero' }, { slice_type: 'section_image_left' }] as any[], 'pt-br');
    const twice = insertTrophies(once, 'pt-br');
    expect(twice.filter((s: any) => s.slice_type === 'trophies')).toHaveLength(1);
  });

  it('appends at the end when there is no section_image_left', () => {
    expect(insertTrophies([{ slice_type: 'hero' }] as any[], 'es-ar').map((s: any) => s.slice_type)).toEqual(['hero', 'trophies']);
  });
});
