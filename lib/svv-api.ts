export interface RoadCondition {
  id: string;
  route: string;
  status: "open" | "closed" | "convoy" | "warning";
  messageKey: string;
  updated: string;
}

export interface RoadData {
  conditions: RoadCondition[];
  lastUpdated: string;
}

// National mountain passes and routes
const nationalRoadConditions: RoadCondition[] = [
  { id: "1", route: "E6 Saltfjellet", status: "open", messageKey: "national.1", updated: "" },
  { id: "2", route: "E10 Bjørnfjell", status: "convoy", messageKey: "national.2", updated: "" },
  { id: "3", route: "Rv7 Hardangervidda", status: "warning", messageKey: "national.3", updated: "" },
  { id: "4", route: "E134 Haukelifjell", status: "open", messageKey: "national.4", updated: "" },
  { id: "5", route: "Rv63 Trollstigen", status: "closed", messageKey: "national.5", updated: "" },
  { id: "6", route: "E69 Nordkapp", status: "warning", messageKey: "national.6", updated: "" },
  { id: "7", route: "Rv55 Sognefjellet", status: "closed", messageKey: "national.7", updated: "" },
  { id: "8", route: "E16 Filefjell", status: "open", messageKey: "national.8", updated: "" },
];

// Tromsø-area routes tourists actually use
const tromsoRoadConditions: RoadCondition[] = [
  { id: "t1", route: "E6 Nordkjosbotn – Tromsø", status: "open", messageKey: "tromso.1", updated: "" },
  { id: "t2", route: "E8 Tromsø – Tromsøya Bridge", status: "open", messageKey: "tromso.2", updated: "" },
  { id: "t3", route: "Rv862 Tromsø – Sommarøy", status: "warning", messageKey: "tromso.3", updated: "" },
  { id: "t4", route: "E6 Tromsø – Skibotn (Lyngen)", status: "warning", messageKey: "tromso.4", updated: "" },
  { id: "t5", route: "Rv91 Breivikeidet – Svendsby Ferry", status: "open", messageKey: "tromso.5", updated: "" },
  { id: "t6", route: "Kvaløya Coastal Road", status: "open", messageKey: "tromso.6", updated: "" },
];

// Lofoten-area routes
const lofotenRoadConditions: RoadCondition[] = [
  { id: "l1", route: "E10 Svolvær – Å i Lofoten", status: "open", messageKey: "lofoten.1", updated: "" },
  { id: "l2", route: "E10 Lofoten Mainland Bridge", status: "warning", messageKey: "lofoten.2", updated: "" },
  { id: "l3", route: "Fv815 Henningsvær Road", status: "open", messageKey: "lofoten.3", updated: "" },
  { id: "l4", route: "Fv816 Reine – Hamnøy", status: "open", messageKey: "lofoten.4", updated: "" },
  { id: "l5", route: "E10 Gimsøystraumen Bridge", status: "warning", messageKey: "lofoten.5", updated: "" },
];

// Nordkapp-area routes
const nordkappRoadConditions: RoadCondition[] = [
  { id: "n1", route: "E6 Alta – Skaidi", status: "open", messageKey: "nordkapp.1", updated: "" },
  { id: "n2", route: "E69 Skaidi – Nordkapp", status: "warning", messageKey: "nordkapp.2", updated: "" },
  { id: "n3", route: "E6 Lakselv – Tana Bru", status: "open", messageKey: "nordkapp.3", updated: "" },
  { id: "n4", route: "Nordkapptunnelen", status: "open", messageKey: "nordkapp.4", updated: "" },
  { id: "n5", route: "E6 Olderfjord – Russenes", status: "open", messageKey: "nordkapp.5", updated: "" },
];

export type RoadRegion = "tromso" | "lofoten" | "nordkapp" | "national";

export function getRegionForDestination(destinationName: string): RoadRegion {
  const mapping: Record<string, RoadRegion> = {
    "Tromsø": "tromso",
    "Lofoten": "lofoten",
    "Nordkapp": "nordkapp",
  };
  return mapping[destinationName] || "national";
}

export async function fetchRoadConditions(
  region?: RoadRegion
): Promise<RoadData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let source: RoadCondition[];
  switch (region) {
    case "tromso":
      source = tromsoRoadConditions;
      break;
    case "lofoten":
      source = lofotenRoadConditions;
      break;
    case "nordkapp":
      source = nordkappRoadConditions;
      break;
    default:
      source = nationalRoadConditions;
  }

  const conditions = source.map((condition) => ({
    ...condition,
    updated: new Date().toISOString(),
  }));

  return {
    conditions,
    lastUpdated: new Date().toISOString(),
  };
}

// Helper to get status color
export function getStatusColor(status: RoadCondition["status"]): string {
  switch (status) {
    case "open":
      return "bg-safe-green";
    case "closed":
      return "bg-danger-red";
    case "convoy":
      return "bg-warning-orange";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

// Helper to get status icon
export function getStatusIcon(status: RoadCondition["status"]): string {
  switch (status) {
    case "open":
      return "OK";
    case "closed":
      return "X";
    case "convoy":
      return "C";
    case "warning":
      return "!";
    default:
      return "?";
  }
}
