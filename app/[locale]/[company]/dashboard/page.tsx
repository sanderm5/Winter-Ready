"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { destinations, Destination } from "@/lib/yr-api";
import { getStatusColor, getStatusIcon } from "@/lib/svv-api";
import { getCompanyBranding } from "@/lib/company-config";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";
import AuroraForecastCard from "@/components/AuroraForecast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSafetyData, OverallSafety } from "@/hooks/useSafetyData";

const safetyIcons: Record<OverallSafety, JSX.Element> = {
  safe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  caution: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const safetyColorMap: Record<OverallSafety, { color: string; border: string; text: string }> = {
  safe: { color: "bg-safe-green", border: "border-safe-green/40", text: "text-safe-green" },
  caution: { color: "bg-warning-orange", border: "border-warning-orange/40", text: "text-warning-orange" },
  warning: { color: "bg-danger-red", border: "border-danger-red/40", text: "text-danger-red" },
};

function SkeletonCard() {
  return (
    <div className="bg-polar-night-light/60 backdrop-blur-md border border-glacier/10 rounded-2xl shadow-xl shadow-black/20 p-6 animate-pulse">
      <div className="h-5 bg-glacier/15 rounded-lg w-2/5 mb-5" />
      <div className="h-20 bg-glacier/10 rounded-xl w-24 mx-auto mb-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-14 bg-glacier/10 rounded-xl" />
        <div className="h-14 bg-glacier/10 rounded-xl" />
      </div>
    </div>
  );
}

function SkeletonRoads() {
  return (
    <div className="bg-polar-night-light/60 backdrop-blur-md border border-glacier/10 rounded-2xl shadow-xl shadow-black/20 overflow-hidden animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`p-4 flex items-center gap-4 ${i !== 1 ? "border-t border-glacier/10" : ""}`}>
          <div className="w-10 h-10 rounded-xl bg-glacier/15 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-glacier/15 rounded w-1/3" />
            <div className="h-3 bg-glacier/10 rounded w-2/3" />
          </div>
          <div className="h-6 w-16 bg-glacier/15 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function Card({ children, className = "" }: { readonly children: React.ReactNode; readonly className?: string }) {
  return (
    <div className={`bg-polar-night-light/60 backdrop-blur-md border border-glacier/15 rounded-2xl shadow-xl shadow-black/20 p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon, title, badge }: { readonly icon: React.ReactNode; readonly title: string; readonly badge?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-frost flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {badge}
    </div>
  );
}

export default function DashboardPage() {
  const params = useParams();
  const company = params.company as string;
  const branding = getCompanyBranding(company);

  const t = useTranslations("dashboard");
  const tDest = useTranslations("destinations");

  const defaultDest = branding.primaryDestination || destinations[0];
  const [selectedDestination, setSelectedDestination] = useState<Destination>(defaultDest);

  useEffect(() => {
    const storedDest = sessionStorage.getItem("selectedDestination");
    if (storedDest) {
      try {
        setSelectedDestination(JSON.parse(storedDest) as Destination);
      } catch { /* ignore */ }
    }
  }, []);

  const {
    weather,
    aurora,
    avalanche,
    ocean,
    roads,
    loading,
    refreshing,
    showAurora,
    showOcean,
    overallSafety,
    refetch,
  } = useSafetyData(selectedDestination);

  const riskBadgeColor = {
    low: "bg-safe-green/90",
    medium: "bg-warning-orange/90",
    high: "bg-danger-red/90",
  }[weather?.riskLevel || "low"];

  const getLocalizedDestination = (name: string) => {
    const key = name.toLowerCase().replace(/ø/g, "o").replace(/å/g, "a");
    try {
      return tDest(key as keyof typeof tDest);
    } catch {
      return name;
    }
  };

  const style = safetyColorMap[overallSafety];

  return (
    <main className="min-h-screen">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-polar-night/70 backdrop-blur-xl border-b border-glacier/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-green to-aurora-teal flex items-center justify-center">
              <svg className="w-4 h-4 text-polar-night" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="text-frost font-semibold text-sm">
                WinterReady
              </span>
              <span className="text-glacier/60 text-xs block leading-tight">
                {t("liveDashboard")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="flex items-center gap-2 bg-safe-green/10 border border-safe-green/20 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-safe-green" />
              </span>
              <span className="text-safe-green text-xs font-medium hidden sm:inline">
                {t("courseCompleted")}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-frost mb-2 tracking-tight">
            {getLocalizedDestination(selectedDestination.name)}
          </h1>
          <p className="text-glacier/60 text-sm max-w-md mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="h-20 bg-glacier/10 rounded-2xl animate-pulse" />
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <SkeletonRoads />
          </div>
        ) : (
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Overall Safety Banner */}
            <motion.div variants={fadeInUp} className={`${style.color}/10 border ${style.border} rounded-2xl p-5`}>
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${style.color}/20 ${style.text} flex items-center justify-center flex-shrink-0`}>
                  {safetyIcons[overallSafety]}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={`text-base font-bold ${style.text}`}>{t(`safety.${overallSafety}.heading`)}</h2>
                  <p className="text-sm text-glacier/70 mt-0.5">{t(`safety.${overallSafety}.label`)}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-glacier/50 flex-shrink-0">
                  <button
                    onClick={refetch}
                    disabled={refreshing}
                    className="hover:text-glacier transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <svg className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t("refresh")}
                  </button>
                  <span>
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Row 1: Weather + Aurora/DrivingTips */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
              {/* Weather Card */}
              <Card>
                <CardHeader
                  icon={
                    <svg className="w-5 h-5 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  }
                  title={t("weather.title")}
                  badge={
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${riskBadgeColor}`}>
                      {weather?.riskLevel?.toUpperCase()}
                    </span>
                  }
                />
                {weather && (
                  <div>
                    <div className="text-center py-3">
                      <div className="w-16 h-16 mx-auto mb-2 bg-northern-lights/20 rounded-2xl flex items-center justify-center">
                        <WeatherIcon symbol={weather.symbol} />
                      </div>
                      <div className="text-4xl font-bold text-frost tracking-tight">{weather.temperature}°C</div>
                      <div className="text-glacier/70 text-sm mt-1">{weather.description}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-glacier/10">
                      <div className="text-center p-2.5 bg-polar-night/40 rounded-xl">
                        <div className="font-semibold text-frost">{weather.windSpeed} m/s</div>
                        <div className="text-[11px] text-glacier/60">{t("weather.wind")}</div>
                      </div>
                      <div className="text-center p-2.5 bg-polar-night/40 rounded-xl">
                        <div className="font-semibold text-frost">{weather.precipitation} mm</div>
                        <div className="text-[11px] text-glacier/60">{t("weather.precipitation")}</div>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-glacier/30 mt-4 text-right">Yr.no — MET Norway</p>
              </Card>

              {/* Aurora or Driving Tips */}
              {showAurora ? (
                <AuroraForecastCard aurora={aurora} />
              ) : (
                <Card>
                  <CardHeader
                    icon={
                      <svg className="w-5 h-5 text-northern-lights" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    }
                    title={t("safetyTips.title")}
                  />
                  <div className="space-y-3">
                    {weather?.riskLevel === "high" && (
                      <div className="bg-danger-red/15 border border-danger-red/30 rounded-xl p-4">
                        <div className="font-semibold text-danger-red text-sm">{t("safetyTips.highRisk.title")}</div>
                        <p className="text-sm text-glacier/70 mt-1">{t("safetyTips.highRisk.description")}</p>
                      </div>
                    )}
                    {weather?.riskLevel === "medium" && (
                      <div className="bg-warning-orange/15 border border-warning-orange/30 rounded-xl p-4">
                        <div className="font-semibold text-warning-orange text-sm">{t("safetyTips.mediumRisk.title")}</div>
                        <p className="text-sm text-glacier/70 mt-1">{t("safetyTips.mediumRisk.description")}</p>
                      </div>
                    )}
                    <div className="bg-northern-lights/10 border border-northern-lights/20 rounded-xl p-4">
                      <div className="font-semibold text-glacier text-sm">{t("safetyTips.quickReminders.title")}</div>
                      <ul className="text-sm text-glacier/70 mt-2 space-y-1.5">
                        {(t.raw("safetyTips.quickReminders.tips") as string[]).map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-northern-lights/60 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>

            {/* Row 2: Avalanche + Ocean/Emergency — always 2 cols */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
              {/* Avalanche Card */}
              <Card>
                <CardHeader
                  icon={
                    <svg className="w-5 h-5 text-warning-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  }
                  title={t("avalanche.title")}
                />
                {avalanche && avalanche.warnings.length > 0 ? (
                  <div className="space-y-3">
                    {avalanche.warnings.slice(0, 2).map((warning, i) => {
                      const levelColors: Record<number, string> = {
                        1: "bg-safe-green/15 border-safe-green/30 text-safe-green",
                        2: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400",
                        3: "bg-warning-orange/15 border-warning-orange/30 text-warning-orange",
                        4: "bg-danger-red/15 border-danger-red/30 text-danger-red",
                        5: "bg-red-900/15 border-red-800/30 text-red-400",
                      };
                      const colorClass = levelColors[warning.dangerLevel] || levelColors[2];
                      return (
                        <div key={i} className={`border rounded-xl p-4 ${colorClass}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">{warning.regionName}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10">
                              {t("avalanche.level")} {warning.dangerLevel} — {warning.dangerLevelName}
                            </span>
                          </div>
                          <p className="text-xs text-glacier/70 mt-1">{warning.mainText}</p>
                        </div>
                      );
                    })}
                    <a
                      href="https://varsom.no"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-glacier/50 hover:text-glacier transition-colors inline-flex items-center gap-1"
                    >
                      {t("avalanche.fullForecast")}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <div className="bg-safe-green/10 border border-safe-green/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-safe-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-safe-green text-sm">{t("avalanche.noWarnings")}</span>
                    </div>
                    <p className="text-xs text-glacier/60">
                      {t("avalanche.noWarningsDesc")}
                    </p>
                  </div>
                )}
                <p className="text-[10px] text-glacier/30 mt-4 text-right">NVE — Varsom.no</p>
              </Card>

              {/* Ocean or Emergency Numbers */}
              {showOcean ? (
                <Card>
                  <CardHeader
                    icon={
                      <svg className="w-5 h-5 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    }
                    title={t("ocean.title")}
                  />
                  {ocean ? (
                    <div>
                      <div className="text-center py-2 mb-4">
                        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${ocean.safeForBoating ? "bg-safe-green/15 text-safe-green border border-safe-green/20" : "bg-danger-red/15 text-danger-red border border-danger-red/20"}`}>
                          {ocean.safeForBoating ? t("ocean.safe") : t("ocean.caution")}
                        </div>
                        <p className="text-glacier/60 text-sm mt-3">{ocean.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-polar-night/40 rounded-xl">
                          <div className="text-lg font-bold text-frost">{ocean.waveHeight} m</div>
                          <div className="text-[11px] text-glacier/60">{t("ocean.waveHeight")}</div>
                        </div>
                        <div className="p-3 bg-polar-night/40 rounded-xl">
                          <div className="text-lg font-bold text-frost">{ocean.waterTemperature}°C</div>
                          <div className="text-[11px] text-glacier/60">{t("ocean.waterTemp")}</div>
                        </div>
                        <div className="p-3 bg-polar-night/40 rounded-xl">
                          <div className="text-lg font-bold text-frost">{ocean.currentSpeed} m/s</div>
                          <div className="text-[11px] text-glacier/60">{t("ocean.current")}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-glacier/40 text-sm">{t("ocean.unavailable")}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-glacier/30 mt-4 text-right">MET Norway — Oceanforecast 2.0</p>
                </Card>
              ) : (
                <Card>
                  <CardHeader
                    icon={
                      <svg className="w-5 h-5 text-danger-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                    title={t("emergency.title")}
                  />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-polar-night/40 rounded-xl">
                      <div>
                        <div className="font-semibold text-frost text-sm">{t("emergency.emergency")}</div>
                        <div className="text-xs text-glacier/60">{t("emergency.emergencyDesc")}</div>
                      </div>
                      <span className="text-lg font-bold text-danger-red">113 / 110 / 112</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-polar-night/40 rounded-xl">
                      <div>
                        <div className="font-semibold text-frost text-sm">{t("emergency.roadside")}</div>
                        <div className="text-xs text-glacier/60">{t("emergency.roadsideDesc")}</div>
                      </div>
                      <span className="text-lg font-bold text-frost">06000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-polar-night/40 rounded-xl">
                      <div>
                        <div className="font-semibold text-frost text-sm">{t("emergency.roadConditions")}</div>
                        <div className="text-xs text-glacier/60">{t("emergency.roadConditionsDesc")}</div>
                      </div>
                      <span className="text-lg font-bold text-frost">175</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-polar-night/40 rounded-xl">
                      <div>
                        <div className="font-semibold text-frost text-sm">{t("emergency.avalanche")}</div>
                        <div className="text-xs text-glacier/60">{t("emergency.avalancheDesc")}</div>
                      </div>
                      <span className="text-lg font-bold text-frost">22 95 95 95</span>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>

            {/* Road Conditions — full width */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-bold text-frost mb-4 flex items-center gap-2 px-1">
                <svg className="w-5 h-5 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {t("roadsPrefix")} — {getLocalizedDestination(selectedDestination.name)}
              </h2>
              <div className="bg-polar-night-light/60 backdrop-blur-md border border-glacier/15 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
                {roads?.conditions.map((road, i) => (
                  <div
                    key={road.id}
                    className={`p-4 flex items-center gap-4 hover:bg-glacier/5 transition-colors ${i !== 0 ? "border-t border-glacier/10" : ""}`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${getStatusColor(road.status)} text-white flex items-center justify-center font-bold`}>
                      {getStatusIcon(road.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-frost text-sm">{road.route}</div>
                      <div className="text-sm text-glacier/60 truncate">{t(`roads.${road.messageKey}`)}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(road.status)} flex-shrink-0`}>
                      {t(`roadConditions.statuses.${road.status}`)}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-glacier/30 mt-2 text-right pr-2">
                Statens vegvesen — {roads?.lastUpdated ? new Date(roads.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "..."}
              </p>
            </motion.div>

            {/* Footer */}
            <motion.div variants={fadeInUp}>
              <footer className="pt-6 pb-2">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
                  <a href="https://www.yr.no" target="_blank" rel="noopener noreferrer" className="text-glacier/40 hover:text-glacier transition-colors">
                    Yr.no
                  </a>
                  <a href="https://varsom.no" target="_blank" rel="noopener noreferrer" className="text-glacier/40 hover:text-glacier transition-colors">
                    Varsom.no
                  </a>
                  <a href="https://www.vegvesen.no/trafikk" target="_blank" rel="noopener noreferrer" className="text-glacier/40 hover:text-glacier transition-colors">
                    Vegvesen.no
                  </a>
                  <a href="https://www.swpc.noaa.gov/products/planetary-k-index" target="_blank" rel="noopener noreferrer" className="text-glacier/40 hover:text-glacier transition-colors">
                    NOAA Aurora
                  </a>
                  <a href="https://api.met.no" target="_blank" rel="noopener noreferrer" className="text-glacier/40 hover:text-glacier transition-colors">
                    MET Ocean
                  </a>
                </div>
                <p className="text-glacier/30 text-[11px] mt-3 text-center">
                  {t("disclaimer")}
                </p>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function WeatherIcon({ symbol }: { readonly symbol: string }) {
  if (symbol.includes("snow")) {
    return (
      <svg className="w-8 h-8 text-frost" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  }
  if (symbol.includes("rain")) {
    return (
      <svg className="w-8 h-8 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  }
  if (symbol.includes("cloud")) {
    return (
      <svg className="w-8 h-8 text-glacier/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-aurora-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
