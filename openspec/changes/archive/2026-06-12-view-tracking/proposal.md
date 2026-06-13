## Why

Josh wants to know how many times each page is viewed — every page, including the Thoughts and Projects listings and each individual entry — without a third-party analytics service and without a heavy dashboard. Counts are private: read from a hidden endpoint, never shown on the site. The site stays static; tracking is handled by a tiny, self-hosted counter on the existing VPS.

## What Changes

- Add a client beacon in `BaseLayout.astro` that POSTs to `/api/views/<key>` on every `astro:page-load`, deduped per path per session via `sessionStorage`, and skipped on localhost so dev never counts. `<key>` is the page path with surrounding slashes stripped (`me`, `thoughts`, `thoughts/hello-world`, `projects/field-notes`)
- Add a zero-dependency counter service (`services/views/server.mjs`) using Node's built-in `node:sqlite`: `POST /api/views/<key>` increments, `GET /api/views/<key>` returns one count, `GET /api/views` returns a private summary of all paths. Counts persist to a single SQLite file
- Package the service as a small container (`services/views/Dockerfile`) that runs on the gateway's existing `soal-shared` Docker network, since the gateway Caddy is itself containerized and reaches backends by name. A `Caddyfile.snippet` documents the `/api/views/*` → `josh-views:8788` route and the compose service
- Update the deploy workflow to rebuild and restart the counter container on every deploy; the gateway route + compose service are a one-time manual setup

## Capabilities

### New Capabilities

- `view-tracking`: Private per-path page-view counting via a client beacon and a self-hosted, zero-dependency counter service with a hidden read endpoint

### Modified Capabilities

- `server-gateway`: The gateway routes `/api/views/*` to the counter container (by name on `soal-shared`) while continuing to serve everything else as static files
- `deployment`: The deploy workflow also rebuilds and restarts the counter container

## Impact

- New service: `services/views/server.mjs`, `services/views/Dockerfile`, `services/views/Caddyfile.snippet`, `services/views/README.md`
- Modified: `src/layouts/BaseLayout.astro` (beacon script), `.github/workflows/deploy.yml` (container rebuild)
- New runtime state on the server: a `josh-views` container on `soal-shared` and a SQLite DB bind-mounted at `/opt/josh-views/views.db`; the site itself remains a static build
- One-time gateway change in `/opt/caddy` (Caddyfile route + compose service)
- No new npm dependencies (uses `node:sqlite`, run with `--experimental-sqlite` on Node 22)
