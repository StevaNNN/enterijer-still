/**
 * Products repository — single boundary between the rest of the app and
 * the data source.
 *
 * Today this reads `PRODUCTS` from a typed TS module (see
 * `lib/products-data.ts`), which is the right call for a curated catalog
 * of a few dozen SKUs that change rarely and have no admin UI.
 *
 * When you outgrow the TS module (admin tooling, frequent updates, more
 * SKUs), swap this file's body to call into Drizzle + Neon Postgres — the
 * Next.js / Vercel-native default. UI components, the catch-all route,
 * and `app/api/products/route.ts` all consume this interface and will not
 * need changes.
 *
 * Example future swap (illustrative — not currently wired):
 *
 *   import { db } from "@/lib/db";
 *   import { products } from "@/lib/db/schema";
 *   import { eq } from "drizzle-orm";
 *
 *   export async function getAllProducts() {
 *     return db.select().from(products);
 *   }
 *   export async function getProductBySlug(slug: string) {
 *     return (
 *       await db.select().from(products).where(eq(products.slug, slug)).limit(1)
 *     )[0];
 *   }
 */
import type { Locale } from "@/src/i18n/locale";
import { PRODUCTS, type Product } from "@/lib/products-data";
import {
  bucketForLongestSide,
  type FilterCategory,
} from "@/lib/products-taxonomies";

/** Return the full catalog. */
export async function getAllProducts(): Promise<readonly Product[]> {
  return PRODUCTS;
}

/** Look up a single product by its URL slug. */
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Server-side filter helper — used by the catch-all route to render a
 * pre-filtered list page (and by `searchProducts` for tests). When no
 * filter is set (category=all), returns the entire catalog.
 */
export async function filterProducts(
  category: FilterCategory | "all",
  valueSlug: string | undefined,
): Promise<readonly Product[]> {
  const all = await getAllProducts();
  if (category === "all" || !valueSlug) return all;
  return all.filter((product) => productMatchesFilter(product, category, valueSlug));
}

export function productMatchesFilter(
  product: Product,
  category: FilterCategory,
  valueSlug: string,
): boolean {
  switch (category) {
    case "type":
      return product.type === valueSlug;
    case "material":
      return product.material === valueSlug;
    case "color":
      return product.color === valueSlug;
    case "dimensions": {
      if (!product.dimensions) return false;
      const longest = Math.max(
        product.dimensions.width,
        product.dimensions.height,
        product.dimensions.depth ?? 0,
      );
      return bucketForLongestSide(longest) === valueSlug;
    }
  }
}

/**
 * Accent-insensitive substring search across the active locale's text
 * fields plus taxonomy slugs. Used by the client-side search input.
 * Exported here so server-side callers (e.g. an SSR search) get identical
 * results.
 */
export function searchInCatalog(
  products: readonly Product[],
  query: string,
  locale: Locale,
): readonly Product[] {
  const needle = normalize(query);
  if (!needle) return products;
  return products.filter((product) => {
    const haystack = [
      product.name[locale],
      product.shortDescription[locale],
      product.description[locale],
      product.brand ?? "",
      product.type,
      product.material,
      product.color,
    ]
      .map(normalize)
      .join(" ");
    return haystack.includes(needle);
  });
}

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
