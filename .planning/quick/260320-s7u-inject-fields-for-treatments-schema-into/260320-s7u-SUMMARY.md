---
phase: 260320-s7u
plan: 01
subsystem: cms-content
tags: [zabiegi, schema, pages-cms, astro-content, treatment-page]
dependency_graph:
  requires: []
  provides: [treatment-box-field-binding, preparation-schema-field]
  affects: [src/content.config.ts, .pages.yml, treatment-detail-page]
tech_stack:
  added: []
  patterns: [Astro content collection schema, Pages CMS collection fields, conditional card rendering]
key_files:
  modified:
    - src/content.config.ts
    - .pages.yml
    - src/pages/[location]/zabiegi/[slug].astro
decisions:
  - Keep all three bottom cards conditional so empty content fields do not render placeholder or misleading medical copy
metrics:
  duration: ~10m
  completed: 2026-03-20
---

# Phase 260320-s7u Plan 01: Treatment Field Wiring Summary

**One-liner:** The treatment detail page now renders "Dla kogo" from `wskazania`, "Przeciwwskazania" from `przeciwwskazania`, and a new "Przygotowanie do zabiegu" card from a new schema/CMS field.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Extend treatment schemas | pending | src/content.config.ts, .pages.yml |
| 2 | Replace hardcoded page cards with schema-driven content | pending | src/pages/[location]/zabiegi/[slug].astro |

## What Was Built

Added `przygotowanie_do_zabiegu` to the `zabiegi` Astro content collection and to the Pages CMS `zabiegi` collection fields so editors can manage preparation steps alongside existing treatment metadata.

Replaced the two hardcoded bottom cards on `zabiegi/[slug].astro` with conditional rendering from frontmatter arrays:
- `wskazania` populates the "Dla kogo" card
- `przeciwwskazania` populates the repurposed middle card
- `przygotowanie_do_zabiegu` populates a new ordered preparation card

## Verification

- `pnpm build` passed on 2026-03-20.
- Existing `technologie` empty-collection warning is still present and unchanged.

## Self-Check

- [x] `src/content.config.ts` includes `przygotowanie_do_zabiegu`
- [x] `.pages.yml` includes `przygotowanie_do_zabiegu`
- [x] `src/pages/[location]/zabiegi/[slug].astro` uses schema fields instead of placeholder bullet lists
- [x] Build passes

## Self-Check: PASSED
