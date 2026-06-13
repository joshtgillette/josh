## 1. Collection Rename

- [x] 1.1 Rename `blog` → `thoughts` in `src/content.config.ts` and update the `collections` export
- [x] 1.2 Rename the content folder `src/content/blog/` → `src/content/thoughts/`
- [x] 1.3 Remove the old `src/content/blog/.gitkeep`

## 2. Navigation

- [x] 2.1 Update `Footer.astro` SSR links: `/blog` "blog" → `/thoughts` "thoughts"
- [x] 2.2 Update the client-side `hrefs` array in `Footer.astro` to `['/', '/thoughts', '/projects']`

## 3. Entry Card

- [x] 3.1 Create `src/components/EntryCard.astro` (single `<a>`, title + description + optional date, no arrow; optional `external` flag for `target=_blank`)
- [x] 3.2 Add `.entry-card` list-row styles + 2px hairline dividers (`.entry-card + .entry-card`) + `.entry-list`/`.entry-empty` to `global.css`

## 4. Thoughts Pages

- [x] 4.1 Create `src/pages/thoughts/index.astro` listing entries newest-first as `EntryCard`s, with an empty state
- [x] 4.2 Create `src/pages/thoughts/[...slug].astro` rendering each entry through `ProseLayout` via `getStaticPaths` + `render`
- [x] 4.3 Remove the old `src/pages/blog/index.astro`

## 5. Seed & Verify

- [x] 5.1 Seed `src/content/thoughts/hello-world.md` and `src/content/thoughts/on-minimalism.md`
- [x] 5.2 Verify `npm run build` generates `/thoughts/index.html` and `/thoughts/hello-world/index.html`
