import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { TechOverviewData, DocLocale } from "./document-types";
import { COLORS } from "./shared-styles";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: COLORS.white,
    fontFamily: "Helvetica",
  },
  pageHeader: {
    backgroundColor: COLORS.navyDark,
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderTitle: {
    fontSize: 10,
    color: COLORS.tourismCyan,
    fontWeight: "bold",
  },
  pageHeaderBrand: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  coverCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  coverBrand: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 10,
  },
  coverTitle: {
    fontSize: 20,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 30,
  },
  coverDivider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.tourismCyan,
    marginVertical: 16,
  },
  coverDate: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.tourismCyan,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 6,
    marginTop: 12,
  },
  bodyText: {
    fontSize: 9.5,
    color: COLORS.textDark,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 9,
    color: COLORS.tourismCyan,
    marginRight: 6,
    width: 8,
  },
  bulletText: {
    fontSize: 9,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 1.4,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    padding: 10,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.tourismCyan,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 3,
  },
  cardText: {
    fontSize: 8.5,
    color: COLORS.textDark,
    lineHeight: 1.4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.navyDark,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    color: COLORS.white,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: COLORS.offWhite,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCell: {
    fontSize: 8,
    color: COLORS.textDark,
  },
  tableCellBold: {
    fontSize: 8,
    color: COLORS.navyDark,
    fontWeight: "bold",
  },
  tableCellMono: {
    fontSize: 7,
    color: COLORS.textMuted,
    fontFamily: "Courier",
  },
  infoBox: {
    backgroundColor: COLORS.lightBlue,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  infoBoxText: {
    fontSize: 8.5,
    color: COLORS.navyDark,
    lineHeight: 1.4,
  },
  techBadge: {
    backgroundColor: COLORS.navyDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  techBadgeText: {
    fontSize: 8,
    color: COLORS.white,
    fontWeight: "bold",
  },
  techBadgeDesc: {
    fontSize: 7,
    color: "#d1d5db",
  },
  pageFooter: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footerText: {
    fontSize: 7,
    color: COLORS.textLight,
  },
  footerBrand: {
    fontSize: 7,
    color: COLORS.navyDark,
    fontWeight: "bold",
  },
});

// --- Translations ---

const t: Record<string, Record<DocLocale, string>> = {
  coverTitle: { en: "Technical Overview", no: "Teknisk oversikt" },
  coverSubtitle: {
    en: "System Architecture & Integration Guide",
    no: "Systemarkitektur og integrasjonsguide",
  },
  brandHeader: {
    en: "WinterReady Technical Overview",
    no: "WinterReady teknisk oversikt",
  },
  confidential: { en: "Confidential — WinterReady", no: "Konfidensielt — WinterReady" },
  page: { en: "Page", no: "Side" },
  // Page 2
  techStackHeader: { en: "Technology Stack", no: "Teknologistakk" },
  coreTechStack: { en: "Core Technology Stack", no: "Kjerneteknologi" },
  coreTechDesc: {
    en: "WinterReady is built on modern web technologies optimized for performance, reliability, and developer experience.",
    no: "WinterReady er bygget på moderne webteknologier optimalisert for ytelse, pålitelighet og utvikleropplevelse.",
  },
  appArchTitle: { en: "Application Architecture", no: "Applikasjonsarkitektur" },
  appRouterTitle: { en: "App Router (Next.js 14)", no: "App Router (Next.js 14)" },
  appRouterDesc: {
    en: "File-based routing with dynamic segments for locale and company. Pattern: /[locale]/[company]/course/[moduleId]. Server components for static pages, client components for interactive modules.",
    no: "Filbasert ruting med dynamiske segmenter for språk og selskap. Mønster: /[locale]/[company]/course/[moduleId]. Server-komponenter for statiske sider, klient-komponenter for interaktive moduler.",
  },
  apiLayerTitle: { en: "API Layer", no: "API-lag" },
  apiLayerDesc: {
    en: "Next.js Route Handlers for external API integration. Stateless endpoints with intelligent caching (revalidate). Server-side PDF generation via renderToBuffer.",
    no: "Next.js Route Handlers for ekstern API-integrasjon. Tilstandsløse endepunkter med intelligent caching (revalidate). Server-side PDF-generering via renderToBuffer.",
  },
  partnerRoutingTitle: { en: "Partner Routing Model", no: "Partner-rutingsmodell" },
  partnerRoutingDesc: {
    en: "Each partner gets a dedicated URL namespace via dynamic routing:",
    no: "Hver partner får et dedikert URL-navnerom via dynamisk ruting:",
  },
  brandingConfigTitle: { en: "CompanyBranding Configuration", no: "CompanyBranding-konfigurasjon" },
  brandingConfigDesc: {
    en: "Tourism partners include a primary destination (Tromsø: 69.6496°N, 18.956°E) used for weather, aurora, and road condition lookups.",
    no: "Turismepartnere inkluderer en primærdestinasjon (Tromsø: 69.6496°N, 18.956°E) brukt for vær-, nordlys- og veistatus-oppslag.",
  },
  // Page 3
  apiHeader: { en: "API Integrations", no: "API-integrasjoner" },
  extDataSources: { en: "External Data Sources", no: "Eksterne datakilder" },
  extDataDesc: {
    en: "WinterReady integrates with 5 official Norwegian and international data sources to provide real-time safety information.",
    no: "WinterReady integrerer med 5 offisielle norske og internasjonale datakilder for å gi sanntids sikkerhetsinformasjon.",
  },
  // Page 4
  tourismI18nHeader: { en: "Tourism & i18n", no: "Turisme og i18n" },
  arcticDataFlows: { en: "Arctic Tourism Data Flows", no: "Arktisk turisme-dataflyt" },
  auroraTitle: { en: "Aurora Viewing Probability", no: "Nordlys-sannsynlighet" },
  auroraDesc: {
    en: "Base probability calculated from NOAA Kp index at Tromsø latitude (69.65°N). Cloud cover from Yr.no reduces probability. Categories: Excellent (>80%), Good (50-80%), Moderate (20-50%), Low (<20%). Updated every 30 minutes.",
    no: "Grunnleggende sannsynlighet beregnet fra NOAA Kp-indeks på Tromsø-breddegrad (69.65°N). Skydekke fra Yr.no reduserer sannsynligheten. Kategorier: Utmerket (>80%), God (50-80%), Moderat (20-50%), Lav (<20%). Oppdateres hvert 30. minutt.",
  },
  avalancheTitle: { en: "Avalanche Danger", no: "Skredfare" },
  avalancheDesc: {
    en: "NVE Varsom API queried by Tromsø coordinates. Returns danger level 1-5 with color coding. Critical for tourists driving to mountain excursions, aurora viewing spots (Kvaløya, Lyngen), and ski areas.",
    no: "NVE Varsom API forespurt med Tromsø-koordinater. Returnerer faregrad 1-5 med fargekoding. Kritisk for turister som kjører til fjellekskursjoner, nordlysspotter (Kvaløya, Lyngen) og skiområder.",
  },
  oceanTitle: { en: "Ocean Conditions", no: "Havforhold" },
  oceanDesc: {
    en: "Met.no ocean forecast for whale safari decisions. Safety threshold: wave height under 2m. Tracks water temperature and current speed at Tromsø coordinates (69.67°N, 18.95°E).",
    no: "Met.no havprognose for hvalsafari-beslutninger. Sikkerhetsterskel: bølgehøyde under 2m. Sporer vanntemperatur og strømhastighet ved Tromsø-koordinater (69.67°N, 18.95°E).",
  },
  roadTitle: { en: "Road Monitoring", no: "Veiovervåking" },
  roadDesc: {
    en: "6 Tromsø-area routes tracked: E6 Nordkjosbotn–Tromsø, E8 Tromsøya, Rv862 Sommarøy (aurora route), E6 Lyngen, Rv91 Breivikeidet, Kvaløya Coastal Road (northern lights).",
    no: "6 Tromsø-ruter overvåket: E6 Nordkjosbotn–Tromsø, E8 Tromsøya, Rv862 Sommarøy (nordlysrute), E6 Lyngen, Rv91 Breivikeidet, Kvaløya kystvei (nordlysrute).",
  },
  i18nTitle: { en: "Internationalization", no: "Internasjonalisering" },
  i18nDesc: {
    en: "Full i18n via next-intl with locale prefix routing (localePrefix: \"always\"). All course content, assessment questions, emergency data, and UI strings are translated.",
    no: "Full i18n via next-intl med locale-prefiksruting (localePrefix: \"always\"). Alt kursinnhold, vurderingsspørsmål, nøddata og UI-strenger er oversatt.",
  },
  thLocale: { en: "Locale", no: "Locale" },
  thLanguage: { en: "Language", no: "Språk" },
  thCoverage: { en: "Coverage", no: "Dekning" },
  courseModuleSystem: { en: "Course Module System", no: "Kursmodulsystem" },
  courseModuleDesc: {
    en: "9 modules, adaptive assignment based on risk assessment. Assessment factors: winter driving experience, home country climate, destination, trip duration. Tourism partners automatically include polar darkness, wildlife, and arctic weather modules. Total course time: 2-23 minutes.",
    no: "9 moduler, adaptiv tildeling basert på risikovurdering. Vurderingsfaktorer: vinterkjøringserfaring, hjemlandsklima, reisemål, turdvarighet. Turismepartnere inkluderer automatisk polarnatt-, dyreliv- og arktisk vær-moduler. Total kurstid: 2-23 minutter.",
  },
  // Page 5
  infraHeader: { en: "Infrastructure", no: "Infrastruktur" },
  pwaTitle: { en: "Progressive Web App", no: "Progressiv webapp" },
  serviceWorkerTitle: { en: "Service Worker", no: "Service Worker" },
  serviceWorkerDesc: {
    en: "Custom service worker for offline course access. Caches course content, images, and essential app shell after first load. Tourists can complete the course without internet connection.",
    no: "Tilpasset service worker for offline kurstilgang. Cacher kursinnhold, bilder og grunnleggende app-skall etter første lasting. Turister kan fullføre kurset uten internettforbindelse.",
  },
  offlineTitle: { en: "Offline Storage", no: "Offline-lagring" },
  offlineDesc: {
    en: "IndexedDB via idb package for storing course progress and assessment results locally. Data syncs when connection is restored. Critical for remote areas in Northern Norway.",
    no: "IndexedDB via idb-pakken for lokal lagring av kursfremdrift og vurderingsresultater. Data synkroniseres når tilkoblingen gjenopprettes. Kritisk for avsidesliggende områder i Nord-Norge.",
  },
  securityTitle: { en: "Security & Data Handling", no: "Sikkerhet og datahåndtering" },
  partnerIntTitle: { en: "Partner Integration", no: "Partnerintegrasjon" },
  partnerIntDesc: {
    en: "White-label integration via company slug routing. Each partner gets a dedicated namespace with custom branding.",
    no: "White-label-integrasjon via company slug ruting. Hver partner får et dedikert navnerom med tilpasset merkevare.",
  },
  urlStructureTitle: { en: "URL Structure", no: "URL-struktur" },
  customizationTitle: { en: "Customization", no: "Tilpasning" },
  customizationDesc: {
    en: "Partner name and primary color\nPrimary destination coordinates\nCustom welcome messages\nBranded QR codes for access",
    no: "Partnernavn og primærfarge\nPrimærdestinasjon-koordinater\nTilpassede velkomstmeldinger\nMerkede QR-koder for tilgang",
  },
  deploymentDesc: {
    en: "Deployment: The application is designed for Vercel deployment with edge caching for API routes. Static pages are pre-rendered at build time. Dynamic content (weather, aurora, roads) is fetched on-demand with intelligent revalidation.",
    no: "Deployment: Applikasjonen er designet for Vercel-utrulling med edge caching for API-ruter. Statiske sider pre-rendres ved build-tid. Dynamisk innhold (vær, nordlys, veier) hentes on-demand med intelligent revalidering.",
  },
};

const partnerRoutingBullets: Record<DocLocale, string[]> = {
  en: [
    "/en/tourism-demo/ — Visit Tromsø (tourism partner)",
    "/en/{partner-slug}/ — Custom partner namespace",
    "All partners include aurora, avalanche, ocean, and arctic modules",
    "Destination picker provides location-specific safety data",
  ],
  no: [
    "/no/tourism-demo/ — Visit Tromsø (turismepartner)",
    "/no/{partner-slug}/ — Tilpasset partnernavnerom",
    "Alle partnere inkluderer nordlys, skred, hav og arktiske moduler",
    "Destinasjonsvelger gir stedsspesifikke sikkerhetsdata",
  ],
};

const securityBullets: Record<DocLocale, string[]> = {
  en: [
    "No personal data stored server-side — course state is client-side only",
    "API routes are stateless — no session management required",
    "Certificate generation is on-demand — no persistent certificate storage",
    "External API calls are server-side only — API keys are not exposed to client",
    "All external API calls use HTTPS",
  ],
  no: [
    "Ingen persondata lagret server-side — kurstilstand er kun klient-side",
    "API-ruter er tilstandsløse — ingen sesjonsadministrasjon nødvendig",
    "Sertifikatgenerering er on-demand — ingen vedvarende sertifikatlagring",
    "Eksterne API-kall er kun server-side — API-nøkler eksponeres ikke til klient",
    "Alle eksterne API-kall bruker HTTPS",
  ],
};

const langRows: Record<DocLocale, { locale: string; lang: string; coverage: string }[]> = {
  en: [
    { locale: "no", lang: "Norwegian", coverage: "Full (primary)" },
    { locale: "en", lang: "English", coverage: "Full" },
    { locale: "de", lang: "German", coverage: "Full" },
    { locale: "fr", lang: "French", coverage: "Full" },
    { locale: "es", lang: "Spanish", coverage: "Full" },
    { locale: "zh", lang: "Chinese", coverage: "Full" },
  ],
  no: [
    { locale: "no", lang: "Norsk", coverage: "Full (primær)" },
    { locale: "en", lang: "Engelsk", coverage: "Full" },
    { locale: "de", lang: "Tysk", coverage: "Full" },
    { locale: "fr", lang: "Fransk", coverage: "Full" },
    { locale: "es", lang: "Spansk", coverage: "Full" },
    { locale: "zh", lang: "Kinesisk", coverage: "Full" },
  ],
};

const techStack = [
  { name: "Next.js 14", desc: "App Router, React Server Components" },
  { name: "React 18", desc: "Client & server components" },
  { name: "TypeScript", desc: "Full type safety" },
  { name: "Tailwind CSS", desc: "Utility-first styling" },
  { name: "next-intl", desc: "Internationalization (6 locales)" },
  { name: "@react-pdf/renderer", desc: "PDF certificate generation" },
  { name: "Framer Motion", desc: "Animations & transitions" },
  { name: "Lottie", desc: "Interactive animations" },
  { name: "idb", desc: "IndexedDB for offline storage" },
  { name: "qrcode.react", desc: "Partner QR code generation" },
];

const apiIntegrations = [
  {
    source: "Yr.no / Met.no",
    endpoint: "api.met.no/weatherapi/locationforecast/2.0/compact",
    data: "Temperature, wind, precipitation, weather symbol",
    cache: "1 hour (revalidate: 3600)",
    riskCalc: "Temperature + wind + precipitation + snow/sleet scoring",
  },
  {
    source: "NOAA SWPC",
    endpoint: "services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
    data: "Kp index (0-9), aurora viewing probability",
    cache: "30 min (revalidate: 1800)",
    riskCalc: "Base probability from Kp, cloud cover reduction, rating categories",
  },
  {
    source: "NVE Varsom",
    endpoint: "api01.nve.no/hydrology/forecast/avalanche/v6.3.0/api/...",
    data: "Danger level 1-5, region, validity period",
    cache: "1 hour (revalidate: 3600)",
    riskCalc: "Avalanche danger by coordinates for Tromsø region",
  },
  {
    source: "Statens vegvesen",
    endpoint: "Custom route data (6 Tromsø-area routes)",
    data: "Route status: open/closed/convoy/warning",
    cache: "30 min",
    riskCalc: "E6, E8, Rv862, E6 Lyngen, Rv91, Kvaløya routes",
  },
  {
    source: "Met.no Ocean",
    endpoint: "api.met.no/weatherapi/oceanforecast/2.0/complete",
    data: "Wave height, water temp, current speed",
    cache: "1 hour (revalidate: 3600)",
    riskCalc: "Safety threshold: waves < 2m = safe for boat tours",
  },
];

function PageHeader({ section, locale }: { section: string; locale: DocLocale }) {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.pageHeaderTitle}>{section}</Text>
      <Text style={styles.pageHeaderBrand}>{t.brandHeader[locale]}</Text>
    </View>
  );
}

