import { MetadataRoute } from "next";

/** Required when the app uses `output: "export"` (e.g. GitHub Pages). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enterijerstil.rs";

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
