import { Check } from "lucide-react";
import { about } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="bg-background-soft py-20 sm:py-28 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-4">{about.eyebrow}</p>
          <h2 className="text-balance text-[2rem] leading-[1.12] text-brown sm:text-[2.5rem]">
            {about.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{about.body}</p>

          <p className="mt-8 rounded-2xl border border-gold/30 bg-surface px-6 py-5 font-serif text-xl italic leading-snug text-brown shadow-[0_8px_24px_rgba(76,37,13,0.05)] sm:text-[1.4rem]">
            {about.emphasis}
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:pt-16">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">
            What families experience
          </h3>
          <ul className="mt-6 space-y-4">
            {about.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                  <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="text-[1.05rem] leading-relaxed text-text">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
