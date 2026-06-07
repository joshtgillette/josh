## MODIFIED Requirements

### Requirement: Base layout wraps all pages
The site SHALL provide a `BaseLayout.astro` component that wraps every page with a consistent HTML shell including `<head>`, a scrollable content area (`#scroll-root`), a `<main>` slot, and a persistent bottom `<footer>`.

#### Scenario: Page uses base layout
- **WHEN** any page imports and uses `BaseLayout.astro`
- **THEN** the rendered HTML SHALL include a `#scroll-root` div, a `<main>` content area, and a `<footer>` element

#### Scenario: Layout accepts page title
- **WHEN** a page passes a `title` prop to `BaseLayout`
- **THEN** the rendered `<title>` tag SHALL reflect that value

#### Scenario: Viewport is configured for edge-to-edge iOS rendering
- **WHEN** any page is rendered
- **THEN** the `<meta name="viewport">` tag SHALL include `viewport-fit=cover`

## REMOVED Requirements

### Requirement: Navigation links to all top-level routes
**Reason**: Top navigation replaced by the persistent bottom navigation footer defined in the `bottom-nav` capability. Route links are now managed by `Footer.astro`.
**Migration**: See `bottom-nav` spec for the navigation link requirement.
