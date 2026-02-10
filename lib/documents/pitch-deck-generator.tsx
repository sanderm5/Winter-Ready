import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { PitchDeckData, DocLocale } from "./document-types";
import { COLORS } from "./shared-styles";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: COLORS.white,
    fontFamily: "Helvetica",
  },
  slideHeader: {
    backgroundColor: COLORS.navyDark,
    paddingHorizontal: 40,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  slideNumber: {
    fontSize: 10,
    color: COLORS.tourismCyan,
  },
  brandSmall: {
    fontSize: 10,
    color: COLORS.tourismCyan,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 40,
    paddingTop: 24,
    flex: 1,
  },
  titleCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  titleBrand: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 10,
  },
  titleSubtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 30,
  },
  titlePartner: {
    fontSize: 14,
    color: COLORS.tourismCyan,
    marginBottom: 4,
  },
  titlePartnerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.tourismCyan,
  },
  titleDate: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 20,
  },
  titleDivider: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.tourismCyan,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 11,
    color: COLORS.tourismCyan,
    marginRight: 8,
    width: 10,
  },
  bulletDotRed: {
    fontSize: 11,
    color: COLORS.accentRed,
    marginRight: 8,
    width: 10,
  },
  bulletText: {
    fontSize: 11,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 1.4,
  },
  gridRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    padding: 14,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.tourismCyan,
  },
  gridCardAlt: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    padding: 14,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.navyDark,
  },
  gridCardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 4,
  },
  gridCardText: {
    fontSize: 9,
    color: COLORS.textDark,
    lineHeight: 1.4,
  },
  threeColRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  threeCol: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.navyDark,
    borderRadius: 8,
  },
  threeColNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.tourismCyan,
    marginBottom: 4,
  },
  threeColTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 6,
  },
  threeColText: {
    fontSize: 9,
    color: "#d1d5db",
    textAlign: "center",
    lineHeight: 1.3,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.navyDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.white,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: COLORS.offWhite,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCell: {
    fontSize: 9,
    color: COLORS.textDark,
  },
  tableCellBold: {
    fontSize: 9,
    color: COLORS.navyDark,
    fontWeight: "bold",
  },
  moduleRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  moduleNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.navyDark,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  moduleNumberArctic: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.tourismCyan,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  moduleNumberText: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.white,
  },
  moduleTitle: {
    fontSize: 11,
    color: COLORS.textDark,
    flex: 1,
  },
  moduleDuration: {
    fontSize: 9,
    color: COLORS.textMuted,
    width: 50,
    textAlign: "right",
  },
  moduleTag: {
    fontSize: 7,
    color: COLORS.tourismCyan,
    fontWeight: "bold",
    marginLeft: 8,
  },
  langGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  langCard: {
    width: "30%",
    backgroundColor: COLORS.offWhite,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  langName: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 2,
  },
  langNative: {
    fontSize: 9,
    color: COLORS.textMuted,
  },
});

// --- Translations ---

