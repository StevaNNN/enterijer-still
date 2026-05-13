/**
 * Re-exports URL helpers safe for Client Components (no Node SDK).
 * Optional bulk uploads: `npm run upload:cloudinary` (see AGENTS.md).
 */
export { CLOUDINARY_IMAGE_PRESETS, cloudinaryImageUrl } from "./cloudinary-url";
