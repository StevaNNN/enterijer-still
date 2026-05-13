import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import FooterNavLinksClient from "@/components/client/FooterNavLinksClient";
import type { Locale } from "@/src/i18n/locale";
import { BrandGlow } from "@/components/ui/section-decor";
import { getSiteNavLinks } from "@/lib/site-nav";

type FooterProps = {
  locale: Locale;
};

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNavbar = await getTranslations({ locale, namespace: "navbar" });
  const currentYear = new Date().getFullYear();
  const addressQuery = encodeURIComponent(
    "Milovana Vidakovića 4, 34000 Kragujevac, Srbija",
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${addressQuery}`;

  const navLinks = getSiteNavLinks(tNavbar);

  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background dark:bg-[var(--surface-inverse)]">
      <BrandGlow size="lg" intensity="soft" className="-left-32 bottom-0" />
      <BrandGlow size="md" intensity="soft" className="-right-24 top-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent"
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-3 mb-4 group w-fit"
            >
              <Image
                src="/logo-dark.svg"
                alt={tNavbar("logoAlt")}
                width={188}
                height={180}
                unoptimized
                className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 logo-dark-mode"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-foreground dark:text-white font-bold text-lg tracking-wide leading-tight">
                  EnterijerStil
                </span>
                <span className="text-[var(--brand)] text-[10px] tracking-[0.2em] uppercase font-medium">
                  Kragujevac
                </span>
              </div>
            </Link>
            <p className="text-foreground/70 dark:text-white/60 text-sm leading-relaxed max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/enterijerstilkg/?locale=sr_RS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/5 text-foreground/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[var(--brand)]/40 hover:text-[var(--brand)] hover:shadow-lg hover:shadow-[var(--brand)]/20 dark:bg-white/5 dark:text-white/60 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                aria-label={t("social.facebook")}
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
                href="https://www.instagram.com/enterijerstilkg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/5 text-foreground/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[var(--brand)]/40 hover:text-[var(--brand)] hover:shadow-lg hover:shadow-[var(--brand)]/20 dark:bg-white/5 dark:text-white/60 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                aria-label={t("social.instagram")}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Zm5.2-2.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground dark:text-white font-semibold mb-6 text-sm tracking-wide uppercase">
              {t("navigationTitle")}
            </h4>
            <FooterNavLinksClient links={navLinks} />
          </div>

          <div>
            <h4 className="text-foreground dark:text-white font-semibold mb-6 text-sm tracking-wide uppercase">
              {t("contactTitle")}
            </h4>
            <div className="flex flex-col gap-3 text-foreground/70 dark:text-white/60 text-sm">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--brand)] transition-colors"
              >
                {t("address.line1")}
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--brand)] transition-colors"
              >
                {t("address.line2")}
              </a>
              <div className="mt-2 flex gap-3 text-xs">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors"
                >
                  {t("maps.google")}
                </a>
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors"
                >
                  {t("maps.apple")}
                </a>
              </div>
              <a href="tel:+381642490458" className="hover:text-[var(--brand)] transition-colors">
                {t("phones.primary")}
              </a>
              <a href="tel:+381658897203" className="hover:text-[var(--brand)] transition-colors">
                {t("phones.secondary")}
              </a>
              <a
                href="mailto:enterijerstil@gmail.com"
                className="text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors"
              >
                {t("email")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="text-foreground/60 dark:text-white/50 text-sm"
            suppressHydrationWarning
          >
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
