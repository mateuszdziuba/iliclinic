---
trigger: always_on
---

# 🚀 Project Rules: Google Antigravity (Iliclinic v2)

## 1. Project Context
- **Name:** Google Antigravity (Iliclinic.pl Refreshed)
- **Domain:** Medical / Beauty Clinic (Medycyna Estetyczna).
- **Core Goal:** Create a high-performance, dual-location website (Pruszków & Ostrołęka) with a unified brand but distinct local content.
- **Tech Stack:** Astro (SSG/SSR), Pages CMS, TailwindCSS.

## 2. Architecture & Routing (Local SEO Critical)
The project MUST follow a **Subdirectory Strategy** to maximize Local SEO authority while maintaining domain strength.

### URL Structure
- `src/pages/index.astro` -> **The Hub**. Landing page containing brand intro and a clear LOCATION SELECTOR. No specific treatments here.
- `src/pages/[location]/index.astro` -> Local Homepage (e.g., `/pruszkow`, `/ostroleka`).
- `src/pages/[location]/zabiegi/[slug].astro` -> Specific treatment page within a location context.

### Logic & State
- **Location State:** Store user preference in `localStorage`.
- **Priority:** URL Path > LocalStorage > Default.
- **Bot Handling:** Never redirect GoogleBot based on IP. Ensure all `/pruszkow/` and `/ostroleka/` paths are statically crawlable.
- **Cross-linking:** Footers and Headers must allow easy switching between locations (e.g., "Zobacz gabinet w Ostrołęce").

## 3. Data & CMS (Pages CMS)
Content is stored in Markdown/MDX with Frontmatter.

### Collections Structure (`src/content/`)
1.  **Treatments (`zabiegi`)**:
    -   Must have a `locations` array field: `['pruszkow', 'ostroleka']`.
    -   If a treatment exists in both, Astro generates two distinct URLs.
    -   Content should support variable injection (e.g., `{city_name}`) to uniqueify text for SEO.
    -   Prices: Use specific fields `price_pruszkow` and `price_ostroleka`.
2.  **Global Config**: Address data, phone numbers, and social links should be stored in a global data JSON, accessible by location key.

## 4. UI/UX & Design System ("No-Shadcn" Policy)
We aim for a bespoke, premium medical aesthetic. Avoid the generic "SaaS boilerplate" look.

### Styling Rules (TailwindCSS)
-   **Typography:** Use a sophisticated Serif for headings (e.g., Playfair Display, Cormorant) and a clean Sans for body.
-   **Shapes:** Do NOT use standard `rounded-md`. Choose either:
    -   *Sharp & Elegant:* `rounded-none` or `rounded-sm`.
    -   *Organic & Soft:* Custom border-radius values (e.g., `50% 20% / 10% 40%`) for images/backgrounds.
-   **Colors:** Define semantic colors in `tailwind.config`: `primary-medical`, `surface-warm`, `text-deep`. Avoid default gray-500.
-   **Visuals:** Use CSS masking or mesh gradients instead of plain rectangles for images.

### Components
-   **Navigation:** Context-aware. If I am in `/pruszkow`, the nav links (About, Contact) point to `/pruszkow/contact`.
-   **Interactivity:** Use Astro Islands (`client:visible`) only for complex UI like result sliders (Before/After) or map toggles. Keep the rest static HTML.

## 5. Coding Standards & SEO
-   **Images:** ALWAYS use `<Image />` from `astro:assets` with explicit widths and heights to prevent CLS.
-   **Schema.org:**
    -   Render `MedicalBusiness` schema distinct for each location path.
    -   Pruszków pages must link to the Pruszków Google Maps CID.
-   **Canonical Tags:**
    -   If a treatment description is 100% identical, set canonical to the "main" location OR use dynamic text injection to differentiate content enough for Google.

## 6. Git Workflow & Version Control
**CRITICAL:** Every logical step or completed task MUST be followed by a git commit.

### Format: Conventional Commits
Use the standard format: `<type>(<scope>): <description>`

-   `feat`: A new feature (e.g., `feat(location): add city selector modal`)
-   `fix`: A bug fix (e.g., `fix(nav): correct link to contact page`)
-   `docs`: Documentation only changes
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `perf`: A code change that improves performance
-   `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

**Rule:** Do not accumulate multiple features in one step. Commit small, commit often.

## 7. Workflow for AI Assistant
-   When generating new pages, check if they are "Global" or "Local".
-   If "Local", ensure they are placed in `[location]` directory or handled via dynamic routing.
-   Always check `src/content/config.ts` before suggesting data schema changes.
-   **After finishing a task, explicitly suggest or perform a commit message in the Conventional Commits format.**