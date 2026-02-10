"use client";

import { useTranslations } from "next-intl";
import { Destination } from "@/lib/yr-api";
import { getStatusColor, getStatusIcon } from "@/lib/svv-api";
import AuroraForecastCard from "@/components/AuroraForecast";
import { useSafetyData } from "@/hooks/useSafetyData";

interface SafetySummaryDashboardProps {
  destination: Destination;
  completedModules: string[];
  riskLevel: "low" | "medium" | "high";
}

export default function SafetySummaryDashboard({
  destination,
  completedModules,
  riskLevel,
}: SafetySummaryDashboardProps) {
  const t = useTranslations("course.safetySummary");
  const tDash = useTranslations("dashboard");
  const tDest = useTranslations("destinations");

  const getLocalizedDestination = (name: string) => {
    const key = name.toLowerCase().replace(/ø/g, "o").replace(/å/g, "a");
    try {
      return tDest(key as Parameters<typeof tDest>[0]);
    } catch {
      return name;
    }
  };

  const {
    weather,
    aurora,
    avalanche,
    ocean,
    roads,
    loading,
    showAurora,
    showOcean,
    overallSafety,
  } = useSafetyData(destination);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-polar-night via-polar-night-light to-arctic-blue rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-center h-48">
          <div className="animate-pulse text-glacier">{t("loading")}</div>
        </div>
      </div>
    );
  }

  const safetyConfig = {
    safe: { color: "bg-safe-green", border: "border-safe-green", text: "text-safe-green", label: t("overallSafe") },
    caution: { color: "bg-warning-orange", border: "border-warning-orange", text: "text-warning-orange", label: t("overallCaution") },
    warning: { color: "bg-danger-red", border: "border-danger-red", text: "text-danger-red", label: t("overallWarning") },
  }[overallSafety];

  const levelColors: Record<number, string> = {
    1: "bg-safe-green/20 border-safe-green text-safe-green",
    2: "bg-yellow-500/20 border-yellow-500 text-yellow-400",
    3: "bg-warning-orange/20 border-warning-orange text-warning-orange",
    4: "bg-danger-red/20 border-danger-red text-danger-red",
    5: "bg-red-900/20 border-red-800 text-red-400",
  };

  return (
    <div className="bg-gradient-to-b from-polar-night via-polar-night-light to-arctic-blue rounded-2xl overflow-hidden mb-8">
      {/* Hero header */}
      <div className="px-6 pt-8 pb-6 text-center">
        <h2 className="text-3xl font-bold text-frost mb-1">
          {getLocalizedDestination(destination.name)} — {t("title")}
        </h2>
        <p className="text-glacier/80 text-sm">
          {t("subtitle", { destination: getLocalizedDestination(destination.name) })}
        </p>
      </div>

      <div className="px-6 pb-8">
        {/* Overall Safety Assessment */}
        <div className={`${safetyConfig.color}/20 border ${safetyConfig.border} rounded-xl p-4 mb-6`}>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${safetyConfig.color}`} />
            <div>
              <div className={`font-semibold ${safetyConfig.text}`}>{t("overallSafety")}</div>
              <p className="text-sm text-glacier/80 mt-1">{safetyConfig.label}</p>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Weather Card */}
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-frost mb-3">{t("weather")}</h3>
            {weather && (
              <>
                <div className="text-center py-3">
                  <div className="text-3xl font-bold text-frost">{weather.temperature}°C</div>
                  <div className="text-glacier text-sm">{weather.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-glacier/20 text-center">
                  <div>
                    <div className="font-semibold text-frost text-sm">{weather.windSpeed} m/s</div>
                    <div className="text-xs text-glacier/70">{t("wind")}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-frost text-sm">{weather.precipitation} mm</div>
                    <div className="text-xs text-glacier/70">{t("precipitation")}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Aurora Card — only for northern destinations */}
          {showAurora && (
            <AuroraForecastCard aurora={aurora} />
          )}

          {/* Avalanche Card */}
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-frost mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-warning-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {t("avalanche")}
            </h3>
            {avalanche && avalanche.warnings.length > 0 ? (
              <div className="space-y-2">
                {avalanche.warnings.slice(0, 2).map((warning, i) => {
                  const colorClass = levelColors[warning.dangerLevel] || levelColors[2];
                  return (
                    <div key={i} className={`border rounded-xl p-3 ${colorClass}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs">{warning.regionName}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10">
                          {t("dangerLevel")} {warning.dangerLevel}
                        </span>
                      </div>
                      <p className="text-xs text-glacier/80">{warning.mainText}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-glacier/70 text-sm">{t("noAvalanche")}</p>
            )}
          </div>

          {/* Ocean Card — only for coastal destinations */}
          {showOcean && ocean && (
            <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-2xl shadow-lg p-5">
              <h3 className="text-lg font-bold text-frost mb-3">{t("ocean")}</h3>
              <div className="text-center py-3">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${ocean.safeForBoating ? "bg-safe-green/20 text-safe-green" : "bg-danger-red/20 text-danger-red"}`}>
                  {ocean.safeForBoating ? t("oceanSafe") : t("oceanUnsafe")}
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="font-semibold text-frost text-sm">{ocean.waveHeight} m</div>
                    <div className="text-xs text-glacier/70">{t("waveHeight")}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-frost text-sm">{ocean.waterTemperature}°C</div>
                    <div className="text-xs text-glacier/70">{t("waterTemp")}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Road Conditions */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-frost mb-3">{t("roads")}</h3>
          <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-2xl shadow-lg overflow-hidden">
            {roads?.conditions.map((road, i) => (
              <div key={road.id} className={`p-3 flex items-center gap-3 ${i !== 0 ? "border-t border-glacier/10" : ""}`}>
                <div className={`w-8 h-8 rounded-full ${getStatusColor(road.status)} text-white flex items-center justify-center font-bold text-sm`}>
                  {getStatusIcon(road.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-frost text-sm">{road.route}</div>
                  <div className="text-xs text-glacier/70 truncate">{road.message}</div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${getStatusColor(road.status)} flex-shrink-0`}>
                  {tDash(`roadConditions.statuses.${road.status}`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data disclaimer */}
        <p className="text-center text-glacier/50 text-xs mt-4">
          {t("dataDisclaimer")}
        </p>

        {/* Proceed to Certificate */}
        <div className="mt-6 text-center">
          <a
            href="#certificate"
            className="inline-block bg-safe-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-safe-green/90 transition"
          >
            {t("proceedToCertificate")}
          </a>
        </div>
      </div>
    </div>
  );
}
