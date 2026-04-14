# Technology Stack

**Analysis Date:** 2026-04-14

## Languages

**Primary:**
- TypeScript ~6.0.2 - All application source code in `src/`
- TSX (TypeScript JSX) - React component files (`src/App.tsx`, `src/main.tsx`)

**Secondary:**
- CSS - Styling (`src/App.css`, `src/index.css`)
- HTML - Single entry document (`index.html`)

## Runtime

**Environment:**
- Node.js 24.x (LTS) - specified via devcontainer feature `ghcr.io/devcontainers/features/node:1` version 24

**Package Manager:**
- npm 11.11.0
- Lockfile: `package-lock.json` present (committed)

## Frameworks

**Core:**
- React 19.2.4 - UI component framework
- React DOM 19.2.3 - DOM rendering (`react-dom`)

**Styling:**
- Tailwind CSS 4.2.2 - Utility-first CSS framework
- `@tailwindcss/vite` 4.2.2 - Tailwind v4 Vite integration plugin (no separate config file needed)

**Animation:**
- motion 12.38.0 - Animation library (listed as dependency but not yet used in current `src/App.tsx`)

**Build/Dev:**
- Vite 8.0.4 - Dev server and build tool with HMR
- `@vitejs/plugin-react` 6.0.1 - React Fast Refresh via Oxc transformer

## Key Dependencies

**Critical:**
- `react` 19.2.4 - Core framework; all components depend on it
- `react-dom` 19.2.4 - Required for DOM mounting in `src/main.tsx`
- `tailwindcss` 4.2.2 - Utility classes used directly in JSX `className` props
- `@tailwindcss/vite` 4.2.2 - Enables Tailwind v4's CSS-first configuration (no `tailwind.config.js`)
- `motion` 12.38.0 - Animation library imported but not yet actively used

**Infrastructure:**
- `typescript` ~6.0.2 - Type checking; `tsc -b` runs as part of the build script
- `eslint` 9.39.4 - Linting with flat config format (`eslint.config.js`)
- `typescript-eslint` 8.58.0 - TypeScript-aware linting rules
- `eslint-plugin-react-hooks` 7.0.1 - Enforces Rules of Hooks
- `eslint-plugin-react-refresh` 0.5.2 - Validates fast refresh compatibility

## Configuration

**TypeScript:**
- `tsconfig.json` - Root config, references `tsconfig.app.json` and `tsconfig.node.json`
- `tsconfig.app.json` - App source config; target `ES2023`, `moduleResolution: bundler`, strict unused-variable checks, `jsx: react-jsx`
- `tsconfig.node.json` - Node config for Vite config file

**Build:**
- `vite.config.ts` - Vite configuration; plugins: `tailwindcss()` and `react()`
- `eslint.config.js` - ESLint flat config; applies to `**/*.{ts,tsx}`, extends recommended + react-hooks + react-refresh

**Tailwind:**
- No `tailwind.config.js` - Tailwind v4 uses CSS-first config via `@tailwindcss/vite` plugin
- CSS entry: `src/index.css`

**Environment:**
- No `.env` files detected
- No environment variables required for current codebase state

## Platform Requirements

**Development:**
- Node.js 24.x
- Dev server: `npm run dev` → Vite on port 5173
- Preview server: `npm run preview` → Vite on port 4173
- DevContainer configuration: `.devcontainer/devcontainer.json` (Debian Trixie base image)

**Production:**
- Static site - output to `dist/` via `npm run build` (`tsc -b && vite build`)
- Deployed to GitHub Pages at `exifremover.kiwilab.cc` (see `CNAME`)

---

*Stack analysis: 2026-04-14*
