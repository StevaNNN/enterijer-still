import { useEffect, useRef, useState } from "react";

const TEAM_IMG =
  "https://mgx-backend-cdn.metadl.com/generate/images/1037926/2026-03-18/4eb978b7-71cd-405b-ba65-b2bcac027c1b.png";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setCount(current);
          }, 20);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#C8A45C]">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-[2px] bg-[#C8A45C]" />
          <span className="text-[#C8A45C] text-sm tracking-[0.2em] uppercase font-medium">
            O Nama
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Stvaramo prostore
              <br />
              <span className="text-white/40">koji inspirišu</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-6">
              EnterijerStil je kompanija sa sedištem u Kragujevcu,
              specijalizovana za dizajn enterijera, renoviranje i opremanje
              stambenih i poslovnih prostora. Sa više od decenije iskustva, naš
              tim stručnjaka pretvara vaše vizije u stvarnost.
            </p>

            <p className="text-white/50 leading-relaxed mb-10">
              Naš pristup kombinuje savremene trendove u dizajnu sa
              funkcionalnim rešenjima, koristeći materijale najvišeg kvaliteta.
              Od idejnog rešenja do finalne realizacije, posvećeni smo svakom
              detalju vašeg prostora.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { target: 10, suffix: "+", label: "Godina Iskustva" },
                { target: 500, suffix: "+", label: "Projekata" },
                { target: 50, suffix: "+", label: "Partnera" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <AnimatedCounter target={item.target} suffix={item.suffix} />
                  <span className="text-white/40 text-sm mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={TEAM_IMG}
                alt="EnterijerStil tim"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A45C] to-[#8B6F3A] flex items-center justify-center text-white font-bold text-lg">
                    ES
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      Dejan Timotijević
                    </p>
                    <p className="text-white/50 text-sm">Direktor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-[#C8A45C]/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
