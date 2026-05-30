## ADDED Requirements

### Requirement: Home page exists at root route
The site SHALL serve a page at `/` that uses `BaseLayout` and renders placeholder content identifying it as the home page.

#### Scenario: Home page is accessible
- **WHEN** a user navigates to `/`
- **THEN** the server SHALL return a 200 response with a page using the base layout

### Requirement: Blog index page exists
The site SHALL serve a page at `/blog` that uses `BaseLayout` and renders a placeholder indicating blog posts will appear here.

#### Scenario: Blog index is accessible
- **WHEN** a user navigates to `/blog`
- **THEN** the server SHALL return a 200 response with a page using the base layout

### Requirement: Projects index page exists
The site SHALL serve a page at `/projects` that uses `BaseLayout` and renders a placeholder indicating projects will appear here.

#### Scenario: Projects index is accessible
- **WHEN** a user navigates to `/projects`
- **THEN** the server SHALL return a 200 response with a page using the base layout

### Requirement: About page exists
The site SHALL serve a page at `/about` that uses `BaseLayout` and renders placeholder content.

#### Scenario: About page is accessible
- **WHEN** a user navigates to `/about`
- **THEN** the server SHALL return a 200 response with a page using the base layout
