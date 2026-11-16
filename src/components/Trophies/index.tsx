import { groupTrophiesByYear, medalStyle } from '@/lib/trophies';

export interface TrophyData {
  year: string | null;
  event: string | null;
  location: string | null;
  medal: string | null;
  place: string | null;
  category: string | null;
  description: string | null;
}

function TrophyIcon({ shape, className }: { shape: 'cup' | 'rosette'; className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shape === 'cup' ? (
        <>
          <path d="M14 6h20v10a10 10 0 0 1-20 0V6Z" fill="currentColor" fillOpacity="0.22" />
          <path d="M14 10H8v3a6 6 0 0 0 6 6M34 10h6v3a6 6 0 0 1-6 6" />
          <path d="M24 26v8M18 34h12v6H18z" />
          <path d="M16 40h16" />
        </>
      ) : (
        <>
          <circle cx="24" cy="19" r="11" fill="currentColor" fillOpacity="0.22" />
          <path d="m24 13 2 4.2 4.6.6-3.3 3.2.8 4.6-4.1-2.2-4.1 2.2.8-4.6-3.3-3.2 4.6-.6L24 13Z" />
          <path d="m17 28-4 14 11-5 11 5-4-14" />
        </>
      )}
    </svg>
  );
}

export function Trophies({ title, subtitle, items }: { title: string | null; subtitle: string | null; items: TrophyData[] }) {
  const years = groupTrophiesByYear(items);
  if (years.length === 0) return null;

  return (
    <section className="bg-white py-20 dark:bg-gray-900">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-14 text-center">
          {title && <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
          <div className="mx-auto mt-5 h-1 w-20 rounded bg-blue-900 dark:bg-blue-500" />
        </div>

        <ol className="relative space-y-12 md:border-l-2 md:border-gray-200 md:pl-10 dark:md:border-gray-700">
          {years.map(({ year, items: trophies }) => (
            <li key={year} className="relative grid gap-5 md:grid-cols-[8rem_1fr]">
              <span
                className="absolute -left-[3.2rem] top-3 hidden h-4 w-4 rounded-full border-4 border-white bg-blue-900 md:block dark:border-gray-900 dark:bg-blue-500"
                aria-hidden="true"
              />
              <p className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">{year}</p>

              <ul className="grid gap-4 sm:grid-cols-2">
                {trophies.map((t, i) => {
                  const style = medalStyle(t.medal);
                  return (
                    <li key={`${year}-${i}`} className={`flex flex-col gap-3 rounded-2xl border p-5 shadow-sm ${style.card}`}>
                      <div className="flex items-center justify-between gap-3">
                        <TrophyIcon shape={style.shape} className={`h-12 w-12 ${style.icon}`} />
                        {t.place && <span className={`rounded-full px-3 py-1 text-sm font-semibold ${style.badge}`}>{t.place}</span>}
                      </div>
                      {(t.event || t.location) && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {[t.event, t.location].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {t.category && <p className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">{t.category}</p>}
                      {t.description && <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t.description}</p>}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
