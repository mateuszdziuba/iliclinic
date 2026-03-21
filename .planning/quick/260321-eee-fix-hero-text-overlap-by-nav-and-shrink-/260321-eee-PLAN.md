---
phase: quick
plan: 260321-eee
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/[location]/zabiegi/[slug].astro
  - src/pages/[location]/zabiegi/index.astro
autonomous: true
requirements: [mobile-layout-fix]
must_haves:
  truths:
    - "Hero text on treatment detail page clears the fixed nav pill on mobile"
    - "Hero text on treatments listing page clears the fixed nav pill on mobile"
    - "CTA card 'Gotowa na metamorfoze' on treatment detail is compact on mobile"
  artifacts:
    - path: "src/pages/[location]/zabiegi/[slug].astro"
      provides: "Treatment detail page with nav-clearing hero + compact CTA"
    - path: "src/pages/[location]/zabiegi/index.astro"
      provides: "Treatments listing page with nav-clearing hero"
  key_links: []
---

<objective>
Fix two mobile layout issues: (1) hero content overlapped by fixed nav pill on treatment pages, (2) oversized CTA card on treatment detail mobile.

Purpose: Improve mobile usability — hero text must be readable below the nav, CTA card must not dominate the viewport.
Output: Updated treatment detail and listing pages with proper spacing.
</objective>

<context>
@src/pages/[location]/zabiegi/[slug].astro
@src/pages/[location]/zabiegi/index.astro
@src/components/Header.astro
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix hero padding and shrink CTA card on mobile</name>
  <files>src/pages/[location]/zabiegi/[slug].astro, src/pages/[location]/zabiegi/index.astro</files>
  <action>
**File: `src/pages/[location]/zabiegi/[slug].astro`**

The fixed nav pill sits at `top-7` (28px) and is roughly 64px tall = bottom edge at ~92px. Current breadcrumbs `pt-28` (112px) provides only ~20px clearance which is insufficient on some mobile viewports.

1. Breadcrumbs div (line 49): Change `pt-28` to `pt-36` (144px) to give ~52px clearance below the nav pill. Keep `lg:` breakpoint behavior — on lg the nav is smaller proportionally so this is fine.

2. CTA card "Gotowa na metamorfoze?" (the dark `bg-text-main` card, line 160): Reduce mobile sizing:
   - Change `p-8` to `p-5 sm:p-8` (less padding on mobile)
   - Change the heading `text-2xl` to `text-xl sm:text-2xl` (smaller title on mobile)
   - Change `mb-3` after heading to `mb-2 sm:mb-3`
   - Change `mb-7` after paragraph to `mb-4 sm:mb-7`
   - Change the paragraph `text-sm` to `text-xs sm:text-sm`
   - Change the button container `space-y-2.5` to `space-y-2 sm:space-y-2.5`
   - Change button padding `px-6 py-3.5` to `px-5 py-3 sm:px-6 sm:py-3.5` on both CTA buttons

**File: `src/pages/[location]/zabiegi/index.astro`**

3. Hero section (line 50): Change `pt-28` to `pt-36` to match the detail page fix. Keep the existing `lg:pt-40` as-is since desktop is fine.
  </action>
  <verify>
    <automated>cd /Users/mati/Mine/iliclinic && npx astro build 2>&1 | tail -5</automated>
  </verify>
  <done>
    - Both treatment pages have `pt-36` on their hero/breadcrumb sections, clearing the nav pill by ~52px on mobile
    - CTA card on detail page uses responsive padding (`p-5 sm:p-8`), smaller text on mobile (`text-xl sm:text-2xl`), and tighter spacing
    - Build succeeds without errors
  </done>
</task>

</tasks>

<verification>
- Open a treatment detail page on mobile viewport (375px wide) — hero text fully visible below nav
- Open treatments listing page on mobile — hero title fully visible below nav
- CTA card on detail page is compact on mobile, not dominating viewport
</verification>

<success_criteria>
Hero content clears the nav pill on both treatment pages. CTA card is proportionate on mobile screens.
</success_criteria>

<output>
After completion, create `.planning/quick/260321-eee-fix-hero-text-overlap-by-nav-and-shrink-/260321-eee-SUMMARY.md`
</output>
