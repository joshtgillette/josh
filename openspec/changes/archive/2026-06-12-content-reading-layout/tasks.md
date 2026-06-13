## 1. Prose Layout

- [x] 1.1 Create `src/layouts/ProseLayout.astro` wrapping `BaseLayout` with an `<article class="prose">`
- [x] 1.2 Accept optional `heading` and `date` props; render a `.prose-header` with `<h1>` and a formatted `<time>` when provided
- [x] 1.3 Render Markdown content via the default `<slot />`

## 2. Prose Typography

- [x] 2.1 Add `.prose` styles to `src/styles/global.css` (not a component `<style>` block)
- [x] 2.2 Style headings, paragraphs, lists, links, images, blockquotes, inline/block code, and `hr`
- [x] 2.3 Derive all colors from `Canvas`/`CanvasText` via `color-mix` so light/dark needs no branching

## 3. Me Page

- [x] 3.1 Author the Me blurb as editable Markdown at `src/content/me.md`
- [x] 3.2 Update `src/pages/index.astro` to import `me.md` and render it through `ProseLayout`
- [x] 3.3 Verify `npm run build` produces `/index.html` with `class="prose"` and the rendered content
