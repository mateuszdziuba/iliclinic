---
phase: 260320-rbq
plan: 01
subsystem: navigation
tags: [header, nav, o-nas, technologie, cross-linking]
dependency_graph:
  requires: []
  provides: [technologie-nav-link, equipment-cross-links]
  affects: [Header.astro, o-nas.astro]
tech_stack:
  added: []
  patterns: [navLinks array iteration, Astro template expressions]
key_files:
  modified:
    - src/components/Header.astro
    - src/pages/[location]/o-nas.astro
decisions:
  - Equipment rows link to /{location}/technologie index (not individual slugs) to avoid broken links before content files exist
metrics:
  duration: ~5m
  completed: 2026-03-20
---

# Phase 260320-rbq Plan 01: Navigation Cross-Linking Summary

**One-liner:** Technologie added to header nav (desktop + mobile) and all four o-nas equipment rows converted to anchor links pointing to the technologie index page.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add Technologie to header nav | 8734883 | src/components/Header.astro |
| 2 | Link o-nas equipment rows to technologie pages | 8734883 | src/pages/[location]/o-nas.astro |

## What Was Built

**Task 1 — Header nav:**
Inserted `{ label: 'Technologie', href: \`${basePath}/technologie\` }` between Zabiegi and Sklep in the `navLinks` array in `Header.astro`. Because both desktop and mobile navs iterate `navLinks`, the entry appears automatically in both menus for every location. Final order: O nas, Zabiegi, Technologie, Sklep, Kontakt.

**Task 2 — Equipment rows:**
Converted all four static `<div class="group py-6 ...">` equipment rows in the EQUIPMENT section of `o-nas.astro` to `<a href={...}>` elements. All existing classes and inner markup preserved exactly. Links point to `/{location}/technologie` (the index page) per the constraint — avoids broken links before individual technologie content files exist.

## Deviations from Plan

**1. [Constraint Applied] Equipment rows link to technologie index, not individual slugs**
- **Reason:** Execution constraint specified: "If the plan uses hardcoded slugs, link to the technologie INDEX page instead — that is always safe and correct."
- **Impact:** Users navigating from o-nas equipment rows land on the technologie listing; from there they can drill into individual technology pages once content exists.
- **Files modified:** src/pages/[location]/o-nas.astro

## Verification

- `pnpm build` completed with 0 errors — 39 pages built in 1.61s.
- Pre-existing "collection technologie does not exist or is empty" warning present on technologie pages (no content entries yet) — not introduced by this work.

## Self-Check

- [x] src/components/Header.astro modified with Technologie nav entry
- [x] src/pages/[location]/o-nas.astro all four equipment rows converted to anchors
- [x] Commit 8734883 exists
- [x] Build passes

## Self-Check: PASSED
