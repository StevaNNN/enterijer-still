/** Order matches homepage section flow (see AGENTS.md section IDs). */
export const HOME_SECTION_HASHES = [
  "#hero",
  "#about",
  "#services",
  "#gallery",
  "#contact",
] as const;

export type HomeSectionHash = (typeof HOME_SECTION_HASHES)[number];
