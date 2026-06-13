## MODIFIED Requirements

### Requirement: Home page exists at root route
The site SHALL serve a page at `/` that renders the "me" Markdown content (`src/content/me.md`) through `ProseLayout`.

#### Scenario: Home page is accessible
- **WHEN** a user navigates to `/`
- **THEN** the server SHALL return a 200 response with a page using the base layout

#### Scenario: Home page renders the me content
- **WHEN** a user navigates to `/`
- **THEN** the page SHALL render the Markdown from `src/content/me.md` inside an `<article class="prose">`
