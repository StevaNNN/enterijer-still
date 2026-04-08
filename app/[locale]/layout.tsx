// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LOCALES, resolveLocale } from "@/src/i18n/locale";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = "";

  const titles = {
    sr: "Sajt",
    en: "Site",
  };

  const descriptions = {
    sr: "Kreiramo savremene web i mobilne aplikacije fokusirane na performanse, pristupačnost i korisničko iskustvo. IT Konsalting, Web Razvoj, A11y Auditi.",
    en: "We create modern web and mobile applications focused on performance, accessibility, and user experience. IT Consulting, Web Development, A11y Audits.",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    keywords: [],
    authors: [{ name: "" }],
    creator: "",
    publisher: "",
    openGraph: {
      type: "website",
      locale: locale,
      url: `${siteUrl}/${locale}`,
      siteName: "",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
