# Project State — Ili Clinic

**Last updated**: 2026-03-20
**Current milestone**: M1 — Launch-ready site
**Active branch**: cinematic-design-refresh

## Current Status
Phases 1–3 complete. Working on Phase 4 (navigation + cross-linking).

## Recently Completed
- Fixed `/undefined` treatment URL bug (Astro 5 `.id` not `.slug`)
- Redesigned `zabiegi/[slug].astro` with editorial bento grid layout
- Created `technologie/index.astro` and `technologie/[slug].astro`
- Added `wskazania`, `przeciwwskazania` fields to zabiegi schema + CMS
- Added `technologie` collection to `content.config.ts` + `.pages.yml`
- Redesigned `o-nas.astro` and `kontakt.astro` to match cinematic design language

## Pending
- Phase 4: Add "Technologie" to header nav, link o-nas equipment section to technologie pages
- Phase 5: Sample technologie content, build verification

## Known Issues
- `related.slug` on treatment cards was reverted to `related.id` (correct for Astro 5)
- `technologie` collection needs at least one content entry for static paths to generate
- `o-nas.astro` equipment section still has static list — needs links to technologie pages

## Key File Notes
- Content IDs: use `entry.id` everywhere (Astro 5 Content Layer, no `.slug`)
- Design tokens: use semantic (`text-primary`, `bg-surface`) not legacy aliases
- Location theme: set via `data-location` attribute on `<html>` in BaseLayout
