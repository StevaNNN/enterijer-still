import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/src/i18n/locale";
import { CLOUDINARY_SITE_IMAGES } from "@/lib/cloudinary-assets";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_CARD_LIGHT,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

const TEAM_IMG = cloudinaryImageUrl(
  CLOUDINARY_SITE_IMAGES.aboutTeam,
  "portrait",
);

type AboutSectionProps = {
  locale: Locale;
};

export default async function AboutSection({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { value: "10+", label: t("stats.experience") },
    { value: "500+", label: t("stats.projects") },
    { value: "50+", label: t("stats.partners") },
  ];

  return (
    <section
      id="about"
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow
        size="lg"
        className="-left-32 top-1/3 -translate-y-1/2"
        animated
      />
      <BrandGlow
        size="md"
        intensity="soft"
        className="-right-24 bottom-10"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              line1={t("titleLine1")}
              line2={t("titleLine2")}
              size="lg"
              className="mb-8"
            />

            <p className="mb-6 text-lg leading-relaxed text-foreground/80 dark:text-white/65">
              {t("description1")}
            </p>

            <p className="mb-10 leading-relaxed text-foreground/70 dark:text-white/55">
              {t("description2")}
            </p>

            {/* Stats dock */}
            <div
              className={cn(
                SECTION_CARD_LIGHT,
                "max-w-xl backdrop-blur-md",
              )}
            >
              <dl className="grid grid-cols-3 divide-x divide-border dark:divide-white/10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-start gap-1 px-4 py-5 sm:px-6 md:px-7"
                  >
                    <dt className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand)]">
                      {stat.value}
                    </dt>
                    <dd className="text-xs leading-snug text-foreground/60 dark:text-white/55 md:text-sm">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]",
              )}
            >
              <Image
                src={TEAM_IMG}
                alt={t("teamAlt")}
                width={900}
                height={1200}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-[500px] w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Floating director card */}
              <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] text-lg font-bold text-white shadow-lg shadow-[var(--brand)]/30">
                    ES
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {t("directorName")}
                    </p>
                    <p className="text-sm text-white/60">
                      {t("directorRole")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Offset brand frame */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border border-[var(--brand)]/35 bg-[var(--brand)]/[0.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
