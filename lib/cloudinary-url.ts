const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_IMAGE_PRESETS = {
  teaser: "f_auto,q_auto,c_fill,g_auto,w_1200,h_1600",
  grid: "f_auto,q_auto,c_fill,g_auto,w_1200,h_1600",
  lightbox: "f_auto,q_auto,c_limit,w_2200",
  hero: "f_auto,q_auto,c_fill,g_auto,w_1920,h_1080",
  portrait: "f_auto,q_auto,c_fill,g_auto,w_900,h_1200",
  /** Partner / client logos — scale-down only, no crop, preserves aspect ratio. */
  logo: "f_auto,q_auto,c_fit,w_112,h_72",
} as const;

export function cloudinaryImageUrl(
  publicId: string,
  preset: keyof typeof CLOUDINARY_IMAGE_PRESETS,
) {
  if (!cloudName) {
    return "";
  }

  const encodedPublicId = publicId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${CLOUDINARY_IMAGE_PRESETS[preset]}/${encodedPublicId}`;
}
