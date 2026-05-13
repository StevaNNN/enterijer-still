import { getTranslations } from "next-intl/server";
import type { Locale } from "@/src/i18n/locale";

type ProductsSectionProps = {
  locale: Locale;
};

export default async function ProductsSection({ locale }: ProductsSectionProps) {
  const t = await getTranslations({ locale, namespace: "products" });
  const items = ["item1", "item2", "item3", "item4"] as const;

  return (
    <section
      aria-labelledby="products-heading"
      className="relative py-24 md:py-32 bg-[var(--surface-2)] dark:bg-[var(--surface-inverse)] w-full"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--brand)]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[var(--brand)]" />
            <span className="text-[var(--brand)] text-sm tracking-[0.2em] uppercase font-medium">
              {t("eyebrow")}
            </span>
          </div>
          <h1
            id="products-heading"
            className="text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight"
          >
            {t("titleLine1")}
            <br />
            <span className="text-foreground/50 dark:text-white/45">{t("titleLine2")}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-foreground/75 dark:text-white/65 text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((key) => (
            <li
              key={key}
              className="rounded-2xl border border-border bg-background/80 dark:bg-white/[0.04] p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-foreground dark:text-white">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm md:text-base text-foreground/70 dark:text-white/60 leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
