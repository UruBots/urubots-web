# Press coverage as blog posts — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the 13 "PRENSA" appearances of UruBots in 2026 as blog posts (in the three locales) that summarize each piece and send readers to the original article, video or audio.

**Architecture:** Reuse the existing Prismic `blogpost` type and `/[lang]/blog/[uid]` page. Add the few fields a press item needs (source name, source link, real publication date, kind, video URL), render a "source" box and a YouTube embed in `BlogItem`, order lists by the real date, and load the 13 × 3 documents with an idempotent Migration API script (same pattern as `scripts/seed/import-publications.ts`).

**Tech Stack:** Next.js 15, Prismic Type Builder + CLI (`prismic field add`, `prismic push`), `@prismicio/client` Migration API, Vitest.

**Spec:** `Presencia de Urubots en redes y prensa 2026.pdf` (section PRENSA, 13 rows; the 36 social-media rows are out of scope).

## Global Constraints

- Prismic is the single source of truth for content (AGENTS.md): no press data hardcoded in components; `scripts/seed/` is a one-off loader only.
- Do NOT copy outlet articles. Each post has our own 2–4 sentence summary, the original headline as title, the outlet name, the date and a prominent link out (`target="_blank" rel="noopener noreferrer"`).
- Images: only photos the team owns or UTEC provides. Do not hotlink or re-host outlet images (copyright); the posts may be published without an image.
- Dates come from the page itself, not from the PDF when they differ (see Data notes).
- Facts stated in summaries must be the ones confirmed by at least two outlets: FIRA RoboWorld Cup 2026, Canada, 16–21 July 2026; UruBots (UTEC Rivera) won the "United" cooperation challenge of Autonomous Car Pro and finished 4th overall; Santiago Fernández and Gabriel da Silva are named.
- Locales: `en-us`, `es-ar`, `pt-br`. Headline stays in the original (Spanish) language in all three; summaries are translated.
- Writing to Prismic (push models, temporary write token, import) needs the user's go-ahead each time; delete the token afterwards; never publish the release.

## Link review (what was checked)

| # | PDF date | Outlet | Kind | Reachable? | Page title / date seen | Needs |
|---|---|---|---|---|---|---|
| 1 | 08/06 | Desayunos Informales (Canal 12) | YouTube | yes, embeddable (oEmbed) | "Estudiantes de UTEC desarrollan robots de alta tecnología" | upload date |
| 2 | 09/06 | El País | article | **blocked** for our fetch tool | – | team: headline, date, 2-line summary |
| 3 | 08/06 | FIX TV | YouTube | yes, embeddable | "BUENAS NOTICIAS \| #URUGUAY AL MUNDIAL DE ROBÓTICA. El equipo Urubots va por la gloria" | upload date |
| 4 | 21/07 | la diaria | article | yes (paywall after first paragraphs) | "El 'mini Tesla' uruguayo ganó un desafío en el mundial de robótica realizado en Canadá", 21 jul 2026, Lucía Barrios | – |
| 5 | 22/07 | Diario Norte | article | yes | "Estudiantes de UTEC ganan prueba de cooperación entre vehículos autónomos en Mundial de Robótica", 22 jul 2026 | – |
| 6 | 23/07 | Diario Norte | article | yes | "Urubots obtuvo un primer puesto en Canadá en la competencia mundial de robótica", 23 jul 2026 | – |
| 7 | 25/07 | Telenoche (Canal 4) | article | yes (reads meter) | "El grupo Urubots de UTEC obtuvo el primer puesto en prueba de vehículos autónomos en Canadá", 25 jul 2026 | – |
| 8 | 04/08 | la diaria Radio | YouTube (segment at 6:41) | yes, embeddable | "la diaria Radio \| Martes 04 de agosto de 2026" | embed with `start=401`; confirm segment |
| 9 | 05/08 | Radio Equidad FM | Drive audio/video | **requires login** | file "Entrevista radio Fm Equidad.mpeg" | team: public link or upload to YouTube/SoundCloud |
| 10 | 05/08 | Radio Internacional AM | Drive audio/video | **requires login** | file "Urubots en Radio Internacional AM (2).mpeg" | same as 9 |
| 11 | 13/04 (PDF) | Montevideo Portal | article | yes | "Los estudiantes de la UTEC de Rivera que fueron distinguidos con primer premio en Canadá", **13.08.2026** | confirm date fix |
| 12 | 14/08 | Buenas Noticias | article | **page renders empty** for our tool | – | team: headline, date, 2-line summary |
| 13 | 18/08 | Todo Deporte y Noticias | article | **403 blocked** | – | team: headline, date, 2-line summary |

URL reconstruction: the PDF breaks URLs across lines. Items 6 and 12 were rejoined with a hyphen (`...-de-robotica-77979.html`, `...-que-no-para-de-crecer`); items 1, 3 and 8 YouTube IDs were rejoined (`W9ftt5onYDs`, `uHdOyfFDQwU`, `qezef09y3WY`) and all resolve. A direct `curl` of OpenGraph tags (og:image, published time) was not run; it was refused by the permission classifier, so that data is still unverified.

