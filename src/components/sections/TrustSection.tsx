import { trust } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function TrustSection() {
  return (
    <section id="trust" className="bg-brown py-20 text-[#f4e7d6] sm:py-28 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Trust &amp; transparency
          </p>
          <h2 className="mt-4 text-balance text-[2rem] leading-[1.14] text-[#fbf1e2] sm:text-[2.5rem]">
            <span className="block">{trust.heading[0]}</span>
            <span className="block text-gold">{trust.heading[1]}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-[#e6d3bd]">
            We build trust through the way we work — clear, consented and
            consistent — rather than through claims we cannot yet verify.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {trust.points.map((point, i) => {
            const Icon = point.icon;
            const isLast = i === trust.points.length - 1;
            return (
              <Reveal
                key={point.title}
                delay={i * 70}
                className={isLast ? "sm:col-span-2" : undefined}
              >
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-[#fbf1e2]">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#e0ccb5]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
