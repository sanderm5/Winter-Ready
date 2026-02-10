"use client";

import useSWR from "swr";
import { WeatherData, OceanData, Destination } from "@/lib/yr-api";
import { RoadData, getRegionForDestination } from "@/lib/svv-api";
import { AuroraForecast } from "@/lib/aurora-api";
import { AvalancheData } from "@/lib/varsom-api";

export type OverallSafety = "safe" | "caution" | "warning";

export interface SafetyData {
  weather: WeatherData | null;
  aurora: AuroraForecast | null;
  avalanche: AvalancheData | null;
  ocean: OceanData | null;
  roads: RoadData | null;
  loading: boolean;
  showAurora: boolean;
  showOcean: boolean;
  overallSafety: OverallSafety;
  refetch: () => void;
}

export function computeOverallSafety(
  weather: WeatherData | null,
  avalanche: AvalancheData | null,
  roads: RoadData | null
): OverallSafety {
  let riskScore = 0;

  if (weather?.riskLevel === "high") riskScore += 3;
  else if (weather?.riskLevel === "medium") riskScore += 1;

  if (avalanche?.warnings.some((w) => w.dangerLevel >= 4)) riskScore += 3;
  else if (avalanche?.warnings.some((w) => w.dangerLevel >= 3)) riskScore += 2;
  else if (avalanche?.warnings.some((w) => w.dangerLevel >= 2)) riskScore += 1;

  if (roads?.conditions.some((r) => r.status === "closed")) riskScore += 2;
  else if (roads?.conditions.some((r) => r.status === "warning" || r.status === "convoy")) riskScore += 1;

  if (riskScore >= 4) return "warning";
  if (riskScore >= 2) return "caution";
  return "safe";
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json();
  });

const SWR_OPTIONS = {
  dedupingInterval: 60_000,
  errorRetryCount: 3,
};

export function useSafetyData(destination: Destination): SafetyData {
  const showAurora = destination.lat > 62;
  const showOcean =
    destination.lat > 62 ||
    ["Bergen", "Stavanger", "Geiranger"].includes(destination.name);

  const region = getRegionForDestination(destination.name);

  const { data: weather, mutate: mutateWeather } = useSWR<WeatherData>(
    `/api/weather?lat=${destination.lat}&lon=${destination.lon}`,
    fetcher,
    { ...SWR_OPTIONS, refreshInterval: 15 * 60_000 }
  );

  const { data: roads, mutate: mutateRoads } = useSWR<RoadData>(
    `/api/roads?region=${region}`,
    fetcher,
    { ...SWR_OPTIONS, refreshInterval: 5 * 60_000 }
  );

  const estimatedCloudCover = weather?.precipitation != null && weather.precipitation > 0 ? 80 : 30;
  const { data: aurora, mutate: mutateAurora } = useSWR<AuroraForecast>(
    showAurora ? `/api/aurora?cloudCover=${estimatedCloudCover}&lat=${destination.lat}` : null,
    fetcher,
    { ...SWR_OPTIONS, refreshInterval: 15 * 60_000 }
  );

  const { data: ocean, mutate: mutateOcean } = useSWR<OceanData>(
    showOcean
      ? `/api/ocean?lat=${destination.lat}&lon=${destination.lon}`
      : null,
    fetcher,
    { ...SWR_OPTIONS, refreshInterval: 30 * 60_000 }
  );

  const { data: avalanche, mutate: mutateAvalanche } = useSWR<AvalancheData>(
    `/api/avalanche?lat=${destination.lat}&lon=${destination.lon}`,
    fetcher,
    { ...SWR_OPTIONS, refreshInterval: 30 * 60_000 }
  );

  const loading = !weather && !roads;

  const overallSafety = computeOverallSafety(
    weather ?? null,
    avalanche ?? null,
    roads ?? null
  );

  const refetch = () => {
    mutateWeather();
    mutateRoads();
    mutateAurora();
    mutateOcean();
    mutateAvalanche();
  };

  return {
    weather: weather ?? null,
    aurora: aurora ?? null,
    avalanche: avalanche ?? null,
    ocean: ocean ?? null,
    roads: roads ?? null,
    loading,
    showAurora,
    showOcean,
    overallSafety,
    refetch,
  };
}
