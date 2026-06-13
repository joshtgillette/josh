## ADDED Requirements

### Requirement: Gateway routes the view-tracking API to the counter container
The gateway SHALL route requests for `joshgillette.build/api/views/*` to the counter container by name on the shared Docker network, while continuing to serve all other paths as static files.

#### Scenario: View API request is proxied
- **WHEN** a request arrives for `https://joshgillette.build/api/views/...`
- **THEN** the gateway SHALL reverse-proxy it to `josh-views:8788` on the `soal-shared` network

#### Scenario: Non-API request is served statically
- **WHEN** a request arrives for any path under `joshgillette.build` that is not `/api/views/*`
- **THEN** the gateway SHALL serve the corresponding static file from `/srv/josh`

#### Scenario: Counter container is not directly exposed
- **WHEN** the counter container is running
- **THEN** it SHALL publish no host ports and SHALL be reachable only as `josh-views:8788` on `soal-shared` via the gateway proxy
