import { trophiesIntro, trophyItems, type TrophyLocale } from './trophies.seed.ts';

/** The `trophies` slice in the shape the Migration API expects, for one locale. */
export function trophiesSlice(lang: TrophyLocale) {
  return {
    slice_type: 'trophies',
    slice_label: null,
    variation: 'default',
    version: 'initial',
    primary: { title: trophiesIntro.title[lang], subtitle: trophiesIntro.subtitle[lang] },
    items: trophyItems.map((t) => ({
      year: t.year,
      event: t.event,
      location: t.location[lang],
      medal: t.medal,
      place: t.place[lang],
      category: t.category[lang],
      description: t.description ? t.description[lang] : '',
    })),
  };
}

/** Inserts the trophies slice right after `section_image_left` (replacing a previous one). Returns a new array. */
export function insertTrophies<T extends { slice_type: string }>(slices: T[], lang: TrophyLocale): any[] {
  const rest = slices.filter((s) => s.slice_type !== 'trophies');
  const at = rest.findIndex((s) => s.slice_type === 'section_image_left');
  const slice = trophiesSlice(lang);
  return at === -1 ? [...rest, slice] : [...rest.slice(0, at + 1), slice, ...rest.slice(at + 1)];
}
