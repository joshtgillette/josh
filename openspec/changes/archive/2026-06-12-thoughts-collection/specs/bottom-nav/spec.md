## MODIFIED Requirements

### Requirement: Navigation links to all top-level routes
The footer SHALL contain navigation links to: Me (`/`), Thoughts (`/thoughts`), and Projects (`/projects`).

#### Scenario: All links are rendered
- **WHEN** any page is rendered
- **THEN** the footer SHALL contain exactly three `<a>` elements linking to `/`, `/thoughts`, and `/projects`

#### Scenario: Active class on the Thoughts route
- **WHEN** the user is on `/thoughts` or any `/thoughts/<slug>` entry page
- **THEN** the Thoughts `<a>` element SHALL have the `active` class and render in full `CanvasText` color
