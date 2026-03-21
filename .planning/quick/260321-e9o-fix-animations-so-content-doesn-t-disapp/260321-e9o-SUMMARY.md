---
phase: quick
plan: 260321-e9o
subsystem: frontend-animations
tags: [gsap, animation, scroll-trigger, progressive-enhancement, filter-pill]
tech-stack:
  patterns: [progressive-enhancement, viewport-check-before-animate, css-safety-net]
key-files:
  modified:
    - src/pages/[location]/index.astro
    - src/pages/[location]/o-nas.astro
    - src/pages/[location]/kontakt.astro
    - src/pages/[location]/zabiegi/index.astro
    - src/pages/[location]/zabiegi/[slug].astro
decisions:
  - "CSS opacity:1 on [data-scroll-fade] as baseline; JS only sets opacity:0 on truly off-screen elements"
  - "Viewport check before each ScrollTrigger animation prevents stuck opacity:0 on above-fold elements"
  - "2s safety timeout guarantees hero content visible even if GSAP script fails to load"
  - "Filter pill changed from sticky-top to fixed-bottom for persistent usability while scrolling"
  - "flex-col-reverse on filter bar puts results count visually above the pill without DOM reorder"
metrics:
  duration: "~15 minutes"
  completed: "2026-03-21"
  tasks_completed: 2
  files_modified: 5
---

# Quick Task 260321-e9o: Fix Animations So Content Does Not Disappear

**One-liner:** GSAP animations converted to progressive enhancement using viewport checks and CSS opacity:1 baseline, plus filter pill relocated from sticky-top to fixed-bottom viewport.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix GSAP animation disappearing content on all pages | fb3de59 | index.astro, o-nas.astro, kontakt.astro, [slug].astro |
| 2 | Make filter pill sticky to bottom of viewport | 6d71e73 | zabiegi/index.astro |

## What Was Done

### Task 1: Progressive Enhancement Animations

**Root cause:** `gsap.fromTo(el, { opacity: 0, y: N }, ...)` sets elements to `opacity: 0` immediately when the script runs. If `ScrollTrigger` never fires (element already in viewport on load, Lenis scroll conflict, or JS failure), elements stay invisible forever.

**Fix applied to all 5 pages:**

1. **CSS safety net** — Added `[data-scroll-fade] { opacity: 1; }` style block on each page. Elements are visible by default before JS runs.

2. **Viewport check before animation** — Each `[data-scroll-fade]` element is checked with `getBoundingClientRect()`:
   - If already in viewport: quick `fromTo(opacity: 0.3 → 1, y: 15 → 0)` — no ScrollTrigger needed
   - If off-screen: `gsap.set(el, { opacity: 0 })` then `gsap.to` with ScrollTrigger — element only goes invisible when ScrollTrigger will definitely fire

3. **2-second safety timeout** — Clears hero and scroll-fade element inline styles if GSAP fails. `clearTimeout` called after hero animations run successfully.

4. **Treatment cards** (`zabiegi/index.astro`) — Same viewport-check pattern applied. First card position used to decide stagger vs per-card approach.

### Task 2: Filter Pill Fixed to Bottom

**Change:** `sticky top-[88px]` → `fixed bottom-6 left-0 right-0`

- `pb-28` added to treatment grid section to prevent content hiding behind fixed pill
- `flex-col-reverse` on filter bar makes results count appear above the pill visually
- Backdrop bumped to `bg-white/85 backdrop-blur-lg` for readability against scrolling content
- `pointer-events-none` on container, `pointer-events-auto` on inner pill and count for correct click passthrough
- Scroll shadow toggle listener removed (pill is always floating, shadow always visible)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] All 5 page files modified
- [x] Build passes: `npx astro build` completed in 1.88s, 37 pages built
- [x] Commits exist: fb3de59 (animation fix), 6d71e73 (filter pill)
- [x] CSS `[data-scroll-fade] { opacity: 1; }` present in all 5 files
- [x] Filter bar has `fixed bottom-6` classes in zabiegi/index.astro
- [x] Grid section has `pb-28` padding

## Self-Check: PASSED
