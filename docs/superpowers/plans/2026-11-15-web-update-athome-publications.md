# Web Update (Publications, @Home OPL page, English default) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring urubots.uy up to the RoboCup@Home OPL 2027 qualification requirements (deadline **2026-12-06 23:59 GMT**) and fix the publication/link defects found in the audit.

**Architecture:** Publications become a typed, locale-independent data module (`src/data/publications.ts`) rendered by a new component on the existing `/research` page, instead of ~28 × 3 hand-typed Prismic slice items. A new code-owned, English-only `/[lang]/athome` page carries the qualification materials. The default locale becomes `en-us` through one constant shared by middleware and menu. Content-only fixes (typos, awards, team roles) are Prismic edits listed in Task 9, not code.

**Tech Stack:** Next.js 13.4 (App Router), Prismic, Tailwind, TypeScript (strict: false), Vitest (new, for pure-data tests only).

**Spec:** `WEB_URUBOTS_FALTANTES.txt` (the audit; §3 requirements REQ-01..10, §4.1 priorities, §4.2 table, §4.3 BibTeX, §4.4 English block, §4.5 team-supplied items). Keep it in the repo as `docs/WEB_URUBOTS_FALTANTES.txt` (Task 1).

## Global Constraints

- Locales are exactly `en-us`, `es-ar`, `pt-br`; new menu entries must be added to ALL three (AGENTS.md).
- Real routes are `/research`, `/award`, `/donations` — NOT `/tdps`, `/awards` as the audit calls them. Do not rename routes (Prismic route resolver + existing links); rename only menu *titles*.
- Pages: use `createClient()`, `getMenuItems(lang)`, `getLocales(page, client)`, wrap in `<Layout>`, export `generateStaticParams` (AGENTS.md).
- Tailwind for new code; no refactor of styled-components code.
- Never publish any value marked `POR CONFIRMAR` in the audit as if it were fact. Unconfirmed fields are `null` in data and omitted from the UI.
- `/athome` content is English only, regardless of `lang`.
- Qualification deliverables the team owns (photos, YouTube URL, TDP PDF, PI/Leader/Contact names, image consents) are NOT invented; they are config constants that render only when set (see audit §4.5).
- Deadline: P0 tasks (1–6) must be deployed by **2026-12-04** to leave margin before the Google Form.

- **Prismic tooling (Slice Machine is deprecated, docs updated 2026-10-15):** existing projects still work, so this plan creates NO new slices or custom types and does NOT run `npx prismic init` before the deadline. Do not run `yarn slicemachine` / push model changes as part of this work. Migration is a separate post-deadline task (Task 11).

## Review Focus

- A publication with `venue: null`/`doi: null` (many are POR CONFIRMAR) must render without "null", empty badges or broken buttons.
- Duplicates #5==#19 and #9==#20 must appear once; arXiv IDs must be unique across the dataset.
- Authors containing accents/ö (`Dörnbach`) and BibTeX special characters must survive rendering and BibTeX copy.
- `/athome` with no video URL / no photos configured must hide those blocks, not render an empty iframe or broken `<img>`.
- Visiting `/` and `/about` (no locale prefix) must now land on English; `/es-ar/...` and `/pt-br/...` must still work and the language switcher must still link correctly.
- A trailing-slash or unknown path under middleware must not loop or 404 `/_next` assets.

---

## File Structure

