"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { AssessmentResult } from "@/lib/assessment-logic";
import { getCompanyBranding } from "@/lib/company-config";
import { CertificateData } from "@/lib/certificate-types";
import { courseModules } from "@/lib/course-content";
import { destinations, Destination } from "@/lib/yr-api";
import ModuleIcon from "@/components/ModuleIcon";
import ResponsiveImage from "@/components/ResponsiveImage";
import WinterBackground from "@/components/WinterBackground";
import SafetySummaryDashboard from "@/components/SafetySummaryDashboard";

interface CourseModule {
  id: string;
  title: string;
  iconType: "snow" | "brake" | "ice" | "mountain" | "rules" | "emergency" | "darkness" | "wildlife" | "arctic-weather";
  content: {
    heading: string;
    text: string;
    tips?: string[];
    image?: string;
    imageAlt?: string;
  }[];
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const company = params.company as string;

  const t = useTranslations("course");
  const tModules = useTranslations("modules");
  const tCommon = useTranslations("common");
  const tDest = useTranslations("destinations");

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );
  const [driverName, setDriverName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const moduleIconTypes: Record<
    string,
    "snow" | "brake" | "ice" | "mountain" | "rules" | "emergency" | "darkness" | "wildlife" | "arctic-weather"
  > = {
    "winter-basics": "snow",
    "braking-techniques": "brake",
    "black-ice": "ice",
    "mountain-driving": "mountain",
    "norwegian-rules": "rules",
    "emergency-procedures": "emergency",
    "polar-darkness": "darkness",
    "wildlife-roads": "wildlife",
    "arctic-weather-driving": "arctic-weather",
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentResult");

    // Restore destination from sessionStorage
    const storedDest = sessionStorage.getItem("selectedDestination");
    if (storedDest) {
      try {
        setSelectedDestination(JSON.parse(storedDest) as Destination);
      } catch { /* ignore */ }
    }

    if (stored) {
      try {
        const assessmentResult = JSON.parse(stored) as AssessmentResult;
        setResult(assessmentResult);

        // Build modules from translations and merge with image data
        const translatedModules: CourseModule[] =
          assessmentResult.requiredModules.map((moduleId) => {
            const contentArray = tModules.raw(`${moduleId}.content`) as {
              heading: string;
              text: string;
              tips?: string[];
            }[];

            // Get image data from courseModules
            const moduleData = courseModules[moduleId];
            const contentWithImages = (Array.isArray(contentArray) ? contentArray : []).map((content, index) => ({
              ...content,
              image: moduleData?.content[index]?.image,
              imageAlt: moduleData?.content[index]?.imageAlt,
            }));

            return {
              id: moduleId,
              title: tModules(`${moduleId}.title`),
              iconType: moduleIconTypes[moduleId] || "snow",
              content: contentWithImages.length > 0 ? contentWithImages : [{ heading: moduleId, text: "" }],
            };
          });

        setModules(translatedModules);
      } catch (error) {
        console.error("Course initialization error:", error);
        router.push(`/${locale}/${company}/assessment`);
      }
    } else {
      router.push(`/${locale}/${company}/assessment`);
    }
  }, [company, router, locale, tModules]);

  const getLocalizedDestination = (name: string) => {
    const key = name.toLowerCase().replace(/ø/g, "o").replace(/å/g, "a");
    try {
      return tDest(key as Parameters<typeof tDest>[0]);
    } catch {
      return name;
    }
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    sessionStorage.setItem("selectedDestination", JSON.stringify(dest));
  };

  if (!result || modules.length === 0) {
    return (
      <main className="min-h-screen bg-winter-blue flex items-center justify-center">
        <div className="text-white">{t("loading")}</div>
      </main>
    );
  }

  const needsDestination = !selectedDestination;

  const currentModule = modules[currentModuleIndex] ?? modules[0];
  const currentContent = currentModule?.content?.[currentContentIndex] ?? currentModule?.content?.[0];
  const isLastContent =
    currentContentIndex === (currentModule?.content?.length ?? 1) - 1;
  const isLastModule = currentModuleIndex === modules.length - 1;
  const allCompleted = completedModules.size === modules.length;

  const destinationStep = selectedDestination ? 1 : 0;
  const totalSteps = modules.length + 1;
  const contentLength = currentModule?.content?.length || 1;
  const progress =
    ((destinationStep + completedModules.size +
      (allCompleted ? 0 : currentContentIndex / contentLength)) /
      totalSteps) *
    100;

  const handleNext = () => {
    if (!isLastContent) {
      setCurrentContentIndex(currentContentIndex + 1);
    } else {
      setCompletedModules(
        new Set([...Array.from(completedModules), currentModule.id])
      );

      if (!isLastModule) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentContentIndex(0);
      }
    }
  };

  const handleFinish = () => {
    router.push(`/${locale}/${company}/dashboard`);
  };

  const handleDownloadCertificate = async () => {
    if (!driverName.trim() || !result) return;

    setIsGenerating(true);
    try {
      const branding = getCompanyBranding(company);
      const certificateData: CertificateData = {
        driverName: driverName.trim(),
        companySlug: company,
        companyName: branding.name,
        companyColor: branding.color,
        riskLevel: result.riskLevel,
        completedModules: modules.map((m) => ({
          id: m.id,
          title: m.title,
          duration: 2,
        })),
        totalDuration: result.estimatedCourseMinutes,
        completionDate: new Date().toISOString(),
        certificateId: crypto.randomUUID(),
      };

      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) throw new Error("Failed to generate certificate");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `WinterReady-Certificate-${new Date().toISOString().split("T")[0]}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Certificate download error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const riskBadgeColor = {
    low: "bg-safe-green",
    medium: "bg-warning-orange",
    high: "bg-danger-red",
  }[result.riskLevel];

  return (
    <main className="min-h-screen bg-gradient-to-b from-polar-night via-polar-night-light to-arctic-blue relative">
      <WinterBackground />
      {/* Header */}
      <header className="bg-winter-blue py-4 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-white font-semibold">{t("header")}</span>
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${riskBadgeColor}`}
          >
            {t(`riskLevel.${result.riskLevel}`)}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      {!needsDestination && (
        <div className="bg-white/10 py-3 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2 overflow-x-auto">
              {selectedDestination && (
                <div className="flex-shrink-0 px-3 py-1 rounded-full text-sm bg-safe-green text-white flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {getLocalizedDestination(selectedDestination.name)}
                </div>
              )}
              {modules.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setCurrentModuleIndex(i);
                    setCurrentContentIndex(0);
                  }}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm transition
                    ${
                      completedModules.has(m.id)
                        ? "bg-safe-green text-white"
                        : i === currentModuleIndex
                        ? "bg-winter-blue text-white"
                        : "bg-white/20 text-white/60"
                    }`}
                >
                  {m.title}
                </button>
              ))}
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div
                className="h-full bg-winter-blue rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Destination Picker — tourism only, step 0 */}
        {needsDestination ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-winter-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-winter-blue">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("destinationSelect.title")}
              </h2>
              <p className="text-gray-500">
                {t("destinationSelect.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {destinations.map((dest) => {
                const descKey = dest.name.toLowerCase().replace(/ø/g, "o").replace(/å/g, "a");
                return (
                  <button
                    key={dest.name}
                    onClick={() => handleSelectDestination(dest)}
                    className="text-left p-4 border-2 border-gray-200 rounded-xl hover:border-winter-blue hover:bg-ice-blue/30 transition group"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-winter-blue flex items-center gap-2">
                      <svg className="w-4 h-4 text-glacier" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {getLocalizedDestination(dest.name)}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      {t(`destinationSelect.descriptions.${descKey}` as Parameters<typeof t>[0])}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : !allCompleted && currentModule && currentContent ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-12 h-12 bg-winter-blue/10 rounded-xl flex items-center justify-center mb-4 text-winter-blue">
              <ModuleIcon type={currentModule.iconType} />
            </div>
            <div className="text-sm text-winter-blue font-medium mb-2">
              {currentModule.title} ({currentContentIndex + 1}/
              {currentModule.content.length})
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentContent.heading}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {currentContent.text}
            </p>

            {currentContent.image && (
              <div className="mb-6">
                <ResponsiveImage
                  src={currentContent.image}
                  alt={currentContent.imageAlt || currentContent.heading}
                  aspectRatio="16:9"
                  priority={true}
                />
              </div>
            )}

            {currentContent.tips && (
              <div className="bg-ice-blue/50 rounded-xl p-4 mb-6">
                <div className="font-semibold text-winter-blue mb-2">
                  {t("keyPoints")}
                </div>
                <ul className="space-y-2">
                  {currentContent.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-safe-green font-bold">+</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-winter-blue text-white py-4 rounded-xl font-semibold text-lg hover:bg-winter-blue/90 transition"
            >
              {isLastContent
                ? isLastModule
                  ? t("completeCourse")
                  : t("nextModule")
                : tCommon("continue")}
            </button>
          </div>
        ) : (
          <div>
            {selectedDestination && (
              <SafetySummaryDashboard
                destination={selectedDestination}
                completedModules={Array.from(completedModules)}
                riskLevel={result.riskLevel}
              />
            )}

            {/* Certificate Section */}
            <div className="text-center" id="certificate">
              <div className="w-16 h-16 bg-safe-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {t("completion.title")}
              </h2>
              <p className="text-frost mb-8">{t("completion.subtitle")}</p>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="text-sm text-gray-500 mb-2">
                  {t("completion.certificate")}
                </div>
                <div className="text-xl font-semibold text-winter-blue mb-4">
                  {t("completion.courseName")}
                </div>

                <input
                  type="text"
                  placeholder={t("completion.namePlaceholder")}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl mb-4 focus:border-winter-blue focus:outline-none"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />

                <div className="text-left text-sm text-gray-600 mb-4 space-y-1">
                  <p>
                    <span className="font-medium">{t("completion.modules")}:</span>{" "}
                    {modules.map((m) => m.title).join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">{t("completion.riskLevel")}:</span>{" "}
                    {t(`riskLevel.${result.riskLevel}`)}
                  </p>
                  <p>
                    <span className="font-medium">{t("completion.date")}:</span>{" "}
                    {new Date().toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <button
                  onClick={handleDownloadCertificate}
                  disabled={!driverName.trim() || isGenerating}
                  className="w-full bg-safe-green text-white py-3 rounded-xl font-semibold hover:bg-safe-green/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating
                    ? t("completion.generating")
                    : t("completion.downloadCertificate")}
                </button>
              </div>
              <button
                onClick={handleFinish}
                className="bg-winter-blue text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-winter-blue/90 transition"
              >
                {t("completion.viewDashboard")}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
