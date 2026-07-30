import Image from "next/image";
import { distance } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DistanceSection() {
  return (
    <section id="why" className="py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="max-w-xl">
          <Reveal>
            <h2 className="text-balance text-[2rem] leading-[1.12] text-brown sm:text-[2.6rem]">
              <span className="block">{distance.heading[0]}</span>
              <span className="block text-terracotta">{distance.heading[1]}</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {distance.intro}
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {distance.questions.map((question, i) => (
              <Reveal as="li" key={question} delay={120 + i * 90}>
                <p className="border-l-2 border-gold/60 pl-5 font-serif text-xl italic leading-snug text-brown-soft sm:text-[1.5rem]">
                  “{question}”
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120 + distance.questions.length * 90}>
            <p className="mt-9 text-pretty text-lg font-medium leading-relaxed text-brown">
              {distance.closing}
            </p>
          </Reveal>
        </div>

        {/* Subtle supporting image — text stays dominant */}
        <Reveal delay={120} className="hidden lg:block">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-sand/60 to-transparent"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] ring-1 ring-line">
              <Image
                src="/images/dear-ones-hands.webp"
                alt="A caregiver's hands gently holding the hands of an older person."
                width={674}
                height={523}
                sizes="(min-width: 1024px) 34vw, 0px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
