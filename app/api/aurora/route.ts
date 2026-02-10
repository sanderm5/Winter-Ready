import { NextRequest, NextResponse } from "next/server";
import { fetchAuroraForecast } from "@/lib/aurora-api";
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
  const { lat, error } = validateCoordinates(
    searchParams.get("lat"),
    searchParams.get("lon") || "18.956",
    { lat: 69.65, lon: 18.956 }
  );
  if (error) return error;
  const cloudCover = parseFloat(searchParams.get("cloudCover") || "50");
  if (Number.isNaN(cloudCover) || cloudCover < 0 || cloudCover > 100) {
    return NextResponse.json(
      { error: "Invalid cloudCover: must be 0-100" },
      { status: 400 }
    );
  }

  try {
    const aurora = await fetchAuroraForecast(cloudCover, lat);
    return NextResponse.json(aurora, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    logError("Aurora API", error);
    return NextResponse.json(
      { error: "Failed to fetch aurora data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
