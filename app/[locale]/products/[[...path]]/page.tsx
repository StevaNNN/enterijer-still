/**
 * Products route — handles the entire `/[locale]/products/*` URL tree
 * via an optional catch-all so we have ONE shape:
 *
 *   /[locale]/products                                  → redirect → /products/all
 *   /[locale]/products/all                              → catalog (no filter)
 *   /[locale]/products/all/<product-slug>               → detail (unfiltered context)
 *   /[locale]/products/<category>/<value>               → catalog filtered
 *   /[locale]/products/<category>/<value>/<product-slug>→ detail (filtered context)
 *
 *   where <category> ∈ { type, material, color, dimensions }
 *
 * The page parses `params.path`, resolves the matching products from the
 * repository (today TS module, future Drizzle/Neon), and renders either
 * the catalog client wrapper or the product detail server view.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { ProductDetail } from "@/components/products/ProductDetail";
import {
  filterProducts,
  getProductBySlug,
} from "@/lib/products-repository";
import {
  FILTER_CATEGORIES,
  getTaxonomyLabel,
  getTaxonomySlugs,
  type FilterCategory,
} from "@/lib/products-taxonomies";
import { buildLocalizedRouteMetadata } from "@/lib/locale-route-metadata";
import { resolveLocale } from "@/src/i18n/locale";
import { cn } from "@/lib/utils";

type RouteParams = {
  locale: string;
  path?: string[];
};

type ResolvedRoute =
  | { kind: "redirect-to-all" }
  | {
      kind: "catalog";
      filter: { category: FilterCategory | "all"; value: string | undefined };
    }
  | {
      kind: "detail";
      filter: { category: FilterCategory | "all"; value: string | undefined };
      productSlug: string;
    }
  | { kind: "not-found" };

function resolvePath(path: string[] | undefined): ResolvedRoute {
  // /[locale]/products → redirect to canonical /all
  if (!path || path.length === 0) return { kind: "redirect-to-all" };

  const [first, second, third, ...rest] = path;
  if (rest.length > 0) return { kind: "not-found" };

  // /[locale]/products/all
  if (first === "all" && !second) {
    return { kind: "catalog", filter: { category: "all", value: undefined } };
  }
  // /[locale]/products/all/<slug>
  if (first === "all" && second && !third) {
    return {
      kind: "detail",
      filter: { category: "all", value: undefined },
      productSlug: second,
    };
  }
  // /[locale]/products/<category>/<value>
  if (
    FILTER_CATEGORIES.includes(first as FilterCategory) &&
    second &&
    !third
  ) {
    return {
      kind: "catalog",
      filter: { category: first as FilterCategory, value: second },
    };
  }
  // /[locale]/products/<category>/<value>/<slug>
  if (
    FILTER_CATEGORIES.includes(first as FilterCategory) &&
    second &&
    third
  ) {
    return {
      kind: "detail",
      filter: { category: first as FilterCategory, value: second },
      productSlug: third,
    };
  }
  return { kind: "not-found" };
}

function filterHrefPrefix(
  locale: string,
  category: FilterCategory | "all",
  value: string | undefined,
): string {
  if (category === "all" || !value) return `/${locale}/products/all`;
  return `/${locale}/products/${category}/${value}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: localeParam, path } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "products" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";

  const resolved = resolvePath(path);

  // Default title/description used unless we have a product detail.
  let title = t("pageTitle");
  let description = t("pageDescription");
  let pathnameSegment = "products";

  if (resolved.kind === "detail") {
    const product = await getProductBySlug(resolved.productSlug);
    if (product) {
      title = `${product.name[locale]} | ${t("pageTitle")}`;
      description = product.shortDescription[locale];
      pathnameSegment = path?.join("/") ?? "products";
    }
  } else if (resolved.kind === "catalog") {
    if (resolved.filter.category !== "all" && resolved.filter.value) {
      const label = getTaxonomyLabel(
        resolved.filter.category,
        resolved.filter.value,
        locale,
      );
      title = `${label} | ${t("pageTitle")}`;
      pathnameSegment = path?.join("/") ?? "products";
    }
  }

  return buildLocalizedRouteMetadata({
    siteUrl,
    locale,
    pathnameSegment,
    title,
    description,
    keywords: t("pageKeywords").split(",").map((item) => item.trim()),
    openGraphTitle: title,
    ogImageAlt: tSeo("ogImageAlt"),
  });
}

/**
 * Pre-render the canonical filter URLs (`/products/all`, plus every known
 * taxonomy value) so they're statically optimized. Detail pages stay
 * dynamic — that keeps build time low when more products are added.
 */
export async function generateStaticParams(): Promise<{ path: string[] }[]> {
  const params: { path: string[] }[] = [{ path: ["all"] }];
  for (const category of FILTER_CATEGORIES) {
    for (const slug of getTaxonomySlugs(category)) {
      params.push({ path: [category, slug] });
    }
  }
  return params;
}

