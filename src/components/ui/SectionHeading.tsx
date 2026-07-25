import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  /** A single string, or an array rendered as separate lines. */
  title: string | string[];
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
  as: Heading = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", invert && "text-gold")}>{eyebrow}</p>
      )}
      <Heading
        className={cn(
          "text-balance text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-[3rem]",
          invert ? "text-[#fbf1e2]" : "text-brown",
          titleClassName
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Heading>
      {intro && (
        <p
          className={cn(
            "mt-5 text-pretty text-[1.05rem] leading-relaxed sm:text-lg",
            invert ? "text-[#efe0cf]" : "text-muted"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
