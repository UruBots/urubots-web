# Urubots Web

Official website for **Urubots**, a robotics team. Built with [Next.js](https://nextjs.org/) (App Router) and powered by [Prismic](https://prismic.io/) as a headless CMS.

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Framework    | [Next.js 13](https://nextjs.org/) (App Router, `src/app/[lang]/`) |
| Language     | TypeScript                                                        |
| CMS          | Prismic (headless) via `@prismicio/client`, `@prismicio/react`, `@prismicio/next` |
| CMS UI       | Slice Machine (`slice-machine-ui`)                                 |
| Styling      | Tailwind CSS + styled-components                                  |
| i18n         | Multi-language via `[lang]` route segment — `en-us`, `es-ar`, `pt-br` |
| Components   | Storybook                                                          |
| Email        | Resend (contact form)                                              |
| Analytics    | Google Analytics via `@next/third-parties`                        |
| Carousel     | Swiper                                                             |
| Dark mode    | `next-themes` (`class` strategy)                                   |

## Requirements

- Node.js `22.x` (see `engines` in `package.json`)
- A Prismic repository

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Prismic

Set your repository name in [`slicemachine.config.json`](./slicemachine.config.json):

```json
{
  "repositoryName": "urubots",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./src/slices"],
  "localSliceSimulatorURL": "http://localhost:3000/slice-simulator"
}
```

### 3. Configure environment variables

Create a `.env.local` file with the following variables:

| Variable                          | Required | Description                                        |
| --------------------------------- | -------- | -------------------------------------------------- |
| `RESEND_API_KEY`                  | Yes      | API key for the contact form (see `src/app/api/send/route.ts`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | No       | Google Analytics measurement ID                    |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the Next.js dev server                |
| `npm run build`     | Build for production                        |
| `npm run start`     | Serve the production build                  |
| `npm run export`    | Static export                               |
| `npm run lint`      | Run ESLint                                  |
| `npm run slicemachine` | Launch Prismic Slice Machine UI           |
| `npm run storybook` | Start Storybook on `http://localhost:6006`  |
| `npm run build-storybook` | Build Storybook static site             |

## Dev Container

A [Dev Container](https://containers.dev/) is included in `.devcontainer/`. It pre-installs dependencies and the [OpenCode](https://opencode.ai/) CLI, and configures git to push over SSH. See [`.devcontainer/README.md`](./.devcontainer/README.md) for setup and SSH prerequisites.

## Project Structure

```
src/
├── app/[lang]/              # Pages (App Router, one folder per page)
│   ├── page.tsx             # Homepage
│   ├── about/page.tsx
│   ├── award/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[uid]/page.tsx
│   ├── competition/[name]/page.tsx
│   ├── contact/page.tsx
│   ├── donations/page.tsx
│   ├── gallery/page.tsx
│   ├── research/page.tsx
│   ├── team/page.tsx
│   └── urucup/page.tsx
├── app/slice-simulator/     # Slice Machine simulator page
├── components/              # Reusable React components
│   ├── Layout/              # Main layout (Header + Footer + children)
│   ├── Header/
│   ├── Footer/
│   ├── Common/              # Shared UI (SectionTitle, ScrollToTop, etc.)
│   ├── Utils/MenuItems.tsx  # Navigation menus per locale
│   └── types/               # TypeScript interfaces
├── slices/                  # Prismic Slice components (auto-registered in index.ts)
├── lib/getLocales.tsx       # Helper to resolve a document's available locales
├── prismicio.ts             # Prismic client factory + route resolver
└── middleware.tsx           # Locale detection/redirect middleware

customtypes/                 # Prismic Custom Type JSON schemas
slicemachine.config.json     # Slice Machine configuration
```

## i18n

The site is localized through the `[lang]` route segment. Supported locales:

- `en-us`
- `es-ar`
- `pt-br`

Locale detection and redirect are handled by [`src/middleware.tsx`](./src/middleware.tsx), which reads the available locales from the Prismic repository. Navigation menus are defined per locale in [`src/components/Utils/MenuItems.tsx`](./src/components/Utils/MenuItems.tsx).

## Content Model

Content is managed in Prismic. Custom types live in `customtypes/`:

`homepage`, `about`, `blog`, `blogpost`, `award`, `team`, `contact`, `research`, `donations`, `gallery`, `competition`, `urucup`, `menu`, `tabs`.

Slices live in `src/slices/` and are wired to Prismic via `src/slices/index.ts`.

## Key Conventions

- Always query Prismic with the `lang` route parameter.
- Always wrap page content in `<Layout locales={...} navigation={...}>`.
- Use `createClient()` from `@/prismicio` — never instantiate a Prismic client directly.
- Use `@prismicio/react` components (`PrismicRichText`, `PrismicImage`, `PrismicLink`) for Prismic fields.
- Export `generateStaticParams` in every page with `lang: '*'`.
- Use Tailwind utility classes for new code.
- Path alias `@/` maps to `src/`.

## Deployment

This is a standard Next.js app and can be deployed to [Vercel](https://vercel.com/) or any Node.js host. Make sure the environment variables from above are set in the target environment, and enable [Prismic previews](https://prismic.io/docs/previews) for draft content.

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for details.
