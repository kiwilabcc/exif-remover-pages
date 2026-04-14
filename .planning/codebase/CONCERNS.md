# Concerns & Technical Debt

## Summary

This is a very early-stage scaffold (Vite init). The codebase has almost no application logic yet — most concerns are about what's missing rather than what's broken.

## Missing Infrastructure

### No Tests
- **Severity:** High (for production)
- No test runner configured (no Vitest, Jest)
- No testing-library setup
- Zero test coverage
- **Risk:** Any feature built now has no regression safety net

### No CI/CD Pipeline
- **Severity:** Medium
- No GitHub Actions workflows present
- No automated lint/build/test on push
- GitHub Pages deployment appears manual or via external config
- **Risk:** No gate before broken code reaches production

### No Error Boundaries
- **Severity:** Low (scaffold stage)
- No React error boundaries configured
- Uncaught render errors will crash the entire app
- **Risk:** Poor user experience when errors occur

## Current State Issues

### Scaffold Content Still Present
- `src/App.tsx` contains Vite starter template (counter, logos, links to Vite docs)
- `src/assets/react.svg`, `vite.svg` are scaffold assets
- `src/assets/hero.png` appears to be a custom addition (not default Vite scaffold)
- **Action:** Replace scaffold content with actual app before shipping

### `motion` Package Installed but Unused
- `motion` (Framer Motion v12) is listed as a production dependency
- Not imported anywhere in current code
- **Risk:** Adds bundle weight if not tree-shaken; may indicate unstarted feature work

## Security

### Client-Side Only
- No backend, no server-side secrets visible
- No environment variables configured
- No auth system present
- EXIF processing (per project name) should happen entirely in-browser — **do not send files to a server without explicit user consent and disclosure**

### File Handling (anticipated)
- EXIF removal implies file reads — use the File API, not server uploads
- Validate file types (MIME + magic bytes) before processing
- Consider memory limits for large images (>10MB files can cause browser OOM)

## Performance

### Bundle Size (anticipated)
- `motion` adds ~50-100KB gzipped if not carefully tree-shaken
- Image processing libraries (if added) can be large — consider WebAssembly alternatives
- Tailwind v4 purges unused CSS at build time — no concern there

## Dependencies

All dependencies are current/recent versions. No known CVEs at time of mapping.

| Package | Version | Note |
|---------|---------|------|
| react | ^19.2.4 | Current stable |
| tailwindcss | ^4.2.2 | Current stable (v4 alpha/stable) |
| motion | ^12.38.0 | Current — unused |
| vite | ^8.0.4 | Current stable |
| typescript | ~6.0.2 | Current stable |

---
*Mapped: 2026-04-14*
