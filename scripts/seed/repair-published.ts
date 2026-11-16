// Repairs published documents left incomplete by interrupted imports:
//  - `publication` documents with an empty title get their full content from the seed (en-us/es-ar/pt-br)
//  - press `blogpost` documents without cover image get it from the seed
// Updates go to the migration release (not published): review and publish them in Prismic.
//
//   node --experimental-strip-types --no-warnings scripts/seed/repair-published.ts          # dry run (public API, no token)
//   PRISMIC_WRITE_TOKEN=... node --experimental-strip-types --no-warnings scripts/seed/repair-published.ts --apply
import { readFileSync } from 'node:fs';
import * as prismic from '@prismicio/client';
import { planRepairs } from './repairs.ts';
import { toPrismicDocument } from './toPrismic.ts';

const apply = process.argv.includes('--apply');
const { repositoryName } = JSON.parse(readFileSync(new URL('../../prismic.config.json', import.meta.url), 'utf8'));
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (apply && !writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required with --apply');

const client = apply ? prismic.createWriteClient(repositoryName, { writeToken: writeToken! }) : prismic.createClient(repositoryName);
const publications = await client.dangerouslyGetAll({ filters: [prismic.filter.at('document.type', 'publication')], lang: '*' });
const pressPosts = (await client.dangerouslyGetAll({ filters: [prismic.filter.at('document.type', 'blogpost')], lang: '*' })).filter((d) => d.uid?.startsWith('prensa-'));
const plan = planRepairs({ publications: publications as any, pressPosts: pressPosts as any });

const byLang = (xs: { lang: string }[]) => Object.entries(xs.reduce((m: Record<string, number>, x) => ((m[x.lang] = (m[x.lang] ?? 0) + 1), m), {})).map(([k, v]) => `${k}:${v}`).join(' ');
console.log(`publications to fill: ${plan.publications.length} (${byLang(plan.publications)}) | press posts to add image: ${plan.press.length} (${byLang(plan.press)})${apply ? '' : ' (dry run, nothing sent)'}`);
if (!apply || (plan.publications.length === 0 && plan.press.length === 0)) process.exit(0);

const migration = prismic.createMigration();
for (const { doc, seed, lang } of plan.publications) {
  const data = toPrismicDocument(seed, lang as 'en-us' | 'es-ar' | 'pt-br').data;
  migration.updateDocument({ ...(doc as any), data }, seed.title);
}
for (const { doc, item } of plan.press) {
  const ext = item.image!.url.split('.').pop()!.split('?')[0];
  const asset = migration.createAsset(item.image!.url, `${item.id}.${ext}`, { alt: item.image!.alt, credits: item.image!.credit });
  migration.updateDocument({ ...(doc as any), data: { ...(doc as any).data, image: asset } }, (doc as any).data.title);
}
await (client as prismic.WriteClient).migrate(migration, { reporter: (e) => console.log(e.type) });
console.log('Done. Review and publish the migration release in Prismic.');