const t: Record<string, Record<DocLocale, string>> = {
  subtitle: {
    en: "Safe Winter Driving for International Tourists",
    no: "Trygg vinterkjøring for internasjonale turister",
  },
  preparedFor: { en: "Prepared for", no: "Utarbeidet for" },
  // Slide 2
  slide2Title: { en: "The Challenge", no: "Utfordringen" },
  slide2Intro: {
    en: "Every winter, thousands of international tourists drive in Northern Norway without preparation for conditions they have never experienced. The consequences can be severe.",
    no: "Hver vinter kjører tusenvis av internasjonale turister i Nord-Norge uten forberedelse på forhold de aldri har opplevd. Konsekvensene kan være alvorlige.",
  },
  slide2Callout: {
    en: "Tourists from southern latitudes have no frame of reference for these conditions. Standard driver training does not cover arctic hazards. WinterReady fills this critical safety gap.",
    no: "Turister fra sørlige breddegrader har ingen referanseramme for disse forholdene. Standard føreropplæring dekker ikke arktiske farer. WinterReady fyller dette kritiske sikkerhetsgapet.",
  },
  // Slide 3
  slide3Title: { en: "The Solution", no: "Løsningen" },
  slide3Intro: {
    en: "WinterReady is a digital safety briefing platform that prepares international tourists before they drive in Norwegian winter conditions.",
    no: "WinterReady er en digital sikkerhetsbriefing-plattform som forbereder internasjonale turister før de kjører i norske vinterforhold.",
  },
  assess: { en: "Assess", no: "Vurder" },
  assessDesc: {
    en: "Risk assessment based on driving experience, home country, and destination",
    no: "Risikovurdering basert på kjøreerfaring, hjemland og reisemål",
  },
  educate: { en: "Educate", no: "Opplær" },
  educateDesc: {
    en: "Personalized course from 9 modules adapted to the driver's risk profile",
    no: "Personalisert kurs fra 9 moduler tilpasset sjåførens risikoprofil",
  },
  certify: { en: "Certify", no: "Sertifiser" },
  certifyDesc: {
    en: "Completion certificate for partner companies. Digital proof of safety briefing",
    no: "Fullføringssertifikat for partnerselskaper. Digitalt bevis på sikkerhetsbriefing",
  },
  forPartners: { en: "For Tourism Partners", no: "For turismepartnere" },
  forPartnersDesc: {
    en: "White-label integration with partner branding. QR code access for easy onboarding. Admin dashboard with analytics.",
    no: "White-label integrasjon med partnerbranding. QR-kode for enkel onboarding. Admin-dashboard med analytikk.",
  },
  forTourists: { en: "For Tourists", no: "For turister" },
  forTouristsDesc: {
    en: "Mobile-friendly, available in 6 languages. Takes 2-23 minutes depending on experience. Works offline after initial load.",
    no: "Mobilvennlig, tilgjengelig på 6 språk. Tar 2-23 minutter avhengig av erfaring. Fungerer offline etter første lasting.",
  },
  // Slide 4
  slide4Title: { en: "Built for Arctic Tourism", no: "Bygget for arktisk turisme" },
  auroraTitle: { en: "Aurora Forecast", no: "Nordlysprognose" },
  auroraDesc: {
    en: "Real-time NOAA Kp index integration. Aurora viewing probability calculated from geomagnetic activity and cloud cover for Tromsø coordinates (69.65°N). Updated every 30 minutes.",
    no: "Sanntids NOAA Kp-indeks integrasjon. Nordlys-sannsynlighet beregnet fra geomagnetisk aktivitet og skydekke for Tromsø-koordinater (69.65°N). Oppdateres hvert 30. minutt.",
  },
  avalancheTitle: { en: "Avalanche Warnings", no: "Skredvarsel" },
  avalancheDesc: {
    en: "NVE Varsom avalanche danger levels (1-5) for the Tromsø region. Critical for tourists driving to mountain excursions or aurora viewing spots like Kvaløya and Lyngen.",
    no: "NVE Varsom skredfarenivåer (1-5) for Tromsø-regionen. Kritisk for turister som kjører til fjellekskursjoner eller nordlysspotter som Kvaløya og Lyngen.",
  },
  polarTitle: { en: "Polar Darkness Module", no: "Mørketidsmodul" },
  polarDesc: {
    en: "Specialized driving content for the polar night (mørketid). Headlight strategy, fatigue management, and visibility techniques for driving in continuous darkness.",
    no: "Spesialisert kjøreinnhold for mørketiden. Lysstrategi, tretthetshåndtering og siktteknikker for kjøring i kontinuerlig mørke.",
  },
  oceanTitle: { en: "Ocean Conditions", no: "Havforhold" },
  oceanDesc: {
    en: "Met.no ocean forecast for whale safari safety. Wave height monitoring (safe threshold: under 2m), water temperature, and current speed for Tromsø waters.",
    no: "Met.no havprognose for hvalsafari-sikkerhet. Bølgehøyde-overvåking (trygg terskel: under 2m), vanntemperatur og strømhastighet for Tromsø-farvann.",
  },
  roadMonitoring: {
    en: "Tromsø-specific road monitoring: E6 Nordkjosbotn–Tromsø, E8 Tromsøya Bridge, Rv862 Sommarøy (aurora route), E6 Skibotn/Lyngen, Rv91 Breivikeidet–Svendsby, Kvaløya Coastal Road (northern lights route)",
    no: "Tromsø-spesifikk veiovervåking: E6 Nordkjosbotn–Tromsø, E8 Tromsøya bru, Rv862 Sommarøy (nordlysrute), E6 Skibotn/Lyngen, Rv91 Breivikeidet–Svendsby, Kvaløya kystvei (nordlysrute)",
  },
  // Slide 5
  slide5Title: { en: "Live Norwegian Data Sources", no: "Sanntids norske datakilder" },
  slide5Intro: {
    en: "WinterReady integrates with official Norwegian government data sources to provide tourists with real-time, trustworthy information.",
    no: "WinterReady integrerer med offisielle norske offentlige datakilder for å gi turister sanntids, pålitelig informasjon.",
  },
  thSource: { en: "Source", no: "Kilde" },
  thData: { en: "Data Provided", no: "Data" },
  thFreq: { en: "Update Frequency", no: "Oppdatering" },
  slide5Callout: {
    en: "All data is cached intelligently to balance freshness with performance. Weather updates hourly, aurora forecasts every 30 minutes, road conditions in real-time.",
    no: "All data caches intelligent for å balansere ferskhet med ytelse. Vær oppdateres hver time, nordlysprognoser hvert 30. minutt, veiforhold i sanntid.",
  },
  // Slide 6
  slide6Title: { en: "Serving International Tourists", no: "For internasjonale turister" },
  slide6Intro: {
    en: "Full internationalization across all course content, assessments, emergency information, and the user interface. Tourists access the platform in their native language.",
    no: "Full internasjonalisering av alt kursinnhold, vurderinger, nødinformasjon og brukergrensesnittet. Turister bruker plattformen på sitt eget språk.",
  },
  slide6Callout: {
    en: "Language coverage targets the top tourist nationalities visiting Northern Norway. Additional languages can be added based on Visit Tromsø visitor statistics.",
    no: "Språkdekningen retter seg mot de største turistnasjonalitetene som besøker Nord-Norge. Flere språk kan legges til basert på Visit Tromsø besøksstatistikk.",
  },
  // Slide 7
  slide7Title: { en: "9 Comprehensive Modules", no: "9 omfattende moduler" },
  adaptiveTitle: { en: "Adaptive Learning", no: "Adaptiv læring" },
  adaptiveDesc: {
    en: "Modules are assigned based on the tourist's risk assessment. Experienced winter drivers get a shorter path. First-time arctic visitors complete all 9 modules.",
    no: "Moduler tildeles basert på turistens risikovurdering. Erfarne vinterkjørere får et kortere løp. Førstegangs arktiske besøkende fullfører alle 9 moduler.",
  },
  lowRisk: { en: "Low risk: 2-5 min", no: "Lav risiko: 2-5 min" },
  medRisk: { en: "Medium risk: 10-15 min", no: "Middels risiko: 10-15 min" },
  highRisk: { en: "High risk: 20-23 min", no: "Høy risiko: 20-23 min" },
  arcticNote: {
    en: "All partners automatically include the 3 arctic-specific modules (cyan) for all visitors.",
    no: "Alle partnere inkluderer automatisk de 3 arktisk-spesifikke modulene (cyan) for alle besøkende.",
  },
  // Slide 8
  slide8Title: { en: "Partner Dashboard", no: "Partner-dashboard" },
  slide8Intro: {
    en: "Real-time analytics dashboard for tracking tourist engagement, completion rates, and safety insights.",
    no: "Sanntids analytikk-dashboard for å spore turistengasjement, fullføringsrater og sikkerhetsinnsikt.",
  },
  driverStats: { en: "Driver Statistics", no: "Sjåførstatistikk" },
  driverStatsDesc: {
    en: "Total drivers, completion rates, average course time. Track how many tourists have completed their safety briefing.",
    no: "Totalt antall sjåfører, fullføringsrater, gjennomsnittlig kurstid. Spor hvor mange turister som har fullført sikkerhetsbriefingen.",
  },
  riskDist: { en: "Risk Distribution", no: "Risikofordeling" },
  riskDistDesc: {
    en: "Breakdown of low/medium/high risk drivers. Understand the safety profile of your tourist base.",
    no: "Fordeling av lav/middels/høy risiko sjåfører. Forstå sikkerhetsprofilen til turistbasen din.",
  },
  countryLang: { en: "Country & Language", no: "Land og språk" },
  countryLangDesc: {
    en: "Which countries your tourists come from and which languages they use. Valuable market intelligence for Visit Tromsø.",
    no: "Hvilke land turistene dine kommer fra og hvilke språk de bruker. Verdifull markedsinnsikt for Visit Tromsø.",
  },
  moduleEngagement: { en: "Module Engagement", no: "Modulengasjement" },
  moduleEngagementDesc: {
    en: "Which modules get the most attention. Identifies which safety topics are most relevant to your tourist demographic.",
    no: "Hvilke moduler som får mest oppmerksomhet. Identifiserer hvilke sikkerhetstemaer som er mest relevante for din turistdemografi.",
  },
  qrTitle: { en: "QR Code Access", no: "QR-kode tilgang" },
  qrDesc: {
    en: "Generate branded QR codes for hotels, rental desks, tourist offices, and activity providers. Tourists scan and start their safety briefing immediately.",
    no: "Generer merkede QR-koder for hoteller, utleieskranker, turistkontorer og aktivitetstilbydere. Turister scanner og starter sikkerhetsbriefingen umiddelbart.",
  },
  brandingTitle: { en: "Custom Branding", no: "Tilpasset merkevare" },
  brandingDesc: {
    en: "Partner logo, colors, and custom welcome messages. WinterReady integrates seamlessly with the Visit Tromsø brand identity.",
    no: "Partnerlogo, farger og tilpassede velkomstmeldinger. WinterReady integreres sømløst med Visit Tromsø sin merkevareidentitet.",
  },
  // Slide 9
  slide9Title: { en: "Next Steps", no: "Neste steg" },
  partnershipTitle: { en: "Partnership Opportunities", no: "Partnerskapsmuligheter" },
  closingCta: {
    en: "Let's Make Tromsø the Safest Winter Destination",
    no: "La oss gjøre Tromsø til den tryggeste vinterdestinasjonen",
  },
  closingTagline: {
    en: "WinterReady — Safe Winter Driving for International Tourists",
    no: "WinterReady — Trygg vinterkjøring for internasjonale turister",
  },
};

