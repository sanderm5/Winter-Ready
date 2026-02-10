import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Cache purge is only available in development" },
      { status: 403 }
    );
  }

  const tag = request.nextUrl.searchParams.get("tag");
  if (!tag) {
    return NextResponse.json(
      { error: "Missing tag parameter. Example: ?tag=aurora-forecast" },
      { status: 400 }
    );
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
