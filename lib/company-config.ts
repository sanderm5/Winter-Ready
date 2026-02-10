export interface CompanyBranding {
  name: string;
  color: string;
  primaryDestination?: { name: string; lat: number; lon: number };
}

export const companyBranding: Record<string, CompanyBranding> = {
  demo: {
    name: "Demo",
    color: "#2e3440", // Polar Night - Nord-Nordic theme
    primaryDestination: { name: "Tromsø", lat: 69.6496, lon: 18.956 },
  },
  "tourism-demo": {
    name: "WinterReady Tourism",
    color: "#0891B2",
    primaryDestination: { name: "Tromsø", lat: 69.6496, lon: 18.956 },
  },
};

export function getCompanyBranding(slug: string): CompanyBranding {
  return (
    companyBranding[slug.toLowerCase()] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      color: "#2e3440", // Polar Night - Nord-Nordic theme
    }
  );
}