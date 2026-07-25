import { howItWorks } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GrowLine } from "@/components/ui/GrowLine";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title={howItWorks.heading}
            align="center"
          />
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <GrowLine className="absolute left-[12.5%] right-[12.5%] top-[36px] z-0 hidden h-[2px] bg-gradient-to-r from-gold/20 via-gold to-gold/20 lg:block" />

          {howItWorks.steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.title}
                delay={i * 100}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <span className="relative grid h-[72px] w-[72px] place-items-center rounded-full border border-line bg-surface text-terracotta shadow-[0_8px_20px_rgba(76,37,13,0.08)]">
                  <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-terracotta text-xs font-bold text-[#fff7ee]">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-semibold text-brown">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-[0.95rem] leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
