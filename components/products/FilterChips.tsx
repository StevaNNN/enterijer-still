"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { Locale } from "@/src/i18n/locale";
import {
  FILTER_CATEGORIES,
  type FilterCategory,
  PRODUCT_COLORS,
  PRODUCT_DIMENSION_BUCKETS,
  PRODUCT_MATERIALS,
  PRODUCT_TYPES,
  type TaxonomyEntry,
} from "@/lib/products-taxonomies";
import { cn } from "@/lib/utils";

export type ActiveFilter =
  | { category: "all"; value: undefined }
  | { category: FilterCategory; value: string };

type FilterChipsProps = {
  locale: Locale;
  active: ActiveFilter;
  /**
   * Whether the (parent-owned) search input currently has a query. Used
   * to decide if the "Clear all filters" button should appear — it should
   * show whenever a URL filter is applied OR the search box has text.
   */
  hasSearchQuery: boolean;
  /**
   * Wipe both the URL filter and the search query in one action. Called
   * when the user clicks the "Clear all filters" button. Implemented by
   * the parent (`ProductsCatalog`) which owns the search state and uses
   * the router to navigate back to `/products/all`.
   */
  onClearAll: () => void;
  /** Translation map (so the component stays free of next-intl). */
  labels: {
    title: string;
    all: string;
    type: string;
    material: string;
    color: string;
    dimensions: string;
    clear: string;
    clearAll: string;
  };
};

/**
 * Two-tier filter chip control:
 *
 *  - Top row: category "tabs" (All / Type / Material / Color / Dimensions).
 *  - Second row: value chips for the currently-open category.
 *
 * URL state vs UI state — deliberately separated:
 *
 *  - The **applied filter** is encoded in the URL (`/products/<cat>/<val>`)
 *    and is rendered active by the `active` prop. This is the source of
 *    truth for what the catalog is filtered by.
 *  - The **open tab** is local component state. Clicking a category tab
 *    that has no active value just reveals its value panel — it does not
 *    apply a filter on its own. Picking a value chip is what navigates.
 *
 *  When the URL changes (e.g. user picks a value, or follows a link), the
 *  open tab snaps to match the active filter so the UI stays consistent.
 */
export function FilterChips({
  locale,
  active,
  hasSearchQuery,
  onClearAll,
  labels,
}: FilterChipsProps) {
  const valueLists: Record<FilterCategory, readonly TaxonomyEntry[]> = useMemo(
    () => ({
      type: PRODUCT_TYPES,
      material: PRODUCT_MATERIALS,
      color: PRODUCT_COLORS,
      dimensions: PRODUCT_DIMENSION_BUCKETS,
    }),
    [],
  );

  const allHref = `/${locale}/products/all`;

  const initialOpen: FilterCategory | null =
    active.category === "all" ? null : active.category;
  const [openCategory, setOpenCategory] = useState<FilterCategory | null>(
    initialOpen,
  );

  // Reconcile the open-tab when the URL-driven `active` filter changes —
  // done as a render-time prop/state comparison rather than an effect, per
  // React 19 guidance (`react-hooks/set-state-in-effect`).
  const [lastActiveCategory, setLastActiveCategory] = useState(active.category);
  if (lastActiveCategory !== active.category) {
    setLastActiveCategory(active.category);
    setOpenCategory(active.category === "all" ? null : active.category);
  }

  const categoryLabel = (cat: FilterCategory) =>
    cat === "type"
      ? labels.type
      : cat === "material"
        ? labels.material
        : cat === "color"
          ? labels.color
          : labels.dimensions;

  const hasActiveFilter = active.category !== "all";
  const showClearAll = hasActiveFilter || hasSearchQuery;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="group"
          aria-label={labels.title}
          className="flex flex-wrap items-center gap-2"
        >
          {/* "All" clears any applied filter and closes the open tab. */}
          <Link
            href={allHref}
            aria-current={active.category === "all" ? "true" : undefined}
            onClick={() => setOpenCategory(null)}
            className={chipClass(active.category === "all")}
          >
            {labels.all}
          </Link>

          {FILTER_CATEGORIES.map((cat) => {
            const isOpen = openCategory === cat;
            const isActive = active.category === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isOpen}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpenCategory(isOpen ? null : cat)}
                className={chipClass(isActive, isOpen)}
              >
                {categoryLabel(cat)}
                <ChevronIcon
                  className={cn(
                    "h-3 w-3 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/*
         * Ghost-button reset that wipes both URL filter and search query.
         * Distinct visual language from the chip pills (no border, no fill
         * at rest) so it reads as an action rather than another filter.
         * Hidden when there's nothing to clear to avoid noise.
         */}
        {showClearAll ? (
          <button
            type="button"
            onClick={onClearAll}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/65 transition-all duration-300",
              "hover:bg-foreground/[0.05] hover:text-[var(--brand-solid)]",
              "dark:text-white/65 dark:hover:bg-white/[0.06] dark:hover:text-[var(--brand)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
            )}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            {labels.clearAll}
          </button>
        ) : null}
      </div>

      {openCategory ? (
        <div
          role="group"
          aria-label={categoryLabel(openCategory)}
          className="flex flex-wrap items-center gap-2 pl-1 pt-1"
        >
          {valueLists[openCategory].map((entry) => {
            const isActive =
              active.category === openCategory && active.value === entry.slug;
            const href = `/${locale}/products/${openCategory}/${entry.slug}`;
            return (
              <Link
                key={entry.slug}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(valueChipClass(isActive))}
              >
                {entry.label[locale]}
              </Link>
            );
          })}
          {active.category === openCategory ? (
            <Link
              href={allHref}
              className="ml-1 text-xs text-foreground/55 underline-offset-4 transition-colors hover:text-foreground hover:underline dark:text-white/55 dark:hover:text-white"
            >
              {labels.clear}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function chipClass(active: boolean, open: boolean = false) {
  return cn(
    "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
    active &&
      "border-[var(--brand-solid)] bg-[var(--brand-solid)] text-[var(--text-on-inverse)] shadow-md shadow-[var(--brand-solid)]/25 dark:border-[var(--brand)] dark:bg-[var(--brand)]",
    !active &&
      open &&
      "border-[var(--brand)]/45 bg-[var(--brand)]/8 text-foreground hover:bg-[var(--brand)]/12 dark:border-[var(--brand)]/55 dark:bg-[var(--brand)]/15 dark:text-white",
    !active &&
      !open &&
      "border-border bg-card text-foreground/75 hover:border-foreground/30 hover:text-foreground hover:bg-foreground/[0.04] dark:bg-white/[0.04] dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/[0.08]",
  );
}

function valueChipClass(active: boolean) {
  return cn(
    "inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
    active &&
      "border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand-solid)] dark:bg-[var(--brand)]/20 dark:text-[var(--brand)]",
    !active &&
      "border-border bg-transparent text-foreground/65 hover:border-[var(--brand)]/45 hover:text-foreground dark:border-white/10 dark:text-white/60 dark:hover:text-white",
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
