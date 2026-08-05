import {
  Activity,
  BadgeCheck,
  BellRing,
  Camera,
  CalendarCheck,
  Car,
  ClipboardList,
  FileText,
  Gift,
  HandHeart,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  ListChecks,
  MessagesSquare,
  MessageSquareText,
  PackageCheck,
  PenLine,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { serviceAreaLabel, siteConfig } from "@/config/site";
import type {
  FaqItem,
  HeroHighlight,
  HowItWorksStep,
  NavLink,
  OnDemandCategory,
  PlanTier,
  SelectOption,
  ServiceItem,
  SupportStep,
  TrustPoint,
} from "@/types";
import {
  CONTACT_METHODS,
  CONTACT_TIMES,
  SUPPORT_TYPES,
} from "@/lib/validation";

/* ---------- Navigation ---------- */
export const navLinks: NavLink[] = [
  { label: "How We Help", href: "#services" },
  { label: "Care Plans", href: "#care-plans" },
  { label: "On-Demand", href: "#on-demand" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
];

/* ---------- Hero ---------- */
export const hero = {
  eyebrow: "NRI Parent Care & Elder Support",
  titleLines: ["Trusted care and support for your parents."],
  /** Rendered as the closing headline line in gold. */
  titleAccent: "Peace of mind for you.",
  description:
    "Dear Ones is a personalized support service for older adults living at home. We regularly visit your loved ones, monitor their wellbeing, help with everyday needs, coordinate medical care, and keep your family updated—so you always know they’re safe, supported, and never alone. We don’t replace family. We become the trusted helping hand nearby.",
  primaryCta: "Speak with a Care Coordinator",
  secondaryCta: "Explore Care Plans",
  trustLine: "Local support. Thoughtful care. Clear updates.",
  highlights: [
    { label: "Personalized care & regular visits", icon: HeartHandshake },
    { label: "Safety, wellbeing & health monitoring", icon: ShieldCheck },
    { label: "Everyday assistance & support", icon: CalendarCheck },
    { label: "Family updates & peace of mind", icon: Users },
  ] satisfies HeroHighlight[],
} as const;

/* ---------- Four-part support model ---------- */
export const supportModel: SupportStep[] = [
  {
    title: "We Visit",
    description: "Regular, scheduled visits to your parent’s home.",
    icon: Home,
  },
  {
    title: "We Assist",
    description: "A helping hand with everyday needs and moments that matter.",
    icon: HeartHandshake,
  },
  {
    title: "We Coordinate",
    description: "Appointments and trusted local services, arranged for you.",
    icon: CalendarCheck,
  },
  {
    title: "We Update You",
    description: "Clear updates after visits, so you always know how they are.",
    icon: MessageSquareText,
  },
];

/* ---------- Emotional / distance section ---------- */
export const distance = {
  heading: [
    "Distance changes where families live.",
    "It should never change how much they care.",
  ],
  intro:
    "When parents live alone, even simple questions can stay on your mind.",
  questions: [
    "Did they eat today?",
    "Is someone checking on them?",
    "Who will take them to an appointment?",
    "What happens when they need urgent help?",
  ],
  closing:
    "Dear Ones becomes the dependable local presence your family wishes it had nearby.",
  /** Illustrated collage. Order matches the scattered layout, top-left first. */
  gallery: [
    {
      src: "/images/distance-companionship.webp",
      alt: "A caregiver sitting with an older woman at home, holding her hands.",
    },
    {
      src: "/images/distance-health-check.webp",
      alt: "A caregiver taking an older man's blood pressure at his kitchen table.",
    },
    {
      src: "/images/distance-transport.webp",
      alt: "A caregiver helping an older woman step out of a car.",
    },
    {
      src: "/images/distance-updates.webp",
      alt: "A caregiver showing an older woman a photo on a phone.",
    },
    {
      src: "/images/distance-comfort.webp",
      alt: "An older woman resting by a sunny window with a warm drink.",
    },
  ],
} as const;

/* ---------- About ---------- */
export const about = {
  eyebrow: "Your family’s trusted local support partner",
  heading:
    "Care that keeps your loved ones supported—and keeps you connected.",
  body: "Dear Ones is a personalised support service for older adults living at home. We visit, notice, listen, assist with everyday needs, coordinate trusted services and keep the family informed.",
  emphasis:
    "We do not replace family. We become the trusted helping hand nearby.",
  outcomes: [
    "Greater confidence at home",
    "Regular human connection",
    "Help with everyday needs",
    "Coordinated local assistance",
    "Transparent family communication",
  ],
} as const;

/* ---------- Services ---------- */
export const services = {
  heading:
    "Support for everyday life—and the moments that need more care.",
  cta: "Discuss Your Family’s Needs",
  items: [
    {
      title: "Wellbeing Visits",
      description:
        "Regular home visits, companionship, meaningful conversation and general wellbeing observation.",
      icon: HandHeart,
      featured: true,
      image: "/images/service-wellbeing-visits.webp",
    },
    {
      title: "Routine Health Observations",
      description:
        "Support with blood pressure, blood sugar, pulse, oxygen saturation, weight records, medication reminders, nutrition and hydration.",
      note: "Observations and reminders only — not medical diagnosis or treatment.",
      icon: Activity,
      image: "/images/service-health-observations.webp",
    },
    {
      title: "Medical Coordination",
      description:
        "Help coordinating doctor appointments, hospital visits, diagnostics, nursing, physiotherapy, medicine collection, and admission or discharge support where applicable.",
      note: "We coordinate care; clinical treatment is provided by qualified third-party professionals.",
      icon: Stethoscope,
      image: "/images/service-medical-coordination.webp",
    },
    {
      title: "Everyday Assistance",
      description:
        "Groceries, essential errands, bill-related assistance, document collection, courier support, transportation and appointment accompaniment.",
      icon: ShoppingBag,
      image: "/images/service-everyday-assistance.webp",
    },
    {
      title: "Home & Property Support",
      description:
        "Property inspections, maintenance coordination, electricians, plumbers, technicians, cleaning, pest control and supervision during the family’s absence.",
      icon: Home,
      image: "/images/service-home-property.webp",
    },
    {
      title: "Family Updates",
      description:
        "Digital visit reports, consent-based photos, monthly summaries, important observations and urgent notifications.",
      icon: MessageSquareText,
      featured: true,
      image: "/images/service-family-updates.webp",
    },
  ] satisfies ServiceItem[],
} as const;

/* ---------- Family update experience ---------- */
export const familyUpdates = {
  heading: ["You may be far away.", "You should never feel uninformed."],
  body: "After scheduled visits, the family receives a clear update so they know what was observed, what was completed and whether anything needs attention.",
  // Example content only — no real personal or health information.
  report: {
    label: "Example visit update",
    status: "Visit completed",
    dateLabel: "Scheduled visit",
    dateValue: "Sample — Tue, 10:30 AM",
    rows: [
      { label: "General wellbeing", value: "Calm and comfortable" },
      { label: "Meals & hydration", value: "Ate well · fluids encouraged" },
      { label: "Medication reminder", value: "Completed for the visit" },
      { label: "Routine readings", value: "Recorded and noted" },
      { label: "Home safety", value: "No new concerns observed" },
    ],
    note: "Warm and chatty today. Enjoyed a walk in the garden. Suggested a follow-up on an upcoming appointment.",
    photoCaption: "Photo shared with consent",
    nextAction: "Coordinate next month’s routine check-up",
  },
} as const;

/* ---------- Care plans ---------- */
export const carePlans = {
  heading: "Choose the level of support your family needs.",
  intro:
    "Every family is different. Begin with regular wellbeing visits or choose broader day-to-day coordination.",
  pricingNote: "Pricing is based on location and individual requirements.",
  planCta: "Request Plan Details",
  serviceLimitNote:
    "Included visits, duration limits and service availability depend on the selected plan and operating location. Additional support may be available at an extra charge.",
  tiers: [
    {
      id: "essential",
      name: siteConfig.planLabels.essential,
      tagline: "We Visit & Monitor",
      summary:
        "A dependable foundation for families who want regular wellbeing visits, observations and clear updates.",
      highlights: [
        "2 scheduled home visits every month",
        "Companionship and meaningful conversation",
        "Routine readings and wellbeing records",
        "Digital report after each visit",
      ],
      detailGroups: [
        {
          items: [
            "2 scheduled home visits every month",
            "Companionship and meaningful conversation",
            "Physical, emotional and social wellbeing observation",
            "Routine readings and wellbeing records",
            "Medication, nutrition and hydration reminders",
            "Home safety and fall-risk observation",
            "Digital report after each visit",
            "Photos with consent",
            "Monthly wellbeing summary",
            "Guidance with healthcare appointment coordination",
          ],
        },
      ],
    },
    {
      id: "plus",
      name: siteConfig.planLabels.plus,
      tagline: "We Visit, Monitor & Assist",
      summary:
        "For older adults who need regular assistance beyond scheduled wellbeing visits.",
      inheritsNote: `Everything in ${siteConfig.planLabels.essential}, plus`,
      featured: true,
      highlights: [
        "Emergency coordination & family notification",
        "Hospital or clinic accompaniment",
        "Essential living & errands assistance",
        "Priority updates during urgent situations",
      ],
      detailGroups: [
        {
          label: "Emergency coordination",
          items: [
            "Immediate family notification",
            "Ambulance coordination",
            "Hospital coordination",
            "Relative or neighbour coordination when required",
          ],
        },
        {
          label: "Medical assistance",
          items: [
            "Hospital or clinic accompaniment (up to 6 hours per visit)",
            "Maximum 1 included hospital accompaniment visit per month",
            "Doctor appointment assistance",
            "Medicine collection and prescription pickup",
          ],
        },
        {
          label: "Essential living assistance",
          items: [
            "Grocery shopping assistance",
            "Bill-payment assistance",
            "Banking and document assistance",
            "Courier and parcel collection",
            "Essential errands",
          ],
        },
        {
          label: "Family communication",
          items: ["Priority updates during medical or urgent situations"],
        },
      ],
    },
    {
      id: "elite",
      name: siteConfig.planLabels.elite,
      tagline: "We Visit, Monitor, Assist & Coordinate Everything",
      summary:
        "The most comprehensive plan for families who need dedicated support, priority assistance and one consistent point of contact.",
      inheritsNote: `Everything in ${siteConfig.planLabels.plus}, plus`,
      badge: "Most comprehensive",
      highlights: [
        "8 scheduled home visits per month",
        "Dedicated family care coordinator",
        "Priority response for urgent requests",
        "Personalised care planning",
      ],
      detailGroups: [
        {
          label: "Dedicated support",
          items: [
            "8 scheduled home visits per month",
            "Dedicated family care coordinator",
            "Priority response for urgent requests",
            "Personalised care planning",
          ],
        },
        {
          label: "Advanced healthcare coordination",
          items: [
            "Hospital admission and discharge coordination",
            "Hospital escort and accompaniment (up to 6 hours per visit)",
            "Maximum 3 included hospital accompaniment visits per month",
            "Nursing, physiotherapy and diagnostic-service coordination",
            "Specialist appointment coordination",
          ],
        },
        {
          label: "Home and property",
          items: [
            "Regular property inspections",
            "Maintenance coordination",
            "Electrician, plumber and technician arrangements",
            "Cleaning and pest-control coordination",
            "Property supervision while the family is away",
          ],
        },
        {
          label: "Companion and lifestyle support",
          items: [
            "Companion visits up to 3 hours (max 2 included per month)",
            "Shopping and essential outdoor assistance",
            "Festival and special-occasion support",
            "Social and recreational accompaniment within service limits",
          ],
        },
        {
          label: "Complete family support",
          items: [
            "Unlimited care coordination within the plan’s stated service scope",
            "Priority family updates",
            "Assistance adjusted around changing needs",
            "One dedicated point of contact",
          ],
        },
      ],
    },
  ] satisfies PlanTier[],
} as const;

/* ---------- On-demand ---------- */
export const onDemand = {
  heading: "A little extra support, whenever it is needed.",
  body: "Sometimes your loved ones need more than their regular care plan. Dear Ones On-Demand allows families to request additional assistance on a pay-per-use basis, subject to availability.",
  urgentNote:
    "When something comes up: urgent visits, hospital coordination, family notifications and local assistance may be arranged subject to service availability.",
  pricingNote:
    "On-demand charges depend on the service, time, distance and urgency. Third-party expenses are charged separately after prior approval.",
  cta: "Ask About On-Demand Support",
  categories: [
    {
      title: "By Their Side",
      description:
        "Hospital accompaniment, doctor visits, diagnostics, admission and discharge assistance.",
      icon: HeartPulse,
    },
    {
      title: "Looking After Home",
      description:
        "Property visits, maintenance supervision, repairs, cleaning and trusted-service coordination.",
      icon: Wrench,
    },
    {
      title: "Getting Things Done",
      description:
        "Medicine collection, groceries, bill assistance, documents, couriers and essential errands.",
      icon: PackageCheck,
    },
    {
      title: "Helping Them Get There",
      description:
        "Travel assistance, transport coordination and appointment accompaniment.",
      icon: Car,
    },
    {
      title: "Making Moments Special",
      description:
        "Extended companionship, shopping trips, outings, birthdays, festivals and special occasions.",
      icon: Gift,
    },
  ] satisfies OnDemandCategory[],
} as const;

/* ---------- How it works ---------- */
export const howItWorks = {
  heading: "A simple way to put trusted support in place.",
  // TODO: confirm the real onboarding journey before launch.
  steps: [
    {
      title: "Tell us about your family",
      description:
        "Share where your parent lives, their routines and the support you are looking for.",
      icon: MessagesSquare,
    },
    {
      title: "Speak with a care coordinator",
      description:
        "We discuss needs, service availability and the most suitable starting plan.",
      icon: PhoneCall,
    },
    {
      title: "Create a personalised support plan",
      description:
        "Visits, communication preferences and support priorities are documented.",
      icon: ClipboardList,
    },
    {
      title: "Stay informed",
      description:
        "Receive visit updates, observations and coordination support as agreed.",
      icon: BellRing,
    },
  ] satisfies HowItWorksStep[],
} as const;

/* ---------- Trust ---------- */
export const trust = {
  heading: ["Care should feel personal.", "Communication should feel clear."],
  points: [
    {
      title: "Clear visit updates",
      description: "A written update after scheduled visits, in plain language.",
      icon: FileText,
    },
    {
      title: "Photos only with consent",
      description: "Nothing is shared without your loved one’s agreement.",
      icon: Camera,
    },
    {
      title: "One consistent family contact",
      description: "A familiar point of contact who knows your family.",
      icon: UserRound,
    },
    {
      title: "Prior approval for expenses",
      description: "Third-party costs are approved by you before they are incurred.",
      icon: BadgeCheck,
    },
    {
      title: "Transparent service limits",
      description: "Visit counts and duration limits are stated up front.",
      icon: ListChecks,
    },
    {
      title: "Personalised support planning",
      description: "A plan shaped around your parent’s routines and needs.",
      icon: PenLine,
    },
    {
      title: "Dignity and independence",
      description: "Support that respects how your loved one wishes to live.",
      icon: Heart,
    },
  ] satisfies TrustPoint[],
} as const;

/* ---------- FAQ ---------- */
export function getFaqs(): FaqItem[] {
  return [
    {
      question: "What is Dear Ones?",
      answer:
        "Dear Ones is a local support and care-coordination service for older adults living at home. Services may include scheduled wellbeing visits, everyday assistance, family updates and coordination with trusted third-party providers.",
    },
    {
      question: "Who is Dear Ones for?",
      answer:
        "It is designed for families who want dependable local support for parents or older relatives, particularly when family members live in another city or country.",
    },
    {
      question: "What happens during a wellbeing visit?",
      answer:
        "A visit may include companionship, general wellbeing observations, routine reminders, home-safety observations and an update to the family, depending on the selected care plan.",
    },
    {
      question: "Does Dear Ones provide medical treatment?",
      answer:
        "Dear Ones focuses on support, observation, reminders and care coordination. Medical diagnosis and clinical treatment, where required, are provided by appropriately qualified third-party professionals.",
      needsConfirmation: true,
    },
    {
      question: "How will my family receive updates?",
      answer:
        "Depending on the care plan, updates may include a digital visit report, important observations, consent-based photos and periodic wellbeing summaries.",
    },
    {
      question: "Can I request support outside the regular plan?",
      answer:
        "Additional assistance may be requested through Dear Ones On-Demand, subject to service availability and additional charges.",
    },
    {
      question: "Are hospital and third-party expenses included?",
      answer:
        "Plan inclusions and visit limits vary. Third-party medical, transport, repair or service-provider expenses are normally charged separately with prior approval.",
    },
    {
      question: "Where are Dear Ones services available?",
      answer:
        siteConfig.serviceAreas.length > 0
          ? `Dear Ones currently supports families in ${serviceAreaLabel()}. Please contact the team to confirm availability in your parent’s specific location.`
          : "Please contact the Dear Ones team to confirm service availability in your parent’s location.",
    },
    {
      question: "How do we get started?",
      answer:
        "Complete the enquiry form or contact the team by phone or WhatsApp. A care coordinator will discuss your family’s requirements and available service options.",
    },
  ];
}

/* ---------- Contact ---------- */
export const contact = {
  heading: "Let’s understand what your family needs.",
  body: "Tell us a little about your parent, their location and the kind of support you are considering. A care coordinator can then explain the available options.",
  consentLabel:
    "I agree to be contacted by Dear Ones about my enquiry. I understand this is not a request for emergency assistance.",
} as const;

export const supportTypeOptions: SelectOption[] = SUPPORT_TYPES.map((v) => ({
  value: v,
  label: v,
}));

export const contactMethodOptions: SelectOption[] = CONTACT_METHODS.map(
  (v) => ({ value: v, label: v })
);

export const contactTimeOptions: SelectOption[] = CONTACT_TIMES.map((v) => ({
  value: v,
  label: v,
}));

/* ---------- Footer ---------- */
export const footer = {
  description:
    "Dependable local support for older adults living at home — regular visits, everyday assistance, care coordination and clear family updates for families near and far.",
  disclaimer:
    "Service availability, visit limits and response times vary by location and plan. Clinical, emergency and third-party services are coordinated with external providers where applicable. Confirm all service details with Dear Ones before enrolment.",
} as const;
