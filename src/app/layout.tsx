import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig, seoLocationPhrase } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const area = siteConfig.primaryServiceArea;
const locationPhrase = seoLocationPhrase();

const titleDefault = area
  ? `${siteConfig.name} | Elder Care & NRI Parent Care in ${area}`
  : `${siteConfig.name} | NRI Parent Care & Elder Support`;

// The location has to appear in the description itself: it is what Google
// shows in the result snippet and it carries the local search terms.
const description = locationPhrase
  ? `Elder care and NRI parent care in ${locationPhrase}. Dear Ones provides regular wellbeing visits, everyday assistance, medical coordination and clear family updates for parents living at home.`
  : "Trusted local support for parents living at home, including wellbeing visits, everyday assistance, care coordination and clear family updates.";

/**
 * Kept deliberately short and truthful. Google ignores this tag, but Bing and
 * several regional crawlers still read it, and it costs nothing.
 */
const keywords = [
  "elder care",
  "elder care services",
  "NRI parent care",
  "home care for elderly parents",
  "senior care",
  "elderly care at home",
  ...siteConfig.serviceAreas.flatMap((a) => [
    `elder care ${a}`,
    `home care for parents ${a}`,
  ]),
  ...(siteConfig.region ? [`elder care ${siteConfig.region}`] : []),
  siteConfig.name,
  ...siteConfig.alternateNames,
];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Elder care",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: titleDefault,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-full flex-col pb-[72px] lg:pb-0">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
