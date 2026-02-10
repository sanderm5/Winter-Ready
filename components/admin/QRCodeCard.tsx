"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRCodeCardProps {
  companySlug: string;
  companyName: string;
  baseUrl?: string;
}

export default function QRCodeCard({
  companySlug,
  companyName,
  baseUrl = typeof window !== "undefined" ? window.location.origin : "",
}: QRCodeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const url = `${baseUrl}/${companySlug}`;

  useEffect(() => {
    if (canvasRef.current && baseUrl) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });

      // Also generate data URL for download
      QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      }).then(setQrDataUrl);
    }
  }, [url, baseUrl]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `winterready-qr-${companySlug}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>WinterReady QR - ${companyName}</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              box-sizing: border-box;
            }
            .card {
              border: 2px solid #e2e8f0;
              border-radius: 16px;
              padding: 32px;
              text-align: center;
              max-width: 300px;
            }
            h1 {
              font-size: 24px;
              margin: 0 0 8px 0;
              color: #1e293b;
            }
            h2 {
              font-size: 16px;
              margin: 0 0 24px 0;
              color: #64748b;
              font-weight: normal;
            }
            img {
              width: 200px;
              height: 200px;
            }
            .url {
              margin-top: 16px;
              font-size: 14px;
              color: #3b82f6;
              word-break: break-all;
            }
            .instructions {
              margin-top: 24px;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
              font-size: 13px;
              color: #64748b;
            }
            @media print {
              body { padding: 0; }
              .card { border: none; }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${companyName}</h1>
            <h2>Winter Safety Training</h2>
            <img src="${qrDataUrl}" alt="QR Code" />
            <div class="url">${url}</div>
            <div class="instructions">
              Scan with your phone camera to start the winter driving safety course
            </div>
          </div>
          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        QR Code for Distribution
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="bg-gray-50 p-4 rounded-xl">
          <canvas ref={canvasRef} className="block" />
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-sm text-gray-600">
            Print this QR code for tourist information centers, hotels, and airports. Visitors can scan it to start their winter safety briefing.
          </p>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg font-mono break-all">
            {url}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 px-4 py-2 bg-winter-blue text-white rounded-lg text-sm font-medium hover:bg-winter-blue/90 transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
