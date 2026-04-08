import { useEffect, useState } from "react";

const HERO_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/37457908-a453-4aaf-a893-acb4f0f65e9d.png";

export default function HeroSection() {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setOffset(window.scrollY * 0.4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        <img
          src={HERO_IMG}
          alt="Luxury interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/40 to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#C8A45C] to-transparent" />
            <span className="text-[#C8A45C] text-sm tracking-[0.3em] uppercase font-medium">
              EnterijerStil Kragujevac
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight max-w-4xl">
            Uđite u
            <br />
            <span className="bg-gradient-to-r from-[#C8A45C] via-[#D4B76A] to-[#C8A45C] bg-clip-text text-transparent">
              lepši prostor
            </span>
          </h1>

          <p className="mt-6 text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            Kreiramo enterijere koji inspirišu. Više od decenije iskustva u
            dizajnu, renoviranju i opremanju prostora po najvišim standardima.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#C8A45C] to-[#D4B76A] rounded-full hover:shadow-xl hover:shadow-[#C8A45C]/30 transition-all duration-300 hover:scale-105"
            >
              Naše Usluge
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Pogledajte Galeriju
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`absolute bottom-24 left-6 right-6 max-w-7xl transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-wrap gap-8 md:gap-16">
            {[
              { value: "10+", label: "Godina Iskustva" },
              { value: "500+", label: "Završenih Projekata" },
              { value: "100%", label: "Zadovoljnih Klijenata" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[#C8A45C]">
                  {stat.value}
                </span>
                <span className="text-white/50 text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
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
