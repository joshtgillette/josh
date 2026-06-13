## Context

The site is a pure static build served by a shared Caddy gateway from `/srv/josh`. Josh wants private page-view counts for every page without a third-party service and without turning the site into an SSR app. He explicitly preferred "minimal infra, my own callback written to the server" over an external analytics tool. The counter must therefore be a small, self-hosted piece that does not compromise the static nature of the site.

## Goals / Non-Goals

**Goals:**
- Count views for every page (listings and individual entries) keyed by path
- Keep counts private: a hidden read endpoint, nothing rendered on the site
- Keep the site 100% static — no SSR adapter, no change to how pages are served
- Minimal infra: as few moving parts and dependencies as possible

**Non-Goals:**
- Displaying view counts on the site
- Unique-visitor analytics, referrers, sessions, or a dashboard UI
- Bot filtering beyond the natural fact that beacons run only in real browsers

## Decisions

**Sidecar counter service, not Astro SSR**
A standalone HTTP service keeps the Astro build static (fastest, simplest, unchanged deploy) while adding the one stateful piece behind a clean `/api/views/*` route. The alternative — adding a Node SSR adapter and an Astro API route — would convert the whole site to a running server process just for a counter. Rejected as more infra, not less.

**`node:sqlite`, zero npm dependencies**
The service uses Node's built-in `node:sqlite` (`DatabaseSync`) rather than `better-sqlite3`. This means no npm install and no native compilation for the service — a single `.mjs` file. It requires `--experimental-sqlite` on the server's Node 22, which is stable enough for a personal view counter. SQLite gives atomic `INSERT … ON CONFLICT … count + 1` upserts, so concurrent increments are safe.

**Beacon on `astro:page-load`, deduped per session, skipped on localhost**
Under `ClientRouter`, a plain `load` handler would miss client-side navigations, so the beacon listens on `astro:page-load` (fires on first load and every navigation) — the same event the footer uses. `navigator.sendBeacon` is used (fetch fallback) so the request survives navigation. A `sessionStorage` flag per path prevents double-counting reloads/return visits within a session. A localhost host check means dev never emits beacons, keeping dev quiet and counts clean. Astro prefetch does not fire `astro:page-load`, so prefetched pages are not counted.

**Path-derived keys**
The key is `pathname` with surrounding slashes stripped, with `/` mapped to `me`. This yields readable keys (`thoughts/hello-world`) and a stable, collision-free namespace. The service validates keys against `^[a-z0-9][a-z0-9/_-]{0,199}$` and uses parameterized queries.

**Canonical route `/api/views/*`, not `/thoughts/<slug>/views`**
Routing a dedicated `/api/views/*` prefix to the service is a single clean Caddy matcher with no collision against the static `/thoughts/<slug>` pages. The hidden read endpoints (`GET /api/views/<key>` and the `GET /api/views` summary) give Josh his "hidden endpoint" without a dashboard.

**Run the counter as a container on `soal-shared`, not a host systemd service**
The shared gateway Caddy is itself a container and reaches every backend by name over the `soal-shared` Docker network (`backend:8080`, etc.). A host systemd service on `127.0.0.1:8788` is unreachable from inside the Caddy container, so the counter is packaged as a small container (`node:22-alpine`, single `server.mjs`, `--experimental-sqlite`) on `soal-shared`, proxied as `josh-views:8788` — consistent with the existing backends. It publishes **no host ports**, so it is never exposed to the host or the public; it is reachable only through the gateway. SQLite persists via a `/opt/josh-views:/data` bind mount.

**Rebuild-on-deploy; one-time gateway setup**
The deploy rebuilds and restarts the `josh-views` container each run (`docker compose up -d --build josh-views`), so `server.mjs` changes ship automatically. The gateway route and the `josh-views` compose service live in the separate `/opt/caddy` gateway config, so adding them is a one-time manual step — consistent with the existing server-gateway rule that backends are added by editing the gateway Caddyfile and docker-compose.

## Risks / Trade-offs

- [`node:sqlite` is experimental on Node 22] → Stable enough for this use; `--experimental-sqlite` is a harmless no-op on newer Node, and a future swap to `better-sqlite3` is a one-file change.
- [Beacons count raw page views, including the author's own visits] → Acceptable for a personal site; the localhost skip avoids dev noise, and the numbers are directional, not analytics-grade.
- [The gateway setup is manual] → One-time only (Caddyfile route + compose service), documented in `Caddyfile.snippet`, and it matches how every other backend is added on this server.
- [Counter shares the gateway's Docker network with other sites] → It publishes no host ports and is reachable only as `josh-views:8788` on `soal-shared` via the gateway proxy, so it is not directly exposed to the host or the public.
