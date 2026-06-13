## Why

The site had a base layout and navigation but no way to render written content. Before building the Thoughts and Projects sections, the site needs a single, reusable layout for displaying Markdown as clean, minimal "text on background" reading pages — and the Me page (`/`) is its first, simplest consumer.

## What Changes

- Add `ProseLayout.astro`: a content layout that wraps `BaseLayout`, renders an `<article class="prose">`, and accepts an optional visible heading and date for entry-style pages
- Add minimal prose typography to `global.css` (scoped under `.prose`) — headings, links, lists, images, blockquotes, code, and `hr`, all derived from the existing `Canvas`/`CanvasText` system colors so light/dark needs no branching
- Author the Me page content as editable Markdown (`src/content/me.md`) and render it on `/` through `ProseLayout`, replacing the empty placeholder

## Capabilities

### New Capabilities

- `content-rendering`: A reusable `ProseLayout` and prose typography for rendering Markdown content as minimal reading pages

### Modified Capabilities

- `pages`: The home page (`/`) renders real Markdown "me" content via `ProseLayout` instead of an empty placeholder

## Impact

- New layout: `src/layouts/ProseLayout.astro`
- New content: `src/content/me.md`
- Modified: `src/pages/index.astro` (renders `me.md` through `ProseLayout`)
- Modified: `src/styles/global.css` (adds `.prose` typography — kept here, not in component `<style>`, to survive ClientRouter head swaps)
