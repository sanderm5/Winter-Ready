"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/request";

export default function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();

  // Get the path without the locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname.split("/").filter(Boolean);
    // First segment should be the locale, remove it
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    return segments.join("/");
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <a
          key={loc}
          href={`/${loc}${pathWithoutLocale ? `/${pathWithoutLocale}` : ""}`}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
            currentLocale === loc
              ? "bg-white text-winter-blue"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          onClick={() => {
            localStorage.setItem("preferredLocale", loc);
            document.cookie = `NEXT_LOCALE=${loc};path=/;max-age=31536000;SameSite=Lax;Secure`;
          }}
        >
          {localeFlags[loc]}
        </a>
      ))}
    </div>
  );
}
