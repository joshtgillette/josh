## Context

The server runs multiple projects on a single IP. Previously, an existing project owned ports 80/443 via its own embedded Caddy container. Adding josh requires extracting Caddy into a shared gateway that all projects connect to.

An existing Docker network (`soal-shared`) already exists on the server and was designed to bridge compose stacks. It is repurposed here as the gateway network.

## Goals / Non-Goals

**Goals:**
- Single Caddy container owns 80/443 and routes all domains on the server
- Each project remains independently deployable — deploying josh does not touch other projects
- Adding a future project requires only a Caddyfile block + a mounted dist directory (no changes to existing projects)
- TLS is automatic via Caddy's ACME integration

**Non-Goals:**
- Blue/green deploys or zero-downtime rollouts (not warranted for a personal server)
- Centralised logging or metrics
- Any changes to other projects' application behaviour — only Docker Compose topology changes

## Decisions

**Gateway lives at `/opt/caddy/` on the server, not in any project repo**
The Caddyfile routes multiple domains from multiple repos. Putting it in one project repo would create implicit coupling and require that project to be checked out for any routing change. A standalone server-side directory is the correct home for shared infrastructure config.

**Reuse existing `soal-shared` Docker network as the gateway network**
Creating a new `caddy-shared` network would require recreating it on the server and updating all existing references. The existing network already connects the right services; its purpose widens from project-internal to gateway network. Renaming is deferred — it's a cosmetic concern.

**Static sites served via bind-mounted `dist/` into gateway Caddy — no per-project container**
Josh is a static Astro build. Serving it from a dedicated container (nginx, etc.) would add a container with no benefit — Caddy can serve static files directly and efficiently. The deploy just builds to `dist/`; Caddy picks up new files automatically via the bind mount.

**Build happens on the server, not in CI**
Consistent with existing project deploy patterns. Keeps CI simple (no artifact upload/download step), and the server already has Node installed. The tradeoff is that a broken build on the server blocks the deploy, but for a personal site this is acceptable.

**`prod` as the deploy branch (not `main`)**
Explicit branch name makes the deploy trigger unambiguous and consistent with existing project conventions.

## Risks / Trade-offs

- [Brief downtime during cutover] → Planned: stop the existing embedded Caddy, start gateway Caddy. Expected < 60 seconds. TLS certificates are preserved via the `caddy_data` volume migration.
- [Gateway is a single point of failure] → Acceptable for a personal server. If Caddy is down, all sites are down — but `restart: unless-stopped` handles crashes automatically.
- [Server-side files not in version control] → `/opt/caddy/Caddyfile` and `docker-compose.yml` live only on the server. Mitigation: document their structure in this design so they can be reconstructed.

## Migration Plan

1. Create `/opt/caddy/` on server with Caddyfile and docker-compose.yml
2. Update the existing project's compose to expose its backend on the `soal-shared` network
3. Apply compose changes on the server (existing Caddy still running)
4. Copy `caddy_data` volume from the existing project to the new gateway (preserves TLS certs)
5. Stop the existing project's embedded Caddy — brief downtime begins
6. Start gateway Caddy at `/opt/caddy` — all domains come back online
7. Remove the caddy service from the existing project's compose permanently

**Rollback**: `cd /opt/caddy && docker compose down` then restart the existing project's compose restores the original embedded Caddy.

## Gateway File Structure

**`/opt/caddy/Caddyfile`** — one block per domain. Static sites use `file_server`; projects with backends use `reverse_proxy <service>:<port>`. Example pattern:

```
joshgillette.build {
    root * /srv/josh
    file_server
}

<other-domain> {
    handle /api/* { reverse_proxy <backend-service>:<port> }
    handle {
        root * /srv/<project>
        try_files {path} /index.html
        file_server
    }
}
```

**`/opt/caddy/docker-compose.yml`** — Caddy on the shared network, bind-mounting each project's dist:

```yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - /opt/josh/dist:/srv/josh:ro
      - /opt/<other-project>/dist:/srv/<other-project>:ro
    networks:
      - soal-shared

volumes:
  caddy_data:

networks:
  soal-shared:
    external: true
```
