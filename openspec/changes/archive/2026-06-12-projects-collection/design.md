## Context

Thoughts established the list-and-read pattern (`EntryCard` list, `ProseLayout` entries). Projects reuses it wholesale. Josh's direction was explicit: make Projects the same exact thing as Thoughts, just without the date — nothing fancy.

## Goals / Non-Goals

**Goals:**
- Reuse `EntryCard` and `ProseLayout` with no changes
- A Projects list visually identical to Thoughts, minus the date
- Every project opens its own content page

**Non-Goals:**
- External-link projects / a `url` field (removed — it pulled in app deep-linking and extra UI for no real benefit right now)
- Project ordering controls, thumbnails, tags

## Decisions

**Projects mirror Thoughts exactly, minus the date**
The listing maps each entry to an `EntryCard` linking to `/projects/<id>`; the only difference from Thoughts is that no `date` is passed, so no date renders. `EntryCard` stays a plain, fully-clickable list row — no external affordance.

**Drop the optional `url` field from the schema**
The original scaffold gave `projects` an optional `url`. Linking out introduced surprising behavior (e.g. `github.com` deep-linking into the GitHub app) and a special-case `↗` indicator. Removing `url` makes the `projects` schema mirror `thoughts` (`title` + `description`) and keeps every project a self-contained page.

**Alphabetical ordering by title**
Projects have no date, so the list sorts by `title` via `localeCompare` for a stable, predictable order without adding schema fields.

## Risks / Trade-offs

- [No way to link a project straight to an external repo/site] → Accepted for now; a project page can simply contain a link in its Markdown. An optional `url` can be reintroduced later if desired.
- [Seeds are placeholders] → `field-notes.md` and `scratchpad.md` are example content for Josh to replace.
