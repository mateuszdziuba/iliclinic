# Code Conventions

**Analysis Date:** 2026-03-20

## Language & File Types

- **Primary component format:** Astro (`.astro`) — frontmatter (TypeScript) + HTML-like template
- **TypeScript** used in frontmatter and `src/content/config.ts`
- **CSS:** Tailwind CSS v4 utility classes + CSS custom properties for theming
- **No JavaScript framework components** (no React, Vue, Svelte — pure Astro)

## Naming Conventions

**Files:**
- Components: `PascalCase.astro` — `Header.astro`, `Footer.astro`, `BaseLayout.astro`
- Pages: lowercase with hyphens — `zabiegi/index.astro`, `o-nas.astro`, `kontakt.astro`
- Data files: lowercase — `locations.json`, `settings.json`
- Content: `kebab-case.md` in collection subdirectories

**Variables:**
- TypeScript: `camelCase` for variables/functions
- CSS custom properties: `--kebab-case` with `--theme-*` prefix for design tokens
- Tailwind classes: utility-first, inline in templates

**Collections (Astro content):**
- `zabiegi` — treatments (Polish: procedures)
- `strony` — static pages (Polish: pages)
- `marki` — partner brands (Polish: brands)

## Code Style

**Astro components:**
```astro
---
// Frontmatter: TypeScript imports and data fetching
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
const data = await getCollection('zabiegi');
---

<!-- Template: HTML with {expressions} -->
<BaseLayout title="..." location={location}>
  <section class="tailwind-classes">
    {data.map(item => (
      <div class="...">{item.data.title}</div>
    ))}
  </section>
</BaseLayout>
```

**Type assertions (common pattern):**
```ts
const location = Astro.params.location as 'pruszkow' | 'ostroleka';
const locationData = locations[location as keyof typeof locations];
```

## Component Design Patterns

**Layout composition:** Single `BaseLayout.astro` wraps all pages, accepts `location` prop for theming.

**Location-based theming:**
- `data-location` attribute on `<html>` element
- CSS custom properties (`--theme-primary`, `--theme-surface`, etc.) scoped to `[data-location="..."]`
- All colors reference semantic tokens, never hardcoded values

**Static path generation:**
```ts
export function getStaticPaths() {
  return [
    { params: { location: 'pruszkow' } },
    { params: { location: 'ostroleka' } },
  ];
}
```

**Client-side interactivity:**
- Inline `<script>` blocks within `.astro` files for JS initialization
- GSAP + ScrollTrigger for animations
- Lenis initialized in `BaseLayout.astro` global script
- Vanilla JS for DOM manipulation (filtering, search)

## CSS / Design System Conventions

**Token structure in `src/styles/global.css`:**
- `@theme {}` block defines Tailwind CSS v4 tokens
- `:root` sets fallback defaults
- `[data-location="..."]` overrides per location
- Semantic color names: `--color-primary`, `--color-surface`, `--color-text-main`, `--color-accent`

**Typography:**
- `font-heading` → Playfair Display (headings, italic for emphasis)
- `font-body` → Inter (body text, UI labels)

**Animation classes (custom):**
- `.text-reveal-mask` / `.text-reveal-inner` — hero text reveal animation pattern
- `data-hero-text`, `data-hero-bg` — GSAP animation targets

## Data Patterns

**Content schema validation:** Zod schemas in `src/content/config.ts`

**Location data:** `src/data/locations.json` — keyed by location slug, contains name, address, contact info

**Treatment data:** Astro content collection in `src/content/zabiegi/` — Markdown files with frontmatter

**Per-location pricing:**
```ts
price: location === 'pruszkow' ? t.data.price_pruszkow : t.data.price_ostroleka
```

## Error Handling

- Page-level: `if (!locationData) return Astro.redirect('/')` — redirect on invalid location
- Zod `.optional()` used extensively — missing fields degrade gracefully
- No try/catch blocks observed in component code (Astro build errors surface at build time)
- Client-side JS does not appear to have structured error handling

## Import Patterns

```ts
// Relative imports
import BaseLayout from '../../layouts/BaseLayout.astro';
import locations from '../../data/locations.json';

// Astro built-ins
import { getCollection } from 'astro:content';

// npm packages (client-side script blocks)
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

---

*Conventions analysis: 2026-03-20*
