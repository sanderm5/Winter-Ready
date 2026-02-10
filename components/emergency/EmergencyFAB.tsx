"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  emergencyNumbers,
  emergencyTranslations,
  type EmergencyLocale,
} from "@/lib/emergency-data";

export default function EmergencyFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as EmergencyLocale;
  const t = emergencyTranslations[locale] || emergencyTranslations.en;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "police":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "ambulance":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "fire":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        );
      case "roadside":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; hover: string; text: string }> = {
      blue: { bg: "bg-blue-600", hover: "hover:bg-blue-700", text: "text-blue-400" },
      red: { bg: "bg-red-600", hover: "hover:bg-red-700", text: "text-red-400" },
      orange: { bg: "bg-orange-600", hover: "hover:bg-orange-700", text: "text-orange-400" },
      yellow: { bg: "bg-yellow-600", hover: "hover:bg-yellow-700", text: "text-yellow-400" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-red-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t.title}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </motion.button>

      {/* Overlay and Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 rounded-t-3xl p-6 pb-8 max-h-[80vh] overflow-y-auto"
            >
              {/* Handle */}
              <div className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  {t.title}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label={t.close}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Emergency Numbers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emergencyNumbers.map((emergency, index) => {
                  const colors = getColorClasses(emergency.color);
                  const label = t[emergency.id as keyof typeof t] || emergency.id;
                  const desc = t[`${emergency.id}Desc` as keyof typeof t] || "";

                  return (
                    <motion.a
                      key={emergency.id}
                      href={`tel:${emergency.number}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-all group`}
                    >
                      <div className={`w-12 h-12 ${colors.bg} ${colors.hover} rounded-xl flex items-center justify-center text-white transition-colors`}>
                        {getIcon(emergency.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{emergency.number}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-300">{label}</p>
                        <p className="text-xs text-slate-400 truncate">{desc}</p>
                      </div>
                      <div className={`${colors.text} group-hover:translate-x-1 transition-transform`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Safety tip */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-sm text-blue-300 text-center">
                  {locale === "no" && "Disse numrene fungerer selv uten mobildekning via nodnettet."}
                  {locale === "en" && "These numbers work even without mobile coverage via emergency network."}
                  {locale === "de" && "Diese Nummern funktionieren auch ohne Mobilfunkempfang uber das Notfallnetz."}
                  {locale === "fr" && "Ces numeros fonctionnent meme sans couverture mobile via le reseau d'urgence."}
                  {locale === "es" && "Estos numeros funcionan incluso sin cobertura movil a traves de la red de emergencia."}
                  {locale === "zh" && "即使没有手机信号，这些号码也可以通过紧急网络拨打。"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
