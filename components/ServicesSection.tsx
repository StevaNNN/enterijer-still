import { useEffect, useRef, useState } from "react";

const KITCHEN_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/fcd05b14-315a-40a0-8116-6450b87c36ea.png";
const BEDROOM_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/b698fd9c-c3d7-4d9b-879c-e4b8b257c57b.png";
const OFFICE_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/acd1ad20-3070-4aff-a722-a446a8932e23.png";
const BATHROOM_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/087bea59-9f49-4978-9a4f-055e5f1f2718.png";

const services = [
  {
    title: "Dizajn Enterijera",
    description:
      "Kompletno idejno rešenje i projektovanje enterijera stambenih i poslovnih prostora. 3D vizualizacija i detaljna razrada svakog elementa.",
    image: KITCHEN_IMG,
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
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Renoviranje",
    description:
      "Kompletna rekonstrukcija i adaptacija prostora. Od rušenja do finalnih radova.",
    image: BEDROOM_IMG,
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
    span: "lg:col-span-1",
  },
  {
    title: "Poslovni Prostori",
    description:
      "Projektovanje i opremanje kancelarija, restorana, hotela i drugih komercijalnih objekata.",
    image: OFFICE_IMG,
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
    span: "lg:col-span-1",
  },
  {
    title: "Kupatila & Wellness",
    description:
      "Luksuzna kupatila i spa zone sa premium materijalima i modernim dizajnom.",
    image: BATHROOM_IMG,
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
    span: "lg:col-span-2",
  },
];

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C8A45C]" />
            <span className="text-[#C8A45C] text-sm tracking-[0.2em] uppercase font-medium">
              Naša Delatnost
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Usluge koje
            <br />
            <span className="text-white/40">pružamo</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer ${service.span} transition-all duration-700`}
              style={{
                transitionDelay: `${i * 100 + 200}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end min-h-[280px] lg:min-h-[320px]">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#C8A45C] mb-4 transition-all duration-300 group-hover:bg-[#C8A45C]/20 group-hover:border-[#C8A45C]/30">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md group-hover:text-white/70 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
