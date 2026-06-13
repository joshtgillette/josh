## Why

Projects was scaffolded with a typed collection and an empty placeholder page. Josh wants the same minimal list-and-read experience as Thoughts — exactly the same list, just without a date. This change builds the Projects section by reusing the `EntryCard` and `ProseLayout` from earlier changes, with no extra cleverness.

## What Changes

- Add `/projects` listing page rendering entries as the same plain, divider-separated list of `EntryCard`s (alphabetical by title), with an empty state — identical to Thoughts but with no date shown
- Add `/projects/[...slug]` entry pages for every project, rendering Markdown through `ProseLayout` at clean, hyphenated URLs
- Drop the unused optional `url` field from the `projects` schema so it mirrors Thoughts (just `title` + `description`)
- Seed `src/content/projects/field-notes.md` and `src/content/projects/scratchpad.md`
- Remove the `src/content/projects/.gitkeep` placeholder

## Capabilities

### New Capabilities

- `entry-cards`: Formalizes the reusable, fully-clickable `EntryCard` list row introduced for Thoughts and reused unchanged by Projects

### Modified Capabilities

- `content-collections`: The `projects` schema drops the optional `url` field
- `pages`: A `/projects` listing and `/projects/<slug>` entry pages replace the placeholder `/projects` page

## Impact

- New pages: `src/pages/projects/index.astro` (rewritten from placeholder), `src/pages/projects/[...slug].astro`
- Modified: `src/content.config.ts` (remove `url` from projects schema)
- New content: `src/content/projects/field-notes.md`, `src/content/projects/scratchpad.md`
- Removed: `src/content/projects/.gitkeep`
