## 1. Schema

- [x] 1.1 Remove the optional `url` field from the `projects` schema in `src/content.config.ts`

## 2. Projects Pages

- [x] 2.1 Rewrite `src/pages/projects/index.astro` to list entries (alphabetical by title) as `EntryCard`s with no date, plus an empty state
- [x] 2.2 Create `src/pages/projects/[...slug].astro` generating a content page for every project via `getStaticPaths` + `render`

## 3. Entry Card

- [x] 3.1 Simplify `EntryCard.astro` to a plain list row (remove the `external` prop and `↗` indicator); remove `.entry-card-ext` from `global.css`

## 4. Seed & Verify

- [x] 4.1 Seed `src/content/projects/field-notes.md` and `src/content/projects/scratchpad.md`
- [x] 4.2 Remove `src/content/projects/.gitkeep`
- [x] 4.3 Verify the build generates `/projects` and a `/projects/<slug>` page for each project, with no `↗` indicator
