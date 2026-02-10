import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { CertificateData } from "./certificate-types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1e3a5f",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brandName: {
    fontSize: 14,
    color: "#1e3a5f",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e3a5f",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666666",
    marginBottom: 30,
  },
  driverName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e3a5f",
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0f2fe",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: "#333333",
    marginBottom: 30,
  },
  detailsBox: {
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 10,
    color: "#666666",
    width: 120,
  },
  detailValue: {
    fontSize: 10,
    color: "#333333",
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  modulesSection: {
    marginBottom: 20,
  },
  moduleTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 8,
  },
  moduleList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  moduleItem: {
    fontSize: 9,
    backgroundColor: "#e0f2fe",
    color: "#1e3a5f",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  certificateId: {
    fontSize: 8,
    color: "#9ca3af",
  },
  date: {
    fontSize: 10,
    color: "#666666",
  },
});

const riskColors = {
  low: "#16a34a",
  medium: "#f97316",
  high: "#dc2626",
};

const riskLabels = {
  low: "LOW RISK",
  medium: "MEDIUM RISK",
  high: "HIGH RISK",
};

export function CertificateDocument({ data }: { readonly data: CertificateData }) {
  const formattedDate = new Date(data.completionDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.companyName, { color: data.companyColor }]}>
            {data.companyName}
          </Text>
          <Text style={styles.brandName}>WinterReady</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          ARCTIC READY CERTIFICATE
        </Text>
        <Text style={styles.subtitle}>
          Arctic Winter Safety Course
        </Text>

        {/* Driver Name */}
        <Text style={styles.driverName}>{data.driverName}</Text>

        {/* Description */}
        <Text style={styles.description}>
          has successfully completed the WinterReady Arctic Winter Safety Course and is prepared for a safe and memorable Arctic adventure in Northern Norway.
        </Text>

        {/* Details Box */}
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>Course Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Risk Assessment:</Text>
            <View
              style={[
                styles.riskBadge,
                { backgroundColor: riskColors[data.riskLevel] },
              ]}
            >
              <Text>{riskLabels[data.riskLevel]}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Course Duration:</Text>
            <Text style={styles.detailValue}>
              {data.totalDuration} minutes
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Completion Date:</Text>
            <Text style={styles.detailValue}>{formattedDate}</Text>
          </View>

          {/* Modules */}
          <View style={styles.modulesSection}>
            <Text style={styles.moduleTitle}>Completed Modules:</Text>
            <View style={styles.moduleList}>
              {data.completedModules.map((module) => (
                <Text key={module.id} style={styles.moduleItem}>
                  {module.title}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.certificateId}>
            Certificate ID: {data.certificateId}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}
