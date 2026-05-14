import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/locale";
import type { Product, ProductDimensions } from "@/lib/products-data";
import {
  getTaxonomyLabel,
  type FilterCategory,
} from "@/lib/products-taxonomies";
import { getProductThumbnailUrl } from "@/lib/products-thumbnail";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_CARD_LIGHT,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

type ProductDetailProps = {
  product: Product;
  locale: Locale;
  /** Href to navigate back to the catalog (preserving filter context). */
  backHref: string;
  labels: {
    eyebrow: string;
    back: string;
    type: string;
    material: string;
    color: string;
    brand: string;
    dimensions: string;
    width: string;
    height: string;
    depth: string;
    specsTitle: string;
    descriptionTitle: string;
  };
};

/**
 * Detail page view for a single product. Composed with the shared
 * marketing primitives (BrandGlow + SectionEyebrow + SectionHeading)
 * so it stays consistent with the rest of the site.
 *
 * Layout:
 *   - Left column: image (with gallery thumbs if extra images exist)
 *   - Right column: heading, taxonomy chips, dimensions, long description
 *
 * Each taxonomy chip is brand-tinted (type uses a stronger fill — it's
 * the primary characteristic). Dimensions render as a three-cell grid
 * with explicit Width / Height / Depth labels, omitted gracefully when
 * the product has no `dimensions` set.
 */
export function ProductDetail({
  product,
  locale,
  backHref,
  labels,
}: ProductDetailProps) {
  const name = product.name[locale];
  const description = product.description[locale];
  const thumbnailUrl = getProductThumbnailUrl(product);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow size="lg" className="-left-32 top-12" animated />
      <BrandGlow
        size="md"
        intensity="soft"
        className="-right-24 bottom-20"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/65 transition-colors hover:text-[var(--brand-solid)] dark:text-white/65 dark:hover:text-[var(--brand)]"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M16 10H4m0 0l4-4m-4 4l4 4" />
          </svg>
          {labels.back}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Image column */}
          <div
            className={cn(
              SECTION_CARD_LIGHT,
              "relative aspect-[4/3] w-full overflow-hidden",
            )}
          >
            <Image
              src={thumbnailUrl}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Body column */}
          <div>
            <SectionEyebrow>{labels.eyebrow}</SectionEyebrow>
            <SectionHeading
              as="h1"
              line1={splitName(name).line1}
              line2={splitName(name).line2}
              size="lg"
              className="mt-6"
            />

            {/* Chips: type (primary) + material + color */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <TaxonomyChip
                category="type"
                slug={product.type}
                locale={locale}
                label={labels.type}
                tone="strong"
              />
              <TaxonomyChip
                category="material"
                slug={product.material}
                locale={locale}
                label={labels.material}
              />
              <TaxonomyChip
                category="color"
                slug={product.color}
                locale={locale}
                label={labels.color}
              />
              {product.brand ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-transparent px-3 py-1 text-xs font-medium text-foreground/65 dark:border-white/10 dark:text-white/60">
                  <span className="uppercase tracking-[0.18em] text-[0.65rem] text-foreground/45 dark:text-white/45">
                    {labels.brand}
                  </span>
                  {product.brand}
                </span>
              ) : null}
            </div>

            {/* Long description */}
            <div className="mt-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55 dark:text-white/55">
                {labels.descriptionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/75 dark:text-white/70 md:text-lg">
                {description}
              </p>
            </div>

            {/* Dimensions */}
            {product.dimensions ? (
              <DimensionsBlock
                dimensions={product.dimensions}
                labels={{
                  specsTitle: labels.specsTitle,
                  dimensions: labels.dimensions,
                  width: labels.width,
                  height: labels.height,
                  depth: labels.depth,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Internal helpers
 * --------------------------------------------------------- */

function splitName(full: string): { line1: string; line2: string } {
  // Drop a deliberately balanced two-line title; the SectionHeading
  // primitive expects two lines. Split on the last space so the second
  // line carries the more descriptive trailing portion.
  const lastSpace = full.lastIndexOf(" ");
  if (lastSpace < 0 || lastSpace < full.length / 2) {
    return { line1: full, line2: "" };
  }
  return {
    line1: full.slice(0, lastSpace),
    line2: full.slice(lastSpace + 1),
  };
}

function TaxonomyChip({
  category,
  slug,
  locale,
  label,
  tone = "soft",
}: {
  category: FilterCategory;
  slug: string;
  locale: Locale;
  label: string;
  tone?: "soft" | "strong";
}) {
  const value = getTaxonomyLabel(category, slug, locale);
  return (
    <Link
      href={`/${locale}/products/${category}/${slug}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
        tone === "strong" &&
          "border-[var(--brand-solid)] bg-[var(--brand-solid)] text-[var(--text-on-inverse)] hover:bg-[var(--brand-solid-hover)] dark:border-[var(--brand)] dark:bg-[var(--brand)]",
        tone === "soft" &&
          "border-border bg-card text-foreground/75 hover:border-[var(--brand)]/45 hover:text-foreground dark:bg-white/[0.04] dark:border-white/10 dark:text-white/70 dark:hover:text-white",
      )}
    >
      <span
        className={cn(
          "uppercase tracking-[0.18em] text-[0.65rem]",
          tone === "strong" && "text-white/75",
          tone === "soft" && "text-foreground/45 dark:text-white/45",
        )}
      >
        {label}
      </span>
      {value}
    </Link>
  );
}

function DimensionsBlock({
  dimensions,
  labels,
}: {
  dimensions: ProductDimensions;
  labels: {
    specsTitle: string;
    dimensions: string;
    width: string;
    height: string;
    depth: string;
  };
}) {
  const unit = dimensions.unit;
  const cells: Array<{ key: string; label: string; value: number }> = [
    { key: "width", label: labels.width, value: dimensions.width },
    { key: "height", label: labels.height, value: dimensions.height },
  ];
  if (typeof dimensions.depth === "number") {
    cells.push({ key: "depth", label: labels.depth, value: dimensions.depth });
  }

  return (
    <div className="mt-10">
      <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55 dark:text-white/55">
        {labels.specsTitle}
      </h2>
      <dl
        className={cn(
          SECTION_CARD_LIGHT,
          "mt-3 grid grid-cols-2 divide-x divide-border overflow-hidden text-sm sm:grid-cols-3 dark:divide-white/10",
        )}
      >
        {cells.map((cell) => (
          <div key={cell.key} className="flex flex-col gap-1 px-4 py-4">
            <dt className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-foreground/55 dark:text-white/50">
              {cell.label}
            </dt>
            <dd className="text-lg font-semibold tabular-nums text-foreground dark:text-white">
              {formatValue(cell.value)}
              <span className="ml-1 text-xs font-normal text-foreground/55 dark:text-white/55">
                {unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function formatValue(n: number) {
  // Show "12.5" but never "12" -> "12.0"
  return Number.isInteger(n) ? n.toString() : n.toFixed(1);
}
