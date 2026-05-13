import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/src/i18n/locale";
import { CLOUDINARY_SITE_IMAGES } from "@/lib/cloudinary-assets";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";

const TEAM_IMG = cloudinaryImageUrl(CLOUDINARY_SITE_IMAGES.aboutTeam, "portrait");

type AboutSectionProps = {
  locale: Locale;
};

export default async function AboutSection({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--surface-inverse)] overflow-hidden w-full"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--brand)]/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--brand)]" />
          <span className="text-[var(--brand)] text-sm tracking-[0.2em] uppercase font-medium">
            {t("eyebrow")}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight mb-6">
              {t("titleLine1")}
              <br />
              <span className="text-foreground/60 dark:text-white/40">{t("titleLine2")}</span>
            </h2>

            <p className="text-foreground/80 dark:text-white/60 text-lg leading-relaxed mb-6">
              {t("description1")}
            </p>

            <p className="text-foreground/70 dark:text-white/50 leading-relaxed mb-10">
              {t("description2")}
            </p>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { target: 10, suffix: "+", label: t("stats.experience") },
                { target: 500, suffix: "+", label: t("stats.projects") },
                { target: 50, suffix: "+", label: t("stats.partners") },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-bold text-[var(--brand)]">
                    {item.target}
                    {item.suffix}
                  </span>
                  <span className="text-foreground/60 dark:text-white/40 text-sm mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={TEAM_IMG}
                alt={t("teamAlt")}
                width={900}
                height={1200}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] flex items-center justify-center text-white font-bold text-lg">
                    ES
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {t("directorName")}
                    </p>
                    <p className="text-white/50 text-sm">{t("directorRole")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-[var(--brand)]/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
