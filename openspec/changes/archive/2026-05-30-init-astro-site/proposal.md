## Why

This is the first commit of a personal website. The project needs a framework and build toolchain established before any content or design work can begin.

## What Changes

- Scaffold a new Astro project using `npm create astro@latest`
- Install and configure `@astrojs/tailwind` for styling
- Configure Content Collections for `blog` and `projects`
- Create a base layout and placeholder pages (home, blog, projects, about)
- Establish the project's directory structure for future development

## Capabilities

### New Capabilities

- `site-layout`: Base layout shell with navigation and footer shared across all pages
- `content-collections`: Typed Content Collections configuration for blog posts and projects
- `pages`: Placeholder route pages (home, blog index, projects index, about)

### Modified Capabilities

## Impact

- New dependencies: `astro`, `@astrojs/tailwind`, `tailwindcss`
- New top-level project structure: `src/`, `public/`, `astro.config.mjs`
- No existing code affected — this is a greenfield initialization
