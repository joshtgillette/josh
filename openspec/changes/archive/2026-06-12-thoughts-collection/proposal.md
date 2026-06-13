## Why

The writing section was scaffolded as "blog" with an empty collection and a placeholder page. Josh wants a warmer name — **Thoughts** — and a real list-and-read experience: a list of entries, each clickable through to its rendered Markdown content, in the site's minimal glass aesthetic. This change establishes the reusable listing pattern (the glass `EntryCard`) that Projects will also use.

## What Changes

- Rename the `blog` Content Collection to `thoughts` (folder `src/content/blog/` → `src/content/thoughts/`); schema unchanged (`title`, `date`, `description`)
- Update the footer nav: `/blog` "blog" → `/thoughts` "thoughts" (both the SSR links and the client-side `hrefs` array)
- Add `EntryCard.astro`: a reusable, fully-clickable list row (title + description + optional date) — the whole row is the link
- Add `/thoughts` listing page rendering entries (newest first) as a plain list separated by full-width 2px hairline dividers (in the glass-border color, `CanvasText 12%`), with an empty state
- Add `/thoughts/[...slug]` entry page rendering each entry's Markdown through `ProseLayout` at clean, hyphenated URLs (e.g. `/thoughts/hello-world`)
- Seed `src/content/thoughts/hello-world.md` and `src/content/thoughts/on-minimalism.md`
- Remove the old `/blog` page and the empty `blog` collection placeholder

## Capabilities

### New Capabilities

- `entry-cards`: A reusable, fully-clickable `EntryCard` list row for listing collection entries, separated by hairline dividers, reused by Thoughts and Projects

### Modified Capabilities

- `content-collections`: The `blog` collection is renamed to `thoughts`
- `pages`: A `/thoughts` listing and `/thoughts/<slug>` entry pages replace the placeholder `/blog` page
- `bottom-nav`: The middle nav item points to `/thoughts` labelled "thoughts"

## Impact

- New component: `src/components/EntryCard.astro`
- New pages: `src/pages/thoughts/index.astro`, `src/pages/thoughts/[...slug].astro`
- New content: `src/content/thoughts/hello-world.md`, `src/content/thoughts/on-minimalism.md`
- Modified: `src/content.config.ts` (collection rename), `src/components/Footer.astro` (nav), `src/styles/global.css` (adds `.entry-card` glass styles)
- Removed: `src/pages/blog/index.astro`, `src/content/blog/.gitkeep`
