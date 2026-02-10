import { NextRequest, NextResponse } from "next/server";
import { fetchAuroraForecast } from "@/lib/aurora-api";
import { rateLimit } from "@/lib/rate-limit";
import { logError } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const cloudCover = parseFloat(searchParams.get("cloudCover") || "50");
  const lat = parseFloat(searchParams.get("lat") || "69.65");

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
