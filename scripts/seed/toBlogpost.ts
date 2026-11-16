import type { PressItem, PressLocale } from './press.seed.ts';

const block = (text: string) => ({ type: 'paragraph', text, spans: [] as unknown[] });
const link = (url: string | null) => (url ? { link_type: 'Web', url } : { link_type: 'Any' });

const ORIGINAL_HEADLINE: Record<PressLocale, string | null> = {
  'es-ar': null, // the title already is the original headline
  'en-us': 'Original headline (in Spanish)',
  'pt-br': 'Título original (em espanhol)',
};

/** Migration API payload for the blogpost that presents one press item in one locale. */
export function toBlogpostDocument(item: PressItem, lang: PressLocale) {
  const summary = item.summary[lang];
  const prefix = ORIGINAL_HEADLINE[lang];
  const content = [block(summary)];
  if (prefix) content.push(block(`${prefix}: «${item.headline}»`));

  return {
    type: 'blogpost' as const,
    lang,
    uid: item.id,
    data: {
      title: item.title[lang],
      paragraph: [block(summary)],
      content,
      post_kind: 'press',
      source_name: item.outlet,
      source_url: link(item.url),
      source_label: item.sourceLabel[lang],
      publication_date: item.date,
      video_url: link(item.videoUrl),
      meta_title: item.title[lang],
      meta_description: summary,
    },
  };
}