export default async function ProductsCatchAllPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: localeParam, path } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const resolved = resolvePath(path);

  if (resolved.kind === "redirect-to-all") {
    redirect(`/${locale}/products/all`);
  }

  if (resolved.kind === "not-found") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "products" });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";

  // -----------------------------------------------------------------
  // Product detail
  // -----------------------------------------------------------------
  if (resolved.kind === "detail") {
    const product = await getProductBySlug(resolved.productSlug);
    if (!product) {
      // Render a soft 404 within the same shell so navigation back to the
      // catalog is one click away. Avoid throwing notFound() so the user
      // doesn't lose locale context.
      return (
        <main className="flex min-h-screen w-full flex-col bg-background">
          <Navbar />
          <NotFoundView
            locale={locale}
            backHref={filterHrefPrefix(
              locale,
              resolved.filter.category,
              resolved.filter.value,
            )}
            labels={{
              title: t("notFound.title"),
              description: t("notFound.description"),
              back: t("notFound.back"),
            }}
          />
          <Footer locale={locale} />
        </main>
      );
    }

    return (
      <main className="flex min-h-screen w-full flex-col bg-background">
        <Navbar />
        <ProductDetail
          product={product}
          locale={locale}
          backHref={filterHrefPrefix(
            locale,
            resolved.filter.category,
            resolved.filter.value,
          )}
          labels={{
            eyebrow: t("eyebrow"),
            back: t("detail.back"),
            type: t("detail.type"),
            material: t("detail.material"),
            color: t("detail.color"),
            brand: t("detail.brand"),
            dimensions: t("detail.dimensions"),
            width: t("detail.width"),
            height: t("detail.height"),
            depth: t("detail.depth"),
            specsTitle: t("detail.specsTitle"),
            descriptionTitle: t("detail.descriptionTitle"),
          }}
        />
        <Footer locale={locale} />
      </main>
    );
  }

  // -----------------------------------------------------------------
  // Catalog (all or filtered)
  // -----------------------------------------------------------------
  const filter = resolved.filter;
  const products = await filterProducts(filter.category, filter.value);
  const hrefPrefix = filterHrefPrefix(locale, filter.category, filter.value);
  const pageUrl = `${siteUrl}/${locale}${hrefPrefix.slice(locale.length + 1)}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("pageTitle"),
    description: t("pageDescription"),
    url: pageUrl,
    inLanguage: locale === "sr" ? "sr-RS" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "EnterijerStil",
      url: siteUrl,
    },
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <section
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

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 md:mb-14">
            <SectionEyebrow className="mb-6">{t("eyebrow")}</SectionEyebrow>
            <SectionHeading
              as="h1"
              line1={t("titleLine1")}
              line2={t("titleLine2")}
              size="lg"
            />
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/75 dark:text-white/65">
              {t("intro")}
            </p>
          </div>

          <ProductsCatalog
            locale={locale}
            products={products}
            active={
              filter.category === "all"
                ? { category: "all", value: undefined }
                : { category: filter.category, value: filter.value as string }
            }
            filterHrefPrefix={hrefPrefix}
            labels={{
              filterTitle: t("filters.title"),
              filterAll: t("filters.all"),
              filterType: t("filters.type"),
              filterMaterial: t("filters.material"),
              filterColor: t("filters.color"),
              filterDimensions: t("filters.dimensions"),
              filterClear: t("filters.clear"),
              filterClearAll: t("filters.clearAll"),
              searchPlaceholder: t("search.placeholder"),
              searchAriaLabel: t("search.ariaLabel"),
              searchClear: t("search.clear"),
              emptyTitle: t("search.emptyTitle"),
              emptyDescription: t("search.emptyDescription"),
              cardView: t("card.view"),
            }}
          />
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}

function NotFoundView({
  locale,
  backHref,
  labels,
}: {
  locale: string;
  backHref: string;
  labels: { title: string; description: string; back: string };
}) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-1 items-center justify-center overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-inverse)]",
        SECTION_PADDING,
      )}
    >
      <BrandGlow size="md" intensity="soft" className="-right-24 top-12" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <SectionEyebrow className="mb-6">404</SectionEyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-4xl">
          {labels.title}
        </h1>
        <p className="mt-4 text-base text-foreground/65 dark:text-white/65">
          {labels.description}
        </p>
        <Link
          href={backHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand-solid)] px-5 py-2.5 text-sm font-semibold text-[var(--text-on-inverse)] shadow-md shadow-[var(--brand-solid)]/25 transition-all duration-300 hover:bg-[var(--brand-solid-hover)]"
        >
          {labels.back}
        </Link>
        {/* `locale` ref keeps Next.js eslint happy that the prop is used */}
        <span className="sr-only" data-locale={locale} />
      </div>
    </section>
  );
}
