# Coding Conventions

## Language & Runtime

- **Language:** TypeScript (strict mode)
- **Runtime:** Browser (ESM, `"type": "module"`)
- **Bundler:** Vite 8

## TypeScript Configuration

Strict settings enforced:
- `noUnusedLocals` — no unused local variables
- `noUnusedParameters` — no unused function parameters
- `verbatimModuleSyntax` — import/export syntax preserved
- `erasableSyntaxOnly` — only syntax erasable at compile time

## Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Component files | PascalCase | `App.tsx` |
| Entry points | camelCase | `main.tsx` |
| CSS files | kebab-case | `index.css` |

## Module Pattern

- Default exports for React components
- No barrel files (`index.ts` re-exports)
- ESM imports throughout

## Formatting

- **Indentation:** 2 spaces
- **Quotes:** Single quotes
- **Prettier:** Not configured (ESLint only)

## Linting

ESLint v9 flat config with:
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` — hooks rules enforcement
- `eslint-plugin-react-refresh` — React Fast Refresh compatibility

Config file: `eslint.config.js`

## Styling

- **Framework:** Tailwind CSS v4
- **Design tokens:** CSS custom properties in `src/index.css`
- **Patterns:** Native CSS nesting, utility classes via Tailwind

## Error Handling

- No established error boundary pattern yet (early scaffold)
- TypeScript strict mode provides compile-time safety

---
*Mapped: 2026-04-14*
