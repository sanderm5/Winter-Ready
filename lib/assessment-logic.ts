export interface AssessmentAnswers {
  winterExperience: "never" | "few_times" | "regularly";
  homeCountry: string;
  destination: "mountain" | "coast" | "city" | "mixed";
  tripDuration: "day_trip" | "few_days" | "week_plus";
}

export interface AssessmentResult {
  riskLevel: "low" | "medium" | "high";
  requiredModules: string[];
  estimatedCourseMinutes: number;
}

// Countries with regular winter driving conditions
const winterCountries = [
  "norway", "sweden", "finland", "iceland", "russia",
  "canada", "switzerland", "austria", "germany", "poland",
  "denmark", "czech_republic"
];

export function evaluateAssessment(
  answers: AssessmentAnswers
): AssessmentResult {
  let riskScore = 0;
  const requiredModules: string[] = [];

  // Winter experience scoring
  if (answers.winterExperience === "never") {
    riskScore += 3;
    requiredModules.push("winter-basics");
    requiredModules.push("braking-techniques");
    requiredModules.push("black-ice");
  } else if (answers.winterExperience === "few_times") {
    riskScore += 2;
    requiredModules.push("black-ice");
  }

  // Home country scoring
  const isFromWinterCountry = winterCountries.some(
    c => answers.homeCountry.toLowerCase().includes(c)
  );
  if (!isFromWinterCountry) {
    riskScore += 2;
    if (!requiredModules.includes("winter-basics")) {
      requiredModules.push("winter-basics");
    }
  }

  // Destination scoring
  if (answers.destination === "mountain") {
    riskScore += 2;
    requiredModules.push("mountain-driving");
  } else if (answers.destination === "mixed") {
    riskScore += 1;
    requiredModules.push("mountain-driving");
  }

  // Trip duration scoring
  if (answers.tripDuration === "week_plus") {
    riskScore += 1;
  }

  // Arctic/Northern Norway modules — conditional on destination
  requiredModules.push("arctic-weather-driving"); // Relevant across all of Norway

  if (answers.destination === "mountain" || answers.destination === "mixed") {
    requiredModules.push("polar-darkness");
    requiredModules.push("wildlife-roads");
    if (!isFromWinterCountry) {
      riskScore += 1;
    }
  } else if (answers.destination === "coast") {
    requiredModules.push("wildlife-roads");
  }

  // Always include essential info
  requiredModules.push("norwegian-rules");
  requiredModules.push("emergency-procedures");

  // Determine risk level
  let riskLevel: "low" | "medium" | "high";
  if (riskScore <= 2) {
    riskLevel = "low";
  } else if (riskScore <= 5) {
    riskLevel = "medium";
  } else {
    riskLevel = "high";
  }

  // Calculate course time (roughly 2 min per module)
  const estimatedCourseMinutes = requiredModules.length * 2;

  return {
    riskLevel,
    requiredModules: [...new Set(requiredModules)], // Remove duplicates
    estimatedCourseMinutes,
  };
}

export const countryOptions = [
  { value: "germany", label: "Germany" },
  { value: "netherlands", label: "Netherlands" },
  { value: "united_kingdom", label: "United Kingdom" },
  { value: "denmark", label: "Denmark" },
  { value: "france", label: "France" },
  { value: "spain", label: "Spain" },
  { value: "italy", label: "Italy" },
  { value: "belgium", label: "Belgium" },
  { value: "poland", label: "Poland" },
  { value: "czech_republic", label: "Czech Republic" },
  { value: "usa", label: "United States" },
  { value: "china", label: "China" },
  { value: "japan", label: "Japan" },
  { value: "south_korea", label: "South Korea" },
  { value: "australia", label: "Australia" },
  { value: "sweden", label: "Sweden" },
  { value: "finland", label: "Finland" },
  { value: "canada", label: "Canada" },
  { value: "other", label: "Other" },
];
