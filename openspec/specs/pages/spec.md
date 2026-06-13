# pages Specification

## Purpose
TBD - created by archiving change init-astro-site. Update Purpose after archive.
## Requirements
### Requirement: Home page exists at root route
The site SHALL serve a page at `/` that renders the "me" Markdown content (`src/content/me.md`) through `ProseLayout`.

#### Scenario: Home page is accessible
- **WHEN** a user navigates to `/`
- **THEN** the server SHALL return a 200 response with a page using the base layout

#### Scenario: Home page renders the me content
- **WHEN** a user navigates to `/`
- **THEN** the page SHALL render the Markdown from `src/content/me.md` inside an `<article class="prose">`

### Requirement: About page exists
The site SHALL serve a page at `/about` that uses `BaseLayout` and renders placeholder content.

#### Scenario: About page is accessible
- **WHEN** a user navigates to `/about`
- **THEN** the server SHALL return a 200 response with a page using the base layout

### Requirement: Thoughts listing page lists entries
The site SHALL serve a page at `/thoughts` that lists all `thoughts` entries, newest first, each rendered as an `EntryCard` linking to its entry page. When there are no entries, the page SHALL show an empty state.

#### Scenario: Thoughts listing is accessible
- **WHEN** a user navigates to `/thoughts`
- **THEN** the server SHALL return a 200 response with a page using the base layout

#### Scenario: Entries are listed newest first
- **WHEN** the `thoughts` collection contains multiple entries
- **THEN** the listing SHALL render one `EntryCard` per entry, sorted by `date` descending

#### Scenario: Empty state
- **WHEN** the `thoughts` collection contains no entries
- **THEN** the listing SHALL render an empty-state message instead of an entry list

### Requirement: Thoughts entry pages render Markdown content
The site SHALL serve a page at `/thoughts/<slug>` for each `thoughts` entry, where `<slug>` is the entry's filename-derived id, rendering the entry's Markdown through `ProseLayout` with the entry title and date.

#### Scenario: Entry page is accessible at a clean URL
- **WHEN** a user navigates to `/thoughts/<slug>` for an existing entry
- **THEN** the server SHALL return a 200 response rendering the entry's content inside `ProseLayout`, with the title as the heading and the formatted date shown

#### Scenario: Slugs are hyphenated filenames
- **WHEN** an entry is authored as `hello-world.md`
- **THEN** its page SHALL be served at `/thoughts/hello-world`

### Requirement: Projects listing page lists entries
The site SHALL serve a page at `/projects` that lists all `projects` entries, ordered alphabetically by title, each rendered as an `EntryCard` (no date) linking to its content page. When there are no entries, the page SHALL show an empty state.

#### Scenario: Projects listing is accessible
- **WHEN** a user navigates to `/projects`
- **THEN** the server SHALL return a 200 response with a page using the base layout

#### Scenario: Each project links to its content page
- **WHEN** the `projects` collection contains entries
- **THEN** the listing SHALL render one `EntryCard` per entry, each linking to `/projects/<slug>`, with no date and no external indicator

### Requirement: Project entry pages render Markdown content
The site SHALL serve a page at `/projects/<slug>` for each `projects` entry, where `<slug>` is the entry's filename-derived id, rendering the entry's Markdown through `ProseLayout` with the project title as the heading.

#### Scenario: Entry page is accessible at a clean URL
- **WHEN** a project is authored as `field-notes.md`
- **THEN** its page SHALL be served at `/projects/field-notes` rendering its content inside `ProseLayout`

