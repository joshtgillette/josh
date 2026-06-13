## ADDED Requirements

### Requirement: Deploy rebuilds and restarts the counter container
On every deploy, after building the site, the workflow SHALL rebuild and restart the counter container so that service code changes ship automatically.

#### Scenario: Counter container is rebuilt on deploy
- **WHEN** the deploy workflow runs on the server
- **THEN** it SHALL run `docker compose up -d --build josh-views` from the gateway directory, rebuilding the image from `services/views` and restarting the container

#### Scenario: Counter data persists across deploys
- **WHEN** the counter container is rebuilt
- **THEN** its SQLite data SHALL persist via the `/opt/josh-views` bind mount

#### Scenario: Gateway setup is a one-time manual step
- **WHEN** view tracking is first set up
- **THEN** the `/api/views/*` route and the `josh-views` service SHALL be added once to the gateway Caddyfile and docker-compose (per `services/views/Caddyfile.snippet`), and subsequent deploys SHALL NOT require gateway-config changes
