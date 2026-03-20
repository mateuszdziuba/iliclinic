# External Integrations

**Analysis Date:** 2026-03-20

## APIs & External Services

**Maps:**
- Google Maps - Location display and directions
  - Integration: Static links in `src/data/locations.json`
  - Used for clinic location display and "Otwórz w mapach" (Open in Maps) functionality
  - URLs: `https://maps.google.com/?q=Ili+Clinic+[location]`

**Shop/Commerce:**
- External e-commerce site - ilishop.pl
  - Integration: Navigation link in header/footer
  - Located: `src/components/Header.astro`, `src/components/Footer.astro`
  - Link: `https://ilishop.pl`

**Typography:**
- Google Fonts API - Remote font loading
  - Fonts loaded: Playfair Display (headings), Inter (body)
  - Endpoint: `https://fonts.googleapis.com`
  - Preconnect: `https://fonts.gstatic.com`
  - Configuration: `src/layouts/BaseLayout.astro`

## Data Storage

**Databases:**
- None - This is a static site

**File Storage:**
- Local filesystem only
- Static assets: `public/` directory (images, favicon)
- Content files: Markdown in `src/content/` collections

**Caching:**
- Browser caching via standard HTTP headers (managed by static host)
- No server-side caching configured

## Authentication & Identity

**Auth Provider:**
- None - Public site, no user authentication
- No login/registration system

**Contact Information:**
- Phone numbers stored locally: `src/data/locations.json`
  - Pruszków: +48 660 176 464
  - Ostrołęka: +48 574 960 620
- Email: kontakt@iliclinic.pl (no mail API integration)

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Build logs only (Astro/Node.js standard output)
- Client-side: No logging library detected

**Analytics:**
- Not detected in provided codebase

## CI/CD & Deployment

**Hosting:**
- Deployment target: Static file hosting
- Cloudflare Pages configuration exists: `.pages.yml`
  - Framework: Astro

**CI Pipeline:**
- Cloudflare Pages automatic builds
- Build command: `pnpm build`
- Output directory: `dist/`

## Environment Configuration

**Required env vars:**
- None identified - Static site requires no secrets

**Secrets location:**
- `.env` file (gitignored)
- `.env.production` (gitignored)
- No sensitive API keys required for production deployment

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Social Media Integration

**Links Only (No API Integration):**
- Facebook: `https://www.facebook.com/ili.clinic`
- Instagram: `https://www.instagram.com/patricia.kosmetolog/`
- Located: `src/data/locations.json`, `src/components/Footer.astro`

## Content Management

**CMS:**
- None - Content managed via Markdown files in Astro Content Collections

**Collections:**
- `zabiegi` (Treatments) - Medical procedures with pricing by location
- `strony` (Static Pages) - General pages
- `marki` (Brands/Partners) - Partner brand logos
- Schema validation: `src/content/config.ts`

## Key Data Structures

**Location Data:**
- `src/data/locations.json` - Stores clinic location information
  - Name, address, postal code, phone, email
  - Google Maps links
  - Opening hours
  - Social media links

**Settings:**
- `src/data/settings.json` - Site-wide configuration
  - Site name, description, default location

---

*Integration audit: 2026-03-20*
