import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { OnePagerData, DocLocale } from "./document-types";
import { COLORS } from "./shared-styles";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: COLORS.white,
    fontFamily: "Helvetica",
  },
  headerBand: {
    backgroundColor: COLORS.navyDark,
    paddingHorizontal: 40,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerSubtext: {
    fontSize: 11,
    color: COLORS.tourismCyan,
  },
  content: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  problemSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 6,
  },
  problemText: {
    fontSize: 9.5,
    color: COLORS.textDark,
    lineHeight: 1.5,
  },
  columnsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  column: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    padding: 14,
    borderRadius: 6,
  },
  columnTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.tourismCyan,
  },
  columnTitleAlt: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.navyDark,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 9,
    color: COLORS.tourismCyan,
    marginRight: 5,
    width: 8,
  },
  bulletText: {
    fontSize: 9,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 1.4,
  },
  dataSourcesSection: {
    backgroundColor: COLORS.lightBlue,
    padding: 14,
    borderRadius: 6,
    marginBottom: 14,
  },
  dataSourcesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 8,
  },
  dataSourcesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  dataSourceBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.tourismCyan,
  },
  dataSourceName: {
    fontSize: 8,
    fontWeight: "bold",
    color: COLORS.navyDark,
  },
  dataSourceDesc: {
    fontSize: 7,
    color: COLORS.textMuted,
  },
  languageSection: {
    backgroundColor: COLORS.lightCyan,
    padding: 12,
    borderRadius: 6,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  languageLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginRight: 8,
  },
  languageText: {
    fontSize: 9,
    color: COLORS.textDark,
    flex: 1,
  },
  numbersRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  numberBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.navyDark,
    borderRadius: 6,
  },
  numberValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.tourismCyan,
  },
  numberLabel: {
    fontSize: 8,
    color: COLORS.white,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footerLeft: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  footerRight: {
    fontSize: 8,
    color: COLORS.navyDark,
    fontWeight: "bold",
  },
});

const t: Record<string, Record<DocLocale, string>> = {
  subtitle: {
    en: "Safe Winter Driving for International Tourists",
    no: "Trygg vinterkjøring for internasjonale turister",
  },
  preparedFor: { en: "Prepared for", no: "Utarbeidet for" },
  challengeTitle: {
    en: "The Challenge: Tourist Safety in Arctic Winter",
    no: "Utfordringen: Turistsikkerhet i arktisk vinter",
  },
  challengeText: {
    en: "Every winter, thousands of international tourists drive in Northern Norway without preparation for polar darkness, black ice, reindeer on roads, and extreme cold. WinterReady is a digital safety briefing platform that prepares foreign drivers before they get behind the wheel — reducing risk and improving the tourist experience.",
    no: "Hver vinter kjører tusenvis av internasjonale turister i Nord-Norge uten forberedelse på polarnatt, is på veien, rein i veibanen og ekstrem kulde. WinterReady er en digital sikkerhetsbriefing-plattform som forbereder utenlandske sjåfører før de setter seg bak rattet — reduserer risiko og forbedrer turistopplevelsen.",
  },
  courseModules: { en: "Course Modules", no: "Kursmoduler" },
  languages: { en: "Languages", no: "Språk" },
  liveDataSources: { en: "Live Data Sources", no: "Sanntids datakilder" },
  arcticModules: { en: "Arctic-Specific Modules", no: "Arktisk-spesifikke moduler" },
  platformFeatures: { en: "Platform Features", no: "Plattformfunksjoner" },
  tourismSpecific: {
    en: "Tourism-Specific for Tromsø",
    no: "Turismespesifikt for Tromsø",
  },
  dataIntegrations: {
    en: "Live Norwegian Data Integrations",
    no: "Sanntids norske dataintegrasjoner",
  },
  langLabel: { en: "6 Languages:", no: "6 språk:" },
  langList: {
    en: "Norwegian • English • German • French • Spanish • Chinese",
    no: "Norsk • Engelsk • Tysk • Fransk • Spansk • Kinesisk",
  },
  contact: { en: "Contact", no: "Kontakt" },
};

const platformFeatures: Record<DocLocale, string[]> = {
  en: [
    "Adaptive risk assessment based on driver experience",
    "Personalized course path (9 modules, 2-23 min)",
    "Real-time weather and road condition data",
    "Completion certificate (PDF)",
    "Progressive Web App with offline support",
    "Admin dashboard with analytics",
  ],
  no: [
    "Adaptiv risikovurdering basert på sjåførerfaring",
    "Personalisert kursløp (9 moduler, 2-23 min)",
    "Sanntids vær- og veistatus-data",
    "Fullføringssertifikat (PDF)",
    "Progressiv webapp med offline-støtte",
    "Admin-dashboard med analytikk",
  ],
};

