## 1. Counter Service

- [x] 1.1 Create `services/views/server.mjs` using `node:sqlite` with `POST/GET /api/views/<key>` and a `GET /api/views` summary
- [x] 1.2 Validate keys and use parameterized upsert (`INSERT … ON CONFLICT … count + 1`)
- [x] 1.3 Bind to `127.0.0.1` on a configurable port (`VIEWS_PORT`, default 8788) with a configurable DB path (`VIEWS_DB`)
- [x] 1.4 Smoke-test locally: increments, single read, summary, invalid-key rejection

## 2. Client Beacon

- [x] 2.1 Add a beacon `<script>` to `BaseLayout.astro` firing on `astro:page-load`
- [x] 2.2 Derive the key from `location.pathname` (`/` → `me`); POST via `navigator.sendBeacon`
- [x] 2.3 Dedupe per path per session with `sessionStorage`; skip on localhost

## 3. Provisioning

- [x] 3.1 Add `services/views/Dockerfile` (`node:22-alpine`, `--experimental-sqlite`, binds `0.0.0.0`, DB at `/data`)
- [x] 3.2 Add `services/views/Caddyfile.snippet` documenting the `/api/views/*` → `josh-views:8788` route and the compose service
- [x] 3.3 Update `.github/workflows/deploy.yml` to rebuild + restart the counter container on deploy
- [x] 3.4 Add `services/views/README.md`
- [x] 3.5 One-time gateway setup on the server: Caddyfile route + `josh-views` compose service on `soal-shared`, `mkdir /opt/josh-views`, `docker compose up -d --build`

## 4. Verify

- [x] 4.1 `npm run build` succeeds and the beacon is present in the output; site remains static
- [x] 4.2 After deploy + one-time gateway route: load a page, then `curl https://joshgillette.build/api/views/<key>` returns an incrementing count (verified end-to-end over HTTPS; soal sites unaffected)
