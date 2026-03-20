# Concerns & Technical Debt

**Analysis Date:** 2026-03-20

## Critical Issues

### No Tests
**Severity: High**
Zero test coverage across the entire project. No unit tests, no E2E tests, no test runner configured. Business-critical logic (filtering, location routing, pricing) is completely untested.

### Hardcoded Location List
**Severity: High**
Locations are hardcoded in multiple places:
- `getStaticPaths()` in every `[location]/*.astro` page returns hardcoded `pruszkow` and `ostroleka`
- `src/content/config.ts` Zod schema: `z.enum(['pruszkow', 'ostroleka'])`
- Adding a new location requires changes in 4+ files

**Files affected:**
- `src/pages/[location]/index.astro:6-11`
- `src/pages/[location]/zabiegi/index.astro:6-11`
- `src/pages/[location]/zabiegi/[slug].astro`
- `src/pages/[location]/kontakt.astro`
- `src/pages/[location]/o-nas.astro`
- `src/content/config.ts:9`

## Performance Concerns

### Double Scroll Initialization Risk
**Severity: Medium**
Lenis smooth scroll is initialized in `BaseLayout.astro` (global script). If any page-level script also touches scroll, double-initialization can occur causing jank or undefined behavior.

### GSAP Animation Performance
**Severity: Medium**
Multiple `ScrollTrigger` instances created per page without explicit cleanup. On SPA-like navigation (if added), stale triggers can accumulate. Each page initializes animations fresh with no shared registry.

### Remote Google Fonts
**Severity: Low**
Google Fonts loaded via CDN (`https://fonts.googleapis.com`) adds external request latency. No font subsetting or local fallback fonts configured beyond system defaults.

### Image Loading
**Severity: Medium**
Treatment images referenced as strings in content frontmatter (`image: z.string().optional()`). No Astro `<Image>` component used for optimization (no automatic WebP conversion, resizing, or lazy loading).

## State Management

### Client-Side Filter State Not in URL
**Severity: Medium**
Treatment search and category filtering (`src/pages/[location]/zabiegi/index.astro`) uses in-memory JS state. Filtering state is lost on page refresh; filtered views cannot be shared via URL or bookmarked.

### Data Duplication at Build Time
**Severity: Low**
`treatmentsData` object is serialized into inline `<script>` as JSON in the treatments index page. For large treatment catalogs, this inflates page size.

## Type Safety

### Unsafe Type Assertions
**Severity: Medium**
Widespread use of `as` assertions without runtime validation:
```ts
const location = Astro.params.location as 'pruszkow' | 'ostroleka';
const locationData = locations[location as keyof typeof locations];
```
If an invalid location slug is passed (e.g., from a URL manipulation), `locationData` would be `undefined`. The redirect guard `if (!locationData) return Astro.redirect('/')` catches this, but the pattern is fragile.

## Security

### No CSP Headers
**Severity: Medium**
No Content Security Policy configured. Static hosting must add headers separately. The project loads external resources (Google Fonts CDN) which should be whitelisted.

### Inline Script Blocks
**Severity: Low**
Extensive use of `<script>` blocks within `.astro` files. Content Security Policy with `nonce` or `hash` would be needed for strict CSP compliance.

## Fragile Areas

### Category Filtering Logic
**File:** `src/pages/[location]/zabiegi/index.astro:23-28`
**Issue:** Known category order hardcoded as array. New categories from CMS are appended in arbitrary order. No i18n or normalized category keys.

```ts
const knownCategoryOrder = ['Medycyna Estetyczna', 'Hi-Tech / Laser', 'Pielęgnacja Twarzy', 'Inne'];
```

### Theme Token Migration (In Progress)
**File:** `src/styles/global.css:23-28`
Legacy color aliases (`--color-primary-medical`, `--color-surface-warm`) exist alongside new semantic tokens with a comment "while migrating." This indicates incomplete migration work.

```css
/* Legacy aliases for existing components while migrating */
--color-primary-medical: var(--theme-primary);
--color-surface-warm: var(--theme-surface);
```

### Mobile Navigation
**Severity: Medium**
No evidence of mobile menu implementation in `Header.astro`. Complex multi-location navigation may not be accessible on small screens.

## Missing Features / Gaps

- **No 404 page** — Astro supports custom `404.astro` but none exists
- **No sitemap** — No `@astrojs/sitemap` integration for SEO
- **No robots.txt** — Not visible in project root
- **No dark mode** — Theme system only supports location-based variants
- **No accessibility audit** — No `aria-*` attributes visible in reviewed components
- **No OG/social meta** — `BaseLayout.astro` lacks Open Graph tags

## Dependency Risks

### GSAP License
`gsap@3.14.2` — GreenSock's free tier has restrictions for commercial use. Verify license compliance for a commercial clinic website.

### @studio-freight/lenis
`@studio-freight/lenis@1.0.42` — This package has been superseded by `lenis` (v2+) from the same team. `@studio-freight/lenis` may not receive security updates.

## Scalability Limits

### Static Generation Bottleneck
All pages use `output: 'static'` (default Astro). Adding more locations or content types requires full rebuild. For 2 locations with ~50 treatments, build is fast, but this doesn't scale to 10+ locations without build optimization.

---

*Concerns analysis: 2026-03-20*
