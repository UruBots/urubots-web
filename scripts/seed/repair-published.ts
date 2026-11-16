// Replaces `publication` documents that were published empty by an interrupted import.
// The Migration API cannot update already-published documents, so each replacement is created with a
// new UID (<id>-<lang>); the site ignores the empty originals. Delete the originals whenever convenient.
// New documents go to the migration release (not published): review and publish them in Prismic.
//
//   node --experimental-strip-types --no-warnings scripts/seed/repair-published.ts          # dry run (public API)
//   PRISMIC_WRITE_TOKEN=... node --experimental-strip-types --no-warnings scripts/seed/repair-published.ts --apply
import { readFileSync } from 'node:fs';
import * as prismic from '@prismicio/client';
import { planRepairs } from './repairs.ts';
import { toPrismicDocument } from './toPrismic.ts';

const apply = process.argv.includes('--apply');
const { repositoryName } = JSON.parse(readFileSync(new URL('../../prismic.config.json', import.meta.url), 'utf8'));
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (apply && !writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required with --apply');

const reader = prismic.createClient(repositoryName);
const publications = await reader.dangerouslyGetAll({ filters: [prismic.filter.at('document.type', 'publication')], lang: '*' });
const plan = planRepairs({ publications: publications as any });

const byLang = plan.reduce((m: Record<string, number>, x) => ((m[x.lang] = (m[x.lang] ?? 0) + 1), m), {});
console.log(`replacements to create: ${plan.length} (${Object.entries(byLang).map(([k, v]) => `${k}:${v}`).join(' ')})${apply ? '' : ' (dry run, nothing sent)'}`);
if (!apply || plan.length === 0) process.exit(0);

const client = prismic.createWriteClient(repositoryName, { writeToken: writeToken! });
let created = 0;
for (const { seed, lang, newUid } of plan) {
  const migration = prismic.createMigration();
  const doc = { ...toPrismicDocument(seed, lang as 'en-us' | 'es-ar' | 'pt-br'), uid: newUid };
  migration.createDocument(doc as any, seed.title);
  await client.migrate(migration);
  created++;
  console.log(`created ${lang} ${newUid}`);
}
console.log(`${created} replacements created. Review and publish the migration release in Prismic.`);
