import { Info } from "lucide-react";
import { carePlans } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard } from "@/components/ui/PlanCard";

export function CarePlansSection() {
  return (
    <section id="care-plans" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Care Plans"
            title={carePlans.heading}
            intro={carePlans.intro}
          />
          <p className="mt-4 text-sm font-medium text-gold-dark">
            {carePlans.pricingNote}
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3 lg:gap-7">
          {carePlans.tiers.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 100}
              className={plan.featured ? "lg:-translate-y-3" : undefined}
            >
              <PlanCard
                plan={plan}
                ctaLabel={carePlans.planCta}
                ctaHref="#contact"
                pricingNote="Pricing based on location & needs"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <span>{carePlans.serviceLimitNote}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
