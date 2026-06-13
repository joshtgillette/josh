# view-tracking Specification

## Purpose
TBD - created by archiving change 2026-06-12-view-tracking. Update Purpose after archive.
## Requirements
### Requirement: Every page sends a private view beacon
Each page SHALL send a page-view beacon on load and on every client-side navigation, keyed by the page path, without displaying any count on the site.

#### Scenario: Beacon fires on navigation
- **WHEN** a page is loaded or navigated to via the client router
- **THEN** the site SHALL POST to `/api/views/<key>`, where `<key>` is the page path with surrounding slashes stripped and `/` mapped to `me`

#### Scenario: Deduped per session
- **WHEN** the same path is loaded more than once within a browser session
- **THEN** the beacon SHALL be sent at most once for that path, enforced via `sessionStorage`

#### Scenario: No beacon during local development
- **WHEN** the site is served from `localhost` or `127.0.0.1`
- **THEN** no beacon SHALL be sent

#### Scenario: Counts are never displayed
- **WHEN** any page is rendered
- **THEN** no view count SHALL appear in the page content

### Requirement: Self-hosted counter service records and reports counts
A self-hosted service SHALL maintain a per-path view count in SQLite and expose increment and private read endpoints, with no third-party dependency and no external analytics service.

#### Scenario: Increment
- **WHEN** a `POST /api/views/<key>` is received with a valid key
- **THEN** the service SHALL increment that key's count atomically and respond `204`

#### Scenario: Read a single count
- **WHEN** a `GET /api/views/<key>` is received
- **THEN** the service SHALL respond with `{ "key": "<key>", "views": N }`, where `N` is `0` if the key has never been counted

#### Scenario: Private summary
- **WHEN** a `GET /api/views` is received
- **THEN** the service SHALL respond with a JSON object mapping every counted key to its count

#### Scenario: Invalid key is rejected
- **WHEN** a request targets a key that does not match the allowed pattern
- **THEN** the service SHALL respond with a `4xx` status and SHALL NOT record a count

### Requirement: The site remains a static build
Adding view tracking SHALL NOT change the site's static output; tracking SHALL be handled entirely by the client beacon and the separate counter service.

#### Scenario: Build output is unchanged in nature
- **WHEN** `npm run build` runs
- **THEN** the output SHALL remain a static `dist/` with no server runtime required to serve pages

