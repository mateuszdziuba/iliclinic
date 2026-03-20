# Directory Structure

**Analysis Date:** 2026-03-20

## Top-Level Layout

```
iliclinic/
├── src/                    # All source code
├── public/                 # Static assets (images, favicon)
├── dist/                   # Build output (gitignored)
├── node_modules/           # Dependencies (pnpm, gitignored)
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata and scripts
├── pnpm-lock.yaml          # Lockfile
└── .env                    # Environment variables (gitignored)
```

## `src/` Directory

```
src/
├── components/             # Reusable UI components
│   ├── Header.astro        # Fixed floating navbar, location-aware
│   └── Footer.astro        # Footer with contact info per location
│
├── content/                # Astro content collections (Markdown)
│   ├── config.ts           # Collection schemas (Zod validation)
│   ├── zabiegi/            # Treatment entries (*.md)
│   ├── strony/             # Static page content (*.md)
│   └── marki/              # Partner brand entries (*.md)
│
├── data/                   # Static JSON data
│   ├── locations.json      # Location contact/address info
│   └── settings.json       # Global site settings
│
├── layouts/
│   └── BaseLayout.astro    # Single layout: HTML shell + global scripts
│
├── pages/                  # File-system routing
│   ├── index.astro         # Root: location selector + auto-redirect
│   └── [location]/         # Dynamic location namespace
│       ├── index.astro     # Location homepage
│       ├── o-nas.astro     # About page
│       ├── kontakt.astro   # Contact page
│       └── zabiegi/
│           ├── index.astro  # Treatment catalog with search/filter
│           └── [slug].astro # Individual treatment detail
│
└── styles/
    └── global.css          # Tailwind + CSS custom properties (design system)
```

## `public/` Directory

```
public/
├── favicon.svg             # Site favicon
└── images/                 # Static images
    ├── logo-black.png      # Header logo (dark)
    ├── logo-gold.png       # Root page logo
    └── ...                 # Treatment/hero images
```

## Key File Locations

| What | Where |
|------|-------|
| Design tokens / colors | `src/styles/global.css` — `@theme {}` block and `[data-location]` selectors |
| Location data (address, phone, hours) | `src/data/locations.json` |
| Content schema definitions | `src/content/config.ts` |
| Global JS (Lenis, GSAP init) | `src/layouts/BaseLayout.astro` — inline `<script>` block |
| Treatment content files | `src/content/zabiegi/*.md` |
| Partner brands | `src/content/marki/*.md` |
| Astro build config | `astro.config.mjs` |

## Naming Conventions

**Directories:**
- Lowercase, short names: `components/`, `layouts/`, `pages/`, `data/`
- Dynamic route segments: `[location]`, `[slug]` (Astro convention)
- Content collections: lowercase Polish words (`zabiegi`, `strony`, `marki`)

**Files:**
- Components/Layouts: `PascalCase.astro` (e.g., `BaseLayout.astro`, `Header.astro`)
- Pages: `kebab-case.astro` (e.g., `o-nas.astro`, `kontakt.astro`)
- Data: `camelCase.json` or `kebab-case.json`
- Content entries: `kebab-case.md` (treatment slugs become URL paths)

**Content entry slugs** become URL segments directly:
- `src/content/zabiegi/botoks-usta.md` → `/{location}/zabiegi/botoks-usta`

## Adding New Code

**New treatment:** Create `src/content/zabiegi/{slug}.md` with frontmatter matching schema in `src/content/config.ts`

**New location:** (Multi-step, fragile — see CONCERNS.md)
1. Add to `src/data/locations.json`
2. Add to `getStaticPaths()` in all 4 `[location]/*.astro` pages
3. Add to Zod enum in `src/content/config.ts`
4. Add `[data-location="..."]` CSS block in `src/styles/global.css`
5. Add pricing fields to treatment schema and content files

**New page (for all locations):** Create `src/pages/[location]/new-page.astro` with `getStaticPaths()` returning both locations

**New component:** Create `src/components/ComponentName.astro`, import in page/layout as needed

---

*Structure analysis: 2026-03-20*
