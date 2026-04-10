"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { setTheme, resolvedTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("home"), href: "#hero" },
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("gallery"), href: "#gallery" },
    { label: t("contact"), href: "#contact" },
  ];

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
  const navTextClass = scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white";
  const logoTextClass = scrolled ? "text-foreground" : "text-white";
  const iconButtonClass = scrolled
    ? "rounded-full border border-border p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
    : "rounded-full border border-white/20 p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300";
  const nextThemeLabel = !isClient
    ? t("theme")
    : resolvedTheme === "dark"
      ? t("lightMode")
      : t("darkMode");
  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-xl shadow-2xl shadow-black/10 py-3 border-b border-black/5 dark:border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">
            E
          </div>
          <div className="flex flex-col">
            <span className={`${logoTextClass} font-bold text-lg tracking-wide leading-tight`}>
              EnterijerStil
            </span>
            <span className="text-[var(--brand)] text-[10px] tracking-[0.2em] uppercase font-medium">
              Kragujevac
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 group ${navTextClass}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href={locale === "en" ? "/sr" : "/en"}
            className={`ml-2 px-3 py-2 text-sm rounded-full transition-all duration-300 ${iconButtonClass}`}
          >
            {locale === "en" ? "SR" : "EN"}
          </a>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleThemeToggle}
                className={iconButtonClass}
                aria-label={nextThemeLabel}
              >
                {!isClient ? (
                  <Moon className="h-4 w-4" />
                ) : resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>{nextThemeLabel}</TooltipContent>
          </Tooltip>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="ml-1 px-4 lg:px-5 py-2 text-sm font-semibold text-[var(--text-on-inverse)] bg-gradient-to-r from-[var(--brand)] to-[var(--brand-strong)] rounded-full hover:shadow-lg hover:shadow-[var(--brand)]/25 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            {t("cta")}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={t("toggleMenu")}
        >
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[var(--surface)]/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-[30rem] border-b border-border" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-300 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <a
              href={locale === "en" ? "/sr" : "/en"}
              className="px-4 py-2 text-sm rounded-full border border-border text-foreground/80"
            >
              {locale === "en" ? "SR" : "EN"}
            </a>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="px-3 py-2 text-sm rounded-full border border-border text-foreground/80"
                  aria-label={nextThemeLabel}
                >
                  {!isClient ? (
                    <Moon className="h-4 w-4" />
                  ) : resolvedTheme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>{nextThemeLabel}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
}
