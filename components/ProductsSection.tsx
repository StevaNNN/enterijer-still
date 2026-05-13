import { getTranslations } from "next-intl/server";
import type { Locale } from "@/src/i18n/locale";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_CARD_LIGHT,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

type ProductsSectionProps = {
  locale: Locale;
};

export default async function ProductsSection({ locale }: ProductsSectionProps) {
  const t = await getTranslations({ locale, namespace: "products" });
  const items = ["item1", "item2", "item3", "item4"] as const;

  return (
    <section
      aria-labelledby="products-heading"
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface-2)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow size="lg" className="-left-24 top-0" animated />
      <BrandGlow
        size="md"
        intensity="soft"
        className="right-0 bottom-0 translate-y-1/3"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <SectionEyebrow className="mb-6">{t("eyebrow")}</SectionEyebrow>
          <SectionHeading
            id="products-heading"
            as="h1"
            line1={t("titleLine1")}
            line2={t("titleLine2")}
            size="lg"
          />
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/75 dark:text-white/65">
            {t("intro")}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((key) => (
            <li
              key={key}
              className={cn(
                SECTION_CARD_LIGHT,
                "group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] md:p-8 dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]",
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[var(--brand)]/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <h2 className="relative text-xl font-semibold text-foreground dark:text-white md:text-2xl">
                {t(`items.${key}.title`)}
              </h2>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground/70 dark:text-white/60 md:text-base">
                {t(`items.${key}.description`)}
              </p>
              <span
                aria-hidden
                className="relative mt-6 block h-[2px] w-12 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/55 to-transparent transition-all duration-500 group-hover:w-24"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
