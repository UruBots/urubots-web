// Read-only backup of every published document of the Prismic repo (all locales).
// Usage: node scripts/dump-prismic.mjs [outDir]   (set PRISMIC_ACCESS_TOKEN if the API is private)
import { createClient } from '@prismicio/client';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

const { repositoryName } = JSON.parse(await readFile(new URL('../slicemachine.config.json', import.meta.url), 'utf8'));
const out = process.argv[2] ?? `backups/prismic-${new Date().toISOString().slice(0, 10)}`;
const client = createClient(repositoryName, { accessToken: process.env.PRISMIC_ACCESS_TOKEN });

const repo = await client.getRepository();
const docs = await client.dangerouslyGetAll({ lang: '*' });
await mkdir(out, { recursive: true });
await writeFile(`${out}/repository.json`, JSON.stringify(repo, null, 2));
await writeFile(`${out}/documents.json`, JSON.stringify(docs, null, 2));

const byType = {};
for (const d of docs) {
  byType[d.type] ??= [];
  byType[d.type].push(d);
}
for (const [type, list] of Object.entries(byType)) {
  await mkdir(`${out}/by-type`, { recursive: true });
  await writeFile(`${out}/by-type/${type}.json`, JSON.stringify(list, null, 2));
}
console.log(`Dumped ${docs.length} documents (${Object.entries(byType).map(([t, l]) => `${t}:${l.length}`).join(', ')}) + repository.json to ${out}`);
