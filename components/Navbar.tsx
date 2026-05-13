"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useActiveSectionHash } from "@/components/providers/active-section-provider";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { getSiteNavLinks } from "@/lib/site-nav";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeHash = useActiveSectionHash();

  const navLinks = getSiteNavLinks(t);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === `/${locale}`;
  const isMarketingInnerPage =
    pathname === `/${locale}/gallery` || pathname === `/${locale}/products`;
  /** Frosted top bar at rest (hero, gallery, products): tall bar + ring offset for contact CTA until scrolled or mobile menu open. */
  const useHeroNavContrast =
    (isHomePage || isMarketingInnerPage) && !scrolled && !mobileOpen;
  const resolveNavHref = (href: string) => {
    if (href.startsWith("/")) return `/${locale}${href}`;
    if (isHomePage) return href;
    return `/${locale}${href}`;
  };
  const isSectionActive = (href: string) =>
    Boolean(isHomePage && href.startsWith("#") && activeHash && activeHash === href);
  const isNavLinkActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === `/${locale}${href}`;
    }
    return isSectionActive(href);
  };
  const contactInView = isSectionActive("#contact");
  const toLocalizedHash = (hash: string) => `/${locale}${hash}`;
  const getLocaleHref = (nextLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${nextLocale}`;
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileOpen(false);
    if (href.startsWith("#") && isHomePage) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };
  const navTextClass = "text-foreground hover:text-foreground";
  const hamburgerBarClass = "bg-foreground";
  const iconButtonClass =
    "rounded-full border border-border p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-300";
  const nextThemeLabel =
    resolvedTheme === "dark" ? t("lightMode") : t("darkMode");
  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  /* Fixed neutral tint + inset edge so the panel stays visible on white sections; blur still reads over photos */
  const mobileMenuGlass =
    "border-b border-black/[0.12] bg-neutral-200/60 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:border-white/12 dark:bg-neutral-950/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.07)] supports-[backdrop-filter]:bg-neutral-200/48 supports-[backdrop-filter]:dark:bg-neutral-950/42";

  /**
   * Frosted bar over the hero (WCAG-friendly pattern: tint + blur, not text alone on photo).
   * Keeps dark `foreground` nav copy readable on both light and dark areas of the image.
   */
  const heroTopBarGlass =
    "border-b border-black/[0.06] bg-white/82 shadow-[0_8px_30px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-neutral-950/78 dark:shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] supports-[backdrop-filter]:bg-white/40 supports-[backdrop-filter]:dark:bg-neutral-950/72";

  /** Scrolled / inner pages: same glass language as the hero bar so light mode stays luminous, not a flat white strip. */
  const scrolledNavGlass =
    "border-b border-black/[0.08] bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.06)] supports-[backdrop-filter]:bg-white/82 supports-[backdrop-filter]:dark:bg-neutral-950/72";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500",
        mobileOpen &&
          cn(
            mobileMenuGlass,
            "shadow-2xl shadow-black/10 dark:shadow-black/20",
            scrolled && "py-3",
            !scrolled && "py-6",
          ),
        !mobileOpen && scrolled && cn(scrolledNavGlass, "py-3"),
        !mobileOpen &&
          !scrolled &&
          useHeroNavContrast &&
          cn(heroTopBarGlass, "py-5"),
        !mobileOpen &&
          !scrolled &&
          !useHeroNavContrast &&
          cn(scrolledNavGlass, "py-3"),
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href={isHomePage ? "#hero" : toLocalizedHash("#hero")}
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center group shrink-0"
        >
          <Image
            src="/logo-dark.svg"
            alt={t("logoAlt")}
            width={188}
            height={180}
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm dark:hidden"
            priority
            unoptimized
          />
          <Image
            src="/logo.svg"
            alt=""
            width={188}
            height={180}
            aria-hidden
            className="hidden h-10 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm dark:block"
            priority
            unoptimized
          />
        </a>

        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isNavLinkActive(link.href);
            return (
              <a
                key={link.href}
                href={resolveNavHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 group",
                  active && "text-foreground",
                  !active && navTextClass,
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent transition-all duration-300",
                    active && "w-full",
                    !active && "w-0 group-hover:w-full",
                  )}
                />
              </a>
            );
          })}
          <a
            href={getLocaleHref(locale === "en" ? "sr" : "en")}
            className={cn(
              "ml-2 px-3 py-2 text-sm rounded-full transition-all duration-300",
              iconButtonClass,
            )}
          >
            {locale === "en" ? "SR" : "EN"}
          </a>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleThemeToggle}
                className={iconButtonClass}
                aria-label={`${t("theme")}: ${nextThemeLabel}`}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>{nextThemeLabel}</TooltipContent>
          </Tooltip>
          <a
            href={isHomePage ? "#contact" : toLocalizedHash("#contact")}
            onClick={(e) => handleNavClick(e, "#contact")}
            aria-current={contactInView ? "location" : undefined}
            className={cn(
              "ml-1 px-4 lg:px-5 py-2 text-sm font-semibold text-[var(--text-on-inverse)] bg-[var(--brand-solid)] rounded-full hover:bg-[var(--brand-solid-hover)] hover:shadow-lg hover:shadow-[var(--brand-solid)]/25 transition-all duration-300 hover:scale-105 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
              contactInView &&
                cn(
                  "ring-2 ring-[var(--brand)]/50 ring-offset-2 shadow-lg shadow-[var(--brand)]/35",
                  useHeroNavContrast &&
                    "ring-offset-white dark:ring-offset-neutral-950",
                  !useHeroNavContrast &&
                    "ring-offset-[var(--surface)] dark:ring-offset-[var(--surface-inverse)]",
                ),
            )}
          >
            {t("cta")}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={t("toggleMenu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={cn(
              "w-6 h-0.5 transition-all duration-300",
              hamburgerBarClass,
              mobileOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 transition-all duration-300",
              hamburgerBarClass,
              mobileOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 transition-all duration-300",
              hamburgerBarClass,
              mobileOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden w-full overflow-hidden transition-all duration-500",
          mobileOpen && "max-h-[30rem]",
          !mobileOpen && "max-h-0",
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = isNavLinkActive(link.href);
            return (
              <a
                key={link.href}
                href={resolveNavHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium border-l-2",
                  active &&
                    "border-[var(--brand)] bg-[var(--brand)]/10 text-foreground",
                  !active &&
                    "border-transparent text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                )}
              >
                {link.label}
              </a>
            );
          })}
          <div className="flex gap-2 pt-2">
            <a
              href={getLocaleHref(locale === "en" ? "sr" : "en")}
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
                  aria-label={`${t("theme")}: ${nextThemeLabel}`}
                >
                  {resolvedTheme === "dark" ? (
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
