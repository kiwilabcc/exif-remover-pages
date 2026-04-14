# External Integrations

**Analysis Date:** 2026-04-14

## APIs & External Services

**None detected.** The application is a client-side static React app with no API calls, SDK integrations, or third-party service clients in the current source.

## Data Storage

**Databases:** None - no database client or ORM is present.

**File Storage:** Browser-local only - the app operates entirely client-side. Given the project name (`exif_remover_pages`) and domain (`exifremover.kiwilab.cc`), EXIF removal likely processes files in-browser using browser APIs (File API, Canvas, etc.), but this functionality is not yet implemented in `src/App.tsx`.

**Caching:** None.

## Authentication & Identity

**Auth Provider:** None - no authentication library or provider integration present.

## Monitoring & Observability

**Error Tracking:** None detected.

**Logs:** Browser console only (no logging library integrated).

## CI/CD & Deployment

**Hosting:** GitHub Pages
- Custom domain configured via `CNAME` file: `exifremover.kiwilab.cc`
- Static build output from `npm run build` → `dist/`

**CI Pipeline:** Not detected - no `.github/workflows/` directory present.

## Environment Configuration

**Required env vars:** None - no environment variables are used in the current codebase.

**Secrets location:** Not applicable - no secrets required.

## Webhooks & Callbacks

**Incoming:** None.

**Outgoing:** None.

## Development Environment

**DevContainer:**
- Base image: `mcr.microsoft.com/devcontainers/base:trixie` (Debian Trixie)
- Node feature: `ghcr.io/devcontainers/features/node:1` version 24
- Claude Code feature: `ghcr.io/devcontainers-extra/features/claude-code:1` version 2.1.104
- Port 5173 forwarded (Vite dev server)
- Port 4173 forwarded (Vite preview server)
- Config: `.devcontainer/devcontainer.json`

---

*Integration audit: 2026-04-14*
