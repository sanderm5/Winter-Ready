import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-winter-blue/70 to-slate-900/90" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-xl text-ice-blue mb-8">{t("subtitle")}</p>
          <div className="inline-block bg-warning-orange/20 border border-warning-orange rounded-lg px-4 py-2 text-warning-orange">
            {t("b2bBadge")}
          </div>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {t("compliance.title")}
            </h3>
            <p className="text-ice-blue text-sm">{t("compliance.description")}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t("adaptive.title")}</h3>
            <p className="text-ice-blue text-sm">{t("adaptive.description")}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t("realtime.title")}</h3>
            <p className="text-ice-blue text-sm">{t("realtime.description")}</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-winter-blue mb-4">
            {t("demo.title")}
          </h2>
          <p className="text-gray-600 mb-6">{t("demo.description")}</p>
          <Link
            href="/demo"
            className="inline-block bg-winter-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-winter-blue/90 transition"
          >
            {t("demo.button")}
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-ice-blue/60 text-sm">
          <p>{t("footer")}</p>
        </footer>
      </div>
    </main>
  );
}
