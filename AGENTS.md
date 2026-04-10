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

## Using Translations (Server and Client)
- Always organize messages by namespace in `messages/*.json` (example: `Navbar`, `Hero`, `Footer`).
- Prefer `t("key")` lookups over hardcoded UI strings.

Server Components (default in App Router):
- Use `getTranslations` from `next-intl/server`.
- Pattern:
  - `const t = await getTranslations("Navbar")`
  - `t("contact")`
- This is the preferred approach for pages/layouts and non-interactive components.

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