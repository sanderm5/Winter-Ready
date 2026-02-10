export interface AuroraForecast {
  kpIndex: number;
  probability: number; // % chance for Tromsø
  cloudCover: number; // % from weather data
  overallRating: "poor" | "moderate" | "good" | "excellent";
  bestTime: string;
  description: string;
}

interface KpForecastEntry {
  0: string; // time_tag
  1: string; // Kp value
  2: string; // observed/estimated/predicted
}

function getLatitudeMultiplier(latitude: number): number {
  if (latitude >= 66) return 1;     // Inside aurora oval
  if (latitude >= 62) return 0.7;   // Northern Norway south of oval
  if (latitude >= 58) return 0.4;   // Southern Norway
  return 0.2;                        // Very far south
}

function calculateAuroraProbability(kp: number, cloudCover: number, latitude: number = 69.65): number {
  let baseProbability: number;
  if (kp >= 5) baseProbability = 95;
  else if (kp >= 4) baseProbability = 85;
  else if (kp >= 3) baseProbability = 70;
  else if (kp >= 2) baseProbability = 50;
  else if (kp >= 1) baseProbability = 30;
  else baseProbability = 10;

  // Scale by latitude distance from aurora oval
  baseProbability = Math.round(baseProbability * getLatitudeMultiplier(latitude));

  // Cloud cover reduces visibility
  const cloudReduction = (cloudCover / 100) * baseProbability * 0.9;
  return Math.max(5, Math.round(baseProbability - cloudReduction));
}

function calculateOverallRating(
  kp: number,
  cloudCover: number,
  latitude: number = 69.65
): AuroraForecast["overallRating"] {
  const probability = calculateAuroraProbability(kp, cloudCover, latitude);
  if (probability >= 70) return "excellent";
  if (probability >= 45) return "good";
  if (probability >= 25) return "moderate";
  return "poor";
}

function getBestViewingTime(kp: number): string {
  if (kp >= 3) return "21:00 – 02:00";
  if (kp >= 2) return "22:00 – 01:00";
  return "23:00 – 00:00";
}

function getRatingDescription(
  rating: AuroraForecast["overallRating"],
  cloudCover: number
): string {
  if (cloudCover > 80) {
    return "Heavy cloud cover will likely block the view. Consider indoor activities tonight.";
  }
  switch (rating) {
    case "excellent":
      return "Excellent conditions for Northern Lights! Head to a dark spot away from city lights.";
    case "good":
      return "Good chance of seeing the aurora tonight. Find a location with clear northern horizon.";
    case "moderate":
      return "Moderate activity expected. Aurora may be visible during brief clearings.";
    case "poor":
      return "Low aurora activity expected. Keep an eye on the sky but don't count on it.";
  }
}

export async function fetchAuroraForecast(
  cloudCover: number = 50,
  latitude: number = 69.65
): Promise<AuroraForecast> {
  try {
    const response = await fetch(
      "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
      { next: { revalidate: 1800, tags: ["aurora-forecast"] } }
    );

    if (!response.ok) {
      throw new Error(`NOAA API error: ${response.status}`);
    }

    const data: KpForecastEntry[] = await response.json();

    // Find the next nighttime KP forecast (skip header row)
    const now = new Date();
    let bestKp = 0;

    for (let i = 1; i < data.length; i++) {
      const entry = data[i];
      const entryTime = new Date(entry[0]);
      const kpValue = parseFloat(entry[1]);

      // Look at forecasts from now up to 24h ahead
      if (entryTime >= now && entryTime.getTime() - now.getTime() < 86400000) {
        if (kpValue > bestKp) {
          bestKp = kpValue;
        }
      }
    }

    // If no future data found, use the latest entry
    if (bestKp === 0 && data.length > 1) {
      bestKp = parseFloat(data[data.length - 1][1]);
    }

    const kpIndex = Math.round(bestKp * 10) / 10;
    const rating = calculateOverallRating(kpIndex, cloudCover, latitude);

    return {
      kpIndex,
      probability: calculateAuroraProbability(kpIndex, cloudCover, latitude),
      cloudCover,
      overallRating: rating,
      bestTime: getBestViewingTime(kpIndex),
      description: getRatingDescription(rating, cloudCover),
    };
  } catch {
    // Fallback with reasonable defaults
    const kpIndex = 2;
    const rating = calculateOverallRating(kpIndex, cloudCover, latitude);
    return {
      kpIndex,
      probability: calculateAuroraProbability(kpIndex, cloudCover, latitude),
      cloudCover,
      overallRating: rating,
      bestTime: getBestViewingTime(kpIndex),
      description: getRatingDescription(rating, cloudCover),
    };
  }
}
