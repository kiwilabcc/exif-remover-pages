# Directory Structure

## Root Layout

```
exif_remover_pages/
├── src/                    # Application source
│   ├── main.tsx            # Entry point — mounts React root
│   ├── App.tsx             # Root component (currently scaffold)
│   ├── App.css             # Component-level styles
│   ├── index.css           # Global styles, CSS custom properties, Tailwind
│   └── assets/             # Static assets imported by components
│       ├── hero.png        # Hero image
│       ├── react.svg       # React logo
│       └── vite.svg        # Vite logo
├── public/                 # Static assets served as-is (no hashing)
│   ├── favicon.svg         # Browser tab icon
│   └── icons.svg           # SVG sprite sheet (use href="#icon-id")
├── index.html              # Vite HTML entry — references /src/main.tsx
├── CNAME                   # GitHub Pages custom domain config
├── package.json
├── vite.config.ts          # Vite + React plugin + Tailwind v4
├── tsconfig.json           # Root TS config (references app + node)
├── tsconfig.app.json       # Browser/app TypeScript settings
├── tsconfig.node.json      # Node/tooling TypeScript settings
├── eslint.config.js        # ESLint v9 flat config
└── .devcontainer/          # Dev container configuration
```

## Key Locations

| What | Where |
|------|-------|
| App entry | `src/main.tsx` |
| Root component | `src/App.tsx` |
| Global styles / tokens | `src/index.css` |
| SVG icon sprite | `public/icons.svg` |
| Vite config | `vite.config.ts` |
| TypeScript (app) | `tsconfig.app.json` |

## Naming Conventions

- **Components:** PascalCase files (`App.tsx`)
- **Entry points:** camelCase (`main.tsx`)
- **Styles:** kebab-case or same name as component (`App.css`)
- **Assets in `src/assets/`:** imported at build time (get content hash in filename)
- **Assets in `public/`:** served verbatim at `/filename` — use for things referenced in HTML or SVG `use href`

## Growth Pattern

Currently a single-component scaffold. As features are added:
- New components → `src/components/`
- Shared hooks → `src/hooks/`
- Utility functions → `src/lib/` or `src/utils/`
- Feature modules → `src/features/<name>/`

---
*Mapped: 2026-04-14*
