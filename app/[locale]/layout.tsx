import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/request";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import EmergencyFAB from "@/components/emergency/EmergencyFAB";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WinterReady Norway",
  description: "Stay safe on Norwegian winter roads",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WinterReady",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={bricolage.className}>
        <ServiceWorkerRegistration />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <footer className="py-4 text-center text-xs text-white/30">
            en løsning av Efffekt AS
          </footer>
          <EmergencyFAB />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
