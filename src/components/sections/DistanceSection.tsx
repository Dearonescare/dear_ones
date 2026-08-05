import Image from "next/image";
import { distance } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Scattered positions for the illustrated collage, as percentages of the
 * collage box. Only applied from lg up — below that the cards fall back to a
 * plain two-column grid, where absolute placement would collapse.
 */
const COLLAGE = [
  { left: "3%", top: "0%", width: "47%", height: "33%", rotate: "-2.5deg" },
  { left: "55%", top: "5%", width: "45%", height: "30%", rotate: "2deg" },
  { left: "12%", top: "35%", width: "47%", height: "32%", rotate: "-1deg" },
  { left: "0%", top: "68%", width: "45%", height: "31%", rotate: "1.5deg" },
  { left: "58%", top: "56%", width: "41%", height: "40%", rotate: "2.5deg" },
];

function GalleryCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  // `relative` matters: it makes this the containing block for the filled
  // image, so `overflow-hidden` actually clips it to the rounded corners.
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-surface ring-4 ring-surface shadow-[0_12px_32px_rgba(76,37,13,0.13)]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 88vw"
        className="object-cover"
      />
    </div>
  );
}

export function DistanceSection() {
  return (
    <section id="why" className="py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
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
                <p className="border-l-2 border-terracotta/70 pl-5 font-serif text-xl italic leading-snug text-brown-soft sm:text-[1.5rem]">
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

        {/* Illustrated collage */}
        <Reveal delay={120}>
          <div className="relative">
            {/* Dashed trail + hearts threading the cards together */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              fill="none"
            >
              <path
                d="M20 34 C6 44 8 58 20 66"
                stroke="var(--gold)"
                strokeWidth="0.4"
                strokeDasharray="1.6 2"
                opacity="0.55"
              />
              <path
                d="M64 36 C78 46 76 52 64 58"
                stroke="var(--gold)"
                strokeWidth="0.4"
                strokeDasharray="1.6 2"
                opacity="0.55"
              />
              {/* Small hearts tucked into the gaps between cards */}
              {[
                { x: 8, y: 41, s: 0.05 },
                { x: 71, y: 40, s: 0.038 },
                { x: 52, y: 71, s: 0.045 },
              ].map(({ x, y, s }) => (
                <path
                  key={`${x}-${y}`}
                  transform={`translate(${x} ${y}) scale(${s})`}
                  d="M0 12 C-14 2 -20 -6 -14 -12 C-9 -17 -2 -14 0 -9 C2 -14 9 -17 14 -12 C20 -6 14 2 0 12 Z"
                  fill="var(--sand-deep)"
                  opacity="0.75"
                />
              ))}
            </svg>

            {/* lg+: scattered collage */}
            <div className="relative hidden aspect-[900/875] w-full lg:block">
              {distance.gallery.map((shot, i) => (
                <div
                  key={shot.src}
                  className="absolute"
                  style={{
                    left: COLLAGE[i].left,
                    top: COLLAGE[i].top,
                    width: COLLAGE[i].width,
                    height: COLLAGE[i].height,
                    transform: `rotate(${COLLAGE[i].rotate})`,
                  }}
                >
                  <GalleryCard src={shot.src} alt={shot.alt} className="h-full w-full" />
                </div>
              ))}
            </div>

            {/* below lg: plain grid, last card spans full width */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:hidden">
              {distance.gallery.map((shot, i) => (
                <div
                  key={shot.src}
                  className={i === 4 ? "col-span-2" : undefined}
                >
                  <GalleryCard src={shot.src} alt={shot.alt} className="aspect-[4/3]" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
