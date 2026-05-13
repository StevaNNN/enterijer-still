import legacyGallerySources from "@/lib/legacy-gallery-source-urls.json";
import { legacyGalleryPublicId } from "@/lib/legacy-gallery-public-id";

export type GalleryCategory =
  | "kitchens"
  | "bedrooms"
  | "bathrooms"
  | "livingRooms"
  | "commercial";

export type GalleryImage = {
  publicId: string;
  category: GalleryCategory;
};

export { legacyGalleryPublicId } from "@/lib/legacy-gallery-public-id";

function asciiFold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

/** Guess filter category from the original WordPress filename (best-effort). */
export function inferGalleryCategoryFromSourceUrl(url: string): GalleryCategory {
  let file = "";
  try {
    file = decodeURIComponent(url.split("/").pop() ?? "");
  } catch {
    file = url.split("/").pop() ?? "";
  }
  const n = asciiFold(file);
  if (/kitchen|kuhinja|kuhinj/.test(n)) return "kitchens";
  if (/bathroom|kupatil|wc|toilet/.test(n)) return "bathrooms";
  if (/bedroom|spavac|spava/.test(n)) return "bedrooms";
  if (
    /hotel|caffe|cafe|pekara|lokal|mts|marabu|cherry|carpe|mademoiselle|zelengora|sumarice|fashion|vega|x-fashion|^image-/.test(
      n,
    )
  ) {
    return "commercial";
  }
  if (/porodic|galerija|img_/.test(n)) return "livingRooms";
  return "commercial";
}

export const GALLERY_IMAGES: GalleryImage[] = legacyGallerySources.sources.map(
  (url: string, index: number) => ({
    publicId: legacyGalleryPublicId(index),
    category: inferGalleryCategoryFromSourceUrl(url),
  }),
);
