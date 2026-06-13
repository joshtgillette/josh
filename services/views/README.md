# views — page-view counter

A tiny, zero-dependency service that counts page views for joshgillette.build.
Counts are **private**: the site sends a beacon on each page load, but nothing
is displayed on the site. You read the numbers from a hidden endpoint.

## How it works

- `server.mjs` is a single Node HTTP service using the built-in `node:sqlite`
  module (no npm dependencies, no native build). It persists per-path counts to
  a SQLite file.
- It runs as a small container (`Dockerfile`) on the gateway's `soal-shared`
  Docker network. The gateway Caddy reverse-proxies `/api/views/*` to it by name
  (`josh-views:8788`) — just like the other backends — while serving all other
  paths as static files. No host ports are published, so the counter is never
  exposed directly; it is only reachable through the gateway.
- The site (`BaseLayout.astro`) fires a `navigator.sendBeacon` POST on every
  `astro:page-load`, deduped per path per session via `sessionStorage`. Beacons
  are skipped on localhost, so local dev never counts.

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| `POST` | `/api/views/<key>` | increment `<key>`, returns `204` |
| `GET` | `/api/views/<key>` | `{ "key": "<key>", "views": N }` |
| `GET` | `/api/views` | `{ "<key>": N, ... }` — private summary of all paths |

`<key>` is the page path with surrounding slashes stripped: `me`, `thoughts`,
`thoughts/hello-world`, `projects/field-notes`.

### Reading your counts

```sh
curl https://joshgillette.build/api/views                       # everything
curl https://joshgillette.build/api/views/thoughts/hello-world  # one page
```

## Deploy / provisioning

One-time setup is the gateway change in `Caddyfile.snippet`: add the
`/api/views/*` route to `/opt/caddy/Caddyfile`, add a `josh-views` service to
`/opt/caddy/docker-compose.yml`, create `/opt/josh-views`, and
`docker compose up -d --build`.

After that, the deploy workflow rebuilds and restarts the counter container on
every deploy (`docker compose up -d --build josh-views`), so `server.mjs`
changes ship automatically.

## Local development

```sh
node --experimental-sqlite server.mjs        # listens on 127.0.0.1:8788
VIEWS_DB=/tmp/views.db VIEWS_PORT=8799 node --experimental-sqlite server.mjs
```

Env vars: `VIEWS_HOST` (default `127.0.0.1`; the container sets `0.0.0.0`),
`VIEWS_PORT` (default `8788`), `VIEWS_DB` (default `views.db`).
