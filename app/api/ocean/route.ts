import { NextRequest, NextResponse } from "next/server";
import { fetchOceanForecast } from "@/lib/yr-api";
import { rateLimit } from "@/lib/rate-limit";
import { logError } from "@/lib/logger";
import { validateCoordinates, getClientIp } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const { lat, lon, error } = validateCoordinates(
    searchParams.get("lat"),
    searchParams.get("lon"),
    { lat: 69.67, lon: 18.95 }
  );
  if (error) return error;

  try {
    const ocean = await fetchOceanForecast(lat, lon);
    return NextResponse.json(ocean, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    logError("Ocean API", error);
    return NextResponse.json(
      { error: "Failed to fetch ocean data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
