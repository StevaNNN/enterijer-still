import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GalleryTeaserSection from "@/components/GalleryTeaserSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import { resolveLocale } from "@/src/i18n/locale";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-between bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <GalleryTeaserSection locale={locale} />
      <ContactSection />
      <Footer locale={locale} />
    </main>
  );
}
