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
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] [mask-image:linear-gradient(to_right,transparent_0%,#000_46%)] sm:block"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, 42vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative flex gap-4 p-6 sm:p-7 sm:pr-[38%]">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-terracotta text-[#fff7ee] shadow-[0_8px_20px_rgba(138,61,37,0.24)]">
          <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <div>
          <h3 className="font-serif text-xl font-semibold leading-tight text-brown">
            {item.title}
          </h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
            {item.description}
          </p>
          {item.note && (
            <p className="mt-2 text-xs italic leading-relaxed text-gold-dark">
              {item.note}
            </p>
          )}
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
            eyebrow="How We Help"
            title={services.heading}
            intro="A thoughtful blend of presence, practical help and reliable coordination — matched to what your family actually needs."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 80} className="h-full">
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button href="#contact" size="lg" variant="secondary" withArrow>
            {services.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
