"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { CLOUDINARY_SITE_IMAGES } from "@/lib/cloudinary-assets";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";

const HERO_IMG = cloudinaryImageUrl(CLOUDINARY_SITE_IMAGES.hero, "hero");

// Tiny SVG noise data URL kept inline so the grain layer ships with zero extra requests.
const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

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
        setOffset(window.scrollY * 0.35);
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

  const stats = [
    { value: "10+", label: t("stats.experience") },
    { value: "500+", label: t("stats.projects") },
    { value: "100%", label: t("stats.satisfaction") },
  ];

  const scrollLabel = t("scroll").toUpperCase();
  const rotatingText = `${scrollLabel} · ENTERIJER STIL · ${scrollLabel} · ENTERIJER STIL · `;

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Parallax + Ken Burns image layer */}
      <div
        className="absolute inset-0 -z-10 h-[120%] w-full"
        style={{ transform: `translateY(-${offset}px)` }}
        aria-hidden
      >
        <div className="relative h-full w-full animate-hero-kenburns">
          <Image
            src={HERO_IMG}
            alt={t("heroImageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Cinematic dark scrims: top-left for copy, bottom for stats dock */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/75 via-black/45 to-black/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
      />

      {/* Animated brand-color glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[36rem] w-[36rem] rounded-full bg-[var(--brand)]/40 mix-blend-screen blur-[140px] animate-hero-glow"
      />

      {/* Subtle grain for premium feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: NOISE_URL }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-28 pt-40 md:pb-32 md:pt-44 lg:pt-52">
        <div className="max-w-3xl">
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand)]" />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-white/90">
              {t("brandTag")}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-7 text-5xl font-bold leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-7xl lg:text-[6.75rem]">
            {t("titleLine1")}
            <br />
            <span className="relative inline-block text-[var(--brand)]">
              {t("titleLine2")}
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[0.18em] w-2/3 rounded-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent"
              />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg lg:text-xl">
            {t("description")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#services");
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--brand-solid)] px-7 py-3.5 text-sm font-semibold text-[var(--text-on-inverse)] shadow-lg shadow-[var(--brand)]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[var(--brand-solid-hover)] hover:shadow-xl hover:shadow-[var(--brand)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">{t("ctaServices")}</span>
              <svg
                className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 10h12m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              href={`/${locale}/gallery`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              {t("ctaGallery")}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 10h12m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats dock — frosted strip with column separators */}
        <div className="mt-14 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:mt-16">
          <dl className="grid grid-cols-3 divide-x divide-white/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start gap-1 px-4 py-5 sm:px-6 md:px-7 md:py-6"
              >
                <dt className="text-3xl font-bold tracking-tight text-[var(--brand)] md:text-4xl lg:text-5xl">
                  {stat.value}
                </dt>
                <dd className="text-xs leading-snug text-white/60 md:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Rotating scroll badge (desktop) */}
      <a
        href="#about"
        onClick={handleScroll}
        aria-label={t("scroll")}
        className="group absolute bottom-10 right-10 z-20 hidden h-28 w-28 items-center justify-center md:flex"
      >
        <div
          aria-hidden
          className="absolute inset-0 animate-spin-slow"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full text-white/90"
          >
            <defs>
              <path
                id="hero-scroll-circle"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text
              fontSize="10"
              letterSpacing="3.8"
              fill="currentColor"
              fontWeight="600"
            >
              <textPath href="#hero-scroll-circle" startOffset="0">
                {rotatingText}
              </textPath>
            </text>
          </svg>
        </div>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-solid)] text-white shadow-lg shadow-[var(--brand)]/40 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-110">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M10 4v12m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>

      {/* Mobile scroll hint */}
      <button
        type="button"
        onClick={handleScroll}
        aria-label={t("scroll")}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/75 md:hidden"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {t("scroll")}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="animate-bounce"
          aria-hidden
        >
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
