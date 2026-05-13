"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { CLOUDINARY_SITE_IMAGES } from "@/lib/cloudinary-assets";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";

const HERO_IMG = cloudinaryImageUrl(CLOUDINARY_SITE_IMAGES.hero, "hero");

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setOffset(window.scrollY * 0.4);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("#about");
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        <Image
          src={HERO_IMG}
          alt={t("heroImageAlt")}
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-white/20 dark:from-black/70 dark:via-black/40 dark:to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent dark:from-black/50" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-start max-w-7xl mx-auto px-6 py-28 md:py-20">
        <div className="transition-all duration-1000 delay-300 opacity-100 translate-y-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-[var(--brand)] to-transparent" />
            <span className="text-[var(--brand)] text-sm tracking-[0.3em] uppercase font-medium">
              {t("brandTag")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground dark:text-white leading-[0.95] tracking-tight max-w-4xl">
            {t("titleLine1")}
            <br />
            <span className="inline-block bg-gradient-to-r from-[var(--brand)] via-[var(--brand-strong)] to-[var(--brand)] bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h1>

          <p className="mt-6 text-foreground/80 dark:text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#services");
              }}
              className="px-8 py-4 text-sm font-semibold text-[var(--text-on-inverse)] bg-gradient-to-r from-[var(--brand)] to-[var(--brand-strong)] rounded-full hover:shadow-xl hover:shadow-[var(--brand)]/30 transition-all duration-300 hover:scale-105"
            >
              {t("ctaServices")}
            </a>
            <Link
              href={`/${locale}/gallery`}
              className="px-8 py-4 text-sm font-semibold text-foreground dark:text-white border border-foreground/40 dark:border-white/30 bg-white/35 dark:bg-black/25 backdrop-blur-sm rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:border-foreground/60 dark:hover:border-white/50 transition-all duration-300"
            >
              {t("ctaGallery")}
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 md:mt-14 transition-all duration-1000 delay-700 opacity-100 translate-y-0">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {[
              { value: "10+", label: t("stats.experience") },
              { value: "500+", label: t("stats.projects") },
              { value: "100%", label: t("stats.satisfaction") },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[var(--brand)]">
                  {stat.value}
                </span>
                <span className="text-foreground/70 dark:text-white/50 text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-foreground/75 dark:text-white/75 hover:text-foreground dark:hover:text-white transition-colors duration-300 animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">{t("scroll")}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
