import { siteConfig, toDigits } from "@/config/site";
import { getFaqs } from "@/content/landing-page";

/**
 * Build a JSON-LD @graph using ONLY values that actually exist in the site
 * configuration. Empty phone/address/social fields are omitted rather than
 * filled with placeholders, so nothing false is published.
 */
export function buildJsonLd(): Record<string, unknown> {
  const { url, name, legalName, shortDescription } = siteConfig;
  const orgId = `${url}#organization`;
  const websiteId = `${url}#website`;

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

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name,
    ...(legalName ? { legalName } : {}),
    url,
    description: shortDescription,
    image: logoUrl,
    logo: logoUrl,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone
      ? { telephone: `+${toDigits(siteConfig.phone)}` }
      : {}),
    ...(siteConfig.serviceAreas.length
      ? { areaServed: siteConfig.serviceAreas }
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
    name: `${name} — NRI Parent Care & Elder Support`,
    description: shortDescription,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en",
  };

  const service: Record<string, unknown> = {
    "@type": "Service",
    name: "Elder care & family support coordination",
    serviceType: "Elder care support and coordination",
    description:
      "Regular wellbeing visits, everyday assistance, care coordination and clear family updates for older adults living at home.",
    provider: { "@id": orgId },
    ...(siteConfig.serviceAreas.length
      ? { areaServed: siteConfig.serviceAreas }
      : {}),
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
