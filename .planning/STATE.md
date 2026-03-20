# Project State — Ili Clinic

**Last updated**: 2026-03-20
**Current milestone**: M1 — Launch-ready site
**Active branch**: cinematic-design-refresh

## Current Status
Phases 1–4 complete. Ready for Phase 5 (sample content + build verification).

**Last activity**: 2026-03-20 — Completed quick task 260320-rbq: Phase 4 navigation & cross-linking

## Recently Completed
- Added "Technologie" to header nav (between Zabiegi and Sklep), desktop + mobile
- Linked o-nas.astro equipment rows to `/{location}/technologie` index page
- Fixed `/undefined` treatment URL bug (Astro 5 `.id` not `.slug`)
- Redesigned `zabiegi/[slug].astro` with editorial bento grid layout
- Created `technologie/index.astro` and `technologie/[slug].astro`
- Added `wskazania`, `przeciwwskazania` fields to zabiegi schema + CMS
- Added `technologie` collection to `content.config.ts` + `.pages.yml`
- Redesigned `o-nas.astro` and `kontakt.astro` to match cinematic design language

## Pending
- Phase 5: Add at least 1 sample technologia markdown entry per location
- Phase 5: Verify `astro build` completes without errors
- Phase 5: Check mobile layouts

## Known Issues
- `technologie` collection needs at least one content entry for static paths to generate (build will skip technologie/[slug].astro pages if empty)

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 260320-rbq | Phase 4 — Navigation & cross-linking: Technologie nav + o-nas equipment links | 2026-03-20 | 47357b2 | [260320-rbq-phase-4-navigation-cross-linking-add-tec](.planning/quick/260320-rbq-phase-4-navigation-cross-linking-add-tec/) |

## Key File Notes
- Content IDs: use `entry.id` everywhere (Astro 5 Content Layer, no `.slug`)
- Design tokens: use semantic (`text-primary`, `bg-surface`) not legacy aliases
- Location theme: set via `data-location` attribute on `<html>` in BaseLayout