Data notes to confirm with the team: (a) item 11 is dated 13/04/2026 in the PDF but the article shows 13.08.2026 → use 2026-08-13; (b) Telenoche says the event was held "16 al 21 de junio" (it was July) and la diaria says "1º al 21 de julio" and "16 equipos" vs 17 elsewhere → do not repeat these in our summaries; (c) items 1, 3 and 2 are pre-trip coverage (June), items 4–13 are post-result coverage (July–August).

## Review Focus

- A post with no `source_url` (audio awaiting a public link) must not render an empty "Read original" button.
- A YouTube URL with a start offset (item 8) must embed at `start=401`; a non-YouTube `video_url` must render nothing, not a broken iframe.
- Posts ordered by `publication_date` (e.g. 2026-06-08 after 2026-08-18 in the list) even though Prismic `first_publication_date` is the import day.
- Existing 21 blog posts (no new fields) still render and sort correctly (fall back to `first_publication_date`).
- Dates render in the page locale (`es-ar`: "21 de julio de 2026", `en-us`: "July 21, 2026"), not in the server's timezone (a UTC date must not shift a day).
- Re-running the importer after a partial failure must not duplicate or abort (UID conflicts are skipped).

## File Structure

| File | Responsibility |
|---|---|
| `customtypes/blogpost/index.json` | New fields (via CLI): `post_kind`, `source_name`, `source_url`, `publication_date`, `video_url`. |
| `scripts/seed/press.seed.ts` | The 13 items: `{ id, date, outlet, kind, headline, url, videoUrl, summary: {en-us, es-ar, pt-br}, needsInput }`. |
| `scripts/seed/press.seed.test.ts` | Integrity tests. |
| `scripts/seed/toBlogpost.ts` (+ test) | `toBlogpostDocument(item, lang)`: Migration API payload with rich-text summary. |
| `scripts/seed/import-press.ts` | Idempotent importer (dry-run by default). |
| `src/lib/press.ts` (+ test) | `sourceBox(doc)`, `formatPostDate(iso, lang)`, `sortByPublication(docs)`, `youtubeEmbed(url)` (extends `src/lib/youtube.ts` with `start`). |
| `src/components/BlogItem/index.tsx` | Source box + video embed. |
| `src/components/SingleBlog/index.tsx`, `src/components/BlogList/index.tsx` | Show outlet + date, order by real date. |

---

### Task 1: Extend the `blogpost` model

**Files:** Modify `customtypes/blogpost/index.json`, `prismicio-types.d.ts` (generated)

**Interfaces:**
- Produces fields on `blogpost`: `post_kind` Select (`news`, `press`; default `news`), `source_name` Text, `source_url` Link (web), `publication_date` Date, `video_url` Link (web).

- [ ] **Step 1:** `prismic field add select post_kind --to-type blogpost --label "Post kind" --option news --option press --default-value news` and `field add text source_name`, `field add link source_url --allow web`, `field add link video_url --allow web`, `prismic field add date publication_date` (all `--to-type blogpost`; pass `--task-id`/`--user-intent`, run from the cached binary because `npx` is rewritten by the shell hook).
- [ ] **Step 2:** `prismic status` → Expected: `Differ: blogpost` only.
- [ ] **Step 3:** `yarn tsc --noEmit` → Expected: clean (types regenerated).
- [ ] **Step 4:** Ask the user, then `prismic push` → Expected: `Pushed 1 type(s)`. Commit models and types.

### Task 2: Press data and its integrity tests

**Files:** Create `scripts/seed/press.seed.ts`, `scripts/seed/press.seed.test.ts`

**Interfaces:**
- Produces: `export type PressItem = { id: string; date: string /* YYYY-MM-DD */; outlet: string; kind: 'article'|'video'|'audio'; headline: string | null; url: string | null; videoUrl: string | null; summary: Record<'en-us'|'es-ar'|'pt-br', string> | null; needsInput: string[] }` and `export const pressItems: PressItem[]` (13 entries).

- [ ] **Step 1: Write failing tests:** `has 13 items`; `ids unique and lowercase UID-safe`; `dates are real ISO dates between 2026-06-01 and 2026-08-31`; `item for Montevideo Portal is dated 2026-08-13`; `every YouTube item has a videoUrl that youtubeEmbedUrl accepts`; `items with needsInput empty have headline, summary in 3 locales and a url`; `no summary contains "16 equipos" or "junio"` (confirmed-fact guard).
- [ ] **Step 2:** `yarn test` → Expected: FAIL (module missing).
- [ ] **Step 3:** Fill `pressItems` from the table above. Items 2, 9, 10, 12, 13 get `needsInput` listing what the team must provide (headline/date/summary or a public link); their `summary` may be `null`. Item 8: `videoUrl` with `?start=401`.
- [ ] **Step 4:** `yarn test` → Expected: PASS. Commit.

### Task 3: Blogpost payload builder

