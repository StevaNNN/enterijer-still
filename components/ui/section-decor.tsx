import { cn } from "@/lib/utils";

/**
 * Shared marketing-site design primitives.
 *
 * These are presentation-only (no hooks, no client APIs) so they can be used
 * inside both Server Components (default in app/[locale]) and Client Components.
 *
 * Design language:
 *  - Pulsing brand-dot chip used as section eyebrows.
 *  - Two-line headlines with a soft brand-color gradient bar under the accent line.
 *  - Soft, blurred, brand-tinted glow blobs to give each section an atmosphere.
 *  - Frosted "dock" surfaces for stats / cards on dark heroes.
 *
 * Tokens come from styles/globals.css (`--brand`, `--brand-solid`, `--surface`, etc).
 */

type Tone = "auto" | "dark" | "light";

/* -----------------------------------------------------------
 * SectionEyebrow — pulsing brand-dot chip
 * --------------------------------------------------------- */
export function SectionEyebrow({
  children,
  tone = "auto",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-md",
        tone === "dark" &&
          "border-white/15 bg-white/10 text-white/90",
        tone === "light" &&
          "border-black/10 bg-white/70 text-foreground/80",
        tone === "auto" &&
          "border-border bg-foreground/5 text-foreground/80 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand)]" />
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.32em]">
        {children}
      </span>
    </div>
  );
}

/* -----------------------------------------------------------
 * SectionHeading — two-line title with brand-gradient underline
 * --------------------------------------------------------- */
export function SectionHeading({
  line1,
  line2,
  tone = "auto",
  size = "md",
  as = "h2",
  className,
  id,
}: {
  line1: string;
  line2: string;
  tone?: Tone;
  /** `md` = inner sections, `lg` = inner page hero/products, `xl` = home hero */
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  const Tag = as;

  return (
    <Tag
      id={id}
      className={cn(
        "font-bold tracking-tight",
        size === "xl" &&
          "text-5xl md:text-7xl lg:text-[6.75rem] leading-[0.92]",
        size === "lg" &&
          "text-4xl md:text-5xl lg:text-6xl leading-[1.05]",
        size === "md" && "text-4xl md:text-5xl leading-[1.05]",
        tone === "dark" && "text-white",
        tone === "light" && "text-foreground",
        tone === "auto" && "text-foreground dark:text-white",
        className,
      )}
    >
      {line1}
      <br />
      <span
        className={cn(
          "relative inline-block",
          tone === "dark" && "text-white/55",
          tone === "light" && "text-foreground/55",
          tone === "auto" && "text-foreground/55 dark:text-white/45",
        )}
      >
        {line2}
        <span
          aria-hidden
          className="absolute -bottom-1.5 left-0 h-[0.14em] w-2/3 rounded-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/55 to-transparent"
        />
      </span>
    </Tag>
  );
}

/* -----------------------------------------------------------
 * BrandGlow — soft animated brand-color blob
 * --------------------------------------------------------- */
export function BrandGlow({
  className,
  size = "md",
  intensity = "default",
  blendMode = "default",
  animated = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "soft" | "default" | "strong";
  blendMode?: "default" | "screen";
  animated?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full",
        size === "sm" && "h-72 w-72 blur-[110px]",
        size === "md" && "h-96 w-96 blur-[130px]",
        size === "lg" && "h-[32rem] w-[32rem] blur-[140px]",
        size === "xl" && "h-[44rem] w-[44rem] blur-[160px]",
        intensity === "strong" && "bg-[var(--brand)]/30",
        intensity === "soft" && "bg-[var(--brand)]/8",
        intensity === "default" && "bg-[var(--brand)]/15",
        blendMode === "screen" && "mix-blend-screen",
        animated && "animate-hero-glow",
        className,
      )}
    />
  );
}

/* -----------------------------------------------------------
 * Card surface utilities (string presets for `cn(...)`)
 *
 * Use as: <div className={cn(SECTION_CARD_LIGHT, "p-6")}>...</div>
 * --------------------------------------------------------- */

/** Glass card on dark/photo backgrounds (hero, dark surfaces). */
export const SECTION_CARD_DARK =
  "rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]";

/** Subtle elevated card on light surfaces; auto-flips in dark mode. */
export const SECTION_CARD_LIGHT =
  "rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] dark:bg-white/[0.04] dark:border-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]";

/** Section padding tokens — keep spacing consistent across the site.
 *  On inner pages (gallery, products) this is also the navbar clearance:
 *  py-24 = 96px top, which is enough to clear the ~80px frosted navbar.
 *  Do NOT add an extra pt-* wrapper div on top of this. */
export const SECTION_PADDING = "py-24 md:py-32";