const problemBullets: Record<DocLocale, string[]> = {
  en: [
    "Polar darkness — no sunrise for 2 months in Tromsø (Nov 21 – Jan 21)",
    "Black ice — invisible, extremely slippery, catches tourists off guard",
    "Reindeer and moose on roads — a 400-500 kg moose collision can be fatal",
    "Extreme cold (-20°C) — batteries fail, windshield washer freezes, hypothermia risk if stranded",
    "Whiteout blizzards — visibility drops to zero in seconds",
    "Mountain roads — steep gradients, single lanes, convoy driving",
  ],
  no: [
    "Polarnatt — ingen soloppgang i 2 måneder i Tromsø (21. nov – 21. jan)",
    "Underkjølt regn og is — usynlig, ekstremt glatt, overrasker turister",
    "Rein og elg i veibanen — kollisjon med en 400-500 kg elg kan være dødelig",
    "Ekstrem kulde (-20°C) — batterier svikter, spylervæske fryser, hypotermifare ved motorstopp",
    "Whiteout/snøstorm — sikten faller til null på sekunder",
    "Fjellveier — bratte stigninger, enfelts veier, kolonnekjøring",
  ],
};

const partnershipBullets: Record<DocLocale, string[]> = {
  en: [
    "White-label integration with Visit Tromsø branding and colors",
    "Dedicated partner portal with custom URL and QR codes",
    "API integration with existing booking and activity systems",
    "Data insights on tourist driving behavior and safety patterns",
    "Co-branded marketing to position Tromsø as a safety-conscious destination",
  ],
  no: [
    "White-label integrasjon med Visit Tromsø merkevare og farger",
    "Dedikert partnerportal med tilpasset URL og QR-koder",
    "API-integrasjon med eksisterende booking- og aktivitetssystemer",
    "Datainnsikt om turisters kjøreatferd og sikkerhetsmønstre",
    "Sambranding for å posisjonere Tromsø som en sikkerhetsorientert destinasjon",
  ],
};

