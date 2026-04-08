import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A0A0A]"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C8A45C]/5 rounded-full blur-[200px]" />

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
              Kontakt
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Javite nam se
            <br />
            <span className="text-white/40">slobodno</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/50 text-sm mb-2 font-medium">
                    Vaše Ime *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#C8A45C]/50 focus:bg-white/[0.07] transition-all duration-300"
                    placeholder="Ime i prezime"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-sm mb-2 font-medium">
                    Vaš Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#C8A45C]/50 focus:bg-white/[0.07] transition-all duration-300"
                    placeholder="email@primer.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">
                  Naslov
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#C8A45C]/50 focus:bg-white/[0.07] transition-all duration-300"
                  placeholder="Tema poruke"
                />
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">
                  Poruka
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#C8A45C]/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                  placeholder="Opišite vaš projekat ili pitanje..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#C8A45C] to-[#D4B76A] rounded-full hover:shadow-xl hover:shadow-[#C8A45C]/30 transition-all duration-300 hover:scale-105"
              >
                {submitted ? "✓ Poruka Poslata!" : "Pošaljite Poruku"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C8A45C]/20 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A45C]/10 flex items-center justify-center text-[#C8A45C] flex-shrink-0 group-hover:bg-[#C8A45C]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Telefon</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      064/249-04-58 — Dejan Timotijević, direktor
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      065/88-97-203 — Goran Sentić, zamenik direktora
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      065/88-97-201 · 034/355-198 — Informacije
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C8A45C]/20 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A45C]/10 flex items-center justify-center text-[#C8A45C] flex-shrink-0 group-hover:bg-[#C8A45C]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Email</h4>
                    <a
                      href="mailto:enterijerstil@gmail.com"
                      className="text-[#C8A45C] hover:text-[#D4B76A] transition-colors text-sm"
                    >
                      enterijerstil@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C8A45C]/20 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A45C]/10 flex items-center justify-center text-[#C8A45C] flex-shrink-0 group-hover:bg-[#C8A45C]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Adresa</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Milovana Vidakovića 4
                      <br />
                      34000 Kragujevac, Srbija
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[200px]">
                <iframe
                  title="EnterijerStil lokacija"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.5!2d20.9167!3d44.0128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDAwJzQ2LjEiTiAyMMKwNTUnMDAuMSJF!5e0!3m2!1sen!2srs!4v1!5m2!1sen!2srs"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter:
                      "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
