"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Clock3,
  Heart,
  HeartHandshake,
  HeartPulse,
  Hospital,
  LockKeyhole,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Siren,
  Stethoscope,
  UsersRound,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type PlanId = "essential" | "plus" | "elite";

const plans = [
  {
    id: "essential" as PlanId,
    number: "01",
    eyebrow: "DEAR CARE",
    name: "Essential",
    tagline: "WE VISIT & MONITOR",
    icon: HeartHandshake,
  },
  {
    id: "plus" as PlanId,
    number: "02",
    eyebrow: "DEAR CARE",
    name: "Plus",
    tagline: "WE VISIT, MONITOR & ASSIST",
    icon: UsersRound,
  },
  {
    id: "elite" as PlanId,
    number: "03",
    eyebrow: "DEAR CARE",
    name: "Elite",
    tagline: "WE CARE, COMPANION & MANAGE",
    icon: HeartPulse,
  },
];

const planContent = {
  essential: {
    heading: "Essential Care. Reliable Support.",
    description:
      "Regular visits and monitoring to make sure your parents are safe, comfortable and well supported.",
    idealFor:
      "Ideal for parents who need regular check-ins, monitoring and family updates.",
    services: [
      {
        title: "Scheduled Home Visits",
        description: "Regular visits from our trusted local care team.",
        icon: CalendarDays,
      },
      {
        title: "Regular Updates",
        description: "Stay informed through clear reports, photos and calls.",
        icon: BellRing,
      },
      {
        title: "Wellness Monitoring",
        description:
          "We check general wellbeing and report important changes.",
        icon: HeartPulse,
      },
      {
        title: "Family Coordination",
        description:
          "We stay connected with your family whenever support is needed.",
        icon: UsersRound,
      },
      {
        title: "Local Assistance",
        description:
          "Dependable support from a care team located nearby.",
        icon: MapPin,
      },
      {
        title: "Peace of Mind",
        description: "You stay informed even when you cannot be there.",
        icon: Heart,
      },
    ],
  },

  plus: {
    heading: "More Support. More Peace of Mind.",
    description:
      "Everything in Essential, plus extra support when they need it most.",
    idealFor:
      "Ideal for parents who may need occasional medical visits or extra support.",
    services: [
      {
        title: "All Essential Plan Services",
        description: "Includes all services in Dear Care Essential.",
        icon: ShieldCheck,
      },
      {
        title: "Priority Response",
        description: "Faster response for urgent needs.",
        icon: Zap,
      },
      {
        title: "Emergency Support",
        description:
          "Immediate family notification, ambulance coordination, hospital coordination, relative and neighbour coordination.",
        icon: Siren,
      },
      {
        title: "Care Coordination",
        description:
          "We coordinate with doctors, hospitals and service providers for seamless care.",
        icon: UsersRound,
      },
      {
        title: "Medical Assistance",
        description:
          "Hospital or clinic accompaniment, doctor appointment assistance, medicine collection and prescription pickup.",
        icon: Hospital,
      },
      {
        title: "Peace of Mind",
        description: "You’re always informed. We’re always there.",
        icon: Heart,
      },
    ],
  },

  elite: {
    heading: "Complete Care. Constant Reassurance.",
    description:
      "Everything in Plus, with companionship, personal assistance and complete care management.",
    idealFor:
      "Ideal for parents who need frequent assistance, companionship and complete care coordination.",
    services: [
      {
        title: "All Plus Plan Services",
        description: "Includes all services in Dear Care Plus.",
        icon: ShieldCheck,
      },
      {
        title: "Dedicated Care Manager",
        description: "One trusted point of contact for your family.",
        icon: UsersRound,
      },
      {
        title: "Companion Support",
        description:
          "Regular companionship and assistance with daily needs.",
        icon: HeartHandshake,
      },
      {
        title: "Healthcare Coordination",
        description:
          "Complete coordination with doctors, clinics and hospitals.",
        icon: Stethoscope,
      },
      {
        title: "Priority Assistance",
        description:
          "Faster coordination whenever urgent support is required.",
        icon: Zap,
      },
      {
        title: "Complete Peace of Mind",
        description:
          "Continuous support, communication and reassurance.",
        icon: Heart,
      },
    ],
  },
};

