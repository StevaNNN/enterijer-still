import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/locale";
import type { Product } from "@/lib/products-data";
import { getProductThumbnailUrl } from "@/lib/products-thumbnail";
import { SECTION_CARD_LIGHT } from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  /**
   * URL prefix preserving the user's filter context — e.g.
   * `/sr/products/all` or `/sr/products/type/rigips-ploca`. The
   * product slug is appended to this prefix when generating the link.
   */
  filterHrefPrefix: string;
  viewLabel: string;
};

export function ProductCard({
  product,
  locale,
  filterHrefPrefix,
  viewLabel,
}: ProductCardProps) {
  const href = `${filterHrefPrefix}/${product.slug}`;
  const name = product.name[locale];
  const description = product.shortDescription[locale];
  const thumbnailUrl = getProductThumbnailUrl(product);

  return (
    <Link
      href={href}
      aria-label={`${name} — ${viewLabel}`}
      className={cn(
        SECTION_CARD_LIGHT,
        "group/card relative flex h-full flex-col overflow-hidden",
        "transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand)]/45 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-2)] dark:bg-white/[0.04]">
        <Image
          src={thumbnailUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
        />

        {/* Soft brand-color sheen on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--brand)]/0 via-[var(--brand)]/0 to-[var(--brand)]/0 opacity-0 transition-opacity duration-500 group-hover/card:from-[var(--brand)]/10 group-hover/card:opacity-100"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground dark:text-white md:text-xl">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-foreground/65 dark:text-white/60">
          {description}
        </p>
        <span
          aria-hidden
          className="mt-auto inline-flex h-[2px] w-12 rounded-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/55 to-transparent transition-all duration-500 group-hover/card:w-24"
        />
      </div>
    </Link>
  );
}
