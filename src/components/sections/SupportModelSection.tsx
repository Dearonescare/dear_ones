import { supportModel } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GrowLine } from "@/components/ui/GrowLine";

export function SupportModelSection() {
  return (
    <section
      id="support-model"
      aria-label="How Dear Ones supports your family"
      className="border-y border-line bg-surface py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {/* Connecting progress line (desktop) */}
          <GrowLine className="absolute left-[12.5%] right-[12.5%] top-[38px] z-0 hidden h-[2px] bg-gradient-to-r from-gold/30 via-gold to-gold/30 lg:block" />

          {supportModel.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 90}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <span className="grid h-[76px] w-[76px] place-items-center rounded-full border border-line bg-background text-terracotta shadow-[0_8px_20px_rgba(76,37,13,0.08)]">
                <step.icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-brown">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[15rem] text-[0.95rem] leading-relaxed text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
