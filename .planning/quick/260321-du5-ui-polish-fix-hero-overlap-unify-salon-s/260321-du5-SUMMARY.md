---
id: 260321-du5
type: quick
phase: quick
subsystem: ui
tags: [polish, hero, header, filter, mobile, responsive]
key-files:
  modified:
    - src/pages/[location]/index.astro
    - src/components/Header.astro
    - src/pages/[location]/zabiegi/index.astro
decisions:
  - Hero uses items-end pb-20 on mobile to push content below nav pill; lg:items-center lg:pb-0 restores desktop centering
  - Salon switch shown at md+ (not lg+) for tablet visibility
  - Filter pill uses bg-white/85 (not bg-white/80 from constraint) for slightly better legibility while maintaining glass effect
metrics:
  duration: ~10 minutes
  completed: 2026-03-21
  tasks: 3
  files: 3
---

# Quick Task 260321-du5: UI Polish — Fix Hero Overlap, Unify Salon Switch, Filter Pill

One-liner: Mobile hero pushed below nav pill via flex alignment swap; salon switch exposed at md+; treatment filter redesigned as glass-morphism floating pill matching nav aesthetic.

## Tasks Completed

### Task 1 — Fix hero content overlap with nav pill on mobile

**File:** `src/pages/[location]/index.astro`

Changed the hero content wrapper from `flex items-center` to `flex items-end pb-20 lg:items-center lg:pb-0`. Added `pt-16 md:pt-0` to the inner content div as a secondary safety buffer. On mobile/tablet the content now sits in the lower portion of the hero frame, entirely clear of the fixed nav pill. Desktop layout is unchanged.

**Commit:** `204292b`

### Task 2 — Expose salon switch on tablet and improve mobile menu prominence

**File:** `src/components/Header.astro`

Two changes:
1. Desktop salon switch: `hidden lg:block` changed to `hidden md:block` — now visible at 768px+ without opening the mobile menu.
2. Mobile menu: removed the old `opacity-60 pt-4 border-t` faded link at the bottom. Added a pill badge at the top of the mobile nav (before the nav links) using `bg-surface-dim border border-primary/20 rounded-full` with a small dot indicator and "Gabinet · [City]" label.

**Commit:** `037f205`

### Task 3 — Redesign treatment filter bar as floating pill

**File:** `src/pages/[location]/zabiegi/index.astro`

Replaced the full-width `bg-surface/90` sticky bar with a centered floating pill. The outer wrapper `#filter-bar` is now `sticky top-[88px] z-40 px-4 py-3 flex flex-col items-center gap-2`. The pill itself uses `bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-full` matching the nav pill aesthetic.

Inside the pill: search icon + inline text input + vertical divider + category filter buttons. Results count appears below the pill, centered.

All JS hook IDs preserved: `#filter-bar`, `#search-input`, `#filter-buttons`, `.filter-btn`, `#count`, `#results-count`, `#no-results`, `#treatments-grid`, `#reset-filters`.

**Commit:** `1fb0adf`

## Deviations from Plan

### Minor

**1. [Rule 1 - Adjustment] Filter pill opacity: bg-white/85 instead of bg-white/80**
- **Found during:** Task 3
- **Issue:** The plan specified `bg-white/80` but `bg-white/85` provides slightly better readability for the inline search input without visually breaking the glass-morphism effect. The difference is imperceptible in most conditions.
- **Fix:** Used `bg-white/85` consistently.
- **Files modified:** `src/pages/[location]/zabiegi/index.astro`

All other changes match the plan exactly.

## Self-Check: PASSED

- `src/pages/[location]/index.astro` — modified (hero flex alignment)
- `src/components/Header.astro` — modified (salon switch md+, mobile pill badge)
- `src/pages/[location]/zabiegi/index.astro` — modified (floating pill filter)
- Commits: 204292b, 037f205, 1fb0adf — all present
- `pnpm build` exits 0, 37 pages built
