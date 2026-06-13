# server-gateway Specification

## Purpose
TBD - created by archiving change shared-caddy-gateway. Update Purpose after archive.
## Requirements
### Requirement: Gateway owns all inbound traffic on the server
A single Caddy container SHALL own ports 80 and 443 on the server and route all incoming requests by hostname.

#### Scenario: Request arrives on port 443
- **WHEN** an HTTPS request arrives for any configured domain
- **THEN** the gateway Caddy SHALL handle TLS termination and route the request to the appropriate backend or static file directory

#### Scenario: No other process binds 80 or 443
- **WHEN** the gateway is running
- **THEN** no other container on the server SHALL bind ports 80 or 443

### Requirement: joshgillette.build is served as static files
The gateway SHALL serve `joshgillette.build` by reading static files from the josh project's `dist/` directory.

#### Scenario: Request to joshgillette.build
- **WHEN** a browser requests `https://joshgillette.build/`
- **THEN** the gateway SHALL serve the static file from `/srv/josh` corresponding to the requested path

### Requirement: TLS certificates are provisioned automatically
The gateway SHALL obtain and renew TLS certificates for all configured domains via Caddy's automatic ACME integration, with no manual certificate management.

#### Scenario: First request to a new domain
- **WHEN** a request arrives for a domain with no existing certificate
- **THEN** Caddy SHALL automatically provision a TLS certificate before serving the response

### Requirement: Gateway restarts automatically on failure
The gateway container SHALL restart automatically if it exits unexpectedly.

#### Scenario: Container crash
- **WHEN** the Caddy container exits for any reason other than explicit shutdown
- **THEN** Docker SHALL restart it automatically via `restart: unless-stopped`

### Requirement: Adding a project requires no changes to existing projects
The gateway architecture SHALL allow a new domain to be added by updating only the gateway's Caddyfile and docker-compose, without modifying any existing project's files.

#### Scenario: New project onboarded
- **WHEN** a new project is deployed to the server
- **THEN** only `/opt/caddy/Caddyfile` and `/opt/caddy/docker-compose.yml` SHALL need to be updated to serve the new domain

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

