// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { resolveLocale } from "./locale";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale comes from the URL segment (e.g. /sr/... → "sr")
  const requested = await requestLocale;
  const locale = resolveLocale(requested);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
