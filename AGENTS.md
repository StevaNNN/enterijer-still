# AGENTS.md

Project-specific guidance for AI/code agents working in this repository.

## Tech Stack and Runtime
- Next.js 16 (App Router) with React 19 and TypeScript (`strict` enabled).
- Internationalization uses `next-intl` with locale-based routing.
- Styling uses Tailwind CSS v4 and shadcn/ui primitives.
- Package manager: npm (`package-lock.json` is tracked).

## Project Structure
- `app/[locale]/...`: localized App Router entrypoints and page/layout composition.
- `src/i18n/*`: locale definitions, routing config, and request-time message loading.
- `src/middleware.ts`: locale middleware wiring for `next-intl`.
- `components/*`: feature/section components (homepage sections and shared layout pieces).
- `components/ui/*`: shadcn/ui-style reusable UI primitives.
- `components/providers/*`: app-level providers (theme, context wrappers).
- `messages/en.json`, `messages/sr.json`: translation dictionaries.
- `styles/globals.css`: Tailwind imports, theme tokens, and base layer.
- `lib/utils.ts`: shared utilities (use `cn()` for class merging).

## Coding Conventions
- Use TypeScript for all code changes; keep strict typing.
- Prefer server components by default; add `"use client"` only when browser APIs/hooks are required.
- Import internal modules through `@/*` alias where possible.
- Keep components focused; extract reusable logic rather than growing page files.
- For className composition, use `cn(...)` from `lib/utils.ts` (it wraps **clsx** and **tailwind-merge**). Do not add a separate `classnames` / `clsx` import for merging—always go through `cn`.
- **Conditional Tailwind classes:** avoid long **nested ternary** chains and **template literals** that stitch class strings (hard to scan and easy to break during refactors). Prefer `cn("base", condition && "extra", flag && "other")`, or mutually exclusive branches as separate `cn` arguments, instead of `cond ? \`a ${x}\` : \`b\``.
- Follow existing naming style:
  - `PascalCase` for components/files in `components/`.
  - lower-case folders and config files elsewhere.

## Language and Copy Guidelines
- Keep code, identifiers, comments, and commit messages in English.
- UI copy may be Serbian or English depending on locale.
- For user-facing text, prefer translations in `messages/*.json` over hardcoded strings.
- When both locale dictionaries are present, keep keys synchronized (`en` and `sr`).

## i18n Rules
- Supported locales are defined in `src/i18n/locale.ts` (`en`, `sr`).
- Any new locale must be added in all of:
  - `src/i18n/locale.ts`
  - `messages/<locale>.json`
  - metadata/content logic that currently branches by locale.
- Locale routing/middleware behavior must remain aligned with:
  - `src/i18n/routing.ts`
  - `src/middleware.ts`
  - `app/[locale]/layout.tsx`

## next-intl: Server locale resolution (learnings)

These patterns avoid wrong-language output on `/en` vs `/sr` (for example English copy on the Serbian homepage for server-rendered sections).

1. **`setRequestLocale` in the locale layout**  
   In `app/[locale]/layout.tsx`, after resolving the segment locale with `resolveLocale`, call `setRequestLocale(locale)` from `next-intl/server` before loading messages or rendering children. That aligns next-intl’s internal request locale with the URL segment for APIs like `getLocale()` and `getTranslations()` when they infer the locale.

2. **Explicit `locale` for Server Component `getTranslations`**  
   Do not rely only on `await getTranslations("namespace")` for section components under `app/[locale]/`. Inferred locale (headers / cache) can still resolve to the default locale in some App Router cases.  
   **Preferred pattern:** the page reads `params`, resolves with `resolveLocale`, calls `setRequestLocale(locale)`, and passes `locale` into server sections; each section uses:
   - `const t = await getTranslations({ locale, namespace: "about" });`  
   (Same idea for `services`, `footer`, `gallery`, etc.)  
   Reference implementations: `app/[locale]/page.tsx`, `app/[locale]/gallery/page.tsx`, and section components that accept `locale: Locale` from `src/i18n/locale.ts`.

3. **Document `lang` on `<html>`**  
   Root `app/layout.tsx` sets `lang` from the `x-next-intl-locale` request header (via `headers()` and `resolveLocale`) so the document language follows the active locale where middleware runs.

4. **Hardcoded copy**  
   Any user-visible string (contact phone lines, addresses, honeypot labels, hero eyebrow/alt text, lightbox `aria-label`, map embed `hl`, etc.) must live in `messages/en.json` and `messages/sr.json` with the same key paths—not inline Serbian/English in JSX.

