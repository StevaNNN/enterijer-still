"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryCategory } from "@/lib/gallery-data";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

type GalleryItem = {
  src: string;
  lightboxSrc: string;
  title: string;
  category: GalleryCategory;
};

type GalleryClientProps = {
  headingEyebrow: string;
  headingLine1: string;
  headingLine2: string;
  lightboxCloseLabel: string;
  categories: Array<{ key: string; label: string }>;
  images: GalleryItem[];
};

export default function GalleryClient({
  headingEyebrow,
  headingLine1,
  headingLine2,
  lightboxCloseLabel,
  categories,
  images,
}: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lightbox === null) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const filtered =
    activeFilter === "all"
      ? images
      : images.filter((image) => image.category === activeFilter);

  return (
    <section
      id="gallery"
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface-2)] dark:bg-[var(--surface-2)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow size="lg" className="-right-24 top-0" animated />
      <BrandGlow
        size="md"
        intensity="soft"
        className="-left-24 bottom-1/4"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <SectionEyebrow className="mb-6">{headingEyebrow}</SectionEyebrow>
          <SectionHeading
            line1={headingLine1}
            line2={headingLine2}
            size="lg"
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeFilter === category.key;
            return (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
                  active &&
                    "border-transparent bg-[var(--brand-solid)] text-[var(--text-on-inverse)] shadow-lg shadow-[var(--brand)]/30 hover:bg-[var(--brand-solid-hover)]",
                  !active &&
                    cn(
                      "backdrop-blur-md",
                      "border-black/12 bg-white/55 text-foreground hover:border-black/22 hover:bg-white/90",
                      "dark:border-white/30 dark:bg-white/5 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/10",
                    ),
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
          {filtered.map((image, index) => (
            <div
              key={image.src}
              className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 hover:border-[var(--brand)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              onClick={() => setLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={cn(
                  "w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110",
                  index % 3 === 0 && "h-[400px]",
                  index % 3 === 1 && "h-[300px]",
                  index % 3 === 2 && "h-[350px]",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-lg font-semibold text-white">{image.title}</p>
                <p className="text-sm text-[var(--brand)]">
                  {categories.find((category) => category.key === image.category)?.label}
                </p>
                <span
                  aria-hidden
                  className="mt-3 block h-[2px] w-12 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            ref={closeButtonRef}
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={lightboxCloseLabel}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {filtered[lightbox] && (
            <Image
              src={filtered[lightbox].lightboxSrc}
              alt={filtered[lightbox].title}
              width={1800}
              height={1200}
              sizes="100vw"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
