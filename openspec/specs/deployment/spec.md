# deployment Specification

## Purpose
TBD - created by archiving change shared-caddy-gateway. Update Purpose after archive.
## Requirements
### Requirement: Push to prod triggers automated deploy
The system SHALL automatically build and deploy the site on every push to the `prod` branch via GitHub Actions.

#### Scenario: Push to prod branch
- **WHEN** a commit is pushed to the `prod` branch
- **THEN** the GitHub Actions deploy workflow SHALL SSH into the server, pull the latest code, install dependencies, and run `npm run build`

#### Scenario: Push to non-prod branch
- **WHEN** a commit is pushed to any branch other than `prod`
- **THEN** the deploy workflow SHALL NOT run

### Requirement: Deploy uses SSH key from repository secrets
The deploy workflow SHALL authenticate with the server using a private SSH key stored in the repository's GitHub secrets.

#### Scenario: SSH key is present
- **WHEN** the deploy workflow runs
- **THEN** it SHALL read `SSH_PRIVATE_KEY` from GitHub secrets, write it to a temporary key file with permissions `600`, use it to SSH into the server, and delete the key file after the SSH command completes

### Requirement: Updated site is served without manual intervention
After a successful deploy, the updated site SHALL be live at `joshgillette.build` without requiring any manual server action.

#### Scenario: Static files updated
- **WHEN** `npm run build` completes on the server
- **THEN** the updated `dist/` files SHALL be served by the gateway Caddy on the next request, via bind mount, with no container restart required

