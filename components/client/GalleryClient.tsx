"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryCategory } from "@/lib/gallery-data";

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
      className="relative py-24 md:py-32 bg-[var(--surface-2)] dark:bg-[var(--surface-2)] w-full"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[var(--brand)]" />
            <span className="text-[var(--brand)] text-sm tracking-[0.2em] uppercase font-medium">
              {headingEyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {headingLine1}
            <br />
            <span className="text-foreground/50">{headingLine2}</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              aria-pressed={activeFilter === category.key}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.key
                  ? "bg-[var(--brand)] text-[var(--text-on-inverse)]"
                  : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border border-border"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((image, index) => (
            <div
              key={image.src}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  index % 3 === 0
                    ? "h-[400px]"
                    : index % 3 === 1
                      ? "h-[300px]"
                      : "h-[350px]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-semibold text-lg">{image.title}</p>
                <p className="text-[var(--brand)] text-sm">
                  {categories.find((category) => category.key === image.category)?.label}
                </p>
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
