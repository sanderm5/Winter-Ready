export interface CertificateData {
  driverName: string;
  companySlug: string;
  companyName: string;
  companyColor: string;
  riskLevel: "low" | "medium" | "high";
  completedModules: {
    id: string;
    title: string;
    duration: number;
  }[];
  totalDuration: number;
  completionDate: string;
  certificateId: string;
}
