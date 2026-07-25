import { LifeBuoy } from "lucide-react";
import { onDemand } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function OnDemandSection() {
  return (
    <section
      id="on-demand"
      className="bg-background-soft py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="On-Demand"
            title={onDemand.heading}
            intro={onDemand.body}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {onDemand.categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <Reveal
                key={category.title}
                delay={i * 80}
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-[0_10px_28px_rgba(76,37,13,0.08)]">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-background-soft text-terracotta ring-1 ring-line">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brown">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-muted">
                    {category.description}
                  </p>
                </div>
              </Reveal>
            );
          })}

          {/* Urgent support — highlighted */}
          <Reveal delay={onDemand.categories.length * 80} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-terracotta/25 bg-terracotta/[0.06] p-6">
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-terracotta text-[#fff7ee]">
                <LifeBuoy aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-terracotta-deep">
                When something comes up
              </h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-brown-soft">
                {onDemand.urgentNote}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            {onDemand.pricingNote}
          </p>
          <Button
            href="#contact"
            size="lg"
            withArrow
            analyticsEvent="on_demand_cta_click"
            className="shrink-0"
          >
            {onDemand.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
