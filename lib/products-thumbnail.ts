/**
 * Single source of truth for resolving a product's preview image URL across
 * the catalog grid and detail view.
 *
 * Lookup order:
 *   1. `product.thumbnail` if the product has its own asset (a local
 *      `/products/...` path under `public/`, or an already-resolved
 *      Cloudinary URL once individual images move to the CDN).
 *   2. The shared local placeholder at `public/product-placeholder.jpg`.
 *
 * Migration plan: once every product has its own photo in Cloudinary and
 * the database stores the asset's `public_id`, build the per-row URL with
 * `cloudinaryImageUrl(publicId, preset)` and set it on `product.thumbnail`
 * upstream — this resolver and every consumer keeps working without changes.
 */
import type { Product } from "@/lib/products-data";

/**
 * Local fallback image served from `public/product-placeholder.jpg`. Swap
 * the file (or this path) when you want a different temporary preview.
 */
export const PRODUCT_PLACEHOLDER_IMAGE = "/product-placeholder.jpg";

export function getProductThumbnailUrl(
  product: Pick<Product, "thumbnail">,
): string {
  return product.thumbnail || PRODUCT_PLACEHOLDER_IMAGE;
}