const apiData: Record<
  DocLocale,
  { source: string; data: string; frequency: string }[]
> = {
  en: [
    { source: "Yr.no / Met.no", data: "Temperature, wind, precipitation, weather symbols", frequency: "Hourly" },
    { source: "Statens vegvesen", data: "Road conditions, closures, convoy status", frequency: "Real-time" },
    { source: "NOAA SWPC", data: "Aurora Kp index forecast (0-9 scale)", frequency: "Every 30 min" },
    { source: "NVE Varsom", data: "Avalanche danger level (1-5), region warnings", frequency: "Hourly" },
    { source: "Met.no Ocean", data: "Wave height, water temp, current speed", frequency: "Hourly" },
  ],
  no: [
    { source: "Yr.no / Met.no", data: "Temperatur, vind, nedbør, værsymboler", frequency: "Hver time" },
    { source: "Statens vegvesen", data: "Veiforhold, stengninger, kolonnekjøring", frequency: "Sanntid" },
    { source: "NOAA SWPC", data: "Nordlys Kp-indeks prognose (0-9 skala)", frequency: "Hvert 30. min" },
    { source: "NVE Varsom", data: "Skredfarenivå (1-5), regionvarsler", frequency: "Hver time" },
    { source: "Met.no Ocean", data: "Bølgehøyde, vanntemp., strømhastighet", frequency: "Hver time" },
  ],
};

const courseModules: Record<
  DocLocale,
  { num: number; title: string; duration: string; arctic: boolean }[]
> = {
  en: [
    { num: 1, title: "Winter Driving Basics", duration: "3 min", arctic: false },
    { num: 2, title: "Braking on Ice & Snow", duration: "2 min", arctic: false },
    { num: 3, title: "Black Ice Awareness", duration: "2 min", arctic: false },
    { num: 4, title: "Mountain & Fjord Driving", duration: "3 min", arctic: false },
    { num: 5, title: "Norwegian Traffic Rules", duration: "2 min", arctic: false },
    { num: 6, title: "Emergency Procedures", duration: "2 min", arctic: false },
    { num: 7, title: "Driving in Polar Darkness", duration: "3 min", arctic: true },
    { num: 8, title: "Wildlife on Arctic Roads", duration: "3 min", arctic: true },
    { num: 9, title: "Driving in Arctic Weather", duration: "3 min", arctic: true },
  ],
  no: [
    { num: 1, title: "Grunnleggende vinterkjøring", duration: "3 min", arctic: false },
    { num: 2, title: "Bremsing på is og snø", duration: "2 min", arctic: false },
    { num: 3, title: "Underkjølt regn og is", duration: "2 min", arctic: false },
    { num: 4, title: "Fjell- og fjordkjøring", duration: "3 min", arctic: false },
    { num: 5, title: "Norske trafikkregler", duration: "2 min", arctic: false },
    { num: 6, title: "Nødprosedyrer", duration: "2 min", arctic: false },
    { num: 7, title: "Kjøring i mørketiden", duration: "3 min", arctic: true },
    { num: 8, title: "Dyreliv på arktiske veier", duration: "3 min", arctic: true },
    { num: 9, title: "Kjøring i arktisk vær", duration: "3 min", arctic: true },
  ],
};

const languages: Record<DocLocale, { name: string; native: string }[]> = {
  en: [
    { name: "Norwegian", native: "Norsk" },
    { name: "English", native: "English" },
    { name: "German", native: "Deutsch" },
    { name: "French", native: "Français" },
    { name: "Spanish", native: "Español" },
    { name: "Chinese", native: "中文" },
  ],
  no: [
    { name: "Norsk", native: "Norsk" },
    { name: "Engelsk", native: "English" },
    { name: "Tysk", native: "Deutsch" },
    { name: "Fransk", native: "Français" },
    { name: "Spansk", native: "Español" },
    { name: "Kinesisk", native: "中文" },
  ],
};

function SlideHeader({
  title,
  slideNumber,
  total,
}: {
  title: string;
  slideNumber: number;
  total: number;
}) {
  return (
    <View style={styles.slideHeader}>
      <Text style={styles.slideTitle}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={styles.brandSmall}>WinterReady</Text>
        <Text style={styles.slideNumber}>
          {slideNumber} / {total}
        </Text>
      </View>
    </View>
  );
}

const TOTAL_SLIDES = 9;

