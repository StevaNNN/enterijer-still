"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/fcd05b14-315a-40a0-8116-6450b87c36ea.png",
    title: "Moderna Kuhinja",
    category: "Kuhinje",
  },
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/b698fd9c-c3d7-4d9b-879c-e4b8b257c57b.png",
    title: "Luksuzna Spavaća Soba",
    category: "Spavaće Sobe",
  },
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/087bea59-9f49-4978-9a4f-055e5f1f2718.png",
    title: "Spa Kupatilo",
    category: "Kupatila",
  },
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/65baaef4-16eb-44c3-823a-3cf182b278ff.png",
    title: "Dnevni Boravak",
    category: "Dnevne Sobe",
  },
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/ef8cfd67-eb5d-4b8d-8c31-3f1d990bfef5.png",
    title: "Hotel Lobby",
    category: "Komercijalni",
  },
  {
    src: "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/acd1ad20-3070-4aff-a722-a446a8932e23.png",
    title: "Poslovni Prostor",
    category: "Komercijalni",
  },
];

const categories = [
  "Sve",
  "Kuhinje",
  "Spavaće Sobe",
  "Kupatila",
  "Dnevne Sobe",
  "Komercijalni",
];

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Sve");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeFilter === "Sve"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0F0F0F] w-full"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C8A45C]" />
            <span className="text-[#C8A45C] text-sm tracking-[0.2em] uppercase font-medium">
              Galerija
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Naši
            <br />
            <span className="text-white/40">projekti</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#C8A45C] text-[#0A0A0A]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transitionDelay: `${i * 100 + 300}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
              }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  i % 3 === 0
                    ? "h-[400px]"
                    : i % 3 === 1
                      ? "h-[300px]"
                      : "h-[350px]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-semibold text-lg">{img.title}</p>
                <p className="text-[#C8A45C] text-sm">{img.category}</p>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.title}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-semibold text-xl">
              {filtered[lightbox]?.title}
            </p>
            <p className="text-[#C8A45C] text-sm mt-1">
              {filtered[lightbox]?.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
