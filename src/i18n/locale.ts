// src/i18n/locales.ts
export const LOCALES = ["en", "sr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function resolveLocale(locale: string | undefined): Locale {
  if (locale && LOCALES.includes(locale as Locale)) {
    return locale as Locale;
  }
  return DEFAULT_LOCALE;
}
