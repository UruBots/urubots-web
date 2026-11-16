// Adds the `trophies` slice (FIRA RoboWorld Cup + RoboCup history) to the `award` page in the 3 locales.
// Updates go to the migration release as drafts: review and publish them in Prismic ("Migration Releases").
// Run `prismic push` first so the `trophies` slice exists in the repository.
//
//   node --experimental-strip-types --no-warnings scripts/seed/import-trophies.ts          # dry run (public API)
//   PRISMIC_WRITE_TOKEN=... node --experimental-strip-types --no-warnings scripts/seed/import-trophies.ts --apply
import { readFileSync } from 'node:fs';
import * as prismic from '@prismicio/client';
import { LOCALES } from './trophies.seed.ts';
import { insertTrophies } from './toTrophiesSlice.ts';

const apply = process.argv.includes('--apply');
const { repositoryName } = JSON.parse(readFileSync(new URL('../../prismic.config.json', import.meta.url), 'utf8'));
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (apply && !writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required with --apply');

const reader = prismic.createClient(repositoryName);
const awards = await reader.dangerouslyGetAll({ filters: [prismic.filter.at('document.type', 'award')], lang: '*' });
const targets = awards.filter((d) => (LOCALES as readonly string[]).includes(d.lang));

for (const d of targets) {
  const have = (d.data.slices as any[]).some((s) => s.slice_type === 'trophies');
  console.log(`${d.lang} ${d.id}: ${(d.data.slices as any[]).length} slices${have ? ' (already has trophies, will be replaced)' : ''}`);
}
console.log(`${targets.length} award pages to update${apply ? '' : ' (dry run, nothing sent)'}.`);
if (!apply || targets.length === 0) process.exit(0);

const client = prismic.createWriteClient(repositoryName, { writeToken: writeToken! });
const migration = prismic.createMigration();
for (const d of targets) {
  const slices = insertTrophies(d.data.slices as any[], d.lang as (typeof LOCALES)[number]);
  migration.updateDocument({ ...(d as any), data: { ...d.data, slices } });
}
await client.migrate(migration);
console.log('Done. Review and publish the migration release in Prismic.');
