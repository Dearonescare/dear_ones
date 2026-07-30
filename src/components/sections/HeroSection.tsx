import { CalendarCheck, Heart, Headset, ShieldCheck } from "lucide-react";
import { hero } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const PHOTO_ALT =
  "A caregiver's hands gently holding the hands of a smiling older woman at home.";

/* Warm wash that dissolves the photo into the page background so the copy
   reads over it — bottom-up on phones, left-to-right from md up. */
const SCRIM =
  "bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_srgb,var(--background)_92%,transparent)_52%,color-mix(in_srgb,var(--background)_38%,transparent)_100%)] " +
  "md:bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_srgb,var(--background)_92%,transparent)_34%,transparent_66%)]";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden pt-[72px] pb-14 md:items-center md:pb-20"
    >
      {/* Ambient warm background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
      >
        <div className="absolute -right-24 -top-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,_rgba(238,222,201,0.85),_transparent_65%)]" />
        <div className="absolute -left-32 top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(250,240,226,0.9),_transparent_60%)]" />
      </div>

      {/* Banner photo — full-bleed behind the copy, masked so its inner edge
          melts into the background instead of ending on a hard line.
          Plain <picture> so only the matching crop is downloaded. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[72px] -z-20 animate-hero-image [mask-image:linear-gradient(to_bottom,transparent_12%,#000_68%)] md:left-[36%] md:top-0 md:[mask-image:linear-gradient(to_right,transparent_0%,#000_30%)]"
      >
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/avif"
            srcSet="/images/hero-wide-800.avif 800w, /images/hero-wide-1103.avif 1103w"
            sizes="64vw"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/images/hero-wide-800.webp 800w, /images/hero-wide-1103.webp 1103w"
            sizes="64vw"
          />
          <source
            type="image/avif"
            srcSet="/images/hero-portrait-500.avif 500w, /images/hero-portrait-680.avif 680w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/images/hero-portrait-500.webp 500w, /images/hero-portrait-680.webp 680w"
            sizes="100vw"
          />
          <img
            src="/images/hero-portrait-680.webp"
            alt={PHOTO_ALT}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[62%_top] md:object-[center_28%]"
          />
        </picture>
      </div>

      {/* Contrast wash */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${SCRIM}`}
      />

      {/* Engraved village motif — sits in the fade between copy and photo.
          Kept as its own layer (rather than baked into the crop) so it can be
          placed independently at each breakpoint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 right-0 top-[14%] w-[56%] opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_42%,transparent_74%)] md:right-auto md:left-[45%] md:top-1/2 md:w-[27%] md:-translate-y-1/2 md:opacity-85"
      >
        <picture>
          <source type="image/avif" srcSet="/images/hero-village.avif" />
          <img
            src="/images/hero-village.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </picture>
      </div>

      <Container>
        <div className="flex max-w-xl flex-col lg:max-w-[38rem]">
          {/* Eyebrow pill */}
          <p className="eyebrow eyebrow-lg inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-surface/70 px-4 py-2 shadow-[0_2px_10px_rgba(76,37,13,0.05)] backdrop-blur-[2px] animate-fade-up">
            <ShieldCheck aria-hidden="true" className="h-[1.15em] w-[1.15em]" />
            {hero.eyebrow}
          </p>

          <h1
            className="mt-5 text-balance text-[2.05rem] leading-[1.08] text-brown animate-fade-up sm:text-[2.6rem] lg:text-[3rem]"
            style={{ animationDelay: "60ms" }}
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-gold-dark">{hero.titleAccent}</span>
          </h1>

          {/* Heart divider */}
          <div
            aria-hidden="true"
            className="mt-5 flex max-w-md items-center gap-3 animate-fade-up"
            style={{ animationDelay: "90ms" }}
          >
            <span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--gold))]" />
            <Heart className="h-3.5 w-3.5 shrink-0 fill-gold-dark text-gold-dark" />
            <span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--gold))]" />
          </div>

          <p
            className="mt-5 max-w-lg text-pretty text-[0.95rem] leading-relaxed text-muted animate-fade-up sm:text-base"
            style={{ animationDelay: "120ms" }}
          >
            {hero.description}
          </p>

          {/* Highlights — stacked list on phones, divided row from md up.
              Sits above the CTAs on mobile and below them on desktop. */}
          <ul
            className="order-1 mt-7 divide-y divide-line/70 animate-fade-up md:order-2 md:mt-9 md:flex md:divide-x md:divide-y-0"
            style={{ animationDelay: "240ms" }}
          >
            {hero.highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 py-3 md:flex-1 md:flex-col md:gap-2 md:px-3 md:py-0 md:text-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-surface/70 md:h-auto md:w-auto md:border-0 md:bg-transparent">
                  <Icon aria-hidden="true" className="h-5 w-5 text-gold-dark" />
                </span>
                <span className="text-sm leading-snug text-brown-soft md:text-[0.8rem]">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="order-2 mt-7 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center md:order-1 md:mt-8"
            style={{ animationDelay: "180ms" }}
          >
            <Button href="#contact" size="lg" withArrow analyticsEvent="hero_cta_click">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <Headset aria-hidden="true" className="h-4 w-4" />
              </span>
              {hero.primaryCta}
            </Button>
            <Button href="#care-plans" size="lg" variant="secondary">
              <CalendarCheck aria-hidden="true" className="h-[1.15em] w-[1.15em] text-gold-dark" />
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