function PageFooter({ pageNum, locale }: { pageNum: number; locale: DocLocale }) {
  return (
    <View style={styles.pageFooter}>
      <Text style={styles.footerText}>{t.confidential[locale]}</Text>
      <Text style={styles.footerBrand}>{t.page[locale]} {pageNum}</Text>
    </View>
  );
}

export function TechOverviewDocument({ data }: { data: TechOverviewData }) {
  const locale = data.locale;
  const formattedDate = new Date(data.generatedDate).toLocaleDateString(
    locale === "no" ? "nb-NO" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.coverCenter}>
          <Text style={styles.coverBrand}>WinterReady</Text>
          <Text style={styles.coverTitle}>{t.coverTitle[locale]}</Text>
          <Text style={styles.coverSubtitle}>{t.coverSubtitle[locale]}</Text>
          <View style={styles.coverDivider} />
          <Text style={styles.coverDate}>{formattedDate}</Text>
          {data.contactName && (
            <Text style={{ fontSize: 10, color: COLORS.tourismCyan, marginTop: 8 }}>
              {data.contactName}
              {data.contactEmail ? ` — ${data.contactEmail}` : ""}
            </Text>
          )}
        </View>
        <PageFooter pageNum={1} locale={locale} />
      </Page>

      {/* Page 2: Technology Stack */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <PageHeader section={t.techStackHeader[locale]} locale={locale} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t.coreTechStack[locale]}</Text>
          <Text style={styles.bodyText}>{t.coreTechDesc[locale]}</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
            {techStack.map((tech, i) => (
              <View key={i} style={styles.techBadge}>
                <Text style={styles.techBadgeText}>{tech.name}</Text>
                <Text style={styles.techBadgeDesc}>{tech.desc}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.subsectionTitle}>{t.appArchTitle[locale]}</Text>
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.appRouterTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.appRouterDesc[locale]}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.apiLayerTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.apiLayerDesc[locale]}</Text>
            </View>
          </View>

          <Text style={styles.subsectionTitle}>{t.partnerRoutingTitle[locale]}</Text>
          <Text style={styles.bodyText}>{t.partnerRoutingDesc[locale]}</Text>
          {partnerRoutingBullets[locale].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.subsectionTitle}>{t.brandingConfigTitle[locale]}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>
              interface CompanyBranding {"{"} name: string; color: string;
              primaryDestination?: {"{"} name: string; lat: number; lon: number{" "}
              {"}"}; {"}"}
            </Text>
          </View>
          <Text style={styles.bodyText}>{t.brandingConfigDesc[locale]}</Text>
        </View>
        <PageFooter pageNum={2} locale={locale} />
      </Page>

      {/* Page 3: API Integrations */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <PageHeader section={t.apiHeader[locale]} locale={locale} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t.extDataSources[locale]}</Text>
          <Text style={styles.bodyText}>{t.extDataDesc[locale]}</Text>

          {apiIntegrations.map((api, i) => (
            <View
              key={i}
              style={{
                marginBottom: 12,
                backgroundColor: i % 2 === 0 ? COLORS.offWhite : COLORS.white,
                padding: 10,
                borderRadius: 4,
                borderLeftWidth: 3,
                borderLeftColor: COLORS.tourismCyan,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.navyDark, marginBottom: 3 }}>
                {api.source}
              </Text>
              <Text style={styles.tableCellMono}>{api.endpoint}</Text>
              <View style={{ marginTop: 4 }}>
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { width: 6 }]}>•</Text>
                  <Text style={styles.bulletText}>
                    <Text style={{ fontWeight: "bold" }}>Data: </Text>
                    {api.data}
                  </Text>
                </View>
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { width: 6 }]}>•</Text>
                  <Text style={styles.bulletText}>
                    <Text style={{ fontWeight: "bold" }}>Cache: </Text>
                    {api.cache}
                  </Text>
                </View>
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { width: 6 }]}>•</Text>
                  <Text style={styles.bulletText}>
                    <Text style={{ fontWeight: "bold" }}>Logic: </Text>
                    {api.riskCalc}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <PageFooter pageNum={3} locale={locale} />
      </Page>

      {/* Page 4: Tourism Features + i18n */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <PageHeader section={t.tourismI18nHeader[locale]} locale={locale} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t.arcticDataFlows[locale]}</Text>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.auroraTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.auroraDesc[locale]}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.avalancheTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.avalancheDesc[locale]}</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.oceanTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.oceanDesc[locale]}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.roadTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.roadDesc[locale]}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t.i18nTitle[locale]}</Text>
          <Text style={styles.bodyText}>{t.i18nDesc[locale]}</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { width: "20%" }]}>{t.thLocale[locale]}</Text>
            <Text style={[styles.tableHeaderText, { width: "25%" }]}>{t.thLanguage[locale]}</Text>
            <Text style={[styles.tableHeaderText, { width: "55%" }]}>{t.thCoverage[locale]}</Text>
          </View>
          {langRows[locale].map((row, i) => (
            <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={[styles.tableCellMono, { width: "20%" }]}>{row.locale}</Text>
              <Text style={[styles.tableCellBold, { width: "25%" }]}>{row.lang}</Text>
              <Text style={[styles.tableCell, { width: "55%" }]}>{row.coverage}</Text>
            </View>
          ))}

          <Text style={styles.subsectionTitle}>{t.courseModuleSystem[locale]}</Text>
          <Text style={styles.bodyText}>{t.courseModuleDesc[locale]}</Text>
        </View>
        <PageFooter pageNum={4} locale={locale} />
      </Page>

      {/* Page 5: PWA, Security, Integration */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <PageHeader section={t.infraHeader[locale]} locale={locale} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t.pwaTitle[locale]}</Text>
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.serviceWorkerTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.serviceWorkerDesc[locale]}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.offlineTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.offlineDesc[locale]}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t.securityTitle[locale]}</Text>
          {securityBullets[locale].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>{t.partnerIntTitle[locale]}</Text>
          <Text style={styles.bodyText}>{t.partnerIntDesc[locale]}</Text>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.urlStructureTitle[locale]}</Text>
              <Text style={styles.cardText}>
                /{"{locale}"}/{"{company}"}/ — e.g., /en/visit-tromso/{"\n"}
                /{"{locale}"}/{"{company}"}/course/{"{moduleId}"}{"\n"}
                /{"{locale}"}/{"{company}"}/dashboard{"\n"}
                /{"{locale}"}/{"{company}"}/admin
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.customizationTitle[locale]}</Text>
              <Text style={styles.cardText}>{t.customizationDesc[locale]}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>{t.deploymentDesc[locale]}</Text>
          </View>
        </View>
        <PageFooter pageNum={5} locale={locale} />
      </Page>
    </Document>
  );
}