export function PitchDeckDocument({ data }: { data: PitchDeckData }) {
  const locale = data.locale;
  const formattedDate = new Date(data.generatedDate).toLocaleDateString(
    locale === "no" ? "nb-NO" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const partnerName = data.partnerName || "Visit Tromsø";

  return (
    <Document>
      {/* Slide 1: Title */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.titleCenter}>
          <Text style={styles.titleBrand}>WinterReady</Text>
          <Text style={styles.titleSubtitle}>{t.subtitle[locale]}</Text>
          <View style={styles.titleDivider} />
          <Text style={styles.titlePartner}>{t.preparedFor[locale]}</Text>
          <Text style={styles.titlePartnerName}>{partnerName}</Text>
          <Text style={styles.titleDate}>{formattedDate}</Text>
        </View>
      </Page>

      {/* Slide 2: The Problem */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide2Title[locale]} slideNumber={2} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>{t.slide2Intro[locale]}</Text>
          <View style={{ marginTop: 8 }}>
            {problemBullets[locale].map((item, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDotRed}>!</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: 16,
              backgroundColor: COLORS.offWhite,
              padding: 12,
              borderRadius: 6,
              borderLeftWidth: 3,
              borderLeftColor: COLORS.accentRed,
            }}
          >
            <Text style={{ fontSize: 10, color: COLORS.textDark, lineHeight: 1.5 }}>
              {t.slide2Callout[locale]}
            </Text>
          </View>
        </View>
      </Page>

      {/* Slide 3: The Solution */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide3Title[locale]} slideNumber={3} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>{t.slide3Intro[locale]}</Text>
          <View style={styles.threeColRow}>
            <View style={styles.threeCol}>
              <Text style={styles.threeColNumber}>1</Text>
              <Text style={styles.threeColTitle}>{t.assess[locale]}</Text>
              <Text style={styles.threeColText}>{t.assessDesc[locale]}</Text>
            </View>
            <View style={styles.threeCol}>
              <Text style={styles.threeColNumber}>2</Text>
              <Text style={styles.threeColTitle}>{t.educate[locale]}</Text>
              <Text style={styles.threeColText}>{t.educateDesc[locale]}</Text>
            </View>
            <View style={styles.threeCol}>
              <Text style={styles.threeColNumber}>3</Text>
              <Text style={styles.threeColTitle}>{t.certify[locale]}</Text>
              <Text style={styles.threeColText}>{t.certifyDesc[locale]}</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCardAlt}>
              <Text style={styles.gridCardTitle}>{t.forPartners[locale]}</Text>
              <Text style={styles.gridCardText}>{t.forPartnersDesc[locale]}</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.forTourists[locale]}</Text>
              <Text style={styles.gridCardText}>{t.forTouristsDesc[locale]}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Slide 4: Tourism Features */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide4Title[locale]} slideNumber={4} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.auroraTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.auroraDesc[locale]}</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.avalancheTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.avalancheDesc[locale]}</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.polarTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.polarDesc[locale]}</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.oceanTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.oceanDesc[locale]}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.lightCyan,
              padding: 10,
              borderRadius: 6,
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 9, color: COLORS.navyDark }}>
              {t.roadMonitoring[locale]}
            </Text>
          </View>
        </View>
      </Page>

      {/* Slide 5: Real-Time Data */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide5Title[locale]} slideNumber={5} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>{t.slide5Intro[locale]}</Text>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: "25%" }]}>{t.thSource[locale]}</Text>
              <Text style={[styles.tableHeaderText, { width: "50%" }]}>{t.thData[locale]}</Text>
              <Text style={[styles.tableHeaderText, { width: "25%" }]}>{t.thFreq[locale]}</Text>
            </View>
            {apiData[locale].map((row, i) => (
              <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={[styles.tableCellBold, { width: "25%" }]}>{row.source}</Text>
                <Text style={[styles.tableCell, { width: "50%" }]}>{row.data}</Text>
                <Text style={[styles.tableCell, { width: "25%" }]}>{row.frequency}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: 16,
              backgroundColor: COLORS.offWhite,
              padding: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 10, color: COLORS.textDark, lineHeight: 1.5 }}>
              {t.slide5Callout[locale]}
            </Text>
          </View>
        </View>
      </Page>

      {/* Slide 6: Multi-Language */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide6Title[locale]} slideNumber={6} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>{t.slide6Intro[locale]}</Text>
          <View style={styles.langGrid}>
            {languages[locale].map((lang, i) => (
              <View key={i} style={styles.langCard}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langNative}>{lang.native}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: 16,
              backgroundColor: COLORS.lightBlue,
              padding: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 10, color: COLORS.navyDark, lineHeight: 1.5 }}>
              {t.slide6Callout[locale]}
            </Text>
          </View>
        </View>
      </Page>

      {/* Slide 7: Course Content */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide7Title[locale]} slideNumber={7} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <View style={{ flexDirection: "row", gap: 24 }}>
            <View style={{ flex: 1 }}>
              {courseModules[locale].map((mod) => (
                <View key={mod.num} style={styles.moduleRow}>
                  <View style={mod.arctic ? styles.moduleNumberArctic : styles.moduleNumber}>
                    <Text style={styles.moduleNumberText}>{mod.num}</Text>
                  </View>
                  <Text style={styles.moduleTitle}>{mod.title}</Text>
                  {mod.arctic && <Text style={styles.moduleTag}>ARCTIC</Text>}
                  <Text style={styles.moduleDuration}>{mod.duration}</Text>
                </View>
              ))}
            </View>
            <View style={{ width: 200 }}>
              <View
                style={{
                  backgroundColor: COLORS.navyDark,
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: COLORS.white,
                    marginBottom: 8,
                  }}
                >
                  {t.adaptiveTitle[locale]}
                </Text>
                <Text style={{ fontSize: 9, color: "#d1d5db", lineHeight: 1.4 }}>
                  {t.adaptiveDesc[locale]}
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 9, color: COLORS.tourismCyan, fontWeight: "bold" }}>
                    {t.lowRisk[locale]}
                  </Text>
                  <Text style={{ fontSize: 9, color: COLORS.accentOrange, fontWeight: "bold" }}>
                    {t.medRisk[locale]}
                  </Text>
                  <Text style={{ fontSize: 9, color: COLORS.accentRed, fontWeight: "bold" }}>
                    {t.highRisk[locale]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 8,
                  backgroundColor: COLORS.lightCyan,
                  padding: 12,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 9, color: COLORS.navyDark, fontWeight: "bold" }}>
                  {t.arcticNote[locale]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* Slide 8: Partner Dashboard */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide8Title[locale]} slideNumber={8} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>{t.slide8Intro[locale]}</Text>
          <View style={styles.gridRow}>
            <View style={styles.gridCardAlt}>
              <Text style={styles.gridCardTitle}>{t.driverStats[locale]}</Text>
              <Text style={styles.gridCardText}>{t.driverStatsDesc[locale]}</Text>
            </View>
            <View style={styles.gridCardAlt}>
              <Text style={styles.gridCardTitle}>{t.riskDist[locale]}</Text>
              <Text style={styles.gridCardText}>{t.riskDistDesc[locale]}</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCardAlt}>
              <Text style={styles.gridCardTitle}>{t.countryLang[locale]}</Text>
              <Text style={styles.gridCardText}>{t.countryLangDesc[locale]}</Text>
            </View>
            <View style={styles.gridCardAlt}>
              <Text style={styles.gridCardTitle}>{t.moduleEngagement[locale]}</Text>
              <Text style={styles.gridCardText}>{t.moduleEngagementDesc[locale]}</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.qrTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.qrDesc[locale]}</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{t.brandingTitle[locale]}</Text>
              <Text style={styles.gridCardText}>{t.brandingDesc[locale]}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Slide 9: Next Steps */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <SlideHeader title={t.slide9Title[locale]} slideNumber={9} total={TOTAL_SLIDES} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t.partnershipTitle[locale]}</Text>
          {partnershipBullets[locale].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.navyDark,
              padding: 20,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.white,
                marginBottom: 8,
              }}
            >
              {t.closingCta[locale]}
            </Text>
            {data.contactName && (
              <Text style={{ fontSize: 11, color: COLORS.tourismCyan }}>
                {data.contactName}
                {data.contactEmail ? ` — ${data.contactEmail}` : ""}
              </Text>
            )}
            <Text style={{ fontSize: 10, color: "#d1d5db", marginTop: 8 }}>
              {t.closingTagline[locale]}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
