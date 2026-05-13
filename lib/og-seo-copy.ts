import en from "@/messages/en.json";
import sr from "@/messages/sr.json";
import type { Locale } from "@/src/i18n/locale";

const byLocale = { en, sr } as const;

/** SEO strings for OG image — avoids `next-intl/server` (no request config in static OG build). */
export function getOgSeoCopy(locale: Locale) {
  const seo = byLocale[locale].seo;
  return {
    brandName: seo.brandName,
    ogHeadline: seo.ogHeadline,
    ogSubheadline: seo.ogSubheadline,
  };
}
