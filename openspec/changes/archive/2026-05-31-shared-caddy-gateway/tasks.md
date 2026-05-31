## 1. Josh Repo — CI/CD

- [x] 1.1 Rename default branch from `main` to `prod` (locally: `git branch -m main prod`)
- [x] 1.2 Create `.github/workflows/deploy.yml` — on push to `prod`, SSH into server, git pull, npm install, npm run build
- [x] 1.3 Add `SSH_PRIVATE_KEY` secret to josh GitHub repo settings (manual step — reuse key from existing project's repo secrets)

## 2. Existing Project — Remove Embedded Caddy

- [x] 2.1 In the existing project's `docker-compose.yml`, explicitly add the backend service to the `soal-shared` network
- [x] 2.2 In the existing project's `docker-compose.yml`, remove the `caddy` service and `caddy_data` volume
- [x] 2.3 Remove the existing project's `Caddyfile` from its repo
- [x] 2.4 In the existing project's prod deploy workflow, remove the step that starts/restarts Caddy
- [x] 2.5 In the existing project's stage deploy workflow, remove the step that restarts Caddy
- [x] 2.6 Update the existing project's OpenSpec deployment spec to reflect that Caddy is no longer part of its stack

## 3. Server — Bootstrap Gateway

- [x] 3.1 SSH into server: create `/opt/caddy/` directory
- [x] 3.2 Write `/opt/caddy/Caddyfile` with a block for each domain served (see design.md for pattern)
- [x] 3.3 Write `/opt/caddy/docker-compose.yml` with Caddy on `soal-shared` network, bind-mounting each project's dist directory (see design.md for pattern)
- [x] 3.4 Clone josh repo on server: `git clone git@github.com:joshtgillette/josh.git /opt/josh`
- [x] 3.5 Build josh site on server: `cd /opt/josh && npm install && npm run build`

## 4. Server — Cutover

- [x] 4.1 Apply the existing project's updated compose on the server: `git pull && docker compose up -d` (backend joins shared network; old Caddy still running)
- [x] 4.2 Migrate Caddy TLS data volume to gateway: `docker run --rm -v <existing>_caddy_data:/from -v caddy_caddy_data:/to alpine sh -c "cp -a /from/. /to/"`
- [x] 4.3 Stop the existing project's embedded Caddy container
- [x] 4.4 Start gateway Caddy: `cd /opt/caddy && docker compose up -d`
- [x] 4.5 Verify all domains are live over HTTPS

## 5. Verification

- [x] 5.1 Push a test commit to `prod` and confirm the GitHub Actions deploy workflow runs and succeeds
- [x] 5.2 Confirm updated content appears on `https://joshgillette.build` after deploy
- [x] 5.3 Confirm all other domains on the server continue to work normally
