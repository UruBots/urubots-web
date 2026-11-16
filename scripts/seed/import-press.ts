// One-off importer: creates the press blog posts (3 locales) through the Migration API.
//
//   node --experimental-strip-types --no-warnings scripts/seed/import-press.ts           # dry run
//   PRISMIC_WRITE_TOKEN=... node --experimental-strip-types --no-warnings scripts/seed/import-press.ts --apply
//
// Documents land in the repository's migration release (not published); review and publish
// them from the Prismic dashboard. Re-running skips documents that already exist (same UID).
import { readFileSync } from 'node:fs';
import * as prismic from '@prismicio/client';
import { LOCALES, pressItems } from './press.seed.ts';
import { toBlogpostDocument } from './toBlogpost.ts';

const apply = process.argv.includes('--apply');
const { repositoryName } = JSON.parse(readFileSync(new URL('../../prismic.config.json', import.meta.url), 'utf8'));
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (apply && !writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required with --apply');

console.log(`${pressItems.length} press items x ${LOCALES.length} locales = ${pressItems.length * LOCALES.length} blog posts${apply ? '' : ' (dry run, nothing sent)'}.`);
if (!apply) process.exit(0);

const client = prismic.createWriteClient(repositoryName, { writeToken: writeToken! });
let created = 0;
let skipped = 0;
for (const lang of LOCALES) {
  for (const item of pressItems) {
    const migration = prismic.createMigration();
    const asset = item.image
      ? migration.createAsset(item.image.url, `${item.id}.${item.image.url.split('.').pop()!.split('?')[0]}`, {
          alt: item.image.alt,
          credits: item.image.credit,
        })
      : undefined;
    migration.createDocument(toBlogpostDocument(item, lang, asset) as any, item.title[lang]);
    try {
      await client.migrate(migration);
      created++;
      console.log(`created  ${lang}  ${item.id}`);
    } catch (e: any) {
      if (String(e?.response?.message ?? e?.message).includes('already exists')) {
        skipped++;
        console.log(`existing ${lang}  ${item.id}`);
      }
      else throw e;
    }
  }
}
console.log(`blog posts: ${created} created, ${skipped} already existed. Review and publish the migration release in Prismic.`);
