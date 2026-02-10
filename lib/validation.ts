import { NextResponse } from "next/server";

export function validateCoordinates(
  latStr: string | null,
  lonStr: string | null,
  defaults: { lat: number; lon: number } = { lat: 59.9139, lon: 10.7522 }
): { lat: number; lon: number; error?: NextResponse } {
  const lat = latStr ? parseFloat(latStr) : defaults.lat;
  const lon = lonStr ? parseFloat(lonStr) : defaults.lon;

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return {
      lat: 0,
      lon: 0,
      error: NextResponse.json(
        { error: "Invalid coordinates: lat and lon must be numbers" },
        { status: 400 }
      ),
    };
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return {
      lat: 0,
      lon: 0,
      error: NextResponse.json(
        { error: "Invalid coordinates: lat must be -90..90, lon must be -180..180" },
        { status: 400 }
      ),
    };
  }

  return { lat, lon };
}

const VALID_ROAD_REGIONS = ["tromso", "lofoten", "nordkapp", "national"] as const;
export type RoadRegion = (typeof VALID_ROAD_REGIONS)[number];

export function validateRegion(
  region: string | null
): { region: RoadRegion; error?: NextResponse } {
  if (!region) {
    return { region: "national" };
  }

  if (!VALID_ROAD_REGIONS.includes(region as RoadRegion)) {
    return {
      region: "national",
      error: NextResponse.json(
        { error: `Invalid region. Must be one of: ${VALID_ROAD_REGIONS.join(", ")}` },
        { status: 400 }
      ),
    };
  }

  return { region: region as RoadRegion };
}

export function getClientIp(request: { ip?: string; headers: { get(name: string): string | null } }): string {
  return request.ip || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
