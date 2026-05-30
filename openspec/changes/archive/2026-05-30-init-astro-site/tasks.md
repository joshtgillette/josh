## 1. Project Scaffold

- [x] 1.1 Run `npm create astro@latest` to scaffold a new Astro project in the repo root (choose "Empty" template, TypeScript strict)
- [x] 1.2 Install `@astrojs/tailwind` and `tailwindcss` dependencies
- [x] 1.3 Add `@astrojs/tailwind` to `astro.config.mjs` integrations
- [x] 1.4 Verify `astro dev` starts without errors

## 2. Content Collections

- [x] 2.1 Create `src/content/config.ts` with Zod schemas for `blog` and `projects` collections
- [x] 2.2 Add `blog` schema: `title` (string), `date` (date), `description` (string)
- [x] 2.3 Add `projects` schema: `title` (string), `description` (string), `url` (string, optional)
- [x] 2.4 Create `src/content/blog/` and `src/content/projects/` directories with a placeholder `.gitkeep` each

## 3. Layout and Components

- [x] 3.1 Create `src/layouts/BaseLayout.astro` with `title` prop, `<head>`, `<nav>`, `<main slot>`, `<footer>`
- [x] 3.2 Create `src/components/Nav.astro` with links to `/`, `/blog`, `/projects`, `/about`
- [x] 3.3 Import and use `Nav.astro` inside `BaseLayout.astro`

## 4. Pages

- [x] 4.1 Create `src/pages/index.astro` using `BaseLayout` with placeholder home content
- [x] 4.2 Create `src/pages/blog/index.astro` using `BaseLayout` with placeholder blog content
- [x] 4.3 Create `src/pages/projects/index.astro` using `BaseLayout` with placeholder projects content
- [x] 4.4 Create `src/pages/about.astro` using `BaseLayout` with placeholder about content

## 5. Verification

- [x] 5.1 Run `astro build` and confirm it completes without errors
- [x] 5.2 Confirm all four routes (`/`, `/blog`, `/projects`, `/about`) render with nav visible
