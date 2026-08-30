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
      data-anim="hero"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden pt-[72px] pb-14 md:items-center md:pb-20"
    >
      {/* Ambient warm background */}
      {/* Decorative only, and the section clips overflow, so drifting this
          layer cannot expose an edge the way moving a full-bleed image would. */}
      <div
        aria-hidden="true"
        data-anim="parallax"
        data-anim-strength="1.4"
        className="pointer-events-none absolute inset-0 -z-30 will-change-transform"
      >
        <div className="absolute -right-24 -top-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,_rgba(238,222,201,0.85),_transparent_65%)]" />
        <div className="absolute -left-32 top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(250,240,226,0.9),_transparent_60%)]" />
      </div>

      {/* Hero artwork — full-bleed behind the copy. The two masters are
          composed for their own orientation (engraved village on one side,
          photo on the other), so they are used whole; a plain <picture>
          keeps the browser from fetching the one it doesn't need. */}
      {/* The CSS entrance is gone: the scroll choreography now owns this
          element's reveal so it can be sequenced with the copy. */}
      <div
        aria-hidden="true"
        data-anim="hero-media"
        data-hero="media"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[72px] -z-20 will-change-transform"
      >
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/avif"
            srcSet="/images/hero-desktop.avif"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/images/hero-desktop.webp"
          />
          <source type="image/avif" srcSet="/images/hero-mobile.avif" />
          <img
            src="/images/hero-mobile.webp"
            alt={PHOTO_ALT}
            fetchPriority="high"
            decoding="async"
            /* Anchored to the top so her head is never cropped. The 65% only
               bites at narrow md widths, where the frame is near-square and
               crops horizontally too — wider viewports crop vertically only. */
            className="h-full w-full object-cover object-[center_28%] md:object-[65%_top]"
          />
        </picture>
      </div>

      {/* Contrast wash */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${SCRIM}`}
      />

      <Container>
        <div
          data-hero="copy"
          className="flex max-w-xl flex-col lg:max-w-[31rem]"
        >
          {/* Eyebrow pill */}
          <p
            data-hero="badge"
            className="eyebrow eyebrow-pill inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-surface/70 px-3.5 py-1.5 shadow-[0_2px_10px_rgba(76,37,13,0.05)] backdrop-blur-[2px]"
          >
            <ShieldCheck aria-hidden="true" className="h-[1.15em] w-[1.15em]" />
            {hero.eyebrow}
          </p>

          {/* Animated as one block, mirroring the photograph on the right, so
              the two halves of the hero arrive together. Markup is the
              original: only the hook attribute is added. */}
          <h1
            data-hero="headline"
            className="mt-5 text-balance text-[2.05rem] leading-[1.08] text-brown sm:text-[2.6rem] lg:text-[3rem]"
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
            className="mt-4 flex max-w-[21rem] items-center gap-3"
          >
            <span
              data-hero="rule-left"
              className="h-px flex-1 origin-right bg-[linear-gradient(to_right,transparent,var(--gold))]"
            />
            <Heart
              data-hero="heart"
              className="h-3.5 w-3.5 shrink-0 fill-gold-dark text-gold-dark"
            />
            <span
              data-hero="rule-right"
              className="h-px flex-1 origin-left bg-[linear-gradient(to_left,transparent,var(--gold))]"
            />
          </div>

          <p
            data-hero="desc"
            className="mt-4 max-w-[27.5rem] text-pretty text-[0.85rem] leading-relaxed text-muted md:text-[0.8rem]"
          >
            {hero.description}
          </p>

          {/* Highlights — stacked list on phones, divided row from md up.
              Sits above the CTAs on mobile and below them on desktop. */}
          <ul className="order-1 mt-7 divide-y divide-line/70 md:order-2 md:mt-6 md:flex md:divide-x md:divide-y-0">
            {hero.highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                data-hero="benefit"
                className="flex items-center gap-3 py-3 md:flex-1 md:flex-col md:gap-2 md:px-3 md:py-0 md:text-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-surface/70 md:h-auto md:w-auto md:border-0 md:bg-transparent">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-gold-dark md:h-[1.15rem] md:w-[1.15rem]"
                  />
                </span>
                <span className="text-sm leading-snug text-brown-soft md:text-[0.68rem]">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div
            data-hero="ctas"
            className="order-2 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:order-1 md:mt-7"
          >
            <Button
              href="#contact"
              size="compact"
              withArrow
              analyticsEvent="hero_cta_click"
              className="whitespace-nowrap"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <Headset aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              {hero.primaryCta}
            </Button>
            <Button
              href="#care-plans"
              size="compact"
              variant="secondary"
              className="whitespace-nowrap"
            >
              <CalendarCheck aria-hidden="true" className="h-[1.15em] w-[1.15em] text-gold-dark" />
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
