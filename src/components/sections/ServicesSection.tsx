import { services } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { ServiceItem } from "@/types";

function FeaturedService({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  return (
    <div className="grid gap-6 rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-background-soft p-7 shadow-[0_10px_30px_rgba(76,37,13,0.07)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-9">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-terracotta text-[#fff7ee] shadow-[0_10px_24px_rgba(138,61,37,0.28)]">
        <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.6} />
      </span>
      <div>
        <h3 className="font-serif text-2xl font-semibold text-brown">
          {item.title}
        </h3>
        <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted">
          {item.description}
        </p>
        {item.note && (
          <p className="mt-2.5 text-sm italic text-gold-dark">{item.note}</p>
        )}
      </div>
    </div>
  );
}

function StandardService({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  return (
    <div className="border-t border-line pt-6">
      <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-background-soft text-terracotta ring-1 ring-line">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-brown">{item.title}</h3>
      <p className="mt-2 text-pretty leading-relaxed text-muted">
        {item.description}
      </p>
      {item.note && (
        <p className="mt-2.5 text-sm italic leading-relaxed text-gold-dark">
          {item.note}
        </p>
      )}
    </div>
  );
}

export function ServicesSection() {
  const featured = services.items.filter((s) => s.featured);
  const standard = services.items.filter((s) => !s.featured);

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

        <div className="mt-14 space-y-8">
          {featured[0] && (
            <Reveal>
              <FeaturedService item={featured[0]} />
            </Reveal>
          )}

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {standard.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <StandardService item={item} />
              </Reveal>
            ))}
          </div>

          {featured[1] && (
            <Reveal>
              <FeaturedService item={featured[1]} />
            </Reveal>
          )}
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
