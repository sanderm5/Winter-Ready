import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CertificateDocument } from "@/lib/certificate-generator";
import { CertificateData } from "@/lib/certificate-types";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`cert-${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const data: CertificateData = await request.json();

    // Validate required fields
    if (!data.driverName || !data.companySlug || !data.certificateId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sanitize string inputs
    data.driverName = data.driverName.trim().slice(0, 100);
    data.companySlug = data.companySlug.trim().slice(0, 50);
    data.certificateId = data.certificateId.trim().slice(0, 50);

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