| File | Responsibility |
|---|---|
| `docs/WEB_URUBOTS_FALTANTES.txt` | Spec copy (moved from repo root context). |
| `vitest.config.ts`, `package.json` | Test runner (`yarn test`). |
| `src/data/publications.ts` | `Publication` type + `publications` array (single source of truth). |
| `src/data/publications.test.ts` | Integrity tests (unique IDs, no dupes, required fields). |
| `src/lib/bibtex.ts` (+ `.test.ts`) | `toBibtex(p: Publication): string`. |
| `src/components/PublicationsList/index.tsx` | Client component: filter (All/Papers/TDPs), year groups, cards, copy-BibTeX. |
| `src/lib/locales.ts` (+ `.test.ts`) | `DEFAULT_LOCALE`, `LOCALES`, `withLocalePrefix`. |
| `src/middleware.tsx` | Uses `DEFAULT_LOCALE`. |
| `src/components/Utils/MenuItems.tsx` | Prefix all `es-ar` paths, add @Home entry. |
| `src/config/athome.ts` | Team-supplied qualification data (nullable). |
| `src/app/[lang]/athome/page.tsx` | English-only @Home OPL page. |
| `src/components/AtHome/*` | `QualificationMaterials`, `RobotGallery`, `PlatformSummary`, `OpenSourceRepos`, `TeamRoles`. |
| `src/components/Footer/index.tsx` | Add RoboCup@Home + GitHub links. |

---

### Task 1: Test tooling and spec copy

**Files:**
- Create: `vitest.config.ts`, `docs/WEB_URUBOTS_FALTANTES.txt`
- Modify: `package.json` (add `"test": "vitest run"`; devDependency `vitest`)

**Interfaces:**
- Produces: `yarn test` command; `@/` alias resolvable inside tests.

- [ ] **Step 1:** Copy the audit text to `docs/WEB_URUBOTS_FALTANTES.txt`.
- [ ] **Step 2:** `yarn add -D vitest` (repo has both `yarn.lock` and an untracked `package-lock.json`; use yarn and do not commit `package-lock.json`).
- [ ] **Step 3:** `vitest.config.ts` with `resolve.alias: { '@': path.resolve(__dirname, 'src') }`, `environment: 'node'`.
- [ ] **Step 4:** Run `yarn test` → Expected: "No test files found" (exit ok with `--passWithNoTests` in the script).
- [ ] **Step 5:** Commit `chore: add vitest and audit doc`.

### Task 2: Publications data module (fixes the crossed link)

**Files:**
- Create: `src/data/publications.ts`, `src/data/publications.test.ts`

**Interfaces:**
- Produces:
```ts
export type PublicationKind = 'paper' | 'tdp';
export interface Publication {
  id: string;                 // "arxiv-2411.05011" or "doi-10.1007-..." slug, unique
  kind: PublicationKind;
  year: number;
  title: string;              // exact title from audit §2
  authors: string[];
  venue: string | null;       // null when POR CONFIRMAR
  status: 'published' | 'accepted' | 'preprint';
  summary: string;            // 1-line, English (translate audit's Spanish line)
  arxiv: string | null;       // "2411.05011"
  doi: string | null;         // full DOI URL, only if verified in audit
  pdf: string | null;
  bibtexKey: string | null;
}
export const publications: Publication[];
```

- [ ] **Step 1: Write failing tests** in `publications.test.ts`:
  - `ids are unique`; `arxiv ids are unique`
  - `every entry has a title, ≥1 author, year between 2022 and 2026, and at least one of arxiv/doi`
  - `contains exactly 28 entries` (21 unique list works + 7 SUG; audit §4.2) — **count #9/#20 and #5/#19 once**
  - `arxiv 2411.05011 title starts with "De la Extensión"` and `arxiv 2410.17453 title contains "Clearpath Husky A200"` (regression for the crossed link, audit §1.4)
  - `no entry has the string "POR CONFIRMAR" in any field`
- [ ] **Step 2:** Run `yarn test` → FAIL (module missing).
- [ ] **Step 3:** Populate `publications` from audit §4.2 (it is column-delimited by ` | `: ID, estado, año, tipo, título, autores, sede, url, resumen). Map `Paper`→`paper`, `TDP`→`tdp`; "Accepted at …"→`status: 'accepted'`; strip "POR CONFIRMAR" text and set the field `null`. `pdf` defaults to `https://arxiv.org/pdf/<arxiv>` when arxiv set. Keep original diacritics for titles/authors (audit §4.3 BibTeX has the accented forms).
- [ ] **Step 4:** `yarn test` → PASS.
- [ ] **Step 5:** Commit `feat: add typed publications dataset`.

### Task 3: BibTeX generation

