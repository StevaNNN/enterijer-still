import { ImageResponse } from "next/og";
import { getOgSeoCopy } from "@/lib/og-seo-copy";
import { LOCALES, resolveLocale } from "@/src/i18n/locale";

/** Required when the app uses `output: "export"` (e.g. GitHub Pages). */
export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function OgLogoMark() {
  const gold = "#d4b76a";
  return (
    <div
      style={{
        width: 140,
        height: 140,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="140" height="140" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={gold}
          fillOpacity="0.25"
          d="M6 10c0-1.1.9-2 2-2h24c1.1 0 2 .9 2 2v22c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V10Z"
        />
        <path
          stroke={gold}
          strokeWidth="2"
          strokeLinejoin="round"
          d="M6 14h28M14 14v20M26 14v20"
        />
        <path fill={gold} d="M17 22h6a2 2 0 0 1 2 2v3h-10v-3a2 2 0 0 1 2-2Z" />
      </svg>
    </div>
  );
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const copy = getOgSeoCopy(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 48,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "64px",
        }}
      >
        <OgLogoMark />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 700, color: "#d4b76a" }}>{copy.brandName}</div>
          <div style={{ fontSize: 64, fontWeight: 800, marginTop: 16, lineHeight: 1.1 }}>
            {copy.ogHeadline}
          </div>
          <div style={{ fontSize: 28, marginTop: 20, opacity: 0.88, lineHeight: 1.35 }}>
            {copy.ogSubheadline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
