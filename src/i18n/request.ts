import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'it', 'yo'];

export default getRequestConfig(async () => {
  // Read locale from cookie if present, otherwise default to 'en'
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale = SUPPORTED_LOCALES.includes(cookieLocale || '')
    ? (cookieLocale as string)
    : 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
