"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Početna", href: "#hero" },
  { label: "O Nama", href: "#about" },
  { label: "Delatnost", href: "#services" },
  { label: "Galerija", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl shadow-2xl shadow-black/30 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A45C] to-[#8B6F3A] flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">
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
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="ml-4 px-5 py-2 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#C8A45C] to-[#D4B76A] rounded-full hover:shadow-lg hover:shadow-[#C8A45C]/25 transition-all duration-300 hover:scale-105"
          >
            Kontaktirajte Nas
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-96 border-b border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
