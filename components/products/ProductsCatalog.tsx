"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/src/i18n/locale";
import type { Product } from "@/lib/products-data";
import { searchInCatalog } from "@/lib/products-repository";
import {
  FilterChips,
  type ActiveFilter,
} from "@/components/products/FilterChips";
import { SearchBar } from "@/components/products/SearchBar";
import { ProductCard } from "@/components/products/ProductCard";

type Labels = {
  filterTitle: string;
  filterAll: string;
  filterType: string;
  filterMaterial: string;
  filterColor: string;
  filterDimensions: string;
  filterClear: string;
  filterClearAll: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchClear: string;
  emptyTitle: string;
  emptyDescription: string;
  cardView: string;
};

type ProductsCatalogProps = {
  locale: Locale;
  /** Products already filtered server-side by the active URL filter. */
  products: readonly Product[];
  active: ActiveFilter;
  /**
   * URL prefix used by product cards so the detail link preserves the
   * user's filter context — `/sr/products/all` or `/sr/products/type/x`.
   */
  filterHrefPrefix: string;
  labels: Labels;
};

/**
 * Client wrapper that owns the search-query state and renders the
 * search bar, the filter chip controls, and the responsive product grid.
 *
 * Filtering by category/value is URL-driven (handled server-side at the
 * route level — see `app/[locale]/products/[[...path]]/page.tsx`), so
 * this component only filters by the live search query against the
 * already-filtered subset it receives.
 */
export function ProductsCatalog({
  locale,
  products,
  active,
  filterHrefPrefix,
  labels,
}: ProductsCatalogProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const visible = useMemo(
    () => searchInCatalog(products, query, locale),
    [products, query, locale],
  );

  /**
   * Wipe both the URL filter and the search query in a single action.
   * `router.push` triggers the catch-all route to re-resolve as the
   * "all" catalog (server-rendered), and `setQuery("")` clears the
   * locally-owned search input.
   */
  const handleClearAll = () => {
    setQuery("");
    if (active.category !== "all") {
      router.push(`/${locale}/products/all`);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header row: filters left, search right */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 min-w-0">
          <FilterChips
            locale={locale}
            active={active}
            hasSearchQuery={query.length > 0}
            onClearAll={handleClearAll}
            labels={{
              title: labels.filterTitle,
              all: labels.filterAll,
              type: labels.filterType,
              material: labels.filterMaterial,
              color: labels.filterColor,
              dimensions: labels.filterDimensions,
              clear: labels.filterClear,
              clearAll: labels.filterClearAll,
            }}
          />
        </div>
        <div className="flex shrink-0 justify-start lg:justify-end">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={labels.searchPlaceholder}
            ariaLabel={labels.searchAriaLabel}
            clearLabel={labels.searchClear}
          />
        </div>
      </div>

      {/* Grid or empty-state */}
      {visible.length === 0 ? (
        <EmptyState
          title={labels.emptyTitle}
          description={labels.emptyDescription}
        />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard
                product={product}
                locale={locale}
                filterHrefPrefix={filterHrefPrefix}
                viewLabel={labels.cardView}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center dark:border-white/15 dark:bg-white/[0.02]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand-solid)] dark:bg-[var(--brand)]/20 dark:text-[var(--brand)]">
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m17 17-3.5-3.5" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-foreground dark:text-white">
        {title}
      </h2>
      <p className="max-w-md text-sm text-foreground/60 dark:text-white/60">
        {description}
      </p>
    </div>
  );
}
