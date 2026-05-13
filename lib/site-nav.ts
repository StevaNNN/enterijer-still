/**
 * Canonical site navigation: order, hrefs, and navbar translation keys.
 * Use with `useTranslations("navbar")` or `getTranslations({ locale, namespace: "navbar" })`.
 */
export const SITE_NAV_LABEL_KEYS = [
  "home",
  "about",
  "services",
  "gallery",
  "products",
  "contact",
] as const;

export type SiteNavLabelKey = (typeof SITE_NAV_LABEL_KEYS)[number];

export type SiteNavItemDef = {
  href: string;
  labelKey: SiteNavLabelKey;
};

export const SITE_NAV_ITEMS: readonly SiteNavItemDef[] = [
  { labelKey: "home", href: "#hero" },
  { labelKey: "about", href: "#about" },
  { labelKey: "services", href: "#services" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "products", href: "/products" },
  { labelKey: "contact", href: "#contact" },
];

export type SiteNavLink = {
  label: string;
  href: string;
};

export function getSiteNavLinks(
  tNavbar: (key: SiteNavLabelKey) => string,
): SiteNavLink[] {
  return SITE_NAV_ITEMS.map((item) => ({
    label: tNavbar(item.labelKey),
    href: item.href,
  }));
}