const heroTrustItems = [
  {
    label: "Trusted & Verified",
    icon: ShieldCheck,
  },
  {
    label: "Regular Updates",
    icon: BellRing,
  },
  {
    label: "Safe & Secure",
    icon: LockKeyhole,
  },
  {
    label: "Always Connected",
    icon: UsersRound,
  },
];

const trustItems = [
  {
    title: "Always Connected",
    description: "Stay updated through photos, reports & calls.",
    icon: PhoneCall,
    iconClass: "bg-[#edf6e9] text-[#377044]",
  },
  {
    title: "Secure & Confidential",
    description: "Your family’s privacy is our priority.",
    icon: LockKeyhole,
    iconClass: "bg-[#edf3fb] text-[#285c9d]",
  },
  {
    title: "24/7 Coordination",
    description: "We coordinate, respond and keep you informed.",
    icon: Clock3,
    iconClass: "bg-[#fff5e5] text-[#b47a1c]",
  },
  {
    title: "Expert Care Team",
    description: "Trained, compassionate and background verified.",
    icon: UsersRound,
    iconClass: "bg-[#f4eff9] text-[#77569a]",
  },
  {
    title: "Local Presence",
    description: "We are nearby when you need us.",
    icon: MapPin,
    iconClass: "bg-[#edf6e9] text-[#377044]",
  },
];

