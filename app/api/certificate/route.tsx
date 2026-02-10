import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CertificateDocument } from "@/lib/certificate-generator";
import { CertificateData } from "@/lib/certificate-types";

export async function POST(request: NextRequest) {
  try {
    const data: CertificateData = await request.json();

    // Validate required fields
    if (!data.driverName || !data.companySlug || !data.certificateId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <CertificateDocument data={data} />
    );

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF
    const dateStr = new Date(data.completionDate).toISOString().split("T")[0];
    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="WinterReady-Certificate-${dateStr}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
