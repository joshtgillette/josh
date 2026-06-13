## REMOVED Requirements

### Requirement: Blog index page exists
**Reason**: Replaced by the Thoughts listing at `/thoughts`.

## ADDED Requirements

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
