"use client";

import { useTranslations } from "next-intl";
import { AuroraForecast as AuroraForecastType } from "@/lib/aurora-api";

const ratingStyles = {
  poor: { color: "text-glacier/70", bg: "bg-glacier/20", ring: "ring-glacier/30" },
  moderate: { color: "text-aurora-teal", bg: "bg-aurora-teal/20", ring: "ring-aurora-teal/30" },
  good: { color: "text-aurora-green", bg: "bg-aurora-green/20", ring: "ring-aurora-green/30" },
  excellent: { color: "text-green-400", bg: "bg-green-400/20", ring: "ring-green-400/30" },
};

function KpGauge({ kp }: { readonly kp: number }) {
  const percentage = Math.min((kp / 9) * 100, 100);
  const hue = kp <= 3 ? 160 : kp <= 5 ? 100 : kp <= 7 ? 50 : 0;

  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-polar-night-light"
        />
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.64} 264`}
          style={{ stroke: `hsl(${hue}, 70%, 55%)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-frost">{kp}</span>
        <span className="text-[10px] text-glacier/70 uppercase tracking-wider">Kp</span>
      </div>
    </div>
  );
}

function getDescriptionKey(
  rating: AuroraForecastType["overallRating"],
  cloudCover: number
): string {
  if (cloudCover > 80) return "description.cloudy";
  return `description.${rating}`;
}

export default function AuroraForecastCard({
  aurora,
  loading = false,
}: {
  readonly aurora: AuroraForecastType | null;
  readonly loading?: boolean;
}) {
  const t = useTranslations("dashboard.aurora");

  if (loading) {
    return (
      <div className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-glacier/20 rounded w-1/2" />
          <div className="h-24 bg-glacier/10 rounded-full w-24 mx-auto" />
          <div className="h-4 bg-glacier/20 rounded w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (!aurora) return null;

  const style = ratingStyles[aurora.overallRating];

  return (
    <div className="bg-gradient-to-br from-polar-night-light/80 via-polar-night-light/60 to-[#1a1a2e]/80 backdrop-blur-sm border border-northern-lights/30 rounded-2xl shadow-lg p-6 relative overflow-hidden">
      {/* Subtle aurora shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aurora-green via-northern-lights to-aurora-teal opacity-60" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-frost flex items-center gap-2">
          <svg className="w-5 h-5 text-aurora-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          {t("title")}
        </h2>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ring-1 ${style.color} ${style.bg} ${style.ring}`}>
          {t(`rating.${aurora.overallRating}`)}
        </span>
      </div>

      <KpGauge kp={aurora.kpIndex} />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center p-2 bg-polar-night/40 rounded-lg">
          <div className="text-lg font-semibold text-frost">{aurora.probability}%</div>
          <div className="text-[11px] text-glacier/70">{t("probability")}</div>
        </div>
        <div className="text-center p-2 bg-polar-night/40 rounded-lg">
          <div className="text-lg font-semibold text-frost">{aurora.cloudCover}%</div>
          <div className="text-[11px] text-glacier/70">{t("cloudCover")}</div>
        </div>
      </div>

      {aurora.bestTime && (
        <div className="mt-3 text-center p-2 bg-polar-night/40 rounded-lg">
          <div className="text-sm font-medium text-glacier">{t("bestViewing")}</div>
          <div className="text-frost font-semibold">{aurora.bestTime}</div>
        </div>
      )}

      <p className="mt-3 text-xs text-glacier/70 text-center leading-relaxed">
        {t(getDescriptionKey(aurora.overallRating, aurora.cloudCover))}
      </p>
    </div>
  );
}
