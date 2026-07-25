import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
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
const titleDefault = area
  ? `${siteConfig.name} | NRI Parent Care & Elder Support in ${area}`
  : `${siteConfig.name} | NRI Parent Care & Elder Support`;

const description =
  "Trusted local support for parents living at home, including wellbeing visits, everyday assistance, care coordination and clear family updates.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: titleDefault,
    description,
    locale: "en_US",
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
