import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroHighlight {
  label: string;
  icon: LucideIcon;
}

export interface SupportStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Optional clarifying note rendered in a muted style. */
  note?: string;
  /** Featured items span two columns on desktop. */
  featured?: boolean;
  /** Supporting photo, bled into the right edge of the card. */
  image?: string;
}

export interface PlanInclusionGroup {
  label?: string;
  items: string[];
}

export interface PlanTier {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  /** Short highlights always visible on the card. */
  highlights: string[];
  /** Full inclusions revealed in the expandable area. */
  detailGroups: PlanInclusionGroup[];
  /** Text shown before the "plus" detail groups, e.g. "Everything in Essential, plus". */
  inheritsNote?: string;
  featured?: boolean;
  badge?: string;
}

export type CarePlanId = "essential" | "plus" | "elite";

/** A tab in the care-plan selector. */
export interface CarePlanTierCard {
  id: CarePlanId;
  number: string;
  eyebrow: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
}

/** One titled bullet list inside a care-plan section. */
export interface CarePlanBenefitGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

/** A numbered block of the plan panel, e.g. "Your Membership Includes". */
export interface CarePlanSection {
  title: string;
  /** Right-aligned caption in the section bar. */
  caption: string;
  icon: LucideIcon;
  groups: CarePlanBenefitGroup[];
}

export interface CarePlanDetail {
  /** Panel title, e.g. "Dear Care Plus". */
  title: string;
  description: string;
  /** Closing reassurance shown under the illustration. */
  note: string;
  membership: CarePlanSection;
  /** Absent on Essential, which has no extra tier of benefits. */
  additional?: CarePlanSection;
}

export interface OnDemandCategory {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TrustPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
  /** Draft answers that need human/legal confirmation before launch. */
  needsConfirmation?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}
