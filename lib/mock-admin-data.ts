export interface DriverRecord {
  id: string;
  timestamp: string;
  riskLevel: "low" | "medium" | "high";
  homeCountry: string;
  destination: string;
  completedModules: string[];
  courseCompleted: boolean;
  language: string;
}

export interface AdminStats {
  totalDrivers: number;
  completionRate: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  topCountries: { country: string; count: number }[];
  languageStats: { language: string; count: number }[];
  moduleStats: { module: string; count: number }[];
  recentDrivers: DriverRecord[];
}

const countryNames: Record<string, string> = {
  germany: "Germany",
  netherlands: "Netherlands",
  united_kingdom: "United Kingdom",
  france: "France",
  spain: "Spain",
  italy: "Italy",
  poland: "Poland",
  usa: "United States",
  china: "China",
  japan: "Japan",
  australia: "Australia",
};

const moduleNames: Record<string, string> = {
  "winter-basics": "Winter Driving Basics",
  "braking-techniques": "Braking Techniques",
  "black-ice": "Black Ice Awareness",
  "mountain-driving": "Mountain & Fjord Driving",
  "norwegian-rules": "Norwegian Traffic Rules",
  "emergency-procedures": "Emergency Procedures",
  "polar-darkness": "Driving in Polar Darkness",
  "wildlife-roads": "Wildlife on Arctic Roads",
  "arctic-weather-driving": "Driving in Arctic Weather",
};

const languageNames: Record<string, string> = {
  no: "Norsk",
  en: "English",
  de: "Deutsch",
  fr: "Francais",
  es: "Espanol",
  zh: "中文",
};

// Map countries to likely language choice
const countryToLanguage: Record<string, string> = {
  germany: "de",
  netherlands: "en",
  united_kingdom: "en",
  france: "fr",
  spain: "es",
  italy: "en",
  poland: "en",
  usa: "en",
  china: "zh",
  japan: "en",
  australia: "en",
};

function generateRandomDrivers(count: number): DriverRecord[] {
  const countries = Object.keys(countryNames);
  const destinations = ["mountain", "coast", "city", "mixed"];
  const riskLevels: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
  const allModules = Object.keys(moduleNames);

  const drivers: DriverRecord[] = [];

  for (let i = 0; i < count; i++) {
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const moduleCount =
      riskLevel === "high" ? 6 : riskLevel === "medium" ? 4 : 3;
    const completedModules = allModules.slice(0, moduleCount);

    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(
      Date.now() - daysAgo * 24 * 60 * 60 * 1000
    ).toISOString();

    const homeCountry = countries[Math.floor(Math.random() * countries.length)];
    drivers.push({
      id: `driver-${Date.now()}-${i}`,
      timestamp,
      riskLevel,
      homeCountry,
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      completedModules,
      courseCompleted: Math.random() > 0.1, // 90% completion rate
      language: countryToLanguage[homeCountry] || "en",
    });
  }

  return drivers.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function generateMockStats(companySlug: string): AdminStats {
  // Generate different amounts based on company for variety
  const baseCounts: Record<string, number> = {
    demo: 156,
    "tourism-demo": 284,
  };
  const baseCount = baseCounts[companySlug] || 50 + Math.floor(Math.random() * 100);

  const drivers = generateRandomDrivers(baseCount);
  const completedDrivers = drivers.filter((d) => d.courseCompleted);

  // Risk distribution
  const riskDistribution = {
    low: drivers.filter((d) => d.riskLevel === "low").length,
    medium: drivers.filter((d) => d.riskLevel === "medium").length,
    high: drivers.filter((d) => d.riskLevel === "high").length,
  };

  // Top countries
  const countryCounts: Record<string, number> = {};
  drivers.forEach((d) => {
    countryCounts[d.homeCountry] = (countryCounts[d.homeCountry] || 0) + 1;
  });
  const topCountries = Object.entries(countryCounts)
    .map(([country, count]) => ({
      country: countryNames[country] || country,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Language stats
  const langCounts: Record<string, number> = {};
  drivers.forEach((d) => {
    langCounts[d.language] = (langCounts[d.language] || 0) + 1;
  });
  const languageStats = Object.entries(langCounts)
    .map(([lang, count]) => ({
      language: languageNames[lang] || lang,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Module stats
  const moduleCounts: Record<string, number> = {};
  drivers.forEach((d) => {
    d.completedModules.forEach((m) => {
      moduleCounts[m] = (moduleCounts[m] || 0) + 1;
    });
  });
  const moduleStats = Object.entries(moduleCounts)
    .map(([module, count]) => ({
      module: moduleNames[module] || module,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDrivers: drivers.length,
    completionRate: Math.round(
      (completedDrivers.length / drivers.length) * 100
    ),
    riskDistribution,
    topCountries,
    languageStats,
    moduleStats,
    recentDrivers: drivers.slice(0, 10),
  };
}
