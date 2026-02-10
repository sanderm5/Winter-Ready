import { NextRequest, NextResponse } from "next/server";
import { fetchRoadConditions } from "@/lib/svv-api";
import { rateLimit } from "@/lib/rate-limit";
import { logError } from "@/lib/logger";
import { validateRegion, getClientIp } from "@/lib/validation";

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
  const { region, error } = validateRegion(searchParams.get("region"));
  if (error) return error;

  try {
    const roads = await fetchRoadConditions(region);
    return NextResponse.json(roads, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    logError("Roads API", error);
    return NextResponse.json(
      { error: "Failed to fetch road conditions" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
