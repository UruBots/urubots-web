// One-off importer: creates the `publication` documents and fills the research page's
// slice labels in Prismic through the Migration API.
//
//   node --experimental-strip-types scripts/seed/import-publications.ts           # dry run
//   PRISMIC_WRITE_TOKEN=... node --experimental-strip-types scripts/seed/import-publications.ts --apply
//
// Documents land in the repository's migration release (not published). Review them in
// Prismic and publish the release from the dashboard.
import { readFileSync } from 'node:fs';
import * as prismic from '@prismicio/client';
import { seedPublications } from './publications.seed.ts';
import { toPrismicDocument } from './toPrismic.ts';

const labelsByLocale: Record<string, Record<string, string>> = {
  'en-us': {
    title: 'Publications & TDPs',
    filter_all_label: 'All',
    filter_papers_label: 'Scientific papers',
    filter_tdps_label: 'TDPs',
    copy_bibtex_label: 'Copy BibTeX',
    copied_label: 'Copied!',
    accepted_label: 'Accepted',
    preprint_label: 'Preprint',
  },
  'es-ar': {
    title: 'Publicaciones y TDPs',
    filter_all_label: 'Todos',
    filter_papers_label: 'Artículos científicos',
    filter_tdps_label: 'TDPs',
    copy_bibtex_label: 'Copiar BibTeX',
    copied_label: '¡Copiado!',
    accepted_label: 'Aceptado',
    preprint_label: 'Preprint',
  },
  'pt-br': {
    title: 'Publicações e TDPs',
    filter_all_label: 'Todos',
    filter_papers_label: 'Artigos científicos',
    filter_tdps_label: 'TDPs',
    copy_bibtex_label: 'Copiar BibTeX',
    copied_label: 'Copiado!',
    accepted_label: 'Aceito',
    preprint_label: 'Preprint',
  },
};

const apply = process.argv.includes('--apply');
const { repositoryName } = JSON.parse(readFileSync(new URL('../../prismic.config.json', import.meta.url), 'utf8'));
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (apply && !writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required with --apply');

const client = prismic.createWriteClient(repositoryName, { writeToken: writeToken ?? 'dry-run' });

const researchDocs = await client.getAllByType('research', { lang: '*' });
console.log(`${seedPublications.length} publications x 3 locales + ${researchDocs.length} research docs to migrate${apply ? '' : ' (dry run, nothing sent)'}.`);
if (!apply) process.exit(0);

// One migration per document so a re-run skips what already exists (UID conflicts).
let created = 0;
let skipped = 0;
for (const lang of ['en-us', 'es-ar', 'pt-br'] as const) {
  for (const p of seedPublications) {
    const migration = prismic.createMigration();
    migration.createDocument(toPrismicDocument(p, lang) as any, p.title);
    try {
      await client.migrate(migration);
      created++;
    } catch (e: any) {
      if (String(e?.response?.message ?? e?.message).includes('already exists')) skipped++;
      else throw e;
    }
  }
}
console.log(`publications: ${created} created, ${skipped} already existed`);

const labelMigration = prismic.createMigration();
for (const doc of researchDocs) {
  const labels = labelsByLocale[doc.lang];
  const slice = ((doc.data as any).slices as any[]).find((s) => s.slice_type === 'research_publications');
  if (!labels || !slice) continue;
  Object.assign(slice.primary, labels);
  labelMigration.updateDocument(doc as any);
}
await client.migrate(labelMigration);
console.log('Done. Review and publish the migration release in the Prismic dashboard.');
