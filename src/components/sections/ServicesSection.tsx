import Image from "next/image";
import { Info } from "lucide-react";
import { services } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { ServiceItem } from "@/types";

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  const noteId = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-scope`;
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
          {/* The clarifying note rides on a chip instead of pushing the card
              taller: hover on pointer devices, tap/keyboard focus elsewhere.
              Purely CSS-driven, so this section stays server-rendered. */}
          {item.note && (
            <div className="group/scope relative mt-2.5 inline-block">
              <button
                type="button"
                aria-describedby={noteId}
                className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-white/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-dark backdrop-blur-sm transition hover:border-terracotta/40 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              >
                <Info aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                Show more
              </button>

              <span
                id={noteId}
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 z-20 mb-2.5 w-max max-w-60 translate-y-1 scale-[0.98] rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 text-xs italic leading-relaxed text-brown opacity-0 shadow-[0_12px_32px_rgba(76,37,13,0.18)] backdrop-blur-md transition duration-200 ease-out after:absolute after:left-6 after:top-full after:-mt-[5px] after:h-2.5 after:w-2.5 after:rotate-45 after:rounded-br-[3px] after:border-b after:border-r after:border-white/70 after:bg-white/85 group-hover/scope:translate-y-0 group-hover/scope:scale-100 group-hover/scope:opacity-100 group-focus-within/scope:translate-y-0 group-focus-within/scope:scale-100 group-focus-within/scope:opacity-100"
              >
                {item.note}
              </span>
            </div>
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

        <div className="mt-14 grid gap-4 sm:gap-6 lg:grid-cols-2">
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
