import { describe, it, expect } from 'vitest';
import { trophyItems, trophiesIntro, LOCALES } from './trophies.seed';
import { trophiesSlice, insertTrophies } from './toTrophiesSlice';

describe('trophies seed', () => {
  it('has the 11 achievements of the FIRA RoboWorld Cup and RoboCup history', () => {
    expect(trophyItems).toHaveLength(11);
    expect(trophyItems.filter((t) => t.event === 'FIRA RoboWorld Cup')).toHaveLength(9);
    expect(trophyItems.filter((t) => t.event === 'RoboCup')).toHaveLength(2);
    const count = (y: string) => trophyItems.filter((t) => t.year === y).length;
    expect([count('2026'), count('2025'), count('2024'), count('2023')]).toEqual([3, 5, 2, 1]);
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
    const es = (t: any, k: 'location' | 'place' | 'category') => t[k]['es-ar'] as string;
    const fira = (y: string) => trophyItems.filter((t) => t.year === y && t.event === 'FIRA RoboWorld Cup');
    const robocup = (y: string) => trophyItems.filter((t) => t.year === y && t.event === 'RoboCup');

    // FIRA 2026 (Canadá)
    const f26 = fira('2026');
    expect(f26.map((t) => t.medal)).toEqual(['gold', 'laurel']);
    expect(es(f26[0], 'category')).toContain('United');
    expect(es(f26[0], 'category')).toContain('Autos Autónomos');
    expect(f26[0].description!['es-ar']).toContain('estudiantes de Canadá y Malasia');
    expect(es(f26[1], 'place')).toBe('4.º puesto');
    expect(es(f26[1], 'category')).toContain('17 delegaciones');

    // FIRA 2025 (Daegu)
    const f25 = fira('2025');
    expect(f25.map((t) => t.medal)).toEqual(['gold', 'bronze', 'laurel', 'gold']);
    expect(f25.every((t) => es(t, 'location') === 'Daegu, Corea del Sur')).toBe(true);
    expect(es(f25[0], 'category')).toContain('Drones Autónomos');
    expect(es(f25[1], 'place')).toBe('3.er puesto');
    expect(es(f25[1], 'category')).toContain('Drones');
    expect(es(f25[2], 'place')).toBe('5.º puesto');
    expect(es(f25[2], 'category')).toContain('Rescue');
    expect(es(f25[3], 'place')).toBe('Mayor puntaje');
    expect(es(f25[3], 'category')).toContain('Movilidad');

    // FIRA 2024 and 2023
    expect(fira('2024').map((t) => t.medal)).toEqual(['bronze', 'bronze']);
    expect(fira('2024').every((t) => es(t, 'location') === 'São Luís do Maranhão, Brasil')).toBe(true);
    expect(fira('2024').map((t) => es(t, 'category'))).toEqual(['Autos Autónomos', 'Humanoides']);
    expect(es(fira('2023')[0], 'location')).toBe('Wolfenbüttel, Alemania');
    expect(es(fira('2023')[0], 'category')).toContain('Mission Impossible United');
    expect(fira('2023')[0].description!['es-ar']).toContain('debut mundialista');

    // RoboCup: 2026 participation (no podium claimed) and 2025 debut
    const r26 = robocup('2026');
    expect(r26).toHaveLength(1);
    expect(es(r26[0], 'location')).toBe('Corea del Sur');
    expect(r26[0].medal).toBe('laurel');
    expect(es(r26[0], 'place')).toBe('Participación');
    const r25 = robocup('2025');
    expect(r25).toHaveLength(1);
    expect(es(r25[0], 'location')).toBe('Salvador de Bahía, Brasil');
    expect(r25[0].medal).toBe('gold');
    expect(es(r25[0], 'place')).toBe('1.er puesto');
    expect(r25[0].description!['es-ar']).toContain('debut histórico');
  });
});

describe('trophiesSlice / insertTrophies', () => {
  it('builds the slice with title, subtitle and one item per trophy in the requested locale', () => {
    const s = trophiesSlice('en-us');
    expect(s.slice_type).toBe('trophies');
    expect(s.primary.title).toBe(trophiesIntro.title['en-us']);
    expect(s.items).toHaveLength(11);
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
