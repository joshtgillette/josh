## ADDED Requirements

### Requirement: Blog collection is defined with a typed schema
The site SHALL define a `blog` Content Collection in `src/content.config.ts` with a Zod schema that enforces required frontmatter fields: `title` (string), `date` (date), and `description` (string).

#### Scenario: Valid blog post passes schema validation
- **WHEN** a Markdown file in `src/content/blog/` includes `title`, `date`, and `description` frontmatter
- **THEN** Astro SHALL successfully build and expose the entry via `getCollection('blog')`

#### Scenario: Blog post missing required field fails validation
- **WHEN** a Markdown file in `src/content/blog/` is missing a required frontmatter field
- **THEN** Astro's build SHALL throw a validation error identifying the missing field

### Requirement: Projects collection is defined with a typed schema
The site SHALL define a `projects` Content Collection in `src/content.config.ts` with a Zod schema that enforces: `title` (string), `description` (string), and `url` (string, optional).

#### Scenario: Valid project entry passes schema validation
- **WHEN** a Markdown file in `src/content/projects/` includes `title` and `description` frontmatter
- **THEN** Astro SHALL successfully build and expose the entry via `getCollection('projects')`
