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
    title: "Nødnumre",
    police: "Politi",
    policeDesc: "Kriminalitet, trafikkulykker",
    ambulance: "Ambulanse",
    ambulanceDesc: "Medisinsk nødstilfelle",
    fire: "Brann",
    fireDesc: "Brann og redning",
    roadside: "Veihjelp",
    roadsideDesc: "Viking bilberging",
    close: "Lukk",
    callNow: "Ring nå",
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
    policeDesc: "Kriminalität, Verkehrsunfälle",
    ambulance: "Krankenwagen",
    ambulanceDesc: "Medizinischer Notfall",
    fire: "Feuerwehr",
    fireDesc: "Brand und Rettung",
    roadside: "Pannenhilfe",
    roadsideDesc: "Viking Pannendienst",
    close: "Schließen",
    callNow: "Jetzt anrufen",
  },
  fr: {
    title: "Numéros d'urgence",
    police: "Police",
    policeDesc: "Crime, accidents de la route",
    ambulance: "Ambulance",
    ambulanceDesc: "Urgence médicale",
    fire: "Pompiers",
    fireDesc: "Incendie et secours",
    roadside: "Assistance routière",
    roadsideDesc: "Dépannage Viking",
    close: "Fermer",
    callNow: "Appeler",
  },
  es: {
    title: "Números de emergencia",
    police: "Policía",
    policeDesc: "Crimen, accidentes de tráfico",
    ambulance: "Ambulancia",
    ambulanceDesc: "Emergencia médica",
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
