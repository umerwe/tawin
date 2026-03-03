import { getRequestConfig } from 'next-intl/server';
import { routing } from "./routing"
export default getRequestConfig(async ({ requestLocale }) => {

  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  console.log({ localeHere: locale })
  console.log({ messagePath: `../messages/${locale || 'en'}.json` })
  return {
    locale: locale || 'en',
    messages: (await import(`../messages/${locale || 'en'}.json`)).default
  };
});