"use client";

import { useState } from "react";

const documents = [
  {
    title: "One-Pager",
    description:
      "Ensidig oversikt over WinterReady-plattformen og turismefunksjoner for Visit Tromsø.",
    format: "A4 Portrett — 1 side",
    endpoints: {
      no: "/api/documents/onepager?locale=no",
      en: "/api/documents/onepager?locale=en",
    },
    filenames: {
      no: "WinterReady-OnePager-NO.pdf",
      en: "WinterReady-OnePager-EN.pdf",
    },
    color: "from-northern-lights to-glacier",
  },
  {
    title: "Pitch Deck",
    description:
      "Presentasjon med problem, løsning, turismefunksjoner, dataintegrasjoner og partnerskapsmuligheter.",
    format: "A4 Landskap — 9 lysbilder",
    endpoints: {
      no: "/api/documents/pitch-deck?locale=no",
      en: "/api/documents/pitch-deck?locale=en",
    },
    filenames: {
      no: "WinterReady-PitchDeck-VisitTromso-NO.pdf",
      en: "WinterReady-PitchDeck-VisitTromso-EN.pdf",
    },
    color: "from-glacier to-aurora-teal",
  },
  {
    title: "Teknisk Oversikt",
    description:
      "Systemarkitektur, API-integrasjoner, internasjonalisering og tekniske spesifikasjoner.",
    format: "A4 Portrett — 5 sider",
    endpoints: {
      no: "/api/documents/tech-overview?locale=no",
      en: "/api/documents/tech-overview?locale=en",
    },
    filenames: {
      no: "WinterReady-TechOverview-NO.pdf",
      en: "WinterReady-TechOverview-EN.pdf",
    },
    color: "from-aurora-teal to-aurora-green",
  },
];

export default function DocumentsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDownload(endpoint: string, filename: string) {
    setLoading(endpoint);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to generate document");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-polar-night via-polar-night-light to-midnight-blue">
      {/* Header */}
      <header className="py-4 px-6 bg-fjord-deep">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-white">WinterReady</span>
          <span className="text-glacier text-sm">Partnerdokumenter</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-frost mb-4">
            Partnerdokumenter
          </h1>
          <p className="text-xl text-glacier">
            Utarbeidet for partnerskapsdiskusjoner
          </p>
        </div>

        {/* Document cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="bg-polar-night-light/80 backdrop-blur-sm border border-glacier/20 rounded-xl p-6 flex flex-col"
            >
              <h2 className="text-xl font-bold text-frost mb-2">
                {doc.title}
              </h2>
              <p className="text-glacier/80 text-sm mb-4 flex-1">
                {doc.description}
              </p>
              <p className="text-glacier/50 text-xs mb-4">{doc.format}</p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleDownload(doc.endpoints.no, doc.filenames.no)
                  }
                  disabled={loading === doc.endpoints.no}
                  className={`flex-1 py-3 px-3 rounded-lg font-semibold text-polar-night bg-gradient-to-r ${doc.color} hover:opacity-90 transition-opacity disabled:opacity-50 text-sm`}
                >
                  {loading === doc.endpoints.no
                    ? "Genererer..."
                    : "Norsk PDF"}
                </button>
                <button
                  onClick={() =>
                    handleDownload(doc.endpoints.en, doc.filenames.en)
                  }
                  disabled={loading === doc.endpoints.en}
                  className="flex-1 py-3 px-3 rounded-lg font-semibold text-glacier border border-glacier/40 hover:bg-glacier/10 transition-colors disabled:opacity-50 text-sm"
                >
                  {loading === doc.endpoints.en
                    ? "Generating..."
                    : "English PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-glacier/60 text-sm">
            Dokumentene genereres som PDF ved nedlasting. Hver nedlasting kan ta
            noen sekunder.
          </p>
        </div>
      </div>
    </main>
  );
}
