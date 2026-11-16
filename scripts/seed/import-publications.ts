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
const migration = prismic.createMigration();

for (const p of seedPublications) {
  migration.createDocument(toPrismicDocument(p) as any, p.title);
}

const researchDocs = await client.getAllByType('research', { lang: '*' });
for (const doc of researchDocs) {
  const labels = labelsByLocale[doc.lang];
  if (!labels) continue;
  const slices = (doc.data as any).slices as any[];
  const slice = slices.find((s) => s.slice_type === 'research_publications');
  if (!slice) continue;
  Object.assign(slice.primary, labels);
  migration.updateDocument(doc as any);
}

console.log(`${seedPublications.length} publications + ${researchDocs.length} research docs to ${apply ? 'migrate' : 'migrate (dry run, nothing sent)'}.`);
if (apply) {
  await client.migrate(migration, { reporter: (e) => console.log(e.type) });
  console.log('Done. Review and publish the migration release in the Prismic dashboard.');
}
