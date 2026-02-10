"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getCompanyBranding } from "@/lib/company-config";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function CompanyLanding() {
  const params = useParams();
  const company = params.company as string;
  const t = useTranslations("companyLanding");
  const tCommon = useTranslations("common");
  const branding = getCompanyBranding(company);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-4 px-6" style={{ backgroundColor: branding.color }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-white">{branding.name}</span>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="text-white/80 text-sm hidden sm:inline">
              {tCommon("poweredBy")}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Welcome message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-frost mb-4">
            {t("tourismWelcomeTitle")}
          </h1>
          <p className="text-xl text-glacier">
            {t("tourismWelcomeSubtitle")}
          </p>
        </div>

        {/* Info cards */}
        <div className="space-y-4 mb-12">
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-northern-lights/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-frost">
                {t("arcticConditions.title")}
              </h3>
              <p className="text-glacier/80 text-sm">
                {t("arcticConditions.description")}
              </p>
            </div>
          </div>
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-aurora-teal/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-aurora-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-frost">
                {t("safetyBriefing.title")}
              </h3>
              <p className="text-glacier/80 text-sm">
                {t("safetyBriefing.description")}
              </p>
            </div>
          </div>
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-aurora-green/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-aurora-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-frost">
                {t("liveConditions.title")}
              </h3>
              <p className="text-glacier/80 text-sm">
                {t("liveConditions.description")}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${company}/assessment`}
            className="inline-block bg-gradient-to-r from-northern-lights to-glacier text-polar-night px-10 py-4 rounded-xl font-semibold text-lg hover:from-glacier hover:to-aurora-teal transition-all shadow-lg shadow-northern-lights/20"
          >
            {t("startBriefing")}
          </Link>
          <p className="mt-4 text-glacier/60 text-sm">{t("timeTakes")}</p>
        </div>
      </div>
    </main>
  );
}
