## MODIFIED Requirements

### Requirement: Projects collection is defined with a typed schema
The site SHALL define a `projects` Content Collection in `src/content.config.ts` with a Zod schema that enforces: `title` (string) and `description` (string), loaded from `src/content/projects/`.

#### Scenario: Valid project entry passes schema validation
- **WHEN** a Markdown file in `src/content/projects/` includes `title` and `description` frontmatter
- **THEN** Astro SHALL successfully build and expose the entry via `getCollection('projects')`

#### Scenario: Project missing required field fails validation
- **WHEN** a Markdown file in `src/content/projects/` is missing `title` or `description`
- **THEN** Astro's build SHALL throw a validation error identifying the missing field
