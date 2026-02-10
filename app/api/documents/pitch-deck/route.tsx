import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { PitchDeckDocument } from "@/lib/documents/pitch-deck-generator";
import { PitchDeckData } from "@/lib/documents/document-types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const locale = searchParams.get("locale") === "no" ? "no" : "en";

    const data: PitchDeckData = {
      generatedDate: new Date().toISOString(),
      locale,
      partnerName: searchParams.get("partnerName") || "Visit Tromsø",
      contactName: searchParams.get("contactName") || undefined,
      contactEmail: searchParams.get("contactEmail") || undefined,
    };

    const pdfBuffer = await renderToBuffer(
      <PitchDeckDocument data={data} />
    );

    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="WinterReady-PitchDeck-VisitTromso-${locale.toUpperCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Pitch deck generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
