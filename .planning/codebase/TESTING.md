# Testing

**Analysis Date:** 2026-03-20

## Summary

**No tests exist in this project.** There are zero test files in `src/` or the project root. Testing infrastructure is not configured.

## Framework

**None installed.** No test runner found in `package.json` devDependencies:
- No Vitest, Jest, Playwright, Cypress, or any testing library
- No test scripts in `package.json`
- No test configuration files (`.vitest.config.*`, `jest.config.*`, `playwright.config.*`)

## What Exists (node_modules only)

Tests visible in the repository are **only from dependencies**:
- `node_modules/.pnpm/zod@4.3.6/...` contains Zod's own test suite (not project tests)

## Test Coverage

**Coverage: 0%** — No project code is tested.

## Risk Areas Without Tests

Based on code analysis, the following logic is untested:

**Critical business logic:**
- `src/pages/[location]/zabiegi/index.astro` — treatment filtering by category and search term (pure client-side JS)
- `src/pages/[location]/index.astro` — featured treatment selection logic
- `src/content/config.ts` — Zod schema validation for content collections

**Routing:**
- `getStaticPaths()` in all `[location]/*.astro` pages
- Location parameter validation and redirect logic

**Data transformation:**
- Per-location price selection (`price_pruszkow` vs `price_ostroleka`)
- Category sorting with known-order + dynamic-append pattern

**Animation integration:**
- Lenis scroll initialization in `BaseLayout.astro`
- GSAP ScrollTrigger setup in individual pages

## Recommended Testing Setup

For this Astro + TypeScript project, recommended stack:

```bash
pnpm add -D vitest @vitest/ui
pnpm add -D @playwright/test  # E2E
```

**Unit tests (Vitest):** Test data transformation, filtering logic, schema validation
**E2E tests (Playwright):** Test treatment search/filter, location theming, navigation

## Test File Location Convention (if added)

- Unit tests: co-located or `src/**/*.test.ts`
- E2E tests: `e2e/*.spec.ts` or `tests/e2e/*.spec.ts`

---

*Testing analysis: 2026-03-20*
