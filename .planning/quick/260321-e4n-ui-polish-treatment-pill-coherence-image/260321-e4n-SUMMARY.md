---
phase: quick
plan: 260321-e4n
subsystem: ui
tags: [ui-polish, filter, hero, o-nas, mobile-spacing]
dependency_graph:
  requires: []
  provides: [filter-pill-coherence, treatment-hero-warmth, o-nas-clean-equipment]
  affects: [zabiegi/index.astro, zabiegi/[slug].astro, o-nas.astro]
tech_stack:
  added: []
  patterns: [frosted-glass-pill, warm-overlay, tailwind-responsive]
key_files:
  modified:
    - src/pages/[location]/zabiegi/index.astro
    - src/pages/[location]/zabiegi/[slug].astro
    - src/pages/[location]/o-nas.astro
decisions:
  - Filter pill now uses bg-white/75 backdrop-blur-md to exactly match nav pill
  - Treatment hero image uses rounded-[32px] lg:rounded-[48px] on all sides (contained card shape)
  - Warm brown overlay from-[#8B6F47]/30 with color-wash bg-[#C4A882]/8 mix-blend-multiply
  - Equipment list items simplified — dot circles removed, flex container uses flex items-center
  - Mobile h1 reduced on both treatment pages for better fit on small screens
metrics:
  duration: "2m 3s"
  completed: "2026-03-21"
  tasks_completed: 2
  files_modified: 3
---

# Quick Task 260321-e4n: UI Polish — Treatment Pill Coherence + Image Summary

**One-liner:** Unified filter pill to match nav frosted-glass style, warmed treatment hero with all-sides radius card, and removed distracting dot decorations from o-nas equipment list.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Unify filter pill with nav + fix mobile spacing | aaffc91 | zabiegi/index.astro, zabiegi/[slug].astro |
| 2 | Clean up o-nas equipment section — remove circle decorations | 9bd3736 | o-nas.astro |

## Changes Made

### Task 1 — Filter Pill + Mobile Spacing + Treatment Hero

**zabiegi/index.astro:**
- Filter pill: `bg-white/85 backdrop-blur-xl` → `bg-white/75 backdrop-blur-md` (exact nav match)
- Filter bar container: `px-4` → `px-6`, `flex-wrap` → `flex items-center overflow-hidden`
- Filter buttons container: `flex-wrap` → `flex-nowrap overflow-x-auto scrollbar-hide` with `-webkit-overflow-scrolling: touch`
- Filter buttons: added `whitespace-nowrap shrink-0` to prevent text/button wrapping
- Hero section: `pt-32 pb-16` → `pt-28 pb-12 lg:pt-40 lg:pb-20`
- Hero h1: `text-5xl sm:text-7xl` → `text-4xl sm:text-6xl`

**zabiegi/[slug].astro:**
- Title block: `pb-12 lg:pb-16` → `pb-8 lg:pb-16`
- h1: `text-5xl sm:text-6xl` → `text-4xl sm:text-5xl` on mobile
- Quick facts row: `gap-3` → `gap-2 sm:gap-3`
- Hero image container: `h-[50vh]` → `h-[40vh]` on mobile
- Hero image corners: `rounded-t-[40px] lg:rounded-t-[60px]` → `rounded-[32px] lg:rounded-[48px]` (all sides)
- Hero gradient overlay: `from-primary/20` → `from-[#8B6F47]/30 via-[#8B6F47]/10 to-transparent` (warm brown)
- Added second overlay: `bg-[#C4A882]/8 mix-blend-multiply` for warm film effect
- Bento grid: `pt-8` → `pt-6 lg:pt-8`
- Fallback empty hero (no image): updated to `rounded-[48px]`

### Task 2 — O-nas Equipment Circles

**o-nas.astro:**
- Removed `<div class="w-8 h-8 rounded-full ...">` dot decorations from all 4 equipment items: AlexDual Xlase, Dermapen 4.0, Gold Needle RF, AquaSure H2
- Changed parent flex container from `justify-between` to plain `items-center` (no right element)
- Values section `w-16 h-16` icon containers untouched (3 preserved)

## Verification

- `npx astro build` — 37 pages built, no errors
- Filter pill: `bg-white/75 backdrop-blur-md` confirmed in index.astro
- Hero image: `rounded-[32px] lg:rounded-[48px]` confirmed in [slug].astro
- Equipment circles: 0 matches for `w-8 h-8 rounded-full` in o-nas.astro
- Values icons: 3 matches for `w-16 h-16` in o-nas.astro (preserved)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- src/pages/[location]/zabiegi/index.astro — modified and building
- src/pages/[location]/zabiegi/[slug].astro — modified and building
- src/pages/[location]/o-nas.astro — modified and building
- Commit aaffc91 — confirmed in git log
- Commit 9bd3736 — confirmed in git log
