import { describe, it, expect } from "vitest";
import { computeOverallSafety } from "@/hooks/useSafetyData";
import { WeatherData } from "@/lib/yr-api";
import { AvalancheData } from "@/lib/varsom-api";
import { RoadData } from "@/lib/svv-api";

function makeWeather(riskLevel: "low" | "medium" | "high"): WeatherData {
  return {
    location: "Test",
    temperature: -5,
    windSpeed: 10,
    precipitation: 2,
    symbol: "cloudy",
    description: "Cloudy",
    riskLevel,
  };
}

function makeAvalanche(dangerLevel: number): AvalancheData {
  return {
    warnings: [
      {
        dangerLevel,
        dangerLevelName: `Level ${dangerLevel}`,
        validFrom: new Date().toISOString(),
        validTo: new Date().toISOString(),
        mainText: "Test warning",
        regionName: "Test",
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

function makeRoads(status: "open" | "closed" | "convoy" | "warning"): RoadData {
  return {
    conditions: [
      {
        id: "1",
        route: "E6 Test",
        status,
        message: "Test message",
        updated: new Date().toISOString(),
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

describe("computeOverallSafety", () => {
  it("returns 'safe' when all data is null", () => {
    expect(computeOverallSafety(null, null, null)).toBe("safe");
  });

  it("returns 'safe' for low-risk weather, low avalanche, open roads", () => {
    expect(
      computeOverallSafety(makeWeather("low"), makeAvalanche(1), makeRoads("open"))
    ).toBe("safe");
  });

  it("returns 'caution' for medium-risk weather with moderate avalanche", () => {
    expect(
      computeOverallSafety(makeWeather("medium"), makeAvalanche(2), makeRoads("open"))
    ).toBe("caution");
  });

  // high weather = 3 points → caution (warning threshold is >=4)
  it("returns 'caution' for high-risk weather alone", () => {
    expect(
      computeOverallSafety(makeWeather("high"), makeAvalanche(1), makeRoads("open"))
    ).toBe("caution");
  });

  // danger level 4 = 3 points → caution
  it("returns 'caution' for danger level 4 avalanche alone", () => {
    expect(
      computeOverallSafety(makeWeather("low"), makeAvalanche(4), makeRoads("open"))
    ).toBe("caution");
  });

  // high weather (3) + closed roads (2) = 5 → warning
  it("returns 'warning' for high weather + closed roads", () => {
    expect(
      computeOverallSafety(makeWeather("high"), makeAvalanche(1), makeRoads("closed"))
    ).toBe("warning");
  });

  it("returns 'caution' for closed roads alone", () => {
    expect(
      computeOverallSafety(makeWeather("low"), makeAvalanche(1), makeRoads("closed"))
    ).toBe("caution");
  });

  // medium weather (1) + closed roads (2) = 3 → caution
  it("returns 'caution' for closed roads + medium weather", () => {
    expect(
      computeOverallSafety(makeWeather("medium"), makeAvalanche(1), makeRoads("closed"))
    ).toBe("caution");
  });

  // convoy (1) + level 1 avalanche (0) + low weather (0) = 1 → safe
  it("returns 'safe' for convoy roads with otherwise low risk", () => {
    expect(
      computeOverallSafety(makeWeather("low"), makeAvalanche(1), makeRoads("convoy"))
    ).toBe("safe");
  });

  // danger 4 (3) + closed roads (2) = 5 → warning
  it("returns 'warning' for combined high avalanche + closed roads", () => {
    expect(
      computeOverallSafety(makeWeather("low"), makeAvalanche(4), makeRoads("closed"))
    ).toBe("warning");
  });
});
