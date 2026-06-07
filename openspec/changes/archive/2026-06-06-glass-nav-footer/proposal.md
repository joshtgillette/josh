## Why

The site needed a persistent bottom navigation bar that feels native on mobile — glass morphism styling, seamless client-side navigation between pages, and a sliding active indicator — without any per-screen media queries.

## What Changes

- Replace the placeholder `<footer>` in `BaseLayout.astro` with a dedicated `Footer.astro` component that persists across navigations via `transition:persist`
- Implement a floating glass pill footer fixed to the bottom of the viewport with backdrop blur, system-color-aware glass background, and safe-area inset support for iOS
- Add a sliding active indicator driven by `getBoundingClientRect` measurements and CSS `left`/`width` transitions
- Enable eager prefetching of all pages for instant client-side navigation
- Fix a dev-mode CSS regression caused by Vite HMR URL mutation conflicting with Astro's ClientRouter head merge, resolved via `Cache-Control: no-store` on Vite's dev server

## Capabilities

### New Capabilities

- `bottom-nav`: Persistent floating bottom navigation footer with glass morphism styling, active route tracking, and animated sliding indicator

### Modified Capabilities

- `site-layout`: Navigation moves from a top `<nav>` element to a persisted bottom `Footer.astro` component; layout wraps content in `#scroll-root` for iOS rubber-band scroll isolation

## Impact

- New component: `src/components/Footer.astro`
- Modified: `src/layouts/BaseLayout.astro` (adds `#scroll-root`, `Footer`, `viewport-fit=cover`, prefetch config)
- Modified: `src/styles/global.css` (all footer styles live here to survive Astro's ClientRouter head swaps)
- Modified: `astro.config.mjs` (adds `prefetch`, Vite `server.headers` for dev-mode cache fix)
- New dependency on `astro:transitions` (`ClientRouter`, `transition:persist`)
