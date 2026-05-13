import { MetadataRoute } from "next";
import { LOCALES } from "@/src/i18n/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";
  return LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "sr" ? 1 : 0.9,
  }));
}
