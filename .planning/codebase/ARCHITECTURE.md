# Architecture

**Analysis Date:** 2026-04-14

## Pattern Overview

**Overall:** Single-Page Application (SPA) — client-side only, no backend

**Key Characteristics:**
- All logic runs in the browser; no server-side rendering
- Single root component (`App`) renders the entire UI
- Static asset deployment target (GitHub Pages via CNAME)
- No routing layer — single view application at this stage

## Layers

**Entry Point:**
- Purpose: Bootstrap React into the DOM
- Location: `src/main.tsx`
- Contains: ReactDOM root creation, StrictMode wrapper
- Depends on: React, `src/App.tsx`, `src/index.css`
- Used by: `index.html` via `<script type="module">`

**Root Component:**
- Purpose: Renders the full application UI
- Location: `src/App.tsx`
- Contains: UI markup, local state with `useState`, static content sections
- Depends on: `src/assets/`, `src/App.css`
- Used by: `src/main.tsx`

**Styles:**
- Purpose: Global design tokens, resets, Tailwind base; component-scoped styles
- Location: `src/index.css` (global), `src/App.css` (component)
- Contains: CSS custom properties (design tokens), dark mode via `prefers-color-scheme`, Tailwind import
- Depends on: Tailwind CSS v4 (imported via `@import "tailwindcss"`)
- Used by: `src/main.tsx` imports `index.css`; `src/App.tsx` imports `App.css`

**Static Assets:**
- Purpose: Images and SVG sprites served at runtime
- Location: `src/assets/` (bundled by Vite), `public/` (served as-is)
- Contains: `hero.png`, `react.svg`, `vite.svg` in assets; `favicon.svg`, `icons.svg` (SVG sprite) in public
- Depends on: Nothing
- Used by: `src/App.tsx` imports asset files; HTML references `/favicon.svg` and `/icons.svg`

## Data Flow

**User Interaction (Counter):**

1. User clicks the counter button in `src/App.tsx`
2. `onClick` handler calls `setCount((count) => count + 1)`
3. React re-renders `App` with updated `count` value
4. Button label reflects new count

**No external data flows exist** — no API calls, no remote state, no routing.

**State Management:**
- Local component state only via React `useState`
- No global state manager (no Redux, Zustand, Context, etc.)

## Key Abstractions

**App Component:**
- Purpose: Single top-level UI container
- Examples: `src/App.tsx`
- Pattern: Function component with local state; returns JSX fragment with multiple `<section>` elements

**SVG Sprite:**
- Purpose: Reusable icon system served from `public/icons.svg`
- Examples: `public/icons.svg`, referenced via `<use href="/icons.svg#icon-id">`
- Pattern: External SVG sprite — icons referenced by fragment ID, not inlined

**Design Token System:**
- Purpose: Centralized color/typography/spacing values
- Examples: `src/index.css` `:root` block
- Pattern: CSS custom properties (`--accent`, `--bg`, `--border`, etc.) with automatic dark mode overrides

## Entry Points

**HTML Shell:**
- Location: `index.html`
- Triggers: Browser load
- Responsibilities: Declares `<div id="root">` mount point, loads `src/main.tsx` as ES module

**React Bootstrap:**
- Location: `src/main.tsx`
- Triggers: Script execution after HTML parse
- Responsibilities: Creates React root on `#root`, renders `<App>` inside `<StrictMode>`

## Error Handling

**Strategy:** None implemented — default React error boundaries are not present.

**Patterns:**
- No try/catch blocks
- No error boundary components
- TypeScript strict mode provides compile-time type safety

## Cross-Cutting Concerns

**Logging:** None — no logging framework or console statements
**Validation:** None — no user input at this stage
**Authentication:** None — fully public static site

---

*Architecture analysis: 2026-04-14*
