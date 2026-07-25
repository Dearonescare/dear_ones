import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  note?: string;
  className?: string;
  iconClassName?: string;
}

/** Icon tile + title + copy. Used across services, on-demand and trust. */
export function IconFeature({
  icon: Icon,
  title,
  description,
  note,
  className,
  iconClassName,
}: IconFeatureProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-background-soft text-terracotta ring-1 ring-line",
          iconClassName
        )}
      >
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h3 className="text-xl font-semibold text-brown">{title}</h3>
      <p className="mt-2.5 text-pretty leading-relaxed text-muted">
        {description}
      </p>
      {note && (
        <p className="mt-3 text-sm italic leading-relaxed text-gold-dark">
          {note}
        </p>
      )}
    </div>
  );
}
