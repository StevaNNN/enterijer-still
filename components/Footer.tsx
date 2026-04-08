"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A45C] to-[#8B6F3A] flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wide leading-tight">
                  EnterijerStil
                </span>
                <span className="text-[#C8A45C] text-[10px] tracking-[0.2em] uppercase font-medium">
                  Kragujevac
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Uđite u lepši prostor sa EnterijerStilom. Dizajn enterijera,
              renoviranje i opremanje prostora po najvišim standardima.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/pages/Enterijer-Stil-Kragujevac/939918732709420"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C8A45C] hover:border-[#C8A45C]/30 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="mailto:enterijerstil@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C8A45C] hover:border-[#C8A45C]/30 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wide uppercase">
              Navigacija
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Početna", href: "#hero" },
                { label: "O Nama", href: "#about" },
                { label: "Naša Delatnost", href: "#services" },
                { label: "Galerija", href: "#gallery" },
                { label: "Kontakt", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/40 hover:text-[#C8A45C] transition-colors duration-300 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wide uppercase">
              Kontakt Informacije
            </h4>
            <div className="flex flex-col gap-3 text-white/40 text-sm">
              <p>Milovana Vidakovića 4</p>
              <p>34000 Kragujevac, Srbija</p>
              <p className="mt-2">064/249-04-58</p>
              <p>065/88-97-203</p>
              <a
                href="mailto:enterijerstil@gmail.com"
                className="text-[#C8A45C] hover:text-[#D4B76A] transition-colors"
              >
                enterijerstil@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {currentYear} EnterijerStil Kragujevac. Sva prava zadržana.
          </p>
          <p className="text-white/20 text-xs">Redesigned with ♥ in 2026</p>
        </div>
      </div>
    </footer>
  );
}
