// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALES, resolveLocale } from "@/src/i18n/locale";
import { ActiveSectionProvider } from "@/components/providers/active-section-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "seo" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";
  const title = t("title");
  const description = t("description");
  const openGraphTitle = t("openGraphTitle");
  const ogSiteName = t("ogSiteName");
  const ogImageUrl = `${siteUrl}/${locale}/opengraph-image`;
  const ogLocale = locale === "sr" ? "sr_RS" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: {
      icon: [{ url: "/logo.png", type: "image/png", sizes: "188x180" }],
      apple: [{ url: "/logo.png", type: "image/png", sizes: "188x180" }],
    },
    keywords: t("keywords").split(",").map((item) => item.trim()),
    applicationName: "EnterijerStil",
    authors: [{ name: "EnterijerStil" }],
    creator: "EnterijerStil",
    publisher: "EnterijerStil",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        sr: "/sr",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${siteUrl}/${locale}`,
      siteName: ogSiteName,
      title: openGraphTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: "Interior Design",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  // Ensures `getTranslations()` / `getLocale()` in Server Components use this segment’s locale.
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";
  const logoUrl = `${siteUrl}/logo.png`;
  const ogImageUrl = `${siteUrl}/${locale}/opengraph-image`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EnterijerStil",
    image: [logoUrl, ogImageUrl],
    url: siteUrl,
    telephone: "+381642490458",
    email: "enterijerstil@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Milovana Vidakovića 4",
      addressLocality: "Kragujevac",
      postalCode: "34000",
      addressCountry: "RS",
    },
    sameAs: [
      "https://www.facebook.com/enterijerstilkg",
      "https://www.instagram.com/enterijerstilkg/",
    ],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          <ActiveSectionProvider>
            <script
              type="application/ld+json"
              // JSON-LD for local business SEO snippets.
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(localBusinessSchema),
              }}
            />
            {children}
            <Toaster />
          </ActiveSectionProvider>
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
