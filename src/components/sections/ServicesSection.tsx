import Image from "next/image";
import { services } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { ServiceItem } from "@/types";

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  return (
    <article className="relative h-full overflow-hidden rounded-3xl border border-line/70 bg-surface/70 shadow-[0_6px_24px_rgba(76,37,13,0.06)]">
      {/* Supporting photo, bled into the right edge and masked so it melts
          into the card instead of ending on a hard line. */}
      {item.image && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[38%] [mask-image:linear-gradient(to_right,transparent_0%,#000_46%)] sm:w-[40%]"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 38vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative flex gap-4 p-5 pr-[42%] sm:p-6 sm:pr-[38%]">
        <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-terracotta text-[#fff7ee] shadow-[0_8px_20px_rgba(138,61,37,0.24)] sm:grid">
          <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <div>
          <h3 className="font-serif text-[17px] font-semibold leading-tight text-brown sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2 text-pretty text-[13px] leading-relaxed text-muted sm:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            title={services.heading}
            intro={services.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:gap-6 lg:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 80} className="h-full">
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="#contact" size="lg" variant="secondary" withArrow>
            {services.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
