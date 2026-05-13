import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/src/i18n/locale";
import { SERVICE_IMAGE_PUBLIC_IDS } from "@/lib/cloudinary-assets";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

const SERVICE_IMAGES = SERVICE_IMAGE_PUBLIC_IDS.map((publicId) =>
  cloudinaryImageUrl(publicId, "grid"),
);

const serviceSpans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
] as const;

const serviceIcons = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17l-5.384 3.07A1.5 1.5 0 014.5 17.03V6.97a1.5 1.5 0 011.536-1.21l5.384 3.07m0 6.34V8.83m0 6.34l5.384 3.07A1.5 1.5 0 0019.5 17.03V6.97a1.5 1.5 0 00-1.536-1.21L12.58 8.83"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
      </svg>
    ),
  },
] as const;

type ServicesSectionProps = {
  locale: Locale;
};

export default async function ServicesSection({ locale }: ServicesSectionProps) {
  const t = await getTranslations({ locale, namespace: "services" });
  const services = [0, 1, 2, 3].map((idx) => ({
    title: t(`items.item${idx + 1}.title`),
    description: t(`items.item${idx + 1}.description`),
    image: SERVICE_IMAGES[idx],
    icon: serviceIcons[idx].icon,
    span: serviceSpans[idx],
  }));

  return (
    <section
      id="services"
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow size="lg" className="-right-32 top-1/4" animated />
      <BrandGlow size="md" intensity="soft" className="-left-24 bottom-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <SectionEyebrow className="mb-6">{t("eyebrow")}</SectionEyebrow>
          <SectionHeading
            line1={t("titleLine1")}
            line2={t("titleLine2")}
            size="lg"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-700 hover:border-[var(--brand)]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                service.span,
              )}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />

              {/* Multi-stop overlay so type is always readable, and the brand color hints from the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--brand)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Content */}
              <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 md:p-8 lg:min-h-[320px]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[var(--brand)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--brand)]/50 group-hover:bg-[var(--brand)]/20">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  {service.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/80">
                  {service.description}
                </p>

                {/* Brand-color accent bar that grows on hover */}
                <span
                  aria-hidden
                  className="mt-5 block h-[2px] w-12 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent transition-all duration-500 group-hover:w-24"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