**Files:** Create `scripts/seed/toBlogpost.ts`, `scripts/seed/toBlogpost.test.ts`

**Interfaces:**
- Consumes: `PressItem` (Task 2).
- Produces: `export function toBlogpostDocument(item: PressItem, lang: 'en-us'|'es-ar'|'pt-br')` returning `{ type: 'blogpost', lang, uid, data }` with `title` (headline), `paragraph` and `content` as Prismic rich text (one paragraph block), `post_kind: 'press'`, `source_name`, `source_url` / `video_url` as `{link_type:'Web', url}` or `{link_type:'Any'}`, `publication_date` (ISO date), `meta_title`, `meta_description`.

- [ ] **Step 1: Failing tests:** uid is `prensa-<date>-<outlet-slug>` lowercase; `lang` respected and summary taken from that locale; `publication_date` equals item date; missing url → `{ link_type: 'Any' }`; items without `summary` throw (cannot be imported before the team fills them).
- [ ] **Step 2–4:** run (FAIL) → implement → run (PASS). Commit.

### Task 4: Render source box, embed and real-date ordering

**Files:** Create `src/lib/press.ts`, `src/lib/press.test.ts`; modify `src/lib/youtube.ts` (+ test), `src/components/BlogItem/index.tsx`, `src/components/SingleBlog/index.tsx`, `src/components/BlogList/index.tsx`

**Interfaces:**
- Produces: `formatPostDate(iso: string, lang: string): string`; `sortByPublication<T extends { data: { publication_date?: string | null }; first_publication_date: string }>(docs: T[]): T[]` (newest first, falls back to `first_publication_date`); `youtubeEmbedUrl(url, {start?})` keeps `start` from `?start=`/`?t=`.

- [ ] **Step 1: Failing tests:** `formatPostDate('2026-07-21','es-ar')` → `21 de julio de 2026` and `('2026-07-21','en-us')` → `July 21, 2026` independent of TZ (use `timeZone: 'UTC'`); `sortByPublication` puts a 2026-08-18 press post before a 2025-09-03 blog post whose `first_publication_date` is newer than the press import day; `youtubeEmbedUrl('https://www.youtube.com/watch?v=qezef09y3WY&t=401s')` → `.../embed/qezef09y3WY?start=401`.
- [ ] **Step 2–3:** run (FAIL) → implement.
- [ ] **Step 4:** `BlogItem`: when `source_url` is filled show a box "{source_name} · {formatted date}" with a button to the original (labels from Prismic: add two Text fields `read_original_label` and `watch_label`? **Ruling needed**: reuse the existing `meta` fields or add label fields; recommended: add `source_label` Text on the post so the button text is editor-controlled). When `video_url` is a valid YouTube URL render a 16:9 iframe.
- [ ] **Step 5:** Verify in dev: `/es-ar/blog/<uid>` for a press post and an old post; list order; dark mode; 375px width. Commit.

### Task 5: Idempotent importer and load

**Files:** Create `scripts/seed/import-press.ts`

- [ ] **Step 1:** Mirror `import-publications.ts`: dry run by default (prints counts and the items still `needsInput`), `--apply` creates one migration per document, skips `already exists`.
- [ ] **Step 2:** Dry run → Expected: `N items x 3 locales` with N = items ready (8 of 13 until the team supplies the rest).
- [ ] **Step 3:** With the user's approval: create a temporary write token, run `--apply`, delete the token. Documents land in the migration release, unpublished.
- [ ] **Step 4:** User reviews and publishes the release in Prismic. Re-run the importer later for the 5 pending items once their data is filled.

### Task 6: Verification

- [ ] `yarn test`, `yarn tsc --noEmit`, `yarn lint`, `RESEND_API_KEY=dummy yarn build` → Expected: all pass.
- [ ] After publishing: check `/en-us/blog`, `/es-ar/blog`, `/pt-br/blog` order and one post per kind (article, YouTube, audio-less).

## Open questions for the team (blocking items 2, 9, 10, 12, 13)

1. El País, Buenas Noticias, Todo Deporte: headline, exact publication date and a 2-line summary (or paste the text; our tools cannot read these sites).
2. Radio Equidad FM and Radio Internacional AM: set the Drive files to "anyone with the link" or upload them to YouTube/SoundCloud; confirm they may be published.
3. Confirm the Montevideo Portal date (13/08/2026) and that the la diaria segment is at minute 6:41.
4. Which team photo (if any) goes as the cover of press posts.
5. Do the 36 social-media rows also go on the site (e.g. an Instagram embed gallery)? Out of scope here.

## Self-review

- Spec coverage: 13 PRENSA rows → Task 2 (all 13 listed), blocked ones tracked via `needsInput`; format "como blog" → Tasks 1, 3, 4; loading → Task 5.
- Types: `PressItem` (T2) is what `toBlogpostDocument` consumes (T3); `youtubeEmbedUrl` extension (T4) is used by T2's test, so T4's `start` change must land with a backward-compatible signature (default options).
- Proportion: code is described by signatures and test assertions, not bodies.
