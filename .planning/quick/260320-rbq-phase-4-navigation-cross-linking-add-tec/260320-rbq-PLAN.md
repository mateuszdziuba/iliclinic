---
phase: 260320-rbq
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/Header.astro
  - src/pages/[location]/o-nas.astro
autonomous: true
requirements: [PHASE4-NAV, PHASE4-CROSSLINK]

must_haves:
  truths:
    - "Technologie link appears in the desktop and mobile header nav for both locations"
    - "Each equipment item in o-nas.astro EQUIPMENT section links to its technologie page"
    - "Clicking an equipment row navigates to /{location}/technologie/{slug}"
  artifacts:
    - path: "src/components/Header.astro"
      provides: "Updated navLinks array with Technologie entry"
    - path: "src/pages/[location]/o-nas.astro"
      provides: "Equipment rows wrapped in anchor tags pointing to technologie slugs"
  key_links:
    - from: "Header.astro navLinks"
      to: "/{location}/technologie"
      via: "basePath + /technologie"
    - from: "o-nas.astro equipment rows"
      to: "/{location}/technologie/{slug}"
      via: "anchor wrapping each row div"
---

<objective>
Add "Technologie" to the header navigation and make each equipment row in the o-nas EQUIPMENT section a clickable link to the corresponding technologie page.

Purpose: Completes Phase 4 navigation and cross-linking so users can discover technology pages from the site header and from the about page equipment list.
Output: Updated Header.astro with Technologie nav item; updated o-nas.astro with linked equipment rows.
</objective>

<execution_context>
@/Users/mati/.claude/get-shit-done/workflows/execute-plan.md
@/Users/mati/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Technologie to header nav</name>
  <files>src/components/Header.astro</files>
  <action>
    In the `navLinks` array (lines 13-18), insert a new entry between "Zabiegi" and "Sklep":

    ```js
    { label: 'Technologie', href: `${basePath}/technologie` },
    ```

    Result array order: O nas, Zabiegi, Technologie, Sklep, Kontakt.

    No other changes needed — both desktop nav (line 50) and mobile nav (line 110) already iterate `navLinks`, so the new entry appears in both automatically.
  </action>
  <verify>
    <automated>pnpm build 2>&1 | grep -E "error|warn|Technologie" | head -20</automated>
  </verify>
  <done>Desktop and mobile menus both render a "Technologie" link to /{location}/technologie for every location.</done>
</task>

<task type="auto">
  <name>Task 2: Link o-nas equipment rows to technologie pages</name>
  <files>src/pages/[location]/o-nas.astro</files>
  <action>
    In the EQUIPMENT section (lines 161-203), wrap each static equipment `<div class="group py-6 ...">` row with an anchor tag pointing to the corresponding technologie slug. The slug convention should match the technology name lowercased and hyphenated (same pattern as content filenames will use).

    Map the four items to their slugs:
    - AlexDual Xlase → alexdual-xlase
    - Dermapen 4.0 → dermapen-4
    - Gold Needle RF → gold-needle-rf
    - AquaSure H2 → aquasure-h2

    For each item, replace the outer `<div class="group py-6 border-b ...">` with:

    ```html
    <a
      href={`/${location}/technologie/{slug}`}
      class="group py-6 border-b border-primary/10 flex items-center justify-between hover:bg-surface-dim transition-colors px-4 -mx-4 rounded-lg"
    >
      ...existing inner content unchanged...
    </a>
    ```

    Change the element tag from `div` to `a` and add the `href` attribute. Keep all existing classes and inner markup exactly as-is. The dot indicator (small circle in the right) already acts as a visual affordance — do not add extra arrow icons.

    Note: Use `/{location}/` directly (not `basePath`) since `location` is already available from `Astro.params` at line 12.
  </action>
  <verify>
    <automated>pnpm build 2>&1 | grep -E "error|warn" | grep -v "deprecat" | head -20</automated>
  </verify>
  <done>All four equipment rows in the EQUIPMENT section are anchor elements. Clicking any row navigates to /{location}/technologie/{slug}. Hover styles remain intact.</done>
</task>

</tasks>

<verification>
After both tasks:
1. `pnpm build` completes without errors.
2. Dev server: visit /pruszkow/o-nas, confirm equipment rows are clickable links.
3. Header shows Technologie between Zabiegi and Sklep on desktop and in mobile drawer.
</verification>

<success_criteria>
- Header nav includes Technologie for both locations (desktop + mobile).
- All four equipment rows on /pruszkow/o-nas and /ostroleka/o-nas link to their respective /{location}/technologie/{slug} URLs.
- No TypeScript/Astro build errors introduced.
</success_criteria>

<output>
After completion, create `.planning/quick/260320-rbq-phase-4-navigation-cross-linking-add-tec/260320-rbq-SUMMARY.md`
</output>
