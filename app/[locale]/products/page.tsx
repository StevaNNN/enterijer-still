import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductsSection from "@/components/ProductsSection";
import { buildLocalizedRouteMetadata } from "@/lib/locale-route-metadata";
import { resolveLocale } from "@/src/i18n/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "products" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";

  return buildLocalizedRouteMetadata({
    siteUrl,
    locale,
    pathnameSegment: "products",
    title: t("pageTitle"),
    description: t("pageDescription"),
    keywords: t("pageKeywords").split(",").map((item) => item.trim()),
    openGraphTitle: t("openGraphTitle"),
    ogImageAlt: tSeo("ogImageAlt"),
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";
  const pageUrl = `${siteUrl}/${locale}/products`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("pageTitle"),
    headline: t("openGraphTitle"),
    description: t("pageDescription"),
    url: pageUrl,
    inLanguage: locale === "sr" ? "sr-RS" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "EnterijerStil",
      url: siteUrl,
    },
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <div className="pt-24">
        <ProductsSection locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  );
}
