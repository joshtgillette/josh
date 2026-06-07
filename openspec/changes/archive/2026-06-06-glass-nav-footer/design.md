## Context

The personal site was scaffolded with a placeholder `<footer>` and no navigation implementation. Mobile-first design called for a bottom navigation pattern matching iOS/macOS 26's floating pill nav. The primary constraint was making it feel native: instant page transitions, persistent footer DOM across navigations, and glass morphism that works in both light and dark without theme branching.

## Goals / Non-Goals

**Goals:**
- Glass pill footer that looks correct in light and dark mode from a single set of CSS rules
- Seamless SPA-style navigation between pages with no full reloads
- Sliding indicator that animates between tabs without flashing or jumping
- iOS rubber-band scroll isolation so the fixed footer doesn't jitter
- Stable styles in dev mode despite Vite HMR URL mutation

**Non-Goals:**
- Per-route page transition animations (only the indicator slides; page content swaps instantly)
- Custom dark/light theme toggle (relies solely on `prefers-color-scheme` via CSS system colors)
- Accessibility enhancements beyond semantic HTML (ARIA, focus management deferred)

## Decisions

**`transition:persist` on `<footer>` over re-rendering**
Astro's `ClientRouter` re-renders body content on every navigation. `transition:persist` keeps the same footer DOM node alive, preserving JS state (the `ready` class, indicator inline styles) without any re-initialization logic. Alternative: re-run indicator setup on every `astro:page-load` from scratch — rejected because it caused a visible snap-then-slide on every navigation.

**All footer CSS in `global.css`, not component `<style>`**
Astro's `ClientRouter` swaps `<head>` elements on navigation. Component-scoped `<style>` tags are keyed by component identity and are removed/re-added on each swap, causing a flash of unstyled footer on every click. Moving styles to `global.css` (imported by `BaseLayout`) ensures the stylesheet URL is the same across all pages and survives head merges intact.

**`getBoundingClientRect` for indicator positioning over CSS-only layout**
The sliding indicator needs pixel-accurate `left` and `width` values to align with each link's rendered bounds. CSS-only approaches (e.g., `nth-child` offsets, flex fractions) can't account for varying text widths across button labels ("me" vs "projects"). JS measurement after each `astro:page-load` guarantees accuracy regardless of font rendering or future label changes.

**`opacity` controlled by inline JS on first load, `transition` gated by `ready` class**
The indicator starts at `left:0; width:0; opacity:0` in CSS (safe default before JS runs). On first `astro:page-load`, JS places the indicator at the correct position and sets `opacity:1` via inline style — the indicator appears already-placed, never slides from 0. The `ready` class is then added in a `requestAnimationFrame`, enabling CSS `left`/`width` transitions for all subsequent navigations.

**`#scroll-root { position: fixed; inset: 0; overflow-y: auto }` for iOS scroll isolation**
iOS Safari's rubber-band overscroll propagates to all fixed-position elements, making a `position: fixed` footer wiggle at scroll boundaries. Wrapping the scrollable content in a `position: fixed` inner container captures the scroll event within that container, preventing it from reaching the `<body>` and eliminating footer jitter.

**`light-dark()` + `color-mix()` for glass background, `black` for drop shadow**
`light-dark(Canvas, color-mix(in srgb, white 10%, Canvas))` gives the dark mode footer a subtle white lift above the dark background without a media query. Drop shadows must always use `black` (not `CanvasText`) — in dark mode `CanvasText` is near-white, turning a shadow into a glow. The inset `white` highlight at low opacity gives the frosted-glass "elevated surface" feel in both modes.

**`Cache-Control: no-store` on Vite dev server**
Vite HMR appends `?t=TIMESTAMP` to CSS `<link>` hrefs after edits. When `ClientRouter` navigates, it fetches fresh page HTML from the dev server which has the original URL (no timestamp). Astro's head merge treats these as different URLs — removes the HMR'd link, re-adds the original. The browser then serves its cached copy of the original URL (old CSS). Setting `no-store` on all dev server responses ensures the re-fetch always returns current content.

## Risks / Trade-offs

- [Persisted footer holds stale state if Footer.astro template changes] → During development, a hard refresh resets the persisted DOM to the latest template. In production this doesn't apply since there's no HMR.
- [JS-measured indicator breaks if font fails to load before measurement] → `astro:page-load` fires after layout is complete; fallback system fonts ensure measurement is always valid.
- [CSS `light-dark()` browser support] → Requires Chrome 123+, Safari 17.5+, Firefox 120+. Acceptable for a personal site with modern-browser audience.
- [Dev-mode `no-store` header slows repeated asset fetches] → Acceptable tradeoff; dev experience is latency-tolerant and the alternative is stale styles on every navigation after an edit.
