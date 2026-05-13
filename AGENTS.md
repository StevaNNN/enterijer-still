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
- For className composition, use `cn(...)` from `lib/utils.ts`.
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
- Section IDs and navbar/footer links must stay aligned:
  - `#hero`, `#about`, `#services`, `#gallery`, `#contact`
- Reuse `smoothScrollTo` from `lib/smooth-scroll.ts` for in-page navigation.
- Keep locale references centralized:
  - import `LOCALES` from `src/i18n/locale.ts` instead of hardcoding locale arrays.

## Photos: Cloudinary only (CDN policy)
- **All raster photos** used in the marketing site (hero, about, services, gallery, teasers, lightbox) must be **delivered from Cloudinary** (`https://res.cloudinary.com/<cloud>/image/upload/...`). Do not introduce other image CDNs or hotlinked third-party hosts for these assets.
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