**Files:** Create `src/lib/bibtex.ts`, `src/lib/bibtex.test.ts`

**Interfaces:**
- Consumes: `Publication` (Task 2).
- Produces: `export function toBibtex(p: Publication): string`

- [ ] **Step 1: Failing tests:** for arxiv 2410.07209 output contains `@inproceedings{`, `title = {Behavior Cloning for Mini Autonomous Car Path Following}`, `and Ricardo Bedin Grando` joined with ` and `; entry with `doi: null` has no `doi =` line; `ö` is emitted as `{\"o}`; `kind: 'tdp'` emits `@techreport`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `toBibtex`; entry type: `tdp`→`@techreport`, `venue` matching /URUCON|LARS|INDIN|ICCAS|DATA|SBR/→`@inproceedings`, else `@article`. Escape accents via a small map (á é í ó ú ñ ö ç ã õ ê).
- [ ] **Step 4:** Run → PASS. **Step 5:** Commit `feat: bibtex export`.

### Task 4: Publications UI on `/research`

**Files:**
- Create: `src/components/PublicationsList/index.tsx` (`'use client'`)
- Modify: `src/app/[lang]/research/page.tsx` (render `<PublicationsList lang={lang} />` after `<SliceZone/>`), `src/components/Utils/MenuItems.tsx` (title `TDPs` → `Publications` / `Publicaciones` / `Publicações`, all three locales)

**Interfaces:**
- Consumes: `publications`, `toBibtex`.
- Produces: `export function PublicationsList({ lang }: { lang: string })`.

- [ ] **Step 1:** Component: filter tabs `All | Scientific papers | TDPs` (labels per `lang` from a local `const labels: Record<string, {...}>`); group by year desc; per card: title, authors, venue + status badge (omit when null), summary, buttons PDF / arXiv / DOI (omit when null) / "Copy BibTeX" (`navigator.clipboard.writeText(toBibtex(p))`). Follow styles of `src/components/ResearchPublications/index.tsx`.
- [ ] **Step 2:** Edit research page; the existing `research_publications` slice on the Prismic doc must be removed by the team (it would duplicate; note in Task 9).
- [ ] **Step 3:** Verify: `yarn tsc --noEmit` clean for touched files; `yarn dev`, open `/en-us/research`: 28 cards, filter works, TDP count = 8 (3 FIRA24 + 2025 ×3 … confirm against dataset), both Husky and "De la Extensión" links open the right arXiv docs; test in dark mode and at 375px width.
- [ ] **Step 4:** Commit `feat: publications list on research page`.

### Task 5: English as default locale

**Files:**
- Create: `src/lib/locales.ts`, `src/lib/locales.test.ts`
- Modify: `src/middleware.tsx`, `src/components/Utils/MenuItems.tsx`

**Interfaces:**
- Produces:
```ts
export const LOCALES = ['en-us','es-ar','pt-br'] as const;
export const DEFAULT_LOCALE = 'en-us';
export function hasLocalePrefix(pathname: string): boolean;
```

- [ ] **Step 1: Failing tests:** `hasLocalePrefix('/en-us')`, `('/es-ar/about')` true; `('/about')`, `('/')`, `('/es-arx')` false.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement and use in middleware instead of `locales[0]` from Prismic (keep the `getRepository` call out of the hot path — it is currently an API round-trip per request; drop it).
- [ ] **Step 4:** In `MenuItems.tsx` the `es-ar` entries use unprefixed paths (`/`, `/about`…). Prefix with `/es-ar` (`/es-ar`, `/es-ar/about`, …) so Spanish no longer depends on being default; en-us paths stay as-is.
- [ ] **Step 5:** Verify manually: `/` → English home; `/about` → English; `/es-ar/about`, `/pt-br/about` render; language switcher in Header still navigates (it uses `locale.url` from Prismic route resolver — check `routes` in `src/prismicio.ts` yields prefixed URLs for es-ar; if the resolver produces unprefixed es-ar URLs, fix the route `path` to `/:lang?` semantic accordingly). Check `_next/static` assets still load.
- [ ] **Step 6:** Commit `feat: default locale en-us`. (Also fix contact form labels: `src/components/ContactForm/index.tsx:68-87` are hard-coded English; leave English, but translate `Enviar` button per locale—see Task 9 if the labels come from props.)

