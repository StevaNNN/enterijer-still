/**
 * Product taxonomies — value slugs paired with their localized labels.
 *
 * URL slugs are intentionally locale-agnostic (typically the Serbian form
 * without diacritics, since EnterijerStil's primary market is Serbia).
 * The display label is looked up via `getTaxonomyLabel(...)` so a filter
 * chip can show "Drywall panel" in EN while the URL stays
 * `/products/type/rigips-ploca`.
 *
 * To add a new value:
 *   1) Add an entry below with `{ slug, label: { en, sr } }`.
 *   2) Reference its slug from a `Product`'s `type/material/color` field
 *      in `lib/products-data.ts`.
 *
 * Dimension buckets are derived from the product's longest side and use
 * the same slug/label pattern so the filter chip UI is uniform.
 */
import type { Locale } from "@/src/i18n/locale";

export type TaxonomyEntry = {
  slug: string;
  label: {
    en: string;
    sr: string;
  };
};

export const PRODUCT_TYPES: readonly TaxonomyEntry[] = [
  {
    slug: "rigips-ploca",
    label: { en: "Drywall panel", sr: "Rigips ploča" },
  },
  {
    slug: "izolacija",
    label: { en: "Insulation", sr: "Izolacija" },
  },
  {
    slug: "spusteni-plafon",
    label: { en: "Suspended ceiling", sr: "Spušteni plafon" },
  },
  {
    slug: "podna-obloga",
    label: { en: "Flooring", sr: "Podna obloga" },
  },
  {
    slug: "rasveta",
    label: { en: "Lighting", sr: "Rasveta" },
  },
  {
    slug: "kvake-i-okovi",
    label: { en: "Handles & hardware", sr: "Kvake i okovi" },
  },
  {
    slug: "profil",
    label: { en: "Profile", sr: "Profil" },
  },
  {
    slug: "boje-i-lakovi",
    label: { en: "Paints & lacquers", sr: "Boje i lakovi" },
  },
];

export const PRODUCT_MATERIALS: readonly TaxonomyEntry[] = [
  { slug: "gips", label: { en: "Gypsum", sr: "Gips" } },
  { slug: "drvo", label: { en: "Wood", sr: "Drvo" } },
  { slug: "metal", label: { en: "Metal", sr: "Metal" } },
  { slug: "aluminijum", label: { en: "Aluminium", sr: "Aluminijum" } },
  { slug: "keramika", label: { en: "Ceramic", sr: "Keramika" } },
  { slug: "mineralna-vuna", label: { en: "Mineral wool", sr: "Mineralna vuna" } },
  { slug: "laminat", label: { en: "Laminate", sr: "Laminat" } },
  { slug: "staklo", label: { en: "Glass", sr: "Staklo" } },
];

export const PRODUCT_COLORS: readonly TaxonomyEntry[] = [
  { slug: "bela", label: { en: "White", sr: "Bela" } },
  { slug: "crna", label: { en: "Black", sr: "Crna" } },
  { slug: "siva", label: { en: "Grey", sr: "Siva" } },
  { slug: "bez", label: { en: "Beige", sr: "Bež" } },
  { slug: "hrast", label: { en: "Oak", sr: "Hrast" } },
  { slug: "orah", label: { en: "Walnut", sr: "Orah" } },
  { slug: "antracit", label: { en: "Anthracite", sr: "Antracit" } },
  { slug: "boja-aluminijuma", label: { en: "Aluminium", sr: "Boja aluminijuma" } },
];

/**
 * Dimension buckets — derived from the longest side of `Product.dimensions`.
 * Slugs use Serbian-keyboard-friendly words so URLs read naturally
 * (`do-60cm`, `od-60-do-120cm`, `preko-120cm`).
 */
export const PRODUCT_DIMENSION_BUCKETS: readonly TaxonomyEntry[] = [
  { slug: "do-60cm", label: { en: "Up to 60 cm", sr: "Do 60 cm" } },
  { slug: "od-60-do-120cm", label: { en: "60 – 120 cm", sr: "60 – 120 cm" } },
  { slug: "preko-120cm", label: { en: "Over 120 cm", sr: "Preko 120 cm" } },
];

export type FilterCategory = "type" | "material" | "color" | "dimensions";

export const FILTER_CATEGORIES: readonly FilterCategory[] = [
  "type",
  "material",
  "color",
  "dimensions",
];

/**
 * Resolve a slug to a localized label across any of the four taxonomies.
 * Falls back to the slug itself if unknown (so a stale URL still renders).
 */
export function getTaxonomyLabel(
  category: FilterCategory,
  slug: string,
  locale: Locale,
): string {
  const lookup =
    category === "type"
      ? PRODUCT_TYPES
      : category === "material"
        ? PRODUCT_MATERIALS
        : category === "color"
          ? PRODUCT_COLORS
          : PRODUCT_DIMENSION_BUCKETS;
  return lookup.find((entry) => entry.slug === slug)?.label[locale] ?? slug;
}

/** All known slugs for a given category (used for sitemap/static params). */
export function getTaxonomySlugs(category: FilterCategory): string[] {
  const lookup =
    category === "type"
      ? PRODUCT_TYPES
      : category === "material"
        ? PRODUCT_MATERIALS
        : category === "color"
          ? PRODUCT_COLORS
          : PRODUCT_DIMENSION_BUCKETS;
  return lookup.map((entry) => entry.slug);
}

/** Map a longest-side value (in `unit`) to a bucket slug. */
export function bucketForLongestSide(
  longestMm: number,
): (typeof PRODUCT_DIMENSION_BUCKETS)[number]["slug"] {
  const cm = longestMm / 10;
  if (cm <= 60) return "do-60cm";
  if (cm <= 120) return "od-60-do-120cm";
  return "preko-120cm";
}
