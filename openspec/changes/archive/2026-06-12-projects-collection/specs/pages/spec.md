## REMOVED Requirements

### Requirement: Projects index page exists
**Reason**: Replaced by the Projects listing that renders real entries.

## ADDED Requirements

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