const tourismFeatures: Record<DocLocale, string[]> = {
  en: [
    "Aurora forecast (NOAA Kp index + cloud cover)",
    "Avalanche warnings (NVE Varsom danger levels)",
    "Polar darkness driving module (mørketid)",
    "Wildlife hazard awareness (reindeer, moose)",
    "Arctic weather driving (whiteout, extreme cold)",
    "Ocean conditions for whale safari safety",
  ],
  no: [
    "Nordlysprognose (NOAA Kp-indeks + skydekke)",
    "Skredvarsel (NVE Varsom faregrad)",
    "Kjøremodul for mørketid (polarnatt)",
    "Dyrelivsfare (rein, elg i veibanen)",
    "Arktisk værkjøring (whiteout, ekstrem kulde)",
    "Havforhold for hvalsafari-sikkerhet",
  ],
};

const dataSources: Record<DocLocale, { name: string; desc: string }[]> = {
  en: [
    { name: "Yr.no / Met.no", desc: "Weather" },
    { name: "Statens vegvesen", desc: "Road status" },
    { name: "NOAA SWPC", desc: "Aurora" },
    { name: "NVE Varsom", desc: "Avalanche" },
    { name: "Met.no Ocean", desc: "Ocean" },
  ],
  no: [
    { name: "Yr.no / Met.no", desc: "Vær" },
    { name: "Statens vegvesen", desc: "Veistatus" },
    { name: "NOAA SWPC", desc: "Nordlys" },
    { name: "NVE Varsom", desc: "Skredvarsel" },
    { name: "Met.no Ocean", desc: "Havforhold" },
  ],
};

export function OnePagerDocument({ data }: { data: OnePagerData }) {
  const locale = data.locale;
  const formattedDate = new Date(data.generatedDate).toLocaleDateString(
    locale === "no" ? "nb-NO" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBand}>
          <View>
            <Text style={styles.brandName}>WinterReady</Text>
            <Text style={styles.headerSubtext}>{t.subtitle[locale]}</Text>
          </View>
          <View>
            <Text style={styles.headerSubtext}>{t.preparedFor[locale]}</Text>
            <Text
              style={[
                styles.brandName,
                { fontSize: 16, color: COLORS.tourismCyan },
              ]}
            >
              Visit Tromsø
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Problem */}
          <View style={styles.problemSection}>
            <Text style={styles.sectionTitle}>
              {t.challengeTitle[locale]}
            </Text>
            <Text style={styles.problemText}>{t.challengeText[locale]}</Text>
          </View>

          {/* Key numbers */}
          <View style={styles.numbersRow}>
            <View style={styles.numberBox}>
              <Text style={styles.numberValue}>9</Text>
              <Text style={styles.numberLabel}>
                {t.courseModules[locale]}
              </Text>
            </View>
            <View style={styles.numberBox}>
              <Text style={styles.numberValue}>6</Text>
              <Text style={styles.numberLabel}>{t.languages[locale]}</Text>
            </View>
            <View style={styles.numberBox}>
              <Text style={styles.numberValue}>5</Text>
              <Text style={styles.numberLabel}>
                {t.liveDataSources[locale]}
              </Text>
            </View>
            <View style={styles.numberBox}>
              <Text style={styles.numberValue}>3</Text>
              <Text style={styles.numberLabel}>
                {t.arcticModules[locale]}
              </Text>
            </View>
          </View>

          {/* Two columns */}
          <View style={styles.columnsRow}>
            <View style={styles.column}>
              <Text style={styles.columnTitleAlt}>
                {t.platformFeatures[locale]}
              </Text>
              {platformFeatures[locale].map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: COLORS.navyDark }]}>
                    •
                  </Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>
                {t.tourismSpecific[locale]}
              </Text>
              {tourismFeatures[locale].map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Data sources */}
          <View style={styles.dataSourcesSection}>
            <Text style={styles.dataSourcesTitle}>
              {t.dataIntegrations[locale]}
            </Text>
            <View style={styles.dataSourcesRow}>
              {dataSources[locale].map((source, i) => (
                <View key={i} style={styles.dataSourceBadge}>
                  <Text style={styles.dataSourceName}>{source.name}</Text>
                  <Text style={styles.dataSourceDesc}>{source.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={styles.languageSection}>
            <Text style={styles.languageLabel}>{t.langLabel[locale]}</Text>
            <Text style={styles.languageText}>{t.langList[locale]}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLeft}>
              {data.contactName
                ? `${t.contact[locale]}: ${data.contactName}${data.contactEmail ? ` — ${data.contactEmail}` : ""}`
                : formattedDate}
            </Text>
            {data.contactName && (
              <Text style={styles.footerLeft}>{formattedDate}</Text>
            )}
          </View>
          <Text style={styles.footerRight}>WinterReady</Text>
        </View>
      </Page>
    </Document>
  );
}
