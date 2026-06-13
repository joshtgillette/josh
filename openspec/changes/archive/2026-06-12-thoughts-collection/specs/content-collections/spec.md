## REMOVED Requirements

### Requirement: Blog collection is defined with a typed schema
**Reason**: Renamed to the `thoughts` collection.

## ADDED Requirements

### Requirement: Thoughts collection is defined with a typed schema
The site SHALL define a `thoughts` Content Collection in `src/content.config.ts` with a Zod schema that enforces required frontmatter fields: `title` (string), `date` (date), and `description` (string), loaded from `src/content/thoughts/`.

#### Scenario: Valid thought passes schema validation
- **WHEN** a Markdown file in `src/content/thoughts/` includes `title`, `date`, and `description` frontmatter
- **THEN** Astro SHALL successfully build and expose the entry via `getCollection('thoughts')`

#### Scenario: Thought missing required field fails validation
- **WHEN** a Markdown file in `src/content/thoughts/` is missing a required frontmatter field
- **THEN** Astro's build SHALL throw a validation error identifying the missing field
