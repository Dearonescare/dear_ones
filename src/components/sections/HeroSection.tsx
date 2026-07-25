import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { hero } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Ambient warm background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 -top-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,_rgba(238,222,201,0.85),_transparent_65%)]" />
        <div className="absolute -left-32 top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(250,240,226,0.9),_transparent_60%)]" />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up">{hero.eyebrow}</p>
          <h1
            className="mt-5 text-balance text-[2.5rem] leading-[1.06] text-brown animate-fade-up sm:text-[3.25rem] lg:text-[3.7rem]"
            style={{ animationDelay: "60ms" }}
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {hero.description}
          </p>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <Button href="#contact" size="lg" withArrow analyticsEvent="hero_cta_click">
              {hero.primaryCta}
            </Button>
            <Button href="#care-plans" size="lg" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>
          <p
            className="mt-7 text-sm font-medium tracking-wide text-gold-dark animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {hero.trustLine}
          </p>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Gradient panel behind the arched image */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[7rem] rounded-b-[2.5rem] bg-gradient-to-b from-sand to-sand-deep"
            />
            <div className="relative overflow-hidden rounded-t-[7rem] rounded-b-[2.5rem] shadow-[0_24px_60px_rgba(76,37,13,0.16)] ring-1 ring-line animate-hero-image">
              <Image
                src="/images/dear-ones-hero.webp"
                alt="An older woman resting comfortably at home while a caregiver gently holds her hands."
                width={1100}
                height={1320}
                priority
                sizes="(min-width: 1024px) 44vw, (min-width: 640px) 60vw, 90vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative heart-hands line motif */}
            <svg
              aria-hidden="true"
              viewBox="0 0 48 44"
              className="absolute -bottom-5 -left-5 h-20 w-20 rounded-2xl border border-line bg-surface p-3 shadow-[0_10px_28px_rgba(76,37,13,0.12)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M24 24 C16 18 12 14.5 12 10.5 C12 7.5 14.2 5.5 16.8 5.5 C19 5.5 22.2 6.6 24 9.6 C25.8 6.6 29 5.5 31.2 5.5 C33.8 5.5 36 7.5 36 10.5 C36 14.5 32 18 24 24 Z"
                stroke="var(--terracotta)"
                strokeWidth={2.2}
              />
              <path d="M9 26 C7.5 31 10 35.5 15.5 37 C18 37.7 21 38 24 38" stroke="var(--gold-dark)" strokeWidth={2.2} />
              <path d="M39 26 C40.5 31 38 35.5 32.5 37 C30 37.7 27 38 24 38" stroke="var(--gold-dark)" strokeWidth={2.2} />
            </svg>
          </div>
        </div>
      </Container>

      {/* Scroll indicator (desktop) */}
      <div className="mt-14 hidden justify-center lg:flex" aria-hidden="true">
        <div className="flex flex-col items-center gap-2 text-gold-dark">
          <span className="text-xs font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
