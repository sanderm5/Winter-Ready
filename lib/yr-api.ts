export interface WeatherData {
  location: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  symbol: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
}

interface YrTimeseries {
  time: string;
  data: {
    instant: {
      details: {
        air_temperature: number;
        wind_speed: number;
      };
    };
    next_1_hours?: {
      summary: {
        symbol_code: string;
      };
      details: {
        precipitation_amount: number;
      };
    };
  };
}

interface YrResponse {
  properties: {
    timeseries: YrTimeseries[];
  };
}

export interface Destination {
  name: string;
  lat: number;
  lon: number;
}

// Popular destinations in Norway
export const destinations: Destination[] = [
  { name: "Oslo", lat: 59.9139, lon: 10.7522 },
  { name: "Bergen", lat: 60.3913, lon: 5.3221 },
  { name: "Tromsø", lat: 69.6496, lon: 18.956 },
  { name: "Trondheim", lat: 63.4305, lon: 10.3951 },
  { name: "Lofoten", lat: 68.2094, lon: 13.9951 },
  { name: "Nordkapp", lat: 71.1691, lon: 25.7839 },
  { name: "Geiranger", lat: 62.1008, lon: 7.2059 },
  { name: "Stavanger", lat: 58.97, lon: 5.7331 },
];

const symbolDescriptions: Record<string, string> = {
  clearsky: "Clear sky",
  fair: "Fair weather",
  partlycloudy: "Partly cloudy",
  cloudy: "Cloudy",
  lightrainshowers: "Light rain showers",
  rainshowers: "Rain showers",
  heavyrainshowers: "Heavy rain showers",
  lightrain: "Light rain",
  rain: "Rain",
  heavyrain: "Heavy rain",
  lightsleet: "Light sleet",
  sleet: "Sleet",
  heavysleet: "Heavy sleet",
  lightsnow: "Light snow",
  snow: "Snow",
  heavysnow: "Heavy snow",
  fog: "Fog",
};

function getWeatherDescription(symbolCode: string): string {
  const baseSymbol = symbolCode.replace(/_day|_night|_polartwilight/g, "");
  return symbolDescriptions[baseSymbol] || symbolCode;
}

function calculateRiskLevel(
  temp: number,
  windSpeed: number,
  precipitation: number,
  symbolCode: string
): "low" | "medium" | "high" {
  let riskScore = 0;

  // Temperature risk
  if (temp < -10) riskScore += 3;
  else if (temp < 0) riskScore += 2;
  else if (temp < 5) riskScore += 1;

  // Wind risk
  if (windSpeed > 15) riskScore += 2;
  else if (windSpeed > 10) riskScore += 1;

  // Precipitation risk
  if (precipitation > 5) riskScore += 2;
  else if (precipitation > 1) riskScore += 1;

  // Snow/sleet risk
  if (symbolCode.includes("snow") || symbolCode.includes("sleet")) {
    riskScore += 2;
  }

  if (riskScore >= 5) return "high";
  if (riskScore >= 3) return "medium";
  return "low";
}

// Ocean forecast data for whale watching safety
export interface OceanData {
  waveHeight: number; // meters
  waterTemperature: number; // celsius
  currentSpeed: number; // m/s
  safeForBoating: boolean;
  description: string;
}

export async function fetchOceanForecast(
  lat: number = 69.67,
  lon: number = 18.95
): Promise<OceanData> {
  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/oceanforecast/2.0/complete?lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "WinterReady/1.0 github.com/winterready",
        },
        next: { revalidate: 3600, tags: [`ocean-${lat}-${lon}`] },
      }
    );

    if (!response.ok) {
      throw new Error(`Ocean API error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.properties.timeseries[0];
    const details = current.data.instant.details;

    const waveHeight = details.sea_surface_wave_height || 0;
    const waterTemp = details.sea_water_temperature || 4;
    const currentSpeed = details.sea_water_speed || 0;

    const safeForBoating = waveHeight < 2;
    let description: string;
    if (waveHeight < 0.5) description = "Calm seas - excellent conditions";
    else if (waveHeight < 1) description = "Light waves - good conditions";
    else if (waveHeight < 2) description = "Moderate waves - acceptable conditions";
    else if (waveHeight < 3) description = "Rough seas - tours may be cancelled";
    else description = "Very rough seas - not safe for tours";

    return {
      waveHeight: Math.round(waveHeight * 10) / 10,
      waterTemperature: Math.round(waterTemp * 10) / 10,
      currentSpeed: Math.round(currentSpeed * 100) / 100,
      safeForBoating,
      description,
    };
  } catch {
    return {
      waveHeight: 0.8,
      waterTemperature: 4.2,
      currentSpeed: 0.15,
      safeForBoating: true,
      description: "Light waves - good conditions",
    };
  }
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "WinterReady/1.0 github.com/winterready",
        },
        next: { revalidate: 3600, tags: [`weather-${lat}-${lon}`] },
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: YrResponse = await response.json();
    const current = data.properties.timeseries[0];

    const temp = current.data.instant.details.air_temperature;
    const windSpeed = current.data.instant.details.wind_speed;
    const precipitation = current.data.next_1_hours?.details.precipitation_amount || 0;
    const symbolCode = current.data.next_1_hours?.summary.symbol_code || "cloudy";

    const location = destinations.find(
      (d) => Math.abs(d.lat - lat) < 0.1 && Math.abs(d.lon - lon) < 0.1
    )?.name || "Selected location";

    return {
      location,
      temperature: Math.round(temp),
      windSpeed: Math.round(windSpeed),
      precipitation: Math.round(precipitation * 10) / 10,
      symbol: symbolCode,
      description: getWeatherDescription(symbolCode),
      riskLevel: calculateRiskLevel(temp, windSpeed, precipitation, symbolCode),
    };
  } catch {
    const location = destinations.find(
      (d) => Math.abs(d.lat - lat) < 0.1 && Math.abs(d.lon - lon) < 0.1
    )?.name || "Selected location";

    return {
      location,
      temperature: -2,
      windSpeed: 5,
      precipitation: 0,
      symbol: "cloudy",
      description: "Cloudy",
      riskLevel: "medium",
    };
  }
}
