import Image from "next/image";
import { ArrowRight, CalendarClock, CheckCircle2 } from "lucide-react";
import { familyUpdates } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const { report } = familyUpdates;

function ReportMock() {
  return (
    <div className="float-soft mx-auto w-full max-w-sm overflow-hidden rounded-[2.25rem] border border-line bg-surface shadow-[0_28px_70px_rgba(76,37,13,0.18)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line bg-background-soft px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {report.label}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-2.5 py-1 text-xs font-semibold text-terracotta">
          <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
          {report.status}
        </span>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-muted">
          <CalendarClock aria-hidden="true" className="h-4 w-4 text-gold-dark" />
          <span className="font-medium text-brown-soft">{report.dateLabel}:</span>
          <span>{report.dateValue}</span>
        </div>

        <dl className="mt-5 divide-y divide-line">
          {report.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-3"
            >
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="text-right text-sm font-medium text-brown">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 rounded-2xl bg-background-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
            Coordinator’s note
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-brown-soft">
            {report.note}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-line">
            <Image
              src="/images/dear-ones-hands.webp"
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-muted">{report.photoCaption}</p>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/30 bg-surface px-4 py-3">
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-terracotta" />
          <p className="text-sm font-medium text-brown">{report.nextAction}</p>
        </div>
      </div>
    </div>
  );
}

export function FamilyUpdatesSection() {
  return (
    <section
      id="family-updates"
      className="border-y border-line bg-background-soft py-20 sm:py-28 lg:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <ReportMock />
        </Reveal>

        <Reveal delay={100} className="order-1 max-w-xl lg:order-2">
          <p className="eyebrow mb-4">Family updates</p>
          <h2 className="text-balance text-[2rem] leading-[1.12] text-brown sm:text-[2.5rem]">
            <span className="block">{familyUpdates.heading[0]}</span>
            <span className="block text-terracotta">
              {familyUpdates.heading[1]}
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {familyUpdates.body}
          </p>
          <p className="mt-4 text-sm italic text-gold-dark">
            The report shown is an illustrative example and contains no real
            personal information.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
