import type { Metadata } from "next";
import type { Locale } from "@/src/i18n/locale";

type BuildLocalizedRouteMetadataInput = {
  siteUrl: string;
  locale: Locale;
  /** URL segment after locale, e.g. `gallery` → `/en/gallery`. */
  pathnameSegment: string;
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  ogImageAlt: string;
};

export function buildLocalizedRouteMetadata({
  siteUrl,
  locale,
  pathnameSegment,
  title,
  description,
  keywords,
  openGraphTitle,
  ogImageAlt,
}: BuildLocalizedRouteMetadataInput): Metadata {
  const path = `/${locale}/${pathnameSegment}`;
  const pageUrl = `${siteUrl}${path}`;
  const ogImageUrl = `${siteUrl}/${locale}/opengraph-image`;
  const ogLocale = locale === "sr" ? "sr_RS" : "en_US";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/${pathnameSegment}`,
        sr: `/sr/${pathnameSegment}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: pageUrl,
      title: openGraphTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
