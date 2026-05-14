/**
 * Cloudinary `public_id` values for site photography and hero imagery.
 * Gallery photos: `enterijerstil/gallery/legacy-*` (see `lib/gallery-data.ts` and
 * `npm run import:legacy-gallery`). Optional bulk upload / restore: `npm run upload:cloudinary`.
 */
import { legacyGalleryPublicId } from "@/lib/legacy-gallery-public-id";

export const CLOUDINARY_SITE_IMAGES = {
  hero: "enterijerstil/site/hero",
  aboutTeam: "enterijerstil/site/about-team",
} as const;

/** Returns the Cloudinary public_id for a partner logo by its filename slug (no extension). */
export const partnerLogoPublicId = (slug: string) =>
  `enterijerstil/partners/${slug}` as const;

/** Returns the Cloudinary public_id for a reference/client logo by its filename slug (no extension). */
export const referenceLogoPublicId = (slug: string) =>
  `enterijerstil/references/${slug}` as const;

/** Services bento uses the first four legacy gallery shots after import. */
export const SERVICE_IMAGE_PUBLIC_IDS = [
  legacyGalleryPublicId(0),
  legacyGalleryPublicId(1),
  legacyGalleryPublicId(2),
  legacyGalleryPublicId(3),
] as const;
