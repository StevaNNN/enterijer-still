import { getTranslations } from "next-intl/server";
import GalleryClient from "@/components/client/GalleryClient";
import { GALLERY_IMAGES } from "@/lib/gallery-data";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";
import type { Locale } from "@/src/i18n/locale";

type GallerySectionProps = {
  locale: Locale;
};

export default async function GallerySection({ locale }: GallerySectionProps) {
  const t = await getTranslations({ locale, namespace: "gallery" });
  const categories = [
    { key: "all", label: t("filters.all") },
    { key: "kitchens", label: t("filters.kitchens") },
    { key: "bedrooms", label: t("filters.bedrooms") },
    { key: "bathrooms", label: t("filters.bathrooms") },
    { key: "livingRooms", label: t("filters.livingRooms") },
    { key: "commercial", label: t("filters.commercial") },
  ];
  const images = GALLERY_IMAGES.map((image, index) => ({
    src: cloudinaryImageUrl(image.publicId, "grid"),
    lightboxSrc: cloudinaryImageUrl(image.publicId, "lightbox"),
    title: t("items.fallbackTitle", { number: index + 1 }),
    category: image.category,
  }));
  return (
    <GalleryClient
      headingEyebrow={t("eyebrow")}
      headingLine1={t("titleLine1")}
      headingLine2={t("titleLine2")}
      lightboxCloseLabel={t("lightboxClose")}
      categories={categories}
      images={images}
    />
  );
}
