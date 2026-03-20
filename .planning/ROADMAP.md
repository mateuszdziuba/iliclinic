# Roadmap — Ili Clinic M1: Launch-ready site

## Milestone 1: Launch-ready site

### Phase 1 — Content schema & CMS completeness ✅ DONE
**Goal**: All content types fully defined and CMS-editable.

Tasks:
- [x] Fix Astro 5 `.id` vs `.slug` bug (treatment URLs showing `/undefined`)
- [x] Add `wskazania` and `przeciwwskazania` fields to zabiegi schema
- [x] Create `technologie` collection in `content.config.ts`
- [x] Add `technologie` collection to `.pages.yml`
- [x] Create `src/content/technologie/` directory

### Phase 2 — Treatment & technology pages redesign ✅ DONE
**Goal**: All zabieg/technologia pages look polished and consistent with landing page.

Tasks:
- [x] Redesign `zabiegi/index.astro` — card grid with category filter + GSAP
- [x] Redesign `zabiegi/[slug].astro` — bento grid replacing accordions, editorial hero
- [x] Create `technologie/index.astro` — card grid, consistent style
- [x] Create `technologie/[slug].astro` — bento grid, linked treatments

### Phase 3 — Secondary pages polish ✅ DONE
**Goal**: O-nas and kontakt match cinematic design language.

Tasks:
- [x] Redesign `o-nas.astro` — cinematic hero, editorial sections, semantic tokens
- [x] Redesign `kontakt.astro` — typographic hero, contact rows, maps embed

### Phase 4 — Navigation & cross-linking
**Goal**: Header links to technologie, o-nas links to technologie pages.

Tasks:
- [ ] Add "Technologie" link to header navigation
- [ ] Update `o-nas.astro` equipment section to link to `/technologie` pages instead of static list
- [ ] Verify all internal links resolve correctly

### Phase 5 — Sample content & launch readiness
**Goal**: Site is presentable with real or realistic content. Build succeeds, no /undefined URLs, mobile layouts verified.

**Plans:** 2 plans

Plans:
- [ ] 05-01-PLAN.md — Create two sample technologia entries (laser-frakcyjny, ultradzwieki-hifu) for both locations
- [ ] 05-02-PLAN.md — Run production build, verify no /undefined URLs, human mobile layout verification

## Quick Tasks Completed

| Task | Date | Commit |
|------|------|--------|
| Fix /undefined zabiegi bug (t.id not t.slug) | 2026-03-20 | e04c8b1 |
| Redesign [slug].astro with bento grid | 2026-03-20 | e04c8b1 |
| Create technologie pages (index + [slug]) | 2026-03-20 | — |
| Add wskazania/przeciwwskazania to schema | 2026-03-20 | — |
| Add technologie collection to schema + CMS | 2026-03-20 | — |
