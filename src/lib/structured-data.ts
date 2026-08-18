import type { SiteAddress } from "@/config/site";
import { siteConfig, toDigits, seoLocationPhrase } from "@/config/site";
import { getFaqs } from "@/content/landing-page";

/**
 * Build a JSON-LD @graph using ONLY values that actually exist in the site
 * configuration. Empty phone/address/social fields are omitted rather than
 * filled with placeholders, so nothing false is published.
 */
/**
 * Emit a schema.org PostalAddress wrapper, or nothing when no address is
 * configured. Kept as a function so the parameter's declared type survives —
 * `siteConfig` is `as const` with `address: null`, which would otherwise narrow
 * an inline check to `never` and fail the build.
 */
function buildPostalAddress(addr: SiteAddress | null): Record<string, unknown> {
  if (!addr) return {};
  return {
    address: {
      "@type": "PostalAddress",
      ...(addr.streetAddress ? { streetAddress: addr.streetAddress } : {}),
      ...(addr.locality ? { addressLocality: addr.locality } : {}),
      ...(addr.region ? { addressRegion: addr.region } : {}),
      ...(addr.postalCode ? { postalCode: addr.postalCode } : {}),
      ...(addr.country ? { addressCountry: addr.country } : {}),
    },
  };
}

export function buildJsonLd(): Record<string, unknown> {
  const { url, name, legalName, shortDescription } = siteConfig;
  const orgId = `${url}#organization`;
  const websiteId = `${url}#website`;
  const locationPhrase = seoLocationPhrase();

  const sameAs = Object.values(siteConfig.socialLinks).filter(Boolean);
  const logoUrl = `${url}/opengraph-image`;

  const contactPoint =
    siteConfig.phone || siteConfig.email
      ? {
          "@type": "ContactPoint",
          contactType: "customer support",
          ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
          ...(siteConfig.email ? { email: siteConfig.email } : {}),
          availableLanguage: siteConfig.availableLanguages,
        }
      : undefined;

  /**
   * Service areas as real Place nodes rather than bare strings, so the city
   * and the state are both machine-readable for local search.
   */
  const areaServed = siteConfig.serviceAreas.map((city) => ({
    "@type": "City",
    name: city,
    ...(siteConfig.region
      ? {
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: siteConfig.region,
            ...(siteConfig.country
              ? {
                  containedInPlace: {
                    "@type": "Country",
                    name: siteConfig.country,
                  },
                }
              : {}),
          },
        }
      : {}),
  }));

  const postalAddress = buildPostalAddress(siteConfig.address);

  /**
   * `LocalBusiness` is what earns local/map results, but Google expects a
   * postal address on it. Until a real address is configured, stay an
   * `Organization` with `areaServed` — honest and valid — and upgrade
   * automatically the moment `siteConfig.address` is filled in.
   */
  const organization: Record<string, unknown> = {
    "@type": siteConfig.address ? "LocalBusiness" : "Organization",
    "@id": orgId,
    name,
    alternateName: siteConfig.alternateNames,
    ...(legalName ? { legalName } : {}),
    url,
    description: shortDescription,
    slogan: siteConfig.tagline,
    image: logoUrl,
    logo: logoUrl,
    ...postalAddress,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone
      ? { telephone: `+${toDigits(siteConfig.phone)}` }
      : {}),
    ...(areaServed.length ? { areaServed } : {}),
    knowsLanguage: siteConfig.availableLanguages,
    ...(siteConfig.operatingHours
      ? { openingHours: siteConfig.operatingHours }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(contactPoint ? { contactPoint } : {}),
  };

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    name,
    url,
    description: shortDescription,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: locationPhrase
      ? `${name} — Elder Care & NRI Parent Care in ${locationPhrase}`
      : `${name} — NRI Parent Care & Elder Support`,
    description: shortDescription,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    ...(areaServed.length ? { contentLocation: areaServed } : {}),
    inLanguage: "en",
  };

  const service: Record<string, unknown> = {
    "@type": "Service",
    name: locationPhrase
      ? `Elder care & NRI parent care in ${locationPhrase}`
      : "Elder care & family support coordination",
    serviceType: "Elder care support and coordination",
    description: locationPhrase
      ? `Regular wellbeing visits, everyday assistance, medical coordination and clear family updates for older adults living at home in ${locationPhrase}.`
      : "Regular wellbeing visits, everyday assistance, care coordination and clear family updates for older adults living at home.",
    provider: { "@id": orgId },
    ...(areaServed.length ? { areaServed } : {}),
  };

  const faqPage: Record<string, unknown> = {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    mainEntity: getFaqs().map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webPage, service, faqPage],
  };
}
