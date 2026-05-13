import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GALLERY_IMAGES } from "@/lib/gallery-data";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";
import type { Locale } from "@/src/i18n/locale";

type GalleryTeaserSectionProps = {
  locale: Locale;
};

export default async function GalleryTeaserSection({ locale }: GalleryTeaserSectionProps) {
  const t = await getTranslations({ locale, namespace: "gallery" });
  const teaserImages = GALLERY_IMAGES.slice(0, 6).map((image, index) => ({
    src: cloudinaryImageUrl(image.publicId, "teaser"),
    title: t("items.fallbackTitle", { number: index + 1 }),
  }));

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[var(--surface-2)] w-full">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[var(--brand)]" />
            <span className="text-[var(--brand)] text-sm tracking-[0.2em] uppercase font-medium">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {t("titleLine1")}
            <br />
            <span className="text-foreground/50">{t("titleLine2")}</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {teaserImages.map((image, index) => (
            <div key={image.src} className="break-inside-avoid relative rounded-2xl overflow-hidden group">
              <Image
                src={image.src}
                alt={image.title}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  index % 3 === 0 ? "h-[380px]" : index % 3 === 1 ? "h-[300px]" : "h-[340px]"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-base font-medium">{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/gallery`}
            className="px-8 py-4 text-sm font-semibold text-[var(--text-on-inverse)] bg-gradient-to-r from-[var(--brand)] to-[var(--brand-strong)] rounded-full hover:shadow-xl hover:shadow-[var(--brand)]/30 transition-all duration-300 hover:scale-105"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
