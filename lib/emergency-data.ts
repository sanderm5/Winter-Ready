export interface EmergencyNumber {
  id: string;
  number: string;
  labelKey: string;
  descriptionKey: string;
  color: string;
  icon: "police" | "ambulance" | "fire" | "roadside";
}

export const emergencyNumbers: EmergencyNumber[] = [
  {
    id: "police",
    number: "112",
    labelKey: "emergency.police",
    descriptionKey: "emergency.policeDesc",
    color: "blue",
    icon: "police",
  },
  {
    id: "ambulance",
    number: "113",
    labelKey: "emergency.ambulance",
    descriptionKey: "emergency.ambulanceDesc",
    color: "red",
    icon: "ambulance",
  },
  {
    id: "fire",
    number: "110",
    labelKey: "emergency.fire",
    descriptionKey: "emergency.fireDesc",
    color: "orange",
    icon: "fire",
  },
  {
    id: "roadside",
    number: "06000",
    labelKey: "emergency.roadside",
    descriptionKey: "emergency.roadsideDesc",
    color: "yellow",
    icon: "roadside",
  },
];

export const emergencyTranslations = {
  no: {
    title: "Nodnumre",
    police: "Politi",
    policeDesc: "Kriminalitet, trafikkulykker",
    ambulance: "Ambulanse",
    ambulanceDesc: "Medisinsk nodstilfelle",
    fire: "Brann",
    fireDesc: "Brann og redning",
    roadside: "Veihjelp",
    roadsideDesc: "Viking bilberging",
    close: "Lukk",
    callNow: "Ring na",
  },
  en: {
    title: "Emergency Numbers",
    police: "Police",
    policeDesc: "Crime, traffic accidents",
    ambulance: "Ambulance",
    ambulanceDesc: "Medical emergency",
    fire: "Fire",
    fireDesc: "Fire and rescue",
    roadside: "Roadside Assistance",
    roadsideDesc: "Viking roadside help",
    close: "Close",
    callNow: "Call now",
  },
  de: {
    title: "Notrufnummern",
    police: "Polizei",
    policeDesc: "Kriminalitat, Verkehrsunfalle",
    ambulance: "Krankenwagen",
    ambulanceDesc: "Medizinischer Notfall",
    fire: "Feuerwehr",
    fireDesc: "Brand und Rettung",
    roadside: "Pannenhilfe",
    roadsideDesc: "Viking Pannendienst",
    close: "Schliessen",
    callNow: "Jetzt anrufen",
  },
  fr: {
    title: "Numeros d'urgence",
    police: "Police",
    policeDesc: "Crime, accidents de la route",
    ambulance: "Ambulance",
    ambulanceDesc: "Urgence medicale",
    fire: "Pompiers",
    fireDesc: "Incendie et secours",
    roadside: "Assistance routiere",
    roadsideDesc: "Depannage Viking",
    close: "Fermer",
    callNow: "Appeler",
  },
  es: {
    title: "Numeros de emergencia",
    police: "Policia",
    policeDesc: "Crimen, accidentes de trafico",
    ambulance: "Ambulancia",
    ambulanceDesc: "Emergencia medica",
    fire: "Bomberos",
    fireDesc: "Incendio y rescate",
    roadside: "Asistencia en carretera",
    roadsideDesc: "Asistencia Viking",
    close: "Cerrar",
    callNow: "Llamar ahora",
  },
  zh: {
    title: "紧急电话",
    police: "警察",
    policeDesc: "犯罪、交通事故",
    ambulance: "急救",
    ambulanceDesc: "医疗紧急情况",
    fire: "消防",
    fireDesc: "火灾与救援",
    roadside: "道路救援",
    roadsideDesc: "Viking道路救援",
    close: "关闭",
    callNow: "立即拨打",
  },
};

export type EmergencyLocale = keyof typeof emergencyTranslations;
