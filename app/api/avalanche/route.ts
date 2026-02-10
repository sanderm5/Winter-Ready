import { NextRequest, NextResponse } from "next/server";
import { fetchAvalancheWarnings } from "@/lib/varsom-api";
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
  const lat = parseFloat(searchParams.get("lat") || "69.6496");
  const lon = parseFloat(searchParams.get("lon") || "18.956");
  const lang = searchParams.get("lang") || "en";
  const langkey = lang === "no" ? 1 : 2;

  try {
    const data = await fetchAvalancheWarnings(lat, lon, langkey);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    logError("Avalanche API", error);
    return NextResponse.json(
      { error: "Failed to fetch avalanche data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
