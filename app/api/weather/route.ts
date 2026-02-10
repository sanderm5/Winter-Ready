import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "@/lib/yr-api";
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
    searchParams.get("lon")
  );
  if (error) return error;

  try {
    const weather = await fetchWeather(lat, lon);
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    logError("Weather API", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
