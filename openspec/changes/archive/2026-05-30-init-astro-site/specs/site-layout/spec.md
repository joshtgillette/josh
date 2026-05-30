## ADDED Requirements

### Requirement: Base layout wraps all pages
The site SHALL provide a `BaseLayout.astro` component that wraps every page with a consistent HTML shell including `<head>`, navigation, main content slot, and footer.

#### Scenario: Page uses base layout
- **WHEN** any page imports and uses `BaseLayout.astro`
- **THEN** the rendered HTML SHALL include a `<nav>` element, a `<main>` content area, and a `<footer>` element

#### Scenario: Layout accepts page title
- **WHEN** a page passes a `title` prop to `BaseLayout`
- **THEN** the rendered `<title>` tag SHALL reflect that value

### Requirement: Navigation links to all top-level routes
The site's navigation SHALL include links to: Home (`/`), Blog (`/blog`), Projects (`/projects`), and About (`/about`).

#### Scenario: Nav renders all routes
- **WHEN** any page is rendered
- **THEN** the navigation SHALL contain links to `/`, `/blog`, `/projects`, and `/about`
