import { Trophies } from '@/components/Trophies';
import { trophiesIntro, trophyItems, type TrophyLocale } from '../../../../scripts/seed/trophies.seed';

export default async function Page({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ dark?: string }> }) {
  const { lang } = await params;
  const { dark } = await searchParams;
  const l = lang as TrophyLocale;
  const items = trophyItems.map((t) => ({ year: t.year, event: t.event, location: t.location[l], medal: t.medal, place: t.place[l], category: t.category[l], description: t.description ? t.description[l] : null }));
  return (
    <div className={dark ? 'dark' : ''}>
      {!dark && <script dangerouslySetInnerHTML={{ __html: "try{localStorage.setItem('theme','light')}catch(e){}" }} />}
      <Trophies title={trophiesIntro.title[l]} subtitle={trophiesIntro.subtitle[l]} items={items} />
    </div>
  );
}

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: 'es-ar' }, { lang: 'en-us' }, { lang: 'pt-br' }];
}
