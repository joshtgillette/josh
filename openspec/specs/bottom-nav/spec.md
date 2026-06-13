# bottom-nav Specification

## Purpose
Persistent floating bottom navigation bar with glass morphism styling, active route tracking, and an animated sliding indicator. Introduced by the glass-nav-footer change.
## Requirements
### Requirement: Floating glass pill navigation persists across page transitions
The site SHALL render a `Footer.astro` component as a floating, pill-shaped bottom navigation bar that is preserved across client-side page navigations via `transition:persist`.

#### Scenario: Footer survives page transition
- **WHEN** the user navigates between any two top-level routes using the bottom nav
- **THEN** the `<footer>` DOM element SHALL remain mounted without re-rendering

#### Scenario: Footer appears on every page
- **WHEN** any page using `BaseLayout.astro` is rendered
- **THEN** the bottom navigation footer SHALL be present and visible

### Requirement: Navigation links to all top-level routes
The footer SHALL contain navigation links to: Me (`/`), Thoughts (`/thoughts`), and Projects (`/projects`).

#### Scenario: All links are rendered
- **WHEN** any page is rendered
- **THEN** the footer SHALL contain exactly three `<a>` elements linking to `/`, `/thoughts`, and `/projects`

#### Scenario: Active class on the Thoughts route
- **WHEN** the user is on `/thoughts` or any `/thoughts/<slug>` entry page
- **THEN** the Thoughts `<a>` element SHALL have the `active` class and render in full `CanvasText` color

### Requirement: Active route is visually indicated
The footer SHALL reflect the current route by applying an `active` class to the matching link on every page load.

#### Scenario: Active class on current route
- **WHEN** the user is on `/blog`
- **THEN** the blog `<a>` element SHALL have the `active` class and render in full `CanvasText` color

#### Scenario: Active class updated on navigation
- **WHEN** the user navigates from `/` to `/projects`
- **THEN** the `active` class SHALL move to the projects link within the same page-load event cycle

### Requirement: Sliding indicator animates between active routes
A sliding pill indicator SHALL move beneath the active link with a smooth CSS transition when switching routes.

#### Scenario: Indicator snaps to position on first load
- **WHEN** the page first loads
- **THEN** the indicator SHALL appear at the correct active link position with no sliding animation

#### Scenario: Indicator slides on subsequent navigation
- **WHEN** the user navigates to a different route after the first page load
- **THEN** the indicator SHALL animate from its previous position to the new active link position over 150ms

### Requirement: Footer uses glass morphism styling adaptive to light and dark mode
The footer SHALL use `backdrop-filter` blur, a semi-transparent background derived from CSS system colors, and a top-edge highlight — all without separate light/dark theme declarations.

#### Scenario: Glass effect in light mode
- **WHEN** the user's system preference is light
- **THEN** the footer SHALL appear as a semi-transparent frosted-glass pill over the page content

#### Scenario: Glass effect in dark mode
- **WHEN** the user's system preference is dark
- **THEN** the footer SHALL appear as a slightly elevated dark glass surface with visible contrast against the page background

### Requirement: Footer respects iOS safe area and does not jitter on rubber-band scroll
The footer SHALL use `env(safe-area-inset-bottom)` for its bottom offset and SHALL NOT move when the page content reaches its scroll boundary on iOS.

#### Scenario: Footer clears home indicator on iPhone
- **WHEN** the page is viewed on an iPhone with a home indicator
- **THEN** the footer bottom edge SHALL be offset by at least `env(safe-area-inset-bottom)`

#### Scenario: No jitter on overscroll
- **WHEN** the user scrolls past the top or bottom boundary of the page on iOS Safari
- **THEN** the footer SHALL remain visually fixed and not follow the rubber-band animation

