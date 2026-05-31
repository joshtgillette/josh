## Why

The server at `5.161.122.7` needs a shared traffic gateway so multiple projects can coexist on the same machine. Embedding Caddy inside a single project's Docker Compose stack works for one project but doesn't scale — only one process can own ports 80/443. Extracting Caddy into a standalone gateway solves this cleanly.

## What Changes

- **New `/opt/caddy/` on server** — standalone Docker Compose running Caddy, owning ports 80/443, routing all domains on this server by Caddyfile config.
- **josh repo** — GitHub Actions deploy workflow added (SSH → git pull → npm build). Default branch renamed `main` → `prod`.
- **One-time server bootstrap** — clone josh repo at `/opt/josh`, create `/opt/caddy/` with Caddyfile and docker-compose, migrate existing services to the gateway network, cut over.

## Capabilities

### New Capabilities

- `deployment`: josh's CI/CD pipeline — GitHub Actions workflow that SSHs into the server on push to `prod`, pulls the repo, and builds the Astro site. The gateway Caddy serves the updated `dist/` automatically via bind mount.
- `server-gateway`: Shared Caddy gateway — routes domains to static file directories or backend services by hostname. Handles TLS for all domains automatically. Adding a new project to the server requires only a new Caddyfile block and a mounted dist directory.

### Modified Capabilities

## Impact

- New dependencies: none (Caddy is already running on the server via an existing project)
- New files in josh repo: `.github/workflows/deploy.yml`
- Server changes: `/opt/caddy/` directory, `/opt/josh/` clone, existing services joined to gateway network
- GitHub secrets: `SSH_PRIVATE_KEY` must be added to josh repo secrets manually before first deploy
