export type DocLocale = "en" | "no";

export interface OnePagerData {
  generatedDate: string;
  locale: DocLocale;
  contactName?: string;
  contactEmail?: string;
}

export interface PitchDeckData {
  generatedDate: string;
  locale: DocLocale;
  partnerName?: string;
  contactName?: string;
  contactEmail?: string;
}

export interface TechOverviewData {
  generatedDate: string;
  locale: DocLocale;
  contactName?: string;
  contactEmail?: string;
}
