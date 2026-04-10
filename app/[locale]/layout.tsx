// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LOCALES, resolveLocale } from "@/src/i18n/locale";
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

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
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
      locale,
      url: `${siteUrl}/${locale}`,
      siteName: "EnterijerStil",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
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
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
