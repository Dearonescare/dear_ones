"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  Clock3,
  Heart,
  LockKeyhole,
  MapPin,
  PhoneCall,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { carePlanDetails, carePlanTiers } from "@/content/care-plans";
import type { CarePlanId, CarePlanSection } from "@/types";

/**
 * A numbered block of the plan panel: tinted title bar, then one benefit
 * group per grid cell. Every cell draws its own top/left hairline and the
 * grid is nudged a pixel up and left inside a clipping wrapper, so the
 * outermost rules fall outside the frame — that yields dividers *between*
 * cells at any column count, without nth-child maths per breakpoint.
 */
function PlanSectionBlock({
  index,
  section,
  columnsClass,
  theme,
}: {
  index: number;
  section: CarePlanSection;
  columnsClass: string;
  theme: PlanTheme;
}) {
  const SectionIcon = section.icon;

  return (
    <section>
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[14px] border px-3 py-2.5 ${theme.sectionBar}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border ${theme.sectionIcon}`}
        >
          <SectionIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
        </span>

        <span
          className={`font-serif text-[19px] font-semibold leading-none ${theme.sectionIndex}`}
        >
          {index}
        </span>

        <h3
          className={`text-[14px] font-bold tracking-[-0.01em] sm:text-[15px] ${theme.sectionTitle}`}
        >
          {section.title}
        </h3>

        <p
          className={`text-[11px] font-semibold sm:ml-auto sm:text-[12px] ${theme.sectionCaption}`}
        >
          {section.caption}
        </p>
      </div>

      <div className="mt-3 overflow-hidden">
        <div className={`-ml-px -mt-px grid ${columnsClass}`}>
          {section.groups.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.title}
                className={`border-l border-t px-4 py-4 ${theme.groupBorder}`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${theme.groupIcon}`}
                  >
                    <Icon className="h-4.25 w-4.25" strokeWidth={1.8} />
                  </span>

                  <h4
                    className={`pt-1.5 text-[12.5px] font-bold leading-tight tracking-[-0.01em] ${theme.groupTitle}`}
                  >
                    {group.title}
                  </h4>
                </div>

                <ul className="mt-2.5 space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[9px_minmax(0,1fr)] gap-1.5 text-[11.5px] leading-[1.55] text-[#54606a]"
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-1.75 h-0.75 w-0.75 rounded-full ${theme.groupBullet}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Unselected tabs keep their own soft tint; the selected one always turns
 * brand olive, so colour reads as state rather than as plan identity.
 */
const idlePalettes: Record<
  CarePlanId,
  { card: string; icon: string; number: string }
> = {
  essential: {
    card: "border-[#d8e2d3] bg-[#f1f6ec] text-[#1d502f]",
    icon: "bg-[#397e45] text-white",
    number: "text-[#245b34]",
  },
  plus: {
    card: "border-[#cfe0f1] bg-[#eef4fb] text-[#1c5487]",
    icon: "bg-white text-[#245a9e]",
    number: "text-[#1f61a8]",
  },
  elite: {
    card: "border-[#eadfca] bg-[#fffaf1] text-[#aa7414]",
    icon: "bg-white text-[#b88422]",
    number: "text-[#b47c18]",
  },
};

/**
 * Full colour theme for the selected plan. Tailwind cannot build arbitrary
 * values at runtime, so every variant is written out as a complete class
 * string rather than composed from a hex value.
 */
interface PlanTheme {
  /** Selected tab: card, icon bubble, caret and focus ring. */
  tabCard: string;
  tabIcon: string;
  tabCaret: string;
  focusRing: string;
  /** Panel shell. */
  panel: string;
  summaryDivider: string;
  summaryTitle: string;
  imageBox: string;
  noteBox: string;
  noteIcon: string;
  noteText: string;
  /** Numbered section bar. */
  sectionBar: string;
  sectionIcon: string;
  sectionIndex: string;
  sectionTitle: string;
  sectionCaption: string;
  /** Benefit groups. */
  groupBorder: string;
  groupIcon: string;
  groupTitle: string;
  groupBullet: string;
  /** Closing call to action. */
  cta: string;
}

const planThemes: Record<CarePlanId, PlanTheme> = {
  essential: {
    tabCard:
      "border-[#2f6b3d] bg-linear-to-b from-[#4b9159] to-[#2f6b3d] text-white shadow-[0_14px_28px_rgba(40,86,52,0.20)]",
    tabIcon: "bg-white text-[#2f6b3d]",
    tabCaret: "bg-[#2f6b3d]",
    focusRing: "focus-visible:ring-[#b3d3b9]",
    panel: "border-[#dde7da] bg-[#fbfdfa]",
    summaryDivider: "border-[#e0e6dd]",
    summaryTitle: "text-[#2f6b3d]",
    imageBox: "bg-[#eef6ea]",
    noteBox: "bg-[#eef6ea]",
    noteIcon: "text-[#3d7a4a]",
    noteText: "text-[#3a6b44]",
    sectionBar:
      "border-[#d8e5d3] bg-linear-to-r from-[#e9f4e5] via-[#f2f8ef] to-[#fbfdfa]",
    sectionIcon:
      "border-[#cfe0ca] bg-white text-[#377044] shadow-[0_3px_9px_rgba(55,112,68,0.13)]",
    sectionIndex: "text-[#4e9a5e]",
    sectionTitle: "text-[#255a35]",
    sectionCaption: "text-[#5f8a68]",
    groupBorder: "border-[#e6eee3]",
    groupIcon: "bg-[#e9f2e5] text-[#377044]",
    groupTitle: "text-[#2c6b3c]",
    groupBullet: "bg-[#a9c4ad]",
    cta: "bg-[#3d7a4a] shadow-[0_9px_20px_rgba(61,122,74,0.22)] hover:bg-[#336840]",
  },
  plus: {
    tabCard:
      "border-[#245a9e] bg-linear-to-b from-[#3972b8] to-[#21589f] text-white shadow-[0_14px_28px_rgba(33,72,120,0.18)]",
    tabIcon: "bg-white text-[#245a9e]",
    tabCaret: "bg-[#21589f]",
    focusRing: "focus-visible:ring-[#aac4e5]",
    panel: "border-[#dde5ed] bg-[#fbfcfe]",
    summaryDivider: "border-[#dfe4e8]",
    summaryTitle: "text-[#1c5f9e]",
    imageBox: "bg-[#edf3fb]",
    noteBox: "bg-[#edf3fb]",
    noteIcon: "text-[#2b6098]",
    noteText: "text-[#2f5f8c]",
    sectionBar:
      "border-[#d9e5f2] bg-linear-to-r from-[#e8f1fb] via-[#f1f7fd] to-[#fbfcfe]",
    sectionIcon:
      "border-[#cfe0f1] bg-white text-[#1f61a8] shadow-[0_3px_9px_rgba(31,97,168,0.13)]",
    sectionIndex: "text-[#3d84cb]",
    sectionTitle: "text-[#17568f]",
    sectionCaption: "text-[#5486b6]",
    groupBorder: "border-[#e7edf4]",
    groupIcon: "bg-[#e9f1fb] text-[#245a9f]",
    groupTitle: "text-[#1c62ab]",
    groupBullet: "bg-[#9db6cd]",
    cta: "bg-[#1762b7] shadow-[0_9px_20px_rgba(23,98,183,0.22)] hover:bg-[#1058a8]",
  },
  elite: {
    tabCard:
      "border-[#a06f14] bg-linear-to-b from-[#c9962f] to-[#a06f14] text-white shadow-[0_14px_28px_rgba(140,98,20,0.20)]",
    tabIcon: "bg-white text-[#a06f14]",
    tabCaret: "bg-[#a06f14]",
    focusRing: "focus-visible:ring-[#e6cd9b]",
    panel: "border-[#ece1cd] bg-[#fffdf8]",
    summaryDivider: "border-[#eae2d3]",
    summaryTitle: "text-[#a06f14]",
    imageBox: "bg-[#fdf5e6]",
    noteBox: "bg-[#fdf5e6]",
    noteIcon: "text-[#b47c18]",
    noteText: "text-[#8a6220]",
    sectionBar:
      "border-[#ecdfc6] bg-linear-to-r from-[#f9efdb] via-[#fdf7ec] to-[#fffdf8]",
    sectionIcon:
      "border-[#eadfca] bg-white text-[#b47c18] shadow-[0_3px_9px_rgba(180,124,24,0.13)]",
    sectionIndex: "text-[#d09a2e]",
    sectionTitle: "text-[#8a5f10]",
    sectionCaption: "text-[#a4884f]",
    groupBorder: "border-[#f0e8d9]",
    groupIcon: "bg-[#f7edd9] text-[#b47c18]",
    groupTitle: "text-[#a06f14]",
    groupBullet: "bg-[#d9c193]",
    cta: "bg-[#b47c18] shadow-[0_9px_20px_rgba(180,124,24,0.24)] hover:bg-[#9c6a12]",
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
  const [selectedPlan, setSelectedPlan] = useState<CarePlanId>("plus");

  const activePlan = carePlanDetails[selectedPlan];
  const theme = planThemes[selectedPlan];

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
              <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8">
                <div className="flex min-h-[500px] items-start pb-[230px] pt-11 md:items-center md:pb-36 md:pt-0 lg:min-h-[535px]">
                  <div className="w-full text-center md:max-w-150 lg:max-w-160">
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
<div className="relative z-20 -mt-[96px]">
  <div className="grid grid-cols-3 items-end gap-1.5 sm:gap-2 md:gap-0">
    {carePlanTiers.map((plan) => {
      const Icon = plan.icon;
      const isSelected = selectedPlan === plan.id;
      const idle = idlePalettes[plan.id];
      // Selected state now carries the plan's own colour, so the panel below
      // and the tab above read as one theme.
      const tabTheme = planThemes[plan.id];

      return (
        <button
          key={plan.id}
          type="button"
          onClick={() => setSelectedPlan(plan.id)}
          aria-pressed={isSelected}
          className={[
            "relative w-full border px-2 pb-3 pt-7 text-center transition-all duration-300 sm:px-4 sm:pb-4 sm:pt-8",
            "focus-visible:outline-none focus-visible:ring-4",
            tabTheme.focusRing,
            "rounded-t-[16px] sm:rounded-t-[24px]",

            plan.id === "essential" ? "md:rounded-tr-none" : "",
            plan.id === "elite" ? "md:rounded-tl-none" : "",

            isSelected
              ? `z-20 min-h-[132px] -translate-y-1 sm:min-h-[154px] ${tabTheme.tabCard}`
              : `z-10 min-h-[124px] hover:-translate-y-1 sm:min-h-[142px] ${idle.card}`,
          ].join(" ")}
        >
          <div
            className={[
              "absolute left-1/2 top-0 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-[#faf7f0] shadow-[0_6px_14px_rgba(45,53,41,0.14)] sm:h-[62px] sm:w-[62px] sm:border-[5px]",

              isSelected ? tabTheme.tabIcon : idle.icon,
            ].join(" ")}
          >
            <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.7} />
          </div>

          <div className="flex items-center text-left">
            <span
              className={[
                "font-serif text-[14px] leading-none sm:text-[18px]",
                isSelected ? "text-white/85" : idle.number,
              ].join(" ")}
            >
              {plan.number}
            </span>
          </div>

          <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.06em] sm:text-[10px] sm:tracking-[0.08em]">
            {plan.eyebrow}
          </p>

          <h3 className="mt-1 font-serif text-[19px] font-semibold leading-none tracking-[-0.02em] sm:text-[27px]">
            {plan.name}
          </h3>

          <p className="mt-2 text-[7px] font-bold uppercase leading-[1.35] tracking-[0.03em] sm:mt-3 sm:text-[9px] sm:tracking-[0.04em]">
            {plan.tagline}
          </p>

          {isSelected && (
            <span
              className={`absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 sm:-bottom-[9px] sm:h-4.5 sm:w-4.5 ${tabTheme.tabCaret}`}
            />
          )}
        </button>
      );
    })}
  </div>

  {/* Selected-plan details */}
  <div
    className={`relative z-30 rounded-[26px] border px-5 py-6 shadow-[0_16px_42px_rgba(36,70,105,0.10)] sm:px-6 lg:px-8 lg:py-7 ${theme.panel}`}
  >
    <div className="grid gap-6 lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-7">
      {/* Left summary */}
      <div
        className={`border-b pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7 ${theme.summaryDivider}`}
      >
        <h3
          className={`font-serif text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] ${theme.summaryTitle}`}
        >
          {activePlan.title}
        </h3>

        <p className="mt-3 text-[13px] font-medium leading-normal text-[#4a555d]">
          {activePlan.description}
        </p>

        {/* The artwork has a transparent surround, so the tinted box behind it
            is what gives each plan its own colour. */}
        <div
          className={`relative mt-5 h-36 overflow-hidden rounded-[18px] ${theme.imageBox}`}
        >
          <Image
            key={activePlan.image.src}
            src={activePlan.image.src}
            alt={activePlan.image.alt}
            fill
            className="object-contain object-center"
            sizes="212px"
          />
        </div>

        <div className={`mt-5 rounded-[16px] px-4 py-4 ${theme.noteBox}`}>
          <ShieldCheck
            className={`h-5 w-5 ${theme.noteIcon}`}
            strokeWidth={1.7}
          />

          <p
            className={`mt-2.5 text-[12px] font-medium leading-[1.65] ${theme.noteText}`}
          >
            {activePlan.note}
          </p>
        </div>
      </div>

      {/* Numbered sections */}
      <div className="min-w-0 space-y-6">
        <PlanSectionBlock
          index={1}
          section={activePlan.membership}
          columnsClass="sm:grid-cols-2 lg:grid-cols-3"
          theme={theme}
        />

        {activePlan.additional && (
          <PlanSectionBlock
            index={2}
            section={activePlan.additional}
            columnsClass="sm:grid-cols-2 lg:grid-cols-3"
            theme={theme}
          />
        )}
      </div>
    </div>

    {/* Smaller CTA */}
    <div className="mt-5 flex justify-center">
      <a
        href="#contact"
        className={`group inline-flex min-h-[48px] w-full max-w-[340px] items-center justify-between rounded-full py-2 pl-6 pr-2 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 ${theme.cta}`}
      >
        <span>
          Explore Dear Care{" "}
          {carePlanTiers.find((plan) => plan.id === selectedPlan)?.name}
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
            <div className="pb-7 pt-14">
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
                  className="h-4.5 w-4.5 text-[#39453e]"
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