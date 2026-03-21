---
phase: quick
plan: 260321-eee
subsystem: mobile-layout
tags: [mobile, layout, hero, nav, cta, spacing]
dependency_graph:
  requires: []
  provides: [mobile-nav-clearance-treatment-pages]
  affects: [zabiegi-slug, zabiegi-index]
tech_stack:
  added: []
  patterns: [responsive-tailwind-prefixes]
key_files:
  created: []
  modified:
    - src/pages/[location]/zabiegi/[slug].astro
    - src/pages/[location]/zabiegi/index.astro
decisions:
  - "Used pt-36 (144px) on hero/breadcrumbs: nav pill bottom edge ~92px + ~52px clearance gives reliable mobile visibility"
  - "Kept lg:pt-40 on index.astro desktop as-is — desktop proportions already fine"
  - "CTA card shrinks via sm: breakpoint prefix rather than separate mobile/desktop components"
metrics:
  duration: 5m
  completed: 2026-03-21
---

# Phase quick Plan 260321-eee: Fix Hero Text Overlap by Nav and Shrink CTA Card Summary

Hero text on both treatment pages now clears the fixed nav pill on mobile via pt-36, and the CTA card uses responsive padding/text sizes to avoid dominating the viewport.

## Tasks Completed

| # | Task | Commit | Files Modified |
|---|------|--------|----------------|
| 1 | Fix hero padding and shrink CTA card on mobile | 77c399f | src/pages/[location]/zabiegi/[slug].astro, src/pages/[location]/zabiegi/index.astro |

## Changes Made

### `src/pages/[location]/zabiegi/[slug].astro`

- Breadcrumbs div: `pt-28` → `pt-36` (144px top padding gives ~52px clearance below the fixed nav pill's bottom edge of ~92px)
- CTA card `bg-text-main`: `p-8` → `p-5 sm:p-8`
- CTA card heading: `text-2xl` → `text-xl sm:text-2xl`, `mb-3` → `mb-2 sm:mb-3`
- CTA card paragraph: `text-sm` → `text-xs sm:text-sm`, `mb-7` → `mb-4 sm:mb-7`
- CTA button container: `space-y-2.5` → `space-y-2 sm:space-y-2.5`
- Both CTA buttons: `px-6 py-3.5` → `px-5 py-3 sm:px-6 sm:py-3.5`

### `src/pages/[location]/zabiegi/index.astro`

- Hero section: `pt-28` → `pt-36` (matching the detail page fix, keeping `lg:pt-40` desktop unchanged)

## Verification

- Build: passed (37 pages, 1.75s)
- Manual check target: open treatment detail and listing pages at 375px width — hero content should be fully visible below nav pill

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `src/pages/[location]/zabiegi/[slug].astro` — modified, committed at 77c399f
- `src/pages/[location]/zabiegi/index.astro` — modified, committed at 77c399f
- Build completed without errors
