# Ili Clinic — Project Context

## What are we building?
A dual-location aesthetic medicine clinic website for Ili Clinic (Pruszków + Ostrołęka). The site serves as the primary digital presence: showcasing treatments, technologies, clinic info, and driving bookings via phone contact.

## Tech stack
- **Framework**: Astro 5 (Content Layer API — `loader: glob(...)`)
- **Styling**: Tailwind CSS with semantic design tokens (CSS custom properties)
- **Animations**: GSAP + ScrollTrigger + Lenis smooth scroll
- **CMS**: PagesCMS (`.pages.yml` config, edits markdown frontmatter in `src/content/`)
- **Fonts**: Noto Serif (headings), Work Sans (body) — loaded from Bunny Fonts
- **Deploy**: Static site (Astro SSG)

## Design system
- **Semantic tokens**: `text-primary`, `bg-surface`, `bg-surface-dim`, `text-text-main`, `text-text-muted`, `text-accent`, `font-heading`, `font-body`
- **Location theming**: `[data-location="pruszkow"]` = cashmere/beige; `[data-location="ostroleka"]` = navy/beige
- **Aesthetic**: Cinematic, editorial, luxury medical. Large serif headings, generous whitespace, rounded image frames (`rounded-[40px]`/`rounded-[60px]`), GSAP scroll animations

## Content model
- `zabiegi` — treatments (dual-location, category, price per location, markdown body)
- `technologie` — equipment/devices used (dual-location, producer, markdown body)
- `marki` — partner brand logos
- `strony` — generic static pages
- Location data in `src/data/locations.json` (phone, address, hours, social)

## Business goals
- Launch-ready website for both clinic locations
- CMS-editable content for clinic staff
- Drive phone bookings (primary CTA throughout)
- Bidirectional linking: zabiegi ↔ technologie

## Current milestone: M1 — Launch-ready site
