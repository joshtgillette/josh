## Context

Greenfield personal website. No existing code. The goal is to establish a solid, minimal foundation using Astro + Tailwind CSS + Content Collections that future changes can build on without needing to undo decisions made here.

## Goals / Non-Goals

**Goals:**
- Working Astro project scaffold with Tailwind configured
- Content Collections set up for blog and projects with typed schemas
- Base layout and placeholder pages for all top-level routes
- Clean, minimal file structure that doesn't over-engineer for hypothetical needs

**Non-Goals:**
- Visual design or styling (that's a future change)
- Actual content (placeholder pages only)
- Deployment configuration (server adapter, CI/CD, etc.)
- SEO, analytics, or performance tooling

## Decisions

**Astro over Next.js / SvelteKit**
Astro ships zero JS by default, is purpose-built for content sites, and has first-class Markdown/MDX support. Next.js carries React hydration overhead that isn't justified for a mostly-static personal site.

**Tailwind v4 via `@tailwindcss/vite`**
`@astrojs/tailwind` only supports Astro up to v5. Astro 6 requires Tailwind v4 configured as a Vite plugin via `@tailwindcss/vite`. `astro add tailwind` handles this automatically and scaffolds `src/styles/global.css`.

**Content Collections over hardcoded data**
Astro's Content Collections give type-safe frontmatter validation via Zod schemas, built-in slug generation, and a clean query API. This is the idiomatic Astro approach for any site with repeated content types.

**Static output (no server adapter)**
Default `output: 'static'` in `astro.config.mjs`. A server adapter can be added later if dynamic routes are needed. Keeps deployment options open.

**Minimal component set**
Only create components that are actually needed at init time: `BaseLayout.astro`, `Nav.astro`. No premature component extraction.

## Risks / Trade-offs

- [Astro version lock] → Pin to current latest; document in package.json. Upgrade as a separate change.
- [Tailwind v4 vs v3] → Use Tailwind v3 via `@astrojs/tailwind` for now; the official integration hasn't fully stabilized for v4 yet. Revisit when `@astrojs/tailwind` supports v4.
