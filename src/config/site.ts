/**
 * Central site configuration.
 *
 * Every business-specific value is sourced from environment variables with
 * safe fallbacks. Nothing here fabricates a phone number, address, price or
 * location. When a value is empty, the UI hides the affected element or shows
 * a neutral "contact us" message instead of a visible placeholder label.
 *
 * TODO (pre-launch): populate the values below via environment variables.
 * See .env.example for the full list.
 */

const rawServiceAreas = process.env.NEXT_PUBLIC_SERVICE_AREAS ?? "";

const DEFAULT_SITE_URL = "http://localhost:4200";

/**
 * Normalise  into an absolute origin.
 *
 * `metadataBase` feeds this straight into `new URL()`, so a value that is
 * merely a bare host ("dear-ones.example") throws at module evaluation and
 * fails the production build. Accept the forms people actually paste into a
 * hosting dashboard, and fall back rather than taking the build down.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed.replace(/^\/+/, "")}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export interface SiteAddress {
  streetAddress?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

// TODO: set a real postal address before adding it to production JSON-LD.
const address: SiteAddress | null = null;

export const siteConfig = {
  name: "Dear Ones",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "", // TODO: registered business name
  tagline: "Your Love. Our Hands.",
  shortDescription:
    "Trusted local support for parents living at home — with regular visits, everyday assistance, care coordination and clear family updates.",

  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

  // Contact channels (public). Empty string => hidden in the UI.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 88776 67959",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  /**
   * WhatsApp "click to chat" short link for the business account. Used as-is
   * when present, because a wa.me/message/<code> link carries its own
   * destination and cannot take a ?text= prefill.
   */
  whatsappLink:
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ??
    "https://wa.me/message/KYLKNFBKJ6JXJ1",

  // Where enquiries are delivered (server-side only usage).
  formRecipient: process.env.CONTACT_TO_EMAIL ?? "",

  // Locations. Comma-separated env value -> array. Empty => availability copy.
  serviceAreas: rawServiceAreas
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  // TODO: confirm the primary marketing service area for SEO templates.
  primaryServiceArea: process.env.NEXT_PUBLIC_PRIMARY_AREA ?? "",

  country: process.env.NEXT_PUBLIC_COUNTRY ?? "",
  address,

  // TODO: confirm real operating hours before publishing.
  operatingHours: process.env.NEXT_PUBLIC_OPERATING_HOURS ?? "",

  availableLanguages: ["English"],

  socialLinks: {
    // Empty entries are ignored everywhere.
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/dearones.eldercare",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      "https://www.facebook.com/share/17N9TkoNiV/",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },

  legalLinks: {
    privacy: "/privacy", // TODO: publish a real privacy policy page
    terms: "/terms", // TODO: publish real terms of service
  },

  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",

  analyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",

  planLabels: {
    essential: "Dear Care Essential",
    plus: "Dear Care Plus",
    elite: "Dear Care Elite",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/* ---------- Derived helpers ---------- */

/** Digits-only phone/WhatsApp value suitable for tel: and wa.me links. */
export function toDigits(value: string): string {
  return value.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export function getTelHref(): string | null {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/\s+/g, "")}` : null;
}

export function getWhatsappHref(prefilled?: string): string | null {
  // A configured short link wins; it already points at the right account and
  // does not support a prefilled message.
  if (siteConfig.whatsappLink) return siteConfig.whatsappLink;
  if (!siteConfig.whatsapp) return null;
  const number = toDigits(siteConfig.whatsapp);
  if (!number) return null;
  const text = prefilled ? `?text=${encodeURIComponent(prefilled)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function getMailtoHref(subject?: string): string | null {
  if (!siteConfig.email) return null;
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${s}`;
}

export function hasAnyContactChannel(): boolean {
  return Boolean(
    siteConfig.phone ||
      siteConfig.whatsapp ||
      siteConfig.whatsappLink ||
      siteConfig.email
  );
}

/** Human-readable service-area string, or a neutral fallback. */
export function serviceAreaLabel(): string {
  if (siteConfig.serviceAreas.length === 0) {
    return "Contact us to confirm availability in your parent’s location";
  }
  return siteConfig.serviceAreas.join(", ");
}

/** Service area used in SEO titles; falls back to a generic phrase. */
export function seoServiceArea(): string {
  return (
    siteConfig.primaryServiceArea ||
    siteConfig.serviceAreas[0] ||
    "India & for NRI Families"
  );
}
