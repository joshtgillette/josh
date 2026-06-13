## Context

The site renders everything through `BaseLayout` (HTML shell, `#scroll-root`, persistent footer). It had no content layer for prose. Thoughts entries, Project entries, and the Me page all need the same reading treatment, so the typography and article wrapper must be built once and reused. The design goal is deliberately minimal: text on background, no cards or chrome on the reading surface itself.

## Goals / Non-Goals

**Goals:**
- One reusable layout (`ProseLayout`) for every Markdown reading page
- Prose typography that reads well and adapts to light/dark from a single set of rules
- Markdown authoring for the Me page so content is trivial to edit

**Non-Goals:**
- Syntax highlighting themes (Astro's default Shiki output is left as-is)
- A `pages` content collection for the Me page — a single loose Markdown import is simpler than a one-entry collection

## Decisions

**`ProseLayout` wraps `BaseLayout` rather than replacing it**
The reading layout only adds the `<article class="prose">` wrapper plus an optional `<header>` (heading + formatted date). It delegates the HTML shell, footer, and scroll isolation to `BaseLayout`, keeping a single source of truth for the page chrome.

**Optional `heading`/`date` props instead of always rendering a title**
The Me page leads with its own prose and needs no title block, while Thoughts/Projects entries (later changes) want a visible title and date. Making `heading` and `date` optional lets the same layout serve both: omit them for Me, pass them for entries.

**Prose CSS in `global.css`, scoped under `.prose`**
Consistent with the footer decision: Astro's `ClientRouter` swaps `<head>` on navigation, and component-scoped `<style>` blocks flash on each swap. A `.prose` class in the shared global stylesheet survives head merges and is reused by every consumer of `ProseLayout`.

**Me content as a loose Markdown import, not a collection**
`src/content/me.md` is imported directly (`import { Content } from '../content/me.md'`) and rendered. A single page does not justify a typed collection; a plain Markdown file is the easiest possible authoring surface.

## Risks / Trade-offs

- [Loose Markdown in `src/content/` sits beside the collection folders] → Harmless: the `blog`/`projects` glob loaders use explicit base directories, so `me.md` is never picked up by a collection. Acceptable for the simplicity of a direct import.
- [Prose type scale is tuned by eye, not a system] → Acceptable for a personal site; values live in one place and are easy to adjust.
