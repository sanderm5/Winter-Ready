export interface RoadCondition {
  id: string;
  route: string;
  status: "open" | "closed" | "convoy" | "warning";
  message: string;
  updated: string;
}

export interface RoadData {
  conditions: RoadCondition[];
  lastUpdated: string;
}

// National mountain passes and routes
const nationalRoadConditions: RoadCondition[] = [
  {
    id: "1",
    route: "E6 Saltfjellet",
    status: "open",
    message: "Road open. Winter conditions, drive carefully.",
    updated: new Date().toISOString(),
  },
  {
    id: "2",
    route: "E10 Bjørnfjell",
    status: "convoy",
    message: "Kolonnekjøring (convoy driving) due to heavy snowfall. Waiting time approx. 1-2 hours.",
    updated: new Date().toISOString(),
  },
  {
    id: "3",
    route: "Rv7 Hardangervidda",
    status: "warning",
    message: "Slippery conditions. Reduced visibility due to drifting snow.",
    updated: new Date().toISOString(),
  },
  {
    id: "4",
    route: "E134 Haukelifjell",
    status: "open",
    message: "Road open. Some ice patches, drive with caution.",
    updated: new Date().toISOString(),
  },
  {
    id: "5",
    route: "Rv63 Trollstigen",
    status: "closed",
    message: "Closed for winter season (November - May).",
    updated: new Date().toISOString(),
  },
  {
    id: "6",
    route: "E69 Nordkapp",
    status: "warning",
    message: "Strong winds expected. Check before traveling.",
    updated: new Date().toISOString(),
  },
  {
    id: "7",
    route: "Rv55 Sognefjellet",
    status: "closed",
    message: "Closed for winter season.",
    updated: new Date().toISOString(),
  },
  {
    id: "8",
    route: "E16 Filefjell",
    status: "open",
    message: "Road open. Good winter maintenance.",
    updated: new Date().toISOString(),
  },
];

// Tromsø-area routes tourists actually use
const tromsoRoadConditions: RoadCondition[] = [
  {
    id: "t1",
    route: "E6 Nordkjosbotn – Tromsø",
    status: "open",
    message: "Good conditions. Some icy patches in tunnels.",
    updated: new Date().toISOString(),
  },
  {
    id: "t2",
    route: "E8 Tromsø – Tromsøya Bridge",
    status: "open",
    message: "Road open. Reduced visibility in snow showers.",
    updated: new Date().toISOString(),
  },
  {
    id: "t3",
    route: "Rv862 Tromsø – Sommarøy",
    status: "warning",
    message: "Popular aurora viewing route. Icy patches after dark, no street lights.",
    updated: new Date().toISOString(),
  },
  {
    id: "t4",
    route: "E6 Tromsø – Skibotn (Lyngen)",
    status: "warning",
    message: "Avalanche warning on exposed sections. Check varsom.no before travel.",
    updated: new Date().toISOString(),
  },
  {
    id: "t5",
    route: "Rv91 Breivikeidet – Svendsby Ferry",
    status: "open",
    message: "Road open. Ferry runs hourly. Check timetable.",
    updated: new Date().toISOString(),
  },
  {
    id: "t6",
    route: "Kvaløya Coastal Road",
    status: "open",
    message: "Narrow road, caution with oncoming traffic. Popular for northern lights.",
    updated: new Date().toISOString(),
  },
];

// Lofoten-area routes
const lofotenRoadConditions: RoadCondition[] = [
  {
    id: "l1",
    route: "E10 Svolvær – Å i Lofoten",
    status: "open",
    message: "Open. Narrow sections with passing places. Icy patches.",
    updated: new Date().toISOString(),
  },
  {
    id: "l2",
    route: "E10 Lofoten Mainland Bridge",
    status: "warning",
    message: "Strong crosswinds expected. Reduce speed on bridges.",
    updated: new Date().toISOString(),
  },
  {
    id: "l3",
    route: "Fv815 Henningsvær Road",
    status: "open",
    message: "Narrow coastal road. Caution in darkness.",
    updated: new Date().toISOString(),
  },
  {
    id: "l4",
    route: "Fv816 Reine – Hamnøy",
    status: "open",
    message: "Scenic route. Slippery near sea spray zones.",
    updated: new Date().toISOString(),
  },
  {
    id: "l5",
    route: "E10 Gimsøystraumen Bridge",
    status: "warning",
    message: "Bridge exposed to strong gusts. May close in extreme weather.",
    updated: new Date().toISOString(),
  },
];

// Nordkapp-area routes
const nordkappRoadConditions: RoadCondition[] = [
  {
    id: "n1",
    route: "E6 Alta – Skaidi",
    status: "open",
    message: "Good conditions. Long exposed stretches.",
    updated: new Date().toISOString(),
  },
  {
    id: "n2",
    route: "E69 Skaidi – Nordkapp",
    status: "warning",
    message: "Strong winds expected. Check before traveling. May close without notice.",
    updated: new Date().toISOString(),
  },
  {
    id: "n3",
    route: "E6 Lakselv – Tana Bru",
    status: "open",
    message: "Open. Watch for reindeer herds.",
    updated: new Date().toISOString(),
  },
  {
    id: "n4",
    route: "Nordkapptunnelen",
    status: "open",
    message: "Tunnel open. 6.9 km with 9% gradient.",
    updated: new Date().toISOString(),
  },
  {
    id: "n5",
    route: "E6 Olderfjord – Russenes",
    status: "open",
    message: "Winter conditions. Exposed to wind and drifting snow.",
    updated: new Date().toISOString(),
  },
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

// Helper to get status text
export function getStatusText(status: RoadCondition["status"]): string {
  switch (status) {
    case "open":
      return "OPEN";
    case "closed":
      return "CLOSED";
    case "convoy":
      return "CONVOY";
    case "warning":
      return "WARNING";
    default:
      return "UNKNOWN";
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
