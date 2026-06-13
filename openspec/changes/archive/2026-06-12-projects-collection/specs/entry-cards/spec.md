## ADDED Requirements

### Requirement: Reusable entry card list row
The site SHALL provide an `EntryCard.astro` component that renders a single collection entry as a fully-clickable list row containing a title and description, with an optional formatted date shown at the bottom-right. The entire row SHALL be the link target, with no separate arrow affordance.

#### Scenario: Card renders title and description
- **WHEN** an `EntryCard` is given a `title`, `description`, and `href`
- **THEN** it SHALL render an `<a>` wrapping the title and description, linking to `href`

#### Scenario: Optional date is shown bottom-right
- **WHEN** an `EntryCard` is given a `date`
- **THEN** it SHALL render the human-formatted date in a footer row aligned to the right

#### Scenario: Date is omitted when not provided
- **WHEN** an `EntryCard` is rendered without a `date` (as on the Projects listing)
- **THEN** no date footer SHALL be rendered

#### Scenario: Rows are separated by hairline dividers
- **WHEN** multiple `EntryCard`s are rendered in an `.entry-list`
- **THEN** adjacent rows SHALL be separated by a 2px divider in the glass-border color (`color-mix(in srgb, CanvasText 12%, transparent)`), with no divider above the first row