## Using Translations (Server and Client)
- Always organize messages by namespace in `messages/*.json` (example: `Navbar`, `Hero`, `Footer`).
- Prefer `t("key")` lookups over hardcoded UI strings.

Server Components (default in App Router):
- Use `getTranslations` from `next-intl/server`.
- For components rendered under `app/[locale]/`, **pass `locale` from the page `params`** (see **next-intl: Server locale resolution** above) and use:
  - `const t = await getTranslations({ locale, namespace: "navbar" })`
  - `t("contact")`
- Layout/metadata may use the same object form with an explicit `locale`, or call `setRequestLocale` first where only the namespace form is used.

Client Components (`"use client"`):
- Use `useTranslations` from `next-intl`.
- Pattern:
  - `const t = useTranslations("Navbar")`
  - `t("contact")`
- Use this in interactive components that rely on hooks/state/browser APIs.

Rules when adding new translation keys:
- Add the same key path in both `messages/en.json` and `messages/sr.json`.
- Keep key names stable; avoid renaming existing keys unless all usages are updated.
- Use descriptive, nested keys (for example `Hero.ctaPrimary`, `Hero.ctaSecondary`).

## UI and Styling Rules
- Prefer existing shadcn/ui primitives from `components/ui/` before creating new base controls.
- Keep design tokens in CSS variables (`styles/globals.css`) instead of hardcoding repeated colors.
- Preserve dark-mode compatibility (`ThemeProvider` + `.dark` token set).
- Keep motion and effects performant (avoid expensive scroll listeners without cleanup/throttling).

## Section Design System ("layered marketing" look)

Every public section/page (`HeroSection`, `AboutSection`, `ServicesSection`, `ProductsSection`, `GallerySection`/`GalleryClient`, `ContactSection`, `Footer`, plus inner pages under `app/[locale]/<route>/page.tsx`) follows the same visual language. Reach for the shared primitives first; do not re-implement these patterns inline.

### Shared primitives — `components/ui/section-decor.tsx`
Presentation-only (no hooks), safe in both Server and Client Components.

- **`<SectionEyebrow>`** — rounded pill with a pulsing brand-color dot and uppercase tracked text. Use as the eyebrow for every section/page intro.
  - `tone="auto" | "dark" | "light"` — `auto` flips with theme; use `dark` on cinematic photo backgrounds, `light` for light-only contexts.
- **`<SectionHeading>`** — two-line heading with a soft brand-gradient bar under the secondary line.
  - `size="md" | "lg" | "xl"`: `md` for in-page sections, `lg` for inner-page hero, `xl` for the homepage hero only.
  - `as="h1" | "h2"` — use `h1` only when the page has no other `h1` (e.g. `ProductsSection` on `/products`).
  - Pass `id` when the heading is referenced by `aria-labelledby`.
- **`<BrandGlow>`** — soft blurred brand-color blob used to atmospherize sections.
  - `size="sm|md|lg|xl"`, `intensity="soft|default|strong"`, `blendMode="default|screen"` (use `screen` on dark backgrounds), `animated` (use sparingly — usually once per section to avoid GPU cost).
- **`SECTION_CARD_DARK`** — class string for glass cards on dark/photo backgrounds (white text). Border + low-opacity fill + backdrop blur + inset top highlight + outer shadow.
- **`SECTION_CARD_LIGHT`** — class string for cards on light surfaces; auto-flips to dark-friendly glass via `dark:` variants.
- **`SECTION_PADDING`** — canonical `py-24 md:py-32` for in-page sections. Use this instead of bespoke padding.
- **`INNER_PAGE_PT`** — removed. The section's own `SECTION_PADDING` (`py-24` = 96 px) already clears the ~80 px frosted navbar. **Do not** add a separate `pt-*` wrapper div in inner-page layouts — it doubles the top space and creates a dark gap.

### Section anatomy

When adding a new section or page, compose it like this:

1. **Wrap** in `<section className={cn("relative w-full overflow-hidden bg-...", SECTION_PADDING)}>`. Always include `overflow-hidden` because glow blobs may extend beyond the box.
2. **Layer atmosphere**: 1–2 `<BrandGlow>` elements positioned with negative offsets (`-left-24`, `-right-32`, etc.). At most one of them carries `animated`.
3. **Eyebrow → Heading → (optional intro paragraph)** stack at the top of the inner container (`max-w-7xl mx-auto px-6`) with `mb-6` between eyebrow and heading, `mt-6/mt-7` between heading and lead paragraph.
4. **Content cards** must use `SECTION_CARD_LIGHT` (in-page light context) or `SECTION_CARD_DARK` (over the hero photo or dark surfaces) so border, shadow, and inset highlight stay consistent.
5. **Hover affordance** on interactive cards: brand-color border on hover, subtle shadow growth, optional `mt-* w-12 → group-hover:w-24` brand-gradient accent bar to telegraph movement.

### Buttons

- **Primary CTA**: brand-color filled pill with **shine sweep on hover** (white gradient sliding left→right). See `HeroSection` and `ContactSection` for the exact markup (`group + overflow-hidden + absolute -translate-x-full bg-gradient-to-r ... group-hover:translate-x-full`).
- **Secondary CTA**: glass outline pill (`border border-white/30 bg-white/5 backdrop-blur-md text-white` on dark, or `border border-border bg-foreground/5` on light) with arrow icon that nudges right on hover.
- Always include `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]`.

### Motion utilities — `styles/globals.css`

Defined at top-level (outside `@layer`) so utilities can reference them anywhere:
- `animate-hero-kenburns` — slow 22s alternating zoom/pan; intended for big hero photography only.
- `animate-hero-glow` — 9s gentle pulse; used on at most one `BrandGlow` per section.
- `animate-spin-slow` — 14s linear spin. Apply to a plain `<div>` wrapping rotating content (SVG `transform-origin` defaults are unreliable; rotating an outer block element is safer).
- All three are disabled inside `@media (prefers-reduced-motion: reduce)`. Do not bypass that block.

### Hero-only treatments

`HeroSection` is the only section allowed to use:
- `min-h-[100svh]` + `bg-black`, full-bleed photo layer with Ken Burns + parallax.
- The cinematic diagonal dark scrim (`from-black/75 via-black/45 to-black/10`) and bottom dock scrim.
- The rotating circular "scroll" badge (bottom-right, desktop only).
- `SectionHeading size="xl"`.

Other sections should not import these; they are intentionally reserved to keep the hero distinct.

### Navbar interaction (already shipped)

The navbar is a **solid frosted strip even at the top of the homepage** (light glass over the photo). `SECTION_PADDING` (`py-24 md:py-32`) provides enough top clearance for the ~80 px navbar on inner pages — use it directly on the `<section>` element and do not add an extra wrapper `<div>` with a `pt-*` above it. The homepage hero uses dedicated values (`pt-40 md:pt-44 lg:pt-52`) because it starts from `top: 0` and needs to push content below the full navbar height plus visual breathing room.

### Checklist when adding/touching a section

- [ ] Wrapped in `<section className={cn("relative w-full overflow-hidden ...", SECTION_PADDING)}>`.
- [ ] Eyebrow uses `<SectionEyebrow>` (not a hand-rolled line + caps span).
- [ ] Heading uses `<SectionHeading>` with appropriate `size` and `as`.
- [ ] Cards/forms use `SECTION_CARD_LIGHT` or `SECTION_CARD_DARK` instead of bespoke `rounded-2xl border` chains.
- [ ] At least one `<BrandGlow>` placed; no more than one is `animated`.
- [ ] Interactive elements have focus styles and (where applicable) brand-color hover affordances.
- [ ] No new top-level animation declared in component files — extend `styles/globals.css` instead, and respect `prefers-reduced-motion`.

## Validation Checklist
Run these before finalizing meaningful changes:

1. `npm run lint`
2. `npm run build` (for routing, typing, and production checks)

If translations or routing are changed, also manually verify both locales render:
- `/en`
- `/sr`

## Build and Runtime Commands
- `npm run dev`: local development server.
- `npm run lint`: static checks via `eslint-config-next`.
- `npm run build`: production compile and type checks.
- `npm run upload:cloudinary` (optional): bulk-upload images from HTTPS URLs into Cloudinary using `scripts/cloudinary-upload-manifest.json` (see **Photos: Cloudinary only** below).

## Required Environment Variables
- Public SEO/runtime:
  - `NEXT_PUBLIC_SITE_URL` (canonical base URL for sitemap/robots/metadata)
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Google Search Console token)
- **Photos and raster marketing images (Cloudinary)** — required for correct image URLs in the UI:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (must match the account used for uploads)
- **Optional** — only for `npm run upload:cloudinary` (bulk upload from HTTPS URLs into fixed `public_id`s):
  - `CLOUDINARY_CLOUD_NAME` (same cloud as above)
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Contact API (`app/api/contact/route.ts`):
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `CONTACT_TO_EMAIL`

