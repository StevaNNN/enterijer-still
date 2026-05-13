"use client";

import { useActiveSectionHash } from "@/components/providers/active-section-provider";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

type FooterLink = {
  label: string;
  href: string;
};

type FooterNavLinksClientProps = {
  links: FooterLink[];
};

export default function FooterNavLinksClient({ links }: FooterNavLinksClientProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const isHomePage = pathname === `/${locale}`;
  const activeHash = useActiveSectionHash();

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => {
        const active = Boolean(isHomePage && activeHash && activeHash === link.href);
        return (
          <a
            key={link.href}
            href={isHomePage ? link.href : `/${locale}${link.href}`}
            onClick={(event) => {
              if (isHomePage) {
                event.preventDefault();
                smoothScrollTo(link.href);
              }
            }}
            aria-current={active ? "location" : undefined}
            className={cn(
              "pl-3 -ml-3 border-l-2 text-sm transition-colors duration-300",
              active
                ? "border-[var(--brand)] text-[var(--brand)] font-medium"
                : "border-transparent text-foreground/70 dark:text-white/60 hover:text-[var(--brand)]",
            )}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
