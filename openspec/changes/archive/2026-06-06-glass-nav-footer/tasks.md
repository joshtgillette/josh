## 1. SPA Navigation

- [x] 1.1 Add `ClientRouter` from `astro:transitions` to `BaseLayout.astro`
- [x] 1.2 Configure `prefetch: { prefetchAll: true, defaultStrategy: 'load' }` in `astro.config.mjs` for eager page prefetching

## 2. Footer Component

- [x] 2.1 Create `src/components/Footer.astro` with `transition:persist` on the `<footer>` element
- [x] 2.2 Add navigation links to `/`, `/blog`, `/projects` with SSR-computed `active` class
- [x] 2.3 Add `<span id="nav-indicator">` inside the footer for the sliding highlight

## 3. Scroll Isolation

- [x] 3.1 Wrap `<main>` in a `#scroll-root` div in `BaseLayout.astro` with `position: fixed; inset: 0; overflow-y: auto`
- [x] 3.2 Add `viewport-fit=cover` to the viewport meta tag
- [x] 3.3 Use `env(safe-area-inset-bottom)` in footer's `bottom` offset

## 4. Glass Morphism Styles

- [x] 4.1 Move all footer CSS to `src/styles/global.css` (not component `<style>`) to survive ClientRouter head swaps
- [x] 4.2 Implement `backdrop-filter: blur(40px) saturate(160%)` with `-webkit-` prefix
- [x] 4.3 Set background using `light-dark()` + `color-mix()` for adaptive glass lift in dark mode
- [x] 4.4 Use `black` (not `CanvasText`) for drop shadow to avoid glow in dark mode
- [x] 4.5 Add inset `white` highlight for frosted-glass elevation feel

## 5. Sliding Indicator

- [x] 5.1 Add `astro:page-load` listener in Footer.astro script to update `active` class on navigation
- [x] 5.2 Measure indicator position via `getBoundingClientRect` after each page load
- [x] 5.3 Set indicator `left` and `width` as inline styles directly on the indicator element
- [x] 5.4 On first load: set `opacity: 1` immediately (no transition), then add `ready` class via `requestAnimationFrame`
- [x] 5.5 Gate `left`/`width` CSS transitions behind `footer.ready` so first placement is instant

## 6. Dev Mode Fix

- [x] 6.1 Add `vite.server.headers: { 'Cache-Control': 'no-store' }` to `astro.config.mjs` to prevent stale CSS on navigation after HMR edits