export function CarePlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("plus");

  const activePlan = planContent[selectedPlan];

  return (
    <section
      id="care-plans"
      className="overflow-hidden bg-[#faf7f0]"
    >
      <Container>
        <Reveal>
          <div>
            {/* Unified care-plans hero */}
            <div className="relative left-1/2 min-h-[500px] w-screen -translate-x-1/2 overflow-hidden bg-[#faf7f0] lg:min-h-[535px]">
              {/* Right-aligned banner image */}
              <div className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden md:block lg:w-[56%] xl:w-[54%]">
                <Image
                  src="/images/plan_banner.png"
                  alt="Care professional supporting an elderly parent"
                  fill
                  priority
                  className="object-cover object-[52%_center]"
                  sizes="(max-width: 1024px) 58vw, (max-width: 1280px) 56vw, 54vw"
                />
              </div>

              {/* Mobile banner */}
            <div className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden md:block lg:w-[56%] xl:w-[54%]">
  <Image
    src="/images/plan_banner.png"
    alt="Care professional supporting an elderly parent"
    fill
    priority
    className="object-cover object-[52%_2%]"
    sizes="(max-width: 1024px) 58vw, (max-width: 1280px) 56vw, 54vw"
  />
</div>

              {/* Seamless cream-to-image blend */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#faf7f0] from-[0%] via-[#faf7f0] via-[42%] to-transparent to-[72%] md:block" />

              {/* Additional soft blend so there is no visible division */}
              <div className="absolute inset-y-0 left-[35%] hidden w-[34%] bg-gradient-to-r from-[#faf7f0] via-[#faf7f0]/80 to-transparent md:block" />

              {/* Mobile fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] from-[0%] via-[#faf7f0] via-[55%] to-transparent md:hidden" />

              {/* Main text content */}
              <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
                <div className="flex min-h-[500px] items-start pb-[230px] pt-11 md:items-center md:pb-36 md:pt-0 lg:min-h-[535px]">
                  <div className="w-full text-center md:max-w-[660px] lg:max-w-[700px]">
                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-[15px] text-[#64815e]">✦</span>

                      <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#252b27] sm:text-[13px]">
                        OUR CARE PLANS
                      </p>

                      <span className="text-[15px] text-[#64815e]">✦</span>
                    </div>

                    {/* Heading */}
                    <h2 className="mt-7 font-serif text-[37px] font-semibold leading-[1.07] tracking-[-0.04em] text-[#1e231f] sm:text-[48px] lg:text-[56px]">
                      Three Plans. One Promise.
                    </h2>

                    <p className="mt-2 font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#3d6840] sm:text-[47px] lg:text-[54px]">
                      Your Parents, Our Priority.
                    </p>

                    {/* Supporting copy */}
                    <div className="mt-7">
                      <p className="text-[14px] font-medium leading-6 text-[#414943] sm:text-[15px]">
                        Choose the care that suits your parents&apos; needs.
                      </p>

                      <p className="text-[14px] font-medium leading-6 text-[#414943] sm:text-[15px]">
                        We visit, monitor and stay connected — so you can stay worry-free.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                      <span className="h-px w-[82px] bg-[#cbc8bd]" />

                      <Heart
                        className="h-[20px] w-[20px] text-[#47724b]"
                        strokeWidth={1.7}
                      />

                      <span className="h-px w-[82px] bg-[#cbc8bd]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust panel */}
              <div className="absolute right-4 top-8 z-20 hidden w-[158px] rounded-[24px] border border-white/80 bg-[#faf8f1]/95 px-4 py-2 shadow-[0_14px_38px_rgba(34,43,30,0.18)] backdrop-blur-md xl:block">
                {heroTrustItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={`flex min-h-[70px] items-center gap-3 ${index !== heroTrustItems.length - 1
                        ? "border-b border-[#deddd4]"
                        : ""
                        }`}
                    >
                      <Icon
                        className="h-[22px] w-[22px] shrink-0 text-[#315f40]"
                        strokeWidth={1.6}
                      />

                      <span className="text-[11px] font-semibold leading-[15px] text-[#303832]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan selector overlaps the hero */}
         {/* Compact plan selector */}
<div className="relative z-20 -mt-[96px] px-4 sm:px-7 lg:px-12">
  <div className="grid gap-3 md:grid-cols-3 md:items-end md:gap-0">
    {plans.map((plan) => {
      const Icon = plan.icon;
      const isSelected = selectedPlan === plan.id;

      const isEssential = plan.id === "essential";
      const isPlus = plan.id === "plus";
      const isElite = plan.id === "elite";

      return (
        <button
          key={plan.id}
          type="button"
          onClick={() => setSelectedPlan(plan.id)}
          aria-pressed={isSelected}
          className={[
            "relative w-full border px-5 pb-4 pt-8 text-center transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#aac4e5]",

            isEssential
              ? "rounded-t-[24px] border-[#d8e2d3] bg-[#f1f6ec] text-[#1d502f] md:rounded-tr-none"
              : "",

            isPlus
              ? "rounded-t-[24px] border-[#245a9e] bg-gradient-to-b from-[#3972b8] to-[#21589f] text-white"
              : "",

            isElite
              ? "rounded-t-[24px] border-[#eadfca] bg-[#fffaf1] text-[#aa7414] md:rounded-tl-none"
              : "",

            isSelected
              ? "z-20 min-h-[154px] -translate-y-1 shadow-[0_14px_28px_rgba(33,72,120,0.18)]"
              : "z-10 min-h-[142px] hover:-translate-y-1",
          ].join(" ")}
        >
          {/* Smaller plan icon */}
          <div
            className={[
              "absolute left-1/2 top-0 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#faf7f0] shadow-[0_6px_14px_rgba(45,53,41,0.14)]",

              isEssential ? "bg-[#397e45] text-white" : "",
              isPlus ? "bg-white text-[#245a9e]" : "",
              isElite ? "bg-white text-[#b88422]" : "",
            ].join(" ")}
          >
            <Icon className="h-7 w-7" strokeWidth={1.7} />
          </div>

          <div className="flex items-center text-left">
            <span
              className={[
                "font-serif text-[18px] leading-none",
                isEssential ? "text-[#245b34]" : "",
                isPlus ? "text-white" : "",
                isElite ? "text-[#b47c18]" : "",
              ].join(" ")}
            >
              {plan.number}
            </span>
          </div>

          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em]">
            {plan.eyebrow}
          </p>

          <h3 className="mt-1 font-serif text-[27px] font-semibold leading-none tracking-[-0.02em]">
            {plan.name}
          </h3>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.04em]">
            {plan.tagline}
          </p>

          {isSelected && (
            <span
              className={[
                "absolute -bottom-[9px] left-1/2 h-[18px] w-[18px] -translate-x-1/2 rotate-45",
                isEssential ? "bg-[#f1f6ec]" : "",
                isPlus ? "bg-[#21589f]" : "",
                isElite ? "bg-[#fffaf1]" : "",
              ].join(" ")}
            />
          )}
        </button>
      );
    })}
  </div>

  {/* Compact selected-plan details */}
  <div className="relative z-30 rounded-[26px] border border-[#dde5ed] bg-[#fbfcfe] px-5 py-6 shadow-[0_16px_42px_rgba(36,70,105,0.10)] sm:px-6 lg:px-8 lg:py-7">
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      {/* Left summary */}
      <div className="border-b border-[#dfe4e8] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
        <h3 className="font-serif text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#173d60]">
          {activePlan.heading.split(". ").map((line, index, array) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < array.length - 1 ? "." : ""}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </h3>

        <p className="mt-4 max-w-[205px] text-[13px] font-medium leading-[1.5] text-[#4a555d]">
          {activePlan.description}
        </p>

        {/* Smaller illustration */}
        <div className="relative mt-5 h-[145px] overflow-hidden rounded-[18px] bg-white">
          <Image
            src="/images/plan_img.png"
            alt="Care professional walking with an elderly parent"
            fill
            className="object-contain object-center"
            sizes="220px"
          />
        </div>
      </div>

      {/* Compact services */}
      <div className="min-w-0">
        <div className="grid md:grid-cols-2">
          {activePlan.services.map((service, index) => {
            const Icon = service.icon;
            const isLastItem =
              index === activePlan.services.length - 1;
            const isDesktopLastRow =
              index >= activePlan.services.length - 2;

            return (
              <div
                key={service.title}
                className={[
                  "grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3 py-4",

                  !isLastItem
                    ? "border-b border-[#e4e8ec]"
                    : "",

                  isDesktopLastRow
                    ? "md:border-b-0"
                    : "md:border-b md:border-[#e4e8ec]",

                  index % 2 === 0
                    ? "md:border-r md:border-[#e4e8ec] md:pr-6"
                    : "md:pl-6",
                ].join(" ")}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3fb] text-[#245a9f]">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold leading-5 text-[#26313a]">
                    {service.title}
                  </h4>

                  <p className="mt-1 text-[12px] font-normal leading-[1.55] text-[#59646d]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smaller ideal-for note */}
        <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-[#edf3fa] px-4 py-3">
          <CalendarDays
            className="mt-0.5 h-5 w-5 shrink-0 text-[#245a9f]"
            strokeWidth={1.7}
          />

          <p className="text-[12px] font-medium leading-5 text-[#315a82]">
            {activePlan.idealFor}
          </p>
        </div>
      </div>
    </div>

    {/* Smaller CTA */}
    <div className="mt-5 flex justify-center">
      <a
        href="#contact"
        className="group inline-flex min-h-[48px] w-full max-w-[300px] items-center justify-between rounded-full bg-[#1762b7] py-2 pl-6 pr-2 text-[13px] font-semibold text-white shadow-[0_9px_20px_rgba(23,98,183,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1058a8]"
      >
        <span>
          Explore Dear Care{" "}
          {plans.find((plan) => plan.id === selectedPlan)?.name}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60">
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.7}
          />
        </span>
      </a>
    </div>
  </div>
</div>

            {/* Bottom trust strip */}
            <div className="px-4 pb-7 pt-14 sm:px-7 lg:px-12">
              <div className="rounded-[23px] border border-[#e4dfd5] bg-white/65 px-5 py-6">
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Heart
                    className="h-[13px] w-[13px] text-[#54675a]"
                    strokeWidth={1.6}
                  />

                  <p className="font-serif text-[20px] italic tracking-wide text-[#394d40]">
                    Care That Feels Like Family
                  </p>

                  <Heart
                    className="h-[13px] w-[13px] text-[#54675a]"
                    strokeWidth={1.6}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                  {trustItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className={[
                          "flex items-start gap-3",

                          index !== trustItems.length - 1
                            ? "lg:border-r lg:border-[#e8e4dc] lg:pr-4"
                            : "",
                        ].join(" ")}
                      >
                        <div
                          className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                        >
                          <Icon
                            className="h-[22px] w-[22px]"
                            strokeWidth={1.7}
                          />
                        </div>

                        <div>
                          <h4 className="font-sans text-[11px] leading-4 text-[#202923]">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-[10px] font-medium leading-[1.55] text-[#555e58]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <span className="h-px w-[34px] bg-[#bab7ae]" />

                <p className="font-serif text-[20px] italic text-[#39453e]">
                  Your Love, Our Hands
                </p>

                <Heart
                  className="h-[18px] w-[18px] text-[#39453e]"
                  strokeWidth={1.4}
                />

                <span className="h-px w-[34px] bg-[#bab7ae]" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}