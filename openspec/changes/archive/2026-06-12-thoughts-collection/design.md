## Context

The `blog`/`projects` collections were defined but empty, and the section pages were placeholders. Josh wants a minimal list-and-read experience and a better name than "blog". Thoughts and Projects share the same shape (a list of entries → a content page), so the listing card and the entry page should be built so Projects can reuse them directly.

## Goals / Non-Goals

**Goals:**
- Rename blog → Thoughts everywhere a user or author sees it (nav, route, folder)
- A reusable `EntryCard` list row: minimal, fully clickable, separated by hairline dividers
- Clean, hyphenated entry URLs (`/thoughts/<slug>`) generated from filenames
- Entries render through the existing `ProseLayout`

**Non-Goals:**
- Tags, pagination, or RSS (can come later)
- A visible page title on the listing — the footer already shows location and the cards carry the content

## Decisions

**Rename the collection rather than alias it**
`blog` becomes `thoughts` in `content.config.ts` and the content folder is renamed. A single rename keeps `getCollection('thoughts')` and the route name aligned; there is no content to migrate (the collection was empty).

**`EntryCard` is a single `<a>`, styled in `global.css`**
The whole row is the link target (large tap area, no nested interactive elements, no separate arrow affordance — the pointer cursor and a title underline on hover signal clickability). Like the footer and prose, the styles live in `global.css` to survive `ClientRouter` head swaps. The card supports an optional `date` (shown bottom-right for Thoughts) and an `external` flag (used by Projects in a later change) that adds `target=_blank` / `rel=noopener`.

**Plain list with hairline dividers over bordered cards**
The listing iterated from a glass-bordered card to a plain, chrome-light list: rows separated by a full-width 2px divider in the glass-border color (`color-mix(in srgb, CanvasText 12%, transparent)`), applied via `.entry-card + .entry-card { border-top }` so dividers fall only between items. This keeps the reading surface and the index visually quiet, consistent with the minimal aesthetic.

**Slugs come from filenames via `entry.id`, using hyphens**
`getStaticPaths` maps `entry.id` (the glob loader's filename-derived id) to `params.slug`. Authoring `hello-world.md` yields `/thoughts/hello-world` — clean and conventional. Hyphens are used rather than the `+` from the original sketch, because `+` is a literal character in a URL path segment, not a space.

**`[...slug]` rest route over `[slug]`**
A rest param tolerates nested content folders later without a routing change; for flat files it behaves identically.

## Risks / Trade-offs

- [No visible heading on the listing could read as bare] → Mitigated by the persistent footer (which shows "thoughts" active) and the cards themselves; keeps the minimal aesthetic intact.
- [Card glass over arbitrary page scroll position] → The card uses the same backdrop-filter recipe as the footer, already validated in both light and dark mode.
