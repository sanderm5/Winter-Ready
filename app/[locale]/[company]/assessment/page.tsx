"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { slideRight, slideLeft } from "@/lib/motion-variants";
import { AssessmentAnswers, evaluateAssessment } from "@/lib/assessment-logic";
import ImageOptionCard from "@/components/ImageOptionCard";

type Step = 1 | 2 | 3 | 4;

export default function AssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const company = params.company as string;

  const t = useTranslations("assessment");
  const tCommon = useTranslations("common");

  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const countryKeys = [
    "germany",
    "netherlands",
    "united_kingdom",
    "denmark",
    "france",
    "spain",
    "italy",
    "belgium",
    "poland",
    "czech_republic",
    "usa",
    "china",
    "japan",
    "south_korea",
    "australia",
    "sweden",
    "finland",
    "canada",
    "other",
  ];

  const handleBack = () => {
    if (step > 1) {
      setDirection("back");
      setStep((step - 1) as Step);
    }
  };

  const handleAnswer = (key: keyof AssessmentAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 4) {
      setDirection("forward");
      setStep((step + 1) as Step);
    } else {
      const finalAnswers = { ...answers, [key]: value } as AssessmentAnswers;
      const result = evaluateAssessment(finalAnswers);

      sessionStorage.setItem("assessmentResult", JSON.stringify(result));
      sessionStorage.setItem("assessmentAnswers", JSON.stringify(finalAnswers));

      router.push(`/${locale}/${company}/course`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-winter-blue to-slate-900 flex items-center justify-center">
      <div className="max-w-xl w-full mx-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    s === step
                      ? "bg-white text-winter-blue"
                      : s < step
                      ? "bg-safe-green text-white"
                      : "bg-white/20 text-white/60"
                  }`}
              >
                {s < step ? "✓" : s}
              </div>
            ))}
          </div>
          <div className="text-white/60 text-sm text-center mb-2">
            {t("step")} {step} {t("of")} 4
          </div>
          <div className="h-1 bg-white/20 rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Back button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="mb-4 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium transition"
          >
            <span>&#8592;</span> {tCommon("back")}
          </button>
        )}

        {/* Question cards */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={direction === "forward" ? slideRight : slideLeft}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 && (
                <QuestionCard
                  question={t("questions.winterExperience.title")}
                  subtitle={t("questions.winterExperience.subtitle")}
                  options={[
                    {
                      value: "never",
                      label: t("questions.winterExperience.options.never.label"),
                      description: t(
                        "questions.winterExperience.options.never.description"
                      ),
                    },
                    {
                      value: "few_times",
                      label: t("questions.winterExperience.options.fewTimes.label"),
                      description: t(
                        "questions.winterExperience.options.fewTimes.description"
                      ),
                    },
                    {
                      value: "regularly",
                      label: t("questions.winterExperience.options.regularly.label"),
                      description: t(
                        "questions.winterExperience.options.regularly.description"
                      ),
                    },
                  ]}
                  onSelect={(value) => handleAnswer("winterExperience", value)}
                  selectedValue={answers.winterExperience}
                />
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-winter-blue mb-2">
                    {t("questions.homeCountry.title")}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {t("questions.homeCountry.subtitle")}
                  </p>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-winter-blue focus:outline-none"
                    onChange={(e) => handleAnswer("homeCountry", e.target.value)}
                    value={answers.homeCountry || ""}
                  >
                    <option value="" disabled>
                      {t("questions.homeCountry.placeholder")}
                    </option>
                    {countryKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`countries.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-winter-blue mb-2">
                    {t("questions.destination.title")}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {t("questions.destination.subtitle")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "mountain", image: "/images/assessment/destination-mountain.jpg" },
                      { value: "coast", image: "/images/assessment/destination-coast.jpg" },
                      { value: "city", image: "/images/assessment/destination-city.jpg" },
                      { value: "mixed", image: "/images/assessment/destination-mixed.jpg" },
                    ].map((opt) => (
                      <ImageOptionCard
                        key={opt.value}
                        label={t(`questions.destination.options.${opt.value}.label`)}
                        description={t(`questions.destination.options.${opt.value}.description`)}
                        imageSrc={opt.image}
                        selected={answers.destination === opt.value}
                        onClick={() => handleAnswer("destination", opt.value)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <QuestionCard
                  question={t("questions.tripDuration.title")}
                  subtitle={t("questions.tripDuration.subtitle")}
                  options={[
                    {
                      value: "day_trip",
                      label: t("questions.tripDuration.options.dayTrip.label"),
                      description: t(
                        "questions.tripDuration.options.dayTrip.description"
                      ),
                    },
                    {
                      value: "few_days",
                      label: t("questions.tripDuration.options.fewDays.label"),
                      description: t(
                        "questions.tripDuration.options.fewDays.description"
                      ),
                    },
                    {
                      value: "week_plus",
                      label: t("questions.tripDuration.options.weekPlus.label"),
                      description: t(
                        "questions.tripDuration.options.weekPlus.description"
                      ),
                    },
                  ]}
                  onSelect={(value) => handleAnswer("tripDuration", value)}
                  selectedValue={answers.tripDuration}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function QuestionCard({
  question,
  subtitle,
  options,
  onSelect,
  selectedValue,
}: {
  question: string;
  subtitle: string;
  options: { value: string; label: string; description: string }[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-winter-blue mb-2">{question}</h2>
      <p className="text-gray-500 mb-6">{subtitle}</p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full text-left p-4 border-2 rounded-xl hover:border-winter-blue hover:bg-ice-blue/30 transition group ${
              selectedValue === option.value
                ? "border-winter-blue bg-ice-blue/20"
                : "border-gray-200"
            }`}
          >
            <span className="font-semibold text-gray-900 group-hover:text-winter-blue">
              {option.label}
            </span>
            <span className="block text-sm text-gray-500">
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
