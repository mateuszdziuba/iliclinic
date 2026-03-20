# Requirements — Ili Clinic M1: Launch-ready site

## Functional Requirements

### FR-01: Treatment pages (zabiegi)
- Catalog index at `/{location}/zabiegi` with category filtering and search
- Individual treatment page at `/{location}/zabiegi/{slug}` with bento grid layout
- Correct URLs using `treatment.id` (Astro 5 Content Layer, no `.slug`)
- Related treatments section on individual page

### FR-02: Technology pages (technologie)
- Catalog index at `/{location}/technologie`
- Individual technology page at `/{location}/technologie/{slug}`
- Link to treatments using that technology
- Bidirectional: treatment pages eventually link to used technologies

### FR-03: Contact page
- Location-specific contact info (address, phone, email, hours)
- Google Maps embed
- Phone CTA prominent
- Link to other location

### FR-04: About page (o-nas)
- Clinic story / Patricia section
- Equipment/technologies section linking to `/technologie` pages
- Team values section

### FR-05: Homepage (landing)
- Hero with location switcher
- Featured treatments
- Brand logos (marki)
- CTA to booking

### FR-06: Navigation
- Header with location context
- Footer with links and social
- Smooth scroll (Lenis)

## Content Requirements

### CR-01: CMS coverage
- All treatment fields editable: title, description, category, prices, duration, image, body, wskazania, przeciwwskazania
- All technology fields editable: name, description, producer, category, image, body, locations
- Location data editable via CMS (phone, address, hours)

### CR-02: Schema completeness
- `zabiegi` schema includes: wskazania, przeciwwskazania fields
- `technologie` collection exists in both `content.config.ts` and `.pages.yml`

## Design Requirements

### DR-01: Consistent design language
- All pages use semantic design tokens (no legacy aliases)
- Noto Serif for headings, Work Sans for body
- GSAP scroll animations on all pages
- Rounded cards: `rounded-[32px]` for bento cells, `rounded-[40px]+` for image frames

### DR-02: Mobile responsive
- All layouts work on mobile (single column, readable typography)

## Non-Functional Requirements

### NFR-01: Build succeeds
- `astro build` completes without errors
- No TypeScript errors in content schema

### NFR-02: Correct routing
- No `/undefined` in any treatment or technology URL
- All internal links resolve to real pages
