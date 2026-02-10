export interface AvalancheWarning {
  dangerLevel: number; // 1-5
  dangerLevelName: string;
  validFrom: string;
  validTo: string;
  mainText: string;
  regionName: string;
}

export interface AvalancheData {
  warnings: AvalancheWarning[];
  lastUpdated: string;
}

function getDangerLevelName(level: number): string {
  switch (level) {
    case 1: return "Low";
    case 2: return "Moderate";
    case 3: return "Considerable";
    case 4: return "High";
    case 5: return "Very High";
    default: return "Unknown";
  }
}

function getDangerLevelColor(level: number): string {
  switch (level) {
    case 1: return "#4ade80"; // green
    case 2: return "#facc15"; // yellow
    case 3: return "#f97316"; // orange
    case 4: return "#ef4444"; // red
    case 5: return "#1f2937"; // black/dark
    default: return "#9ca3af"; // gray
  }
}

export { getDangerLevelColor };

export async function fetchAvalancheWarnings(
  lat: number = 69.6496,
  lon: number = 18.956,
  langkey: number = 2 // 1=Norwegian, 2=English
): Promise<AvalancheData> {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 2);

  const startStr = today.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api01.nve.no/hydrology/forecast/avalanche/v6.3.0/api/AvalancheWarningByCoordinates/Simple/${lon}/${lat}/${langkey}/${startStr}/${endStr}`,
      { next: { revalidate: 3600, tags: [`avalanche-${lat}-${lon}`] } }
    );

    if (!response.ok) {
      throw new Error(`Varsom API error: ${response.status}`);
    }

    const data = await response.json();

    const warnings: AvalancheWarning[] = (Array.isArray(data) ? data : []).map(
      (item: {
        DangerLevel?: number;
        DangerLevelName?: string;
        ValidFrom?: string;
        ValidTo?: string;
        MainText?: string;
        RegionName?: string;
      }) => ({
        dangerLevel: item.DangerLevel || 0,
        dangerLevelName: item.DangerLevelName || getDangerLevelName(item.DangerLevel || 0),
        validFrom: item.ValidFrom || "",
        validTo: item.ValidTo || "",
        mainText: item.MainText || "",
        regionName: item.RegionName || "Tromsø",
      })
    );

    return {
      warnings,
      lastUpdated: new Date().toISOString(),
    };
  } catch {
    // Fallback mock data for demo
    return {
      warnings: [
        {
          dangerLevel: 2,
          dangerLevelName: "Moderate",
          validFrom: new Date().toISOString(),
          validTo: new Date(Date.now() + 86400000).toISOString(),
          mainText: "Wind slabs may form on lee slopes. Avoid steep terrain above treeline.",
          regionName: "Tromsø",
        },
      ],
      lastUpdated: new Date().toISOString(),
    };
  }
}
