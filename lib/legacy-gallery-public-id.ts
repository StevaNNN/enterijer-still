/** Stable Cloudinary `public_id` for legacy WP gallery imports (`npm run import:legacy-gallery`). */
export function legacyGalleryPublicId(zeroBasedIndex: number): string {
  return `enterijerstil/gallery/legacy-${String(zeroBasedIndex + 1).padStart(3, "0")}`;
}
