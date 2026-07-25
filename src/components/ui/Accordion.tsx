"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionEntry {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  /** Index of the item expanded on first render. */
  defaultOpen?: number;
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(
    defaultOpen ?? null
  );
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-background-soft sm:px-7"
              >
                <span className="font-serif text-lg font-semibold text-brown sm:text-xl">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-terracotta transition-transform duration-300",
                    isOpen && "rotate-45 bg-terracotta text-[#fff7ee]"
                  )}
                >
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-[1.02rem] leading-relaxed text-muted sm:px-7">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