### Task 6: `/athome` page (REQ-02..07, 10)

**Files:**
- Create: `src/config/athome.ts`, `src/app/[lang]/athome/page.tsx`, `src/components/AtHome/{QualificationMaterials,RobotGallery,PlatformSummary,OpenSourceRepos}/index.tsx`
- Modify: `src/components/Utils/MenuItems.tsx` (add `@Home` entry, id 9, path `/<locale>/athome`, all three locales)

**Interfaces:**
- Produces:
```ts
export interface AtHomeConfig {
  videoUrl: string | null;      // YouTube
  tdpPdfUrl: string | null;
  photos: { src: string; alt: string }[];   // files under public/images/athome/
  roles: { pi: Person | null; leader: Person | null; contact: Person | null };
}
export interface Person { name: string; url?: string; email?: string }
export const atHomeConfig: AtHomeConfig;   // all null/[] initially
export const OFFICIAL_LEAGUE_URL = 'https://athome.robocup.org/';
export const REPO_URL = 'https://github.com/ShiiSuii/base_athome';
export const ORG_URL = 'https://github.com/UruBots';
```

- [ ] **Step 1:** Page: `generateStaticParams` returns the three locales (`LOCALES.map(lang => ({ lang }))`). Since there is no Prismic `athome` doc, obtain `locales` for `<Layout>` from the **homepage** doc (`getByUID('homepage','homepage',{lang})` + `getLocales`) — Header reads `locales[0].lang`, so it cannot be empty. Language switcher will point to the homepage in other languages; acceptable.
- [ ] **Step 2:** `QualificationMaterials`: links TDP PDF / video embed (reuse `src/components/YoutubeEmbed`) / repo / league site; each hidden when its config value is null.
- [ ] **Step 3:** `PlatformSummary`: paste the English block of audit §4.4 as structured sections (Mobile Base & Navigation, Torso & Manipulation, Head & HRI, Distributed Compute, Safety & Evidence Note). Keep the evidence note verbatim: simulation-only results (SIM_PASS) do not demonstrate physical safety.
- [ ] **Step 4:** `OpenSourceRepos`: table from audit §4.1 item 4 (package list, Apache-2.0). `RobotGallery`: renders `photos`, nothing when empty.
- [ ] **Step 5:** Add `@Home` menu entries (3 locales). Metadata: `title: 'RoboCup@Home OPL 2027 — UruBots'`.
- [ ] **Step 6:** Verify: `/en-us/athome`, `/es-ar/athome`, `/pt-br/athome` all render the same English content, no empty blocks with config nulls; set a dummy video/photo locally and confirm they appear, then revert.
- [ ] **Step 7:** Commit `feat: RoboCup@Home OPL page`.

### Task 7: Footer links and team roles block (REQ-07, 08, 10)

**Files:**
- Modify: `src/components/Footer/index.tsx` (add links to `OFFICIAL_LEAGUE_URL`; GitHub already present at the social row), create `src/components/AtHome/TeamRoles/index.tsx` and render it in the athome page.

- [ ] **Step 1:** `TeamRoles` shows "Principal Investigator / Team Leader / Contact Person" using `atHomeConfig.roles`; a role that is null renders nothing; if all three are null the whole block is hidden. PI name links to `url`.
- [ ] **Step 2:** Footer: add "RoboCup@Home" text link (`target="_blank" rel="noopener noreferrer"`).
- [ ] **Step 3:** Verify visually; commit `feat: footer league link and team roles`.

### Task 8: Pre-deploy verification

