# content-rendering Specification

## Purpose
TBD - created by archiving change 2026-06-12-content-reading-layout. Update Purpose after archive.
## Requirements
### Requirement: Reusable prose layout renders Markdown content
The site SHALL provide a `ProseLayout.astro` component that wraps `BaseLayout` and renders its slotted Markdown content inside an `<article class="prose">` element.

#### Scenario: Markdown is rendered as a reading page
- **WHEN** a page renders content through `ProseLayout`
- **THEN** the rendered HTML SHALL contain an `<article class="prose">` wrapping the content, within the standard base layout shell

#### Scenario: Optional heading and date are shown for entries
- **WHEN** a page passes `heading` and `date` props to `ProseLayout`
- **THEN** the layout SHALL render a `.prose-header` containing an `<h1>` with the heading and a `<time>` element with the human-formatted date

#### Scenario: Heading is omitted when not provided
- **WHEN** a page renders through `ProseLayout` without a `heading` prop
- **THEN** no `.prose-header` SHALL be rendered and the content SHALL lead the page

### Requirement: Prose typography is minimal and theme-adaptive
Prose styling SHALL live in the shared global stylesheet under a `.prose` class and SHALL derive all colors from `Canvas`/`CanvasText` system colors so that it adapts to light and dark mode without separate declarations.

#### Scenario: Content is styled in both color schemes
- **WHEN** a prose page is viewed under either light or dark system preference
- **THEN** headings, paragraphs, links, lists, images, blockquotes, and code SHALL render legibly using colors mixed from the system `CanvasText` color

#### Scenario: Prose styles survive client-side navigation
- **WHEN** the user navigates between pages via the client router
- **THEN** the `.prose` styles SHALL remain applied without a flash of unstyled content, because they live in `global.css` rather than a component `<style>` block

