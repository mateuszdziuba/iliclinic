# Project State — Ili Clinic

**Last updated**: 2026-03-21
**Current milestone**: M1 — Launch-ready site
**Active branch**: cinematic-design-refresh

## Current Status
Phases 1–4 complete. Ready for Phase 5 (sample content + build verification).

**Last activity**: 2026-03-21 — Completed quick task 260321-e9o: Fix animations so content does not disappear + filter pill fixed to bottom

## Recently Completed
- Fixed `/undefined` treatment URL bug (Astro 5 `.id` not `.slug`)
- Redesigned `zabiegi/[slug].astro` with editorial bento grid layout
- Added `wskazania`, `przeciwwskazania` fields to zabiegi schema + CMS
- Wired treatment detail boxes to `wskazania`, `przeciwwskazania`, and new `przygotowanie_do_zabiegu`
- Removed `technologie` pages, CMS schema, and nav/cross-links
- Redesigned `o-nas.astro` and `kontakt.astro` to match cinematic design language

## Pending
- Phase 5: Check mobile layouts

## Known Issues
- None currently tracked

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 260320-s7u | Wire treatment detail boxes to schema fields + add `przygotowanie_do_zabiegu` | 2026-03-20 | — | [260320-s7u-inject-fields-for-treatments-schema-into](.planning/quick/260320-s7u-inject-fields-for-treatments-schema-into/) |
| 260321-du5 | UI polish: hero content pushed below nav pill; salon switch visible md+; filter bar → floating pill | 2026-03-21 | c3f2601 | [260321-du5-ui-polish-fix-hero-overlap-unify-salon-s](.planning/quick/260321-du5-ui-polish-fix-hero-overlap-unify-salon-s/) |
| 260321-e4n | UI polish: filter pill coherence with nav, treatment hero warm overlay + rounder corners, o-nas equipment dots removed | 2026-03-21 | 9bd3736 | [260321-e4n-ui-polish-treatment-pill-coherence-image](.planning/quick/260321-e4n-ui-polish-treatment-pill-coherence-image/) |
| 260321-e9o | Fix animations: progressive enhancement via viewport checks; filter pill fixed to bottom of viewport | 2026-03-21 | 6d71e73 | [260321-e9o-fix-animations-so-content-doesn-t-disapp](.planning/quick/260321-e9o-fix-animations-so-content-doesn-t-disapp/) |

## Key File Notes
- Content IDs: use `entry.id` everywhere (Astro 5 Content Layer, no `.slug`)
- Design tokens: use semantic (`text-primary`, `bg-surface`) not legacy aliases
- Location theme: set via `data-location` attribute on `<html>` in BaseLayout
