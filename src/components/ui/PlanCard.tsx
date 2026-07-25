"use client";

import { useId, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import type { PlanTier } from "@/types";

interface PlanCardProps {
  plan: PlanTier;
  ctaLabel: string;
  ctaHref: string;
  pricingNote: string;
}

export function PlanCard({ plan, ctaLabel, ctaHref, pricingNote }: PlanCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-surface p-7 transition-shadow sm:p-8",
        plan.featured
          ? "border-gold/60 shadow-[0_18px_48px_rgba(76,37,13,0.12)] ring-1 ring-gold/40"
          : "border-line shadow-[0_1px_2px_rgba(76,37,13,0.04),0_8px_24px_rgba(76,37,13,0.05)]"
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-terracotta px-3 py-1 text-xs font-semibold tracking-wide text-[#fff7ee]">
          {plan.badge}
        </span>
      )}

      <div className="mb-6">
        <h3 className="font-serif text-[1.7rem] font-semibold text-brown">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-gold-dark">
          {plan.tagline}
        </p>
        <p className="mt-4 text-pretty leading-relaxed text-muted">
          {plan.summary}
        </p>
      </div>

      {plan.inheritsNote && (
        <p className="mb-4 rounded-xl bg-background-soft px-4 py-3 text-sm font-medium text-brown-soft">
          {plan.inheritsNote}
        </p>
      )}

      <ul className="mb-6 space-y-3">
        {plan.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-[0.98rem] leading-snug">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-gold-dark"
              strokeWidth={2.2}
            />
            <span className="text-text">{item}</span>
          </li>
        ))}
      </ul>

      {/* Expandable full inclusions */}
      <div className="mb-6 mt-auto">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-deep"
        >
          {open ? "Hide full inclusions" : "View full inclusions"}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>

        <div
          id={panelId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-5 border-t border-line pt-5">
              {plan.detailGroups.map((group, gi) => (
                <div key={group.label ?? gi}>
                  {group.label && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
                      {group.label}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-snug text-muted"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          href={ctaHref}
          variant={plan.featured ? "primary" : "secondary"}
          size="md"
          withArrow
          className="w-full"
          onClick={() => trackEvent("plan_cta_click", { plan: plan.id })}
        >
          {ctaLabel}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">{pricingNote}</p>
      </div>
    </div>
  );
}
