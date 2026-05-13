import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Navbar from "@/components/Navbar";
import { resolveLocale } from "@/src/i18n/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "gallery" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <div className="pt-24">
        <GallerySection locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  );
}
