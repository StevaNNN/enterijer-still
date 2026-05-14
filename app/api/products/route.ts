/**
 * Products API — read-only endpoint that returns the full product
 * catalog. Currently backed by the typed TS module via the repository
 * (see `lib/products-repository.ts`); when the data source moves to a
 * real database, only the repository needs to change.
 *
 * The site otherwise reads products directly in Server Components (the
 * idiomatic App Router pattern, no network round trip). This endpoint
 * exists for two reasons:
 *
 *   1) Future client-side / external consumers (e.g. an admin tool or a
 *      cross-origin embed).
 *   2) To give every component a single, replaceable "shape" for the
 *      product list — the same JSON returned here matches the in-process
 *      Server Component data.
 *
 * Optional query params:
 *   - `?q=foo`              → server-side text search (locale-aware)
 *   - `?locale=en|sr`       → choose locale for the search (default: en)
 *   - `?filter=type:rigips-ploca` → server-side filter
 */
import { NextResponse } from "next/server";
import { resolveLocale } from "@/src/i18n/locale";
import {
  filterProducts,
  getAllProducts,
  searchInCatalog,
} from "@/lib/products-repository";
import type { FilterCategory } from "@/lib/products-taxonomies";
import { FILTER_CATEGORIES } from "@/lib/products-taxonomies";

export const runtime = "nodejs";

function parseFilter(
  raw: string | null,
): { category: FilterCategory | "all"; value: string | undefined } {
  if (!raw) return { category: "all", value: undefined };
  const [cat, value] = raw.split(":");
  if (cat === "all" || !value) return { category: "all", value: undefined };
  if (FILTER_CATEGORIES.includes(cat as FilterCategory)) {
    return { category: cat as FilterCategory, value };
  }
  return { category: "all", value: undefined };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const localeParam = url.searchParams.get("locale") ?? undefined;
  const locale = resolveLocale(localeParam);
  const q = url.searchParams.get("q") ?? "";
  const { category, value } = parseFilter(url.searchParams.get("filter"));

  const filtered = category === "all"
    ? await getAllProducts()
    : await filterProducts(category, value);

  const result = q ? searchInCatalog(filtered, q, locale) : filtered;

  return NextResponse.json(
    { products: result, count: result.length },
    {
      headers: {
        // Catalog rarely changes — short edge cache + SWR is fine.
        "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
      },
    },
  );
}
