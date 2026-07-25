import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Loads Google Analytics only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Renders nothing otherwise, so analytics is disabled by default and never
 * blocks rendering. Consider gating this behind a consent banner where
 * required by local regulations before enabling in production.
 */
export function GoogleAnalytics() {
  const id = siteConfig.analyticsId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
