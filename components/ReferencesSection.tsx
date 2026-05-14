import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/src/i18n/locale";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";
import {
  REFERENCE_CLIENTS,
  REFERENCE_PARTNERS,
  type ReferenceItem,
} from "@/lib/references-data";
import AnimatedCounter from "@/components/client/AnimatedCounter";

type ReferencesSectionProps = {
  locale: Locale;
};

/**
 * Section anatomy mirrors the rest of the marketing site (eyebrow,
 * SectionHeading, lead paragraph, BrandGlow atmosphere, SECTION_PADDING
 * rhythm).
 *
 * Content:
 *  - One continuous infinite marquee of REFERENCE_CLIENTS — each chip
 *    shows the client's logo image and name. The marquee never pauses
 *    (per current product direction: no hover/click interactions).
 *  - Two synchronized animated counters underneath: partners count and
 *    clients count, both completing on the same shared timeline.
 *
 * Marquee technique: items are rendered twice inside a flex track that
 * translates by -50% over `--marquee-duration`, producing a seamless
 * loop. The duplicate set carries `aria-hidden` so screen readers see
 * each item exactly once.
 */
export default async function ReferencesSection({
  locale,
}: ReferencesSectionProps) {
  const t = await getTranslations({ locale, namespace: "references" });

  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow
        size="lg"
        className="-left-40 top-12 -translate-y-1/4"
        animated
      />
      <BrandGlow size="md" intensity="soft" className="-right-32 bottom-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <SectionHeading
            id="references-heading"
            line1={t("titleLine1")}
            line2={t("titleLine2")}
          />
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg lg:max-w-md lg:justify-self-end lg:text-right">
            {t("intro")}
          </p>
        </div>

        {/* Single continuous marquee — clients. No interactive pause. */}
        <div
          role="list"
          aria-label={t("clientsLabel")}
          className={cn(
            "relative mt-14 flex overflow-hidden",
            "[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]",
            "[-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]",
          )}
          style={
            { "--marquee-duration": "80s" } as React.CSSProperties
          }
        >
          <div className="flex shrink-0 gap-4 pr-4 animate-marquee">
            {REFERENCE_CLIENTS.map((item, index) => (
              <ReferenceChip key={`${item.name}-a-${index}`} item={item} />
            ))}
            {REFERENCE_CLIENTS.map((item, index) => (
              <ReferenceChip
                key={`${item.name}-b-${index}`}
                item={item}
                ariaHidden
              />
            ))}
          </div>
        </div>

        {/* Synchronized counters — both complete on the same timeline. */}
        <div className="mt-16 md:mt-20">
          <AnimatedCounter
            items={[
              { value: REFERENCE_PARTNERS.length, label: t("partnersLabel") },
              { value: REFERENCE_CLIENTS.length, label: t("clientsLabel") },
            ]}
            durationMs={2200}
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * ReferenceChip — logo image + name in a rounded glass pill.
 *
 * Falls back to the brand-color dot mark (SectionEyebrow vocabulary)
 * when `logo` is empty, so future entries without an asset still render
 * cleanly. Image height is capped so chips share a consistent baseline.
 * --------------------------------------------------------- */
function ReferenceChip({
  item,
  ariaHidden,
}: {
  item: ReferenceItem;
  ariaHidden?: boolean;
}) {
  return (
    <div
      role="listitem"
      aria-hidden={ariaHidden}
      className={cn(
        "inline-flex shrink-0 items-center gap-3 rounded-full border border-border bg-card pl-2 pr-5 py-2 transition-colors duration-300",
        "shadow-[0_4px_18px_-10px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "dark:bg-white/[0.04] dark:border-white/10",
        "dark:shadow-[0_4px_18px_-10px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
      )}
    >
      {item.logo ? (
        <span
          className={cn(
            "inline-flex h-9 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white px-1.5 ring-1 ring-black/[0.04]",
            "dark:bg-white dark:ring-white/10",
          )}
        >
          <Image
            src={item.logo}
            alt=""
            width={56}
            height={36}
            aria-hidden
            className="h-7 w-auto max-w-[3rem] object-contain"
            unoptimized
          />
        </span>
      ) : (
        <span
          className="ml-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]"
          aria-hidden
        />
      )}
      <span className="whitespace-nowrap text-sm font-medium text-foreground/85">
        {item.name}
      </span>
    </div>
  );
}
