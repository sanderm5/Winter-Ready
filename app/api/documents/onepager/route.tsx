import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { OnePagerDocument } from "@/lib/documents/onepager-generator";
import { OnePagerData } from "@/lib/documents/document-types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const locale = searchParams.get("locale") === "no" ? "no" : "en";

    const data: OnePagerData = {
      generatedDate: new Date().toISOString(),
      locale,
      contactName: searchParams.get("contactName") || undefined,
      contactEmail: searchParams.get("contactEmail") || undefined,
    };

    const pdfBuffer = await renderToBuffer(
      <OnePagerDocument data={data} />
    );

    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="WinterReady-OnePager-${locale.toUpperCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("One-pager generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
