# Architecture

**Analysis Date:** 2026-03-20

## Pattern

**Multi-location Static Site Generator** — Astro SSG with location-based routing and theming.

The site serves two clinic locations (Pruszków, Ostrołęka) from a single codebase. Each location gets its own URL namespace (`/pruszkow/*`, `/ostroleka/*`) and visual theme while sharing all components and content.

## Layers

```
┌──────────────────────────────────────────┐
│  Content Layer                           │
│  src/content/{zabiegi,strony,marki}/     │
│  src/data/locations.json                 │
│  (Markdown + JSON — source of truth)     │
├──────────────────────────────────────────┤
│  Page Layer                              │
│  src/pages/[location]/*.astro            │
│  (Data fetching, static path generation) │
├──────────────────────────────────────────┤
│  Layout Layer                            │
│  src/layouts/BaseLayout.astro            │
│  (HTML shell, global scripts, theming)   │
├──────────────────────────────────────────┤
│  Component Layer                         │
│  src/components/{Header,Footer}.astro    │
│  (Reusable UI blocks)                    │
├──────────────────────────────────────────┤
│  Design Layer                            │
│  src/styles/global.css                   │
│  (Tailwind + CSS custom properties)      │
└──────────────────────────────────────────┘
```

## Entry Points

| URL | File | Description |
|-----|------|-------------|
| `/` | `src/pages/index.astro` | Location selector (redirects to last-visited via localStorage) |
| `/{location}` | `src/pages/[location]/index.astro` | Location homepage with hero + featured treatments |
| `/{location}/zabiegi` | `src/pages/[location]/zabiegi/index.astro` | Treatment catalog with search/filter |
| `/{location}/zabiegi/{slug}` | `src/pages/[location]/zabiegi/[slug].astro` | Individual treatment detail |
| `/{location}/o-nas` | `src/pages/[location]/o-nas.astro` | About page |
| `/{location}/kontakt` | `src/pages/[location]/kontakt.astro` | Contact page |

## Data Flow

### Build-Time Flow
```
src/data/locations.json          →  pages import directly via JSON
src/content/zabiegi/*.md         →  getCollection('zabiegi') in page frontmatter
src/content/config.ts (schema)   →  validates content at build
      ↓
getStaticPaths()                 →  generates /pruszkow/* and /ostroleka/* routes
      ↓
Page frontmatter executes        →  filters/shapes data per location
      ↓
Astro renders HTML               →  serializes needed data into <script> blocks
      ↓
dist/ static files               →  served by any static host
```

### Runtime Flow (Client-Side)
```
Page loads → BaseLayout script block initializes:
  - Lenis (smooth scroll)
  - GSAP + ScrollTrigger (animations)
  - Scroll event → header style transitions

Treatment index page:
  - Inline JSON (treatmentsData) embedded at build time
  - JS listens to search input + category buttons
  - Filters DOM elements in-memory (no network requests)

Location selector (index.astro):
  - Checks localStorage('ili-location')
  - Auto-redirects to saved location
  - Saves location on card click
```

## Key Abstractions

### Location System
- **Data:** `src/data/locations.json` — keyed object `{ pruszkow: {...}, ostroleka: {...} }`
- **Routing:** `[location]` dynamic segment in all page paths
- **Theming:** `data-location` attribute on `<html>` + CSS custom property overrides
- **Content:** `locations: z.array(z.enum(['pruszkow', 'ostroleka']))` per treatment

### BaseLayout
`src/layouts/BaseLayout.astro` is the single layout used by all pages. It:
1. Sets `data-location` on `<html>` for CSS theming
2. Loads Google Fonts
3. Renders Header + Footer with location context
4. Initializes global JS (Lenis, GSAP)
5. Provides `<slot />` for page content

### Content Collections
Three Astro content collections in `src/content/`:
- **zabiegi** — treatments (Markdown) — multi-location, per-location pricing
- **strony** — static pages (Markdown) — location-scoped or global
- **marki** — partner brands (Markdown) — ordered list

## Cross-Cutting Concerns

### Theming
All colors flow through CSS custom properties:
- `[data-location="pruszkow"]` → cashmere/beige tones
- `[data-location="ostroleka"]` → navy/beige tones
- `:root` → fallback defaults

Tailwind utilities reference semantic tokens (`bg-primary`, `text-text-muted`) which map to `var(--theme-*)` variables.

### Navigation
`Header.astro` builds nav links dynamically from location context:
- With location: links to `/{location}/zabiegi`, `/{location}/o-nas`, etc.
- Without location (root): no nav shown
- External links: `https://ilishop.pl` (partner shop)

### Location Switch
Header exposes a link to the alternative location (`/{otherLocation}`) for switching between clinics.

---

*Architecture analysis: 2026-03-20*
