# Privacy Eraser — App Store Support Website

## What This Is

A static marketing and compliance website for the Privacy Eraser iOS app, deployed on GitHub Pages at `exifremover.kiwilab.cc`. The site provides the public-facing privacy policy and terms of service URLs required for App Store submission, plus a product homepage that introduces the app to prospective users.

## Core Value

Satisfy App Store compliance requirements (publicly accessible /privacy and /terms URLs) while giving Privacy Eraser a credible product presence.

## Requirements

### Validated

- ✓ Project bootstrapped with Vite + React 19 + TypeScript + Tailwind v4 — existing
- ✓ GitHub Pages deployment via CNAME at `exifremover.kiwilab.cc` — existing

### Active

- [ ] Homepage — app name, value proposition, feature highlights, screenshot placeholder slots
- [ ] `/privacy` route — renders Privacy Policy from `docs/privacy.md`
- [ ] `/terms` route — renders Terms of Service from `docs/terms.md`
- [ ] `docs/privacy.md` — Markdown privacy policy derived from Flutter app content
- [ ] `docs/terms.md` — Markdown terms of service suitable for App Store
- [ ] Client-side routing (React Router) with `<HashRouter>` for GitHub Pages compatibility
- [ ] Markdown rendering for /privacy and /terms pages
- [ ] Navigation header with links to all three pages

### Out of Scope

- Backend, database, or server-side rendering — static site only, no infrastructure
- Support page (`/support`) — referenced in app code but not required for v1 launch
- App Store screenshot assets — placeholder divs only for now
- i18n / localization — English only for v1
- Blog, changelog, or news sections — not needed for App Store compliance

## Context

The companion Flutter app (`exif_remover_flutter`) is named **Privacy Eraser** and scans photos for EXIF metadata (GPS, camera details, timestamps) entirely on-device. It targets iOS via the App Store.

The app's `release_info.dart` contains authoritative copy for the privacy policy (data handling, data storage, third-party services, feature status sections). Terms of service must be authored from scratch.

The App Store requires:
- A publicly reachable URL for Privacy Policy (must match the URL entered in App Store Connect)
- A publicly reachable URL for Terms of Service (optional but strongly recommended)
- The privacy policy must accurately describe data practices

Current domain: `exifremover.kiwilab.cc` — the Flutter app code references `privacy-eraser.app` which may be a future domain.

## Constraints

- **Deployment:** GitHub Pages (static files only, no server) — use HashRouter (`/#/privacy`) for client-side routing
- **Tech Stack:** React + Vite + TypeScript + Tailwind v4 — do not introduce conflicting frameworks
- **Markdown:** Must render `docs/privacy.md` and `docs/terms.md` at build time or runtime (prefer build-time import for simplicity)
- **Performance:** Pages must load fast — no heavy dependencies

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| HashRouter over BrowserRouter | GitHub Pages serves only `index.html` — hash routing avoids 404s on direct URL access | — Pending |
| Markdown at build time | Import `.md` files via Vite plugin rather than runtime fetch — simpler, no loading states | — Pending |
| Content from `docs/` directory | Separates legal content from component code — easy to update without touching React | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14 after initialization*
