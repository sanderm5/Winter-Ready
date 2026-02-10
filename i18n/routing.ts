import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['no', 'en', 'de', 'fr', 'es', 'zh'],
  defaultLocale: 'no',
  localePrefix: 'always'
});
