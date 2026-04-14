# Testing

## Current State

**No test framework is installed.** This is a fresh Vite scaffold with no testing setup.

## What's Missing

- No test runner (no Vitest, Jest, or similar)
- No testing-library packages
- No test files in `src/`
- No `test` script in `package.json`

## Recommended Setup (when needed)

For a Vite + React + TypeScript project, the standard stack is:

- **Test runner:** Vitest (native Vite integration, same config)
- **Component testing:** `@testing-library/react` + `@testing-library/user-event`
- **DOM environment:** `@testing-library/jest-dom` matchers
- **jsdom:** For browser environment simulation

Example `package.json` additions:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Coverage

- Current coverage: 0% (no tests exist)
- No CI test gate configured

---
*Mapped: 2026-04-14*
