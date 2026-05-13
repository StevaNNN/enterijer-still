import { MetadataRoute } from "next";
import { LOCALES } from "@/src/i18n/locale";

const STATIC_LOCALE_PATHS = ["", "/gallery", "/products"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_LOCALE_PATHS) {
      const url = `${siteUrl}/${locale}${path}`;
      const isHome = path === "";
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? (locale === "sr" ? 1 : 0.9) : 0.75,
      });
    }
  }

  return entries;
}