## Routing and Navigation Rules
- This website is a localized single-page layout under `app/[locale]/page.tsx`.
- Section IDs and navbar/footer links must stay aligned for the homepage:
  - `#hero`, `#about`, `#services`, `#contact`
- Full-screen gallery lives at `/[locale]/gallery`; the products overview lives at `/[locale]/products`.
- Reuse `smoothScrollTo` from `lib/smooth-scroll.ts` for in-page navigation.
- Keep locale references centralized:
  - import `LOCALES` from `src/i18n/locale.ts` instead of hardcoding locale arrays.

## Photos: Cloudinary only (CDN policy)
- **All raster photos** used in the marketing site (hero, about, services, gallery, lightbox) must be **delivered from Cloudinary** (`https://res.cloudinary.com/<cloud>/image/upload/...`). Do not introduce other image CDNs or hotlinked third-party hosts for these assets.
- Build delivery URLs with `cloudinaryImageUrl()` from `lib/cloudinary-url.ts` and stable `public_id` strings from `lib/cloudinary-assets.ts` and `lib/gallery-data.ts`. Do not hardcode full Cloudinary URLs in components unless there is a strong reason; prefer presets in `CLOUDINARY_IMAGE_PRESETS` so transforms stay consistent.
- **`next/image` remote patterns:** only `res.cloudinary.com` is allowed for remote photos. Do not add `images.remotePatterns` entries for other image hosts for site photography.
- **Static files in `public/`** (SVG logo, favicon, icons, non-photography assets) are fine and are not served via Cloudinary unless you intentionally choose to.
- **Bulk import / restore:** copy `scripts/cloudinary-upload-manifest.example.json` to `scripts/cloudinary-upload-manifest.json` (gitignored), set each `sourceUrl` to a direct HTTPS image URL, then run `npm run upload:cloudinary`. Empty `sourceUrl` rows are skipped. New photography should normally be uploaded through the Cloudinary console or your usual workflow, then referenced by `public_id` in code.

## Images and Assets
- Use `next/image` for all content images.
- Open Graph image is generated in `app/[locale]/opengraph-image.tsx`; keep metadata URLs aligned with this route.
- For embeds that are not `next/image` sources (e.g. Google Maps iframes), follow accessibility and locale rules elsewhere in this file.

## API Route Safety Rules
- `app/api/contact/route.ts` must stay on Node runtime (`runtime = "nodejs"`).
- Treat all inbound fields as untrusted:
  - sanitize headers
  - escape HTML in email templates
  - keep payload size limits
  - include bot honeypot handling
- Never log SMTP credentials or secret values.

## Accessibility Requirements
- Form controls must pair `label htmlFor` with matching input `id`.
- Toggle/menu controls should expose proper ARIA state:
  - `aria-expanded` for collapsible navigation
  - `aria-pressed` for filter/toggle buttons where relevant
- Dialog/lightbox overlays should support keyboard escape and set:
  - `role="dialog"`
  - `aria-modal="true"`

## Performance Guardrails
- Use passive scroll listeners and throttle heavy updates with `requestAnimationFrame`.
- Avoid unnecessary client components; keep server components as default.
- Remove dead code/hooks/components once no longer referenced.

## Git and PR Workflow
- Branch naming:
  - `feat/<short-description>`
  - `fix/<short-description>`
  - `chore/<short-description>`
- Commit style (imperative, concise):
  - `feat: add locale switcher to navbar`
  - `fix: resolve smooth scroll offset on mobile`
  - `chore: align i18n request config typing`
- PR template expectation:
  - What changed
  - Why it changed
  - How it was validated (`lint`, `build`, manual locale checks)
- Keep PRs focused; avoid mixing refactors with visual/content changes unless required.

## Agent Safety Notes
- Do not remove or bypass i18n middleware/config without explicit request.
- Do not introduce a second styling system or class merging helper.
- Do not commit secrets or environment-specific values.
- Do not perform broad rewrites of section components (`HeroSection`, `Navbar`, etc.) unless requested.
- Do not add non-Cloudinary image CDNs or extra `images.remotePatterns` for site photography; see **Photos: Cloudinary only**.

## Website infos
- Facebook link https://www.facebook.com/enterijerstilkg
- Instagram link https://www.instagram.com/enterijerstilkg/