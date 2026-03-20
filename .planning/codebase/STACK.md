# Technology Stack

**Analysis Date:** 2026-03-20

## Languages

**Primary:**
- TypeScript - Used in Astro configuration and content schema definitions
- HTML/JSX-style - Astro `.astro` component markup
- CSS - Tailwind CSS with custom CSS variables for theming

## Runtime

**Environment:**
- Node.js (18.20.8 || ^20.3.0 || >=22.0.0) - Required by Astro

**Package Manager:**
- pnpm - Lockfile: `pnpm-lock.yaml` (present)

## Frameworks

**Core:**
- Astro 6.0.7 - Static site generation framework for clinic website
- Tailwind CSS 4.1.18 - Utility-first CSS framework with Vite plugin

**Animation & Interactivity:**
- GSAP 3.14.2 - Animation library for scroll effects and cinematic interactions
- @studio-freight/lenis 1.0.42 - Smooth scroll library for enhanced UX
- lucide-astro 0.556.0 - Icon component library

**Build/Dev:**
- @tailwindcss/vite 4.1.18 - Tailwind CSS Vite plugin for fast builds
- Vite 7.3.1 - Build tool (via Astro)
- TypeScript 5.9.3 - Type checking

## Key Dependencies

**Critical:**
- astro 6.0.7 - Core framework for static site generation
- tailwindcss 4.1.18 - Design system styling
- @studio-freight/lenis 1.0.42 - Smooth scroll interaction (core UX feature)
- gsap 3.14.2 - Animation framework for cinematic effects

**Utilities:**
- lucide-astro 0.556.0 - Icon library for UI components
- rollup 4.57.1 - Bundler (transitive)
- lightningcss 1.30.2 - CSS processor (transitive)

## Configuration

**Environment:**
- No environment variables detected in codebase
- `.env` file exists but is gitignored (secrets/config not tracked)
- Build targets: Static HTML output to `./dist/`

**Build:**
- `astro.config.mjs` - Main Astro config with Tailwind Vite plugin
- `tsconfig.json` - TypeScript configuration extending Astro strict preset
- Global CSS: `src/styles/global.css` - Contains Tailwind theme configuration with CSS custom properties

**Fonts:**
- Google Fonts - Remote font loading:
  - Playfair Display (serif) - Headings, cinematic typography
  - Inter (sans-serif) - Body text
- Preconnect links configured for performance

## Platform Requirements

**Development:**
- Node.js >=18.20.8 (or ^20.3.0 or >=22.0.0)
- pnpm package manager
- No database required (static site)

**Production:**
- Static hosting (any CDN or static host)
- No server-side runtime required
- Output: Pre-built HTML, CSS, and JavaScript in `dist/` directory

---

*Stack analysis: 2026-03-20*
