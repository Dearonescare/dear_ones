import {
  Building2,
  CalendarDays,
  ClipboardList,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Hospital,
  House,
  ShieldCheck,
  ShoppingCart,
  Siren,
  Smartphone,
  Star,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import type {
  CarePlanBenefitGroup,
  CarePlanDetail,
  CarePlanId,
  CarePlanTierCard,
} from "@/types";

/** The three tabs above the plan panel. */
export const carePlanTiers: CarePlanTierCard[] = [
  {
    id: "essential",
    number: "01",
    eyebrow: "DEAR CARE",
    name: "Essential",
    tagline: "WE VISIT & MONITOR",
    icon: HeartHandshake,
  },
  {
    id: "plus",
    number: "02",
    eyebrow: "DEAR CARE",
    name: "Plus",
    tagline: "WE VISIT, MONITOR & ASSIST",
    icon: UsersRound,
  },
  {
    id: "elite",
    number: "03",
    eyebrow: "DEAR CARE",
    name: "Elite",
    tagline: "WE CARE, COMPANION & MANAGE",
    icon: HeartPulse,
  },
];

/* ---------------------------------------------------------------------------
   Groups that are worded identically across tiers live here once, so a copy
   change lands on every plan that includes them.
   --------------------------------------------------------------------------- */

const healthMonitoring: CarePlanBenefitGroup = {
  title: "Health Monitoring",
  icon: Stethoscope,
  items: [
    "Blood Pressure",
    "Blood Sugar",
    "Pulse Rate",
    "Oxygen Saturation (SpO₂)",
    "Weight monitoring",
    "Medication reminders",
    "Nutrition & hydration observation",
  ],
};

const homeSafety: CarePlanBenefitGroup = {
  title: "Home Safety",
  icon: House,
  items: [
    "Home safety inspection",
    "Fall-risk observation",
    "General wellbeing assessment",
  ],
};

const familyUpdates: CarePlanBenefitGroup = {
  title: "Family Updates",
  icon: Smartphone,
  items: [
    "Digital visit report after every visit",
    "Photos (with consent)",
    "Monthly wellbeing summary",
  ],
};

const careCoordination: CarePlanBenefitGroup = {
  title: "Care Coordination",
  icon: CalendarDays,
  items: [
    "Doctor / Hospital appointment coordination",
    "Guidance in accessing healthcare services",
  ],
};

const emergencySupport: CarePlanBenefitGroup = {
  title: "Emergency Support",
  icon: Siren,
  items: [
    "Emergency alert & response coordination",
    "Immediate family notification",
    "Ambulance coordination",
    "Hospital coordination",
    "Relative & neighbour coordination when required",
  ],
};

const essentialLivingAssistance: CarePlanBenefitGroup = {
  title: "Essential Living Assistance",
  icon: ShoppingCart,
  items: [
    "Grocery shopping assistance",
    "Bill payment assistance",
    "Banking & document assistance",
    "Courier & parcel collection",
    "Essential errands",
  ],
};

/** Only the free-visit allowance differs between Plus and Elite. */
function medicalAssistance(allowance: string): CarePlanBenefitGroup {
  return {
    title: "Medical Assistance",
    icon: Hospital,
    items: [
      `Hospital & clinic accompaniment (up to 6 hours per visit, ${allowance})`,
      "Doctor appointment assistance",
      "Medicine collection & prescription pickup",
    ],
  };
}

const membershipCaption = (name: string) =>
  `Core services included with Dear Care ${name}`;

const additionalCaption = "Extra support for greater peace of mind";

export const carePlanDetails: Record<CarePlanId, CarePlanDetail> = {
  essential: {
    title: "Dear Care Essential",
    description:
      "Regular visits and monitoring to make sure your parents are safe, comfortable and well supported.",
    image: {
      src: "/images/plan-essential.webp",
      alt: "Care professional checking an elderly woman’s blood pressure during a home visit",
    },
    note: "Caring visits. Peace of mind.",
    membership: {
      title: "Your Membership Includes",
      caption: membershipCaption("Essential"),
      icon: ShieldCheck,
      groups: [
        {
          title: "Personal Wellbeing Visits",
          icon: UsersRound,
          items: [
            "2 scheduled home visits every month",
            "Friendly companionship and meaningful conversations",
            "Physical, emotional and social wellbeing observation",
          ],
        },
        healthMonitoring,
        homeSafety,
        familyUpdates,
        careCoordination,
      ],
    },
  },

  plus: {
    title: "Dear Care Plus",
    description:
      "Everything in Essential, plus extra support when they need it most.",
    image: {
      src: "/images/plan-plus.webp",
      alt: "Care professional walking with an elderly man outside a hospital",
    },
    note: "We combine regular visits, health monitoring and day-to-day assistance — so your parents stay supported and secure.",
    membership: {
      title: "Your Membership Includes",
      caption: membershipCaption("Plus"),
      icon: ShieldCheck,
      groups: [
        {
          title: "Personal Wellbeing Visits",
          icon: UsersRound,
          items: [
            "4 scheduled home visits every month",
            "Friendly companionship and meaningful conversations",
            "Physical, emotional and social wellbeing observation",
          ],
        },
        healthMonitoring,
        homeSafety,
        familyUpdates,
        careCoordination,
      ],
    },
    additional: {
      title: "Additional Benefits in Plus",
      caption: additionalCaption,
      icon: Star,
      groups: [
        emergencySupport,
        medicalAssistance("1 free visit per month"),
        essentialLivingAssistance,
        {
          title: "Continued Family Communication",
          icon: Handshake,
          items: [
            "Priority family updates during medical or emergency situations",
          ],
        },
      ],
    },
  },

  elite: {
    title: "Dear Care Elite",
    description:
      "Complete care, companionship and management — so your loved ones live with dignity and comfort.",
    image: {
      src: "/images/plan-elite.webp",
      alt: "Care coordinator with an elderly couple sharing a video call with family",
    },
    note: "We don’t just provide services, we become your family’s extended support system.",
    membership: {
      title: "Your Membership Includes",
      caption: membershipCaption("Elite"),
      icon: ShieldCheck,
      groups: [
        {
          title: "Dedicated Care Support",
          icon: UsersRound,
          items: [
            "8 scheduled home visits every month",
            "Dedicated Family Care Coordinator",
          ],
        },
        {
          title: "Personal Wellbeing Visits",
          icon: HeartHandshake,
          items: [
            "Friendly companionship and meaningful conversations",
            "Physical, emotional and social wellbeing observation",
          ],
        },
        healthMonitoring,
        homeSafety,
        familyUpdates,
        careCoordination,
      ],
    },
    additional: {
      title: "Additional Benefits in Elite",
      caption: additionalCaption,
      icon: Star,
      groups: [
        emergencySupport,
        medicalAssistance("3 free visits per month"),
        essentialLivingAssistance,
        {
          title: "Continued Family Communication",
          icon: Handshake,
          items: [
            "Priority family updates during medical or emergency situations",
            "Personalized Assistance Based on Changing Needs",
            "One Dedicated Point of Contact for All Support Services",
          ],
        },
        {
          title: "Service Limits",
          icon: ClipboardList,
          items: [
            "Hospital Escort: Up to 6 hours per visit, maximum 3 free visits per month",
            "Companion Visits: Up to 3 hours per visit, maximum 2 free visits per month",
            "Additional hours or visits can be arranged at an extra charge, subject to availability",
          ],
        },
        {
          title: "Home & Property Management",
          icon: Building2,
          items: [
            "Regular Property Inspections",
            "Home Maintenance Coordination",
            "Electrician, Plumber & Technician Arrangements",
            "Cleaning & Pest Control Coordination",
            "Property Supervision During Your Absence",
          ],
        },
        {
          title: "Companion & Lifestyle Support",
          icon: UsersRound,
          items: [
            "Companion Visits (up to 3 hours per visit, 2 free visits per month)",
            "Shopping & Essential Outdoor Assistance",
            "Festival & Special Occasion Support",
            "Social & Recreational Accompaniment (within service limits)",
          ],
        },
        {
          title: "Complete Family Support",
          icon: HeartHandshake,
          items: [
            "Unlimited Care Coordination",
            "Priority Family Updates",
            "Advanced Healthcare Support",
            "Hospital Admission & Discharge Coordination",
            "Hospital Escort & Accompaniment (up to 6 hours per visit, 3 free visits per month)",
            "Nursing, Physiotherapy & Diagnostic Service Coordination",
            "Specialist Appointment Coordination",
          ],
        },
      ],
    },
  },
};