- [ ] `yarn test` (all pass), `yarn lint`, `yarn build` (static generation of all three locales including `/athome`).
- [ ] Run `yarn start`; walk every menu item in all locales; check no `null`/`undefined` text on `/research` and `/athome`.
- [ ] Open PR to `main` (branch from `main`; local `README.md`/`yarn.lock` modifications and untracked `package-lock.json` are unrelated—don't include).

### Task 9: Content checklist (Prismic / team, no code)

P1, after P0 deploy; owner = whoever has Prismic access.

- [ ] `/team` (all 3 locales): "Gabriel da Silvia" → "Gabriel da Silva"; translate role labels (Founder/Teacher/Programmer/Student).
- [ ] `/contact`: "Guido Machado Brun" → "Guido Machado Brum"; translate "Your Name/Email/Message" (hard-coded in `src/components/ContactForm/index.tsx:68-87` — small code change to take a `lang` label map) and "Enviar" for non-Spanish.
- [ ] Home: "Nuestros ultimos Posts" → "últimos"; blog post 3 "se preparapara" → "se prepara para".
- [ ] `/award`: add RoboCup 2025 (Salvador), FIRA 2025 (Daegu), FIRA 2026 (Canada) results; confirm wording with team (audit §4.1 item 5). Mention Nuremberg 2027 only if team confirms.
- [ ] `/research`: remove the old `research_publications` slice from the Prismic documents (all locales).
- [ ] Blog detail pages: audit says `/blog/<slug>` 404s; `src/app/[lang]/blog/[uid]` exists — reproduce first (may be an unpublished `blogpost` doc or a UID mismatch), then fix; not part of the qualification deadline.

### Task 10: Team inputs needed (blocking @Home completeness)

From audit §4.5; fill `src/config/athome.ts`: ≥3 robot photos in `public/images/athome/` (consents signed), YouTube qualification video URL, final TDP PDF (host in `public/`), PI/Team Leader/Contact names + PI web link, decision on merging `claude/home-41-piper-mission` into `main` of `ShiiSuii/base_athome` plus English README, and which preprints have confirmed venues/DOIs (then replace `null`s in `publications.ts`).

### Task 11 (post-deadline, after 2026-12-06): Migrate Slice Machine → Type Builder + Prismic CLI

Source: https://prismic.io/docs/slice-machine ("Migrate to the Type Builder"). Not required for qualification; do it on its own branch.

- [ ] **Step 1:** Ensure the working tree is clean and decide the lockfile (`yarn.lock` vs untracked `package-lock.json`). Start Slice Machine, "Review changes" → "Push" so Prismic has the latest models. Uncommitted local model changes are lost by the migration.
- [ ] **Step 2:** `npx prismic init --repo <repositoryName from slicemachine.config.json>`. Per the docs it replaces `slicemachine.config.json` with `prismic.config.json`, pulls models, uninstalls Slice Machine and `@slicemachine/adapter-next`, and installs Prismic packages / configures client and previews.
- [ ] **Step 3:** Review the diff before committing. Check specifically: `src/prismicio.ts` (the `routes` array and `createClient` options — cache tags, `enableAutoPreviews` — must survive), `src/slices/index.ts`, `customtypes/` and `src/slices/*/model.json` locations, `prismicio-types.d.ts`, preview API routes, and the `@prismicio/*` package versions against Next 13.4.13 (docs examples use newer Next APIs such as `PageProps`/two-arg `revalidateTag`; do not copy them blindly).
- [ ] **Step 4:** `yarn tsc --noEmit`, `yarn build`, open Prismic preview on one page per locale. Remove `slicemachine` script and `.storybook` references only if they depended on the adapter. Commit `chore: migrate to Prismic Type Builder`.

---

## Self-review notes

- Coverage: REQ-01 already met; REQ-02 → T5/T6; REQ-03/04 → T6/T10; REQ-05 → T6; REQ-06 → T2–T4; REQ-07 → T6/T7; REQ-08 → T7/T10; REQ-09 → T9; REQ-10 → T6/T7. Crossed link → T2 regression test.
- Audit caveats: it references `web_cualificacion/*.html` "in this branch" — not in this repo (checked `main`); T6 uses the inline English block in audit §4.4 instead. arXiv IDs and DOIs in the audit were not independently re-verified here; spot-check a few against arxiv.org before launch.
