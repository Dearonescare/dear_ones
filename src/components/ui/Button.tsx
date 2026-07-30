"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "compact" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-[#fff7ee] shadow-[0_10px_28px_rgba(138,61,37,0.28)] hover:bg-terracotta-deep hover:shadow-[0_14px_34px_rgba(138,61,37,0.32)]",
  secondary:
    "border border-line bg-surface/70 text-brown hover:border-gold hover:bg-surface",
  ghost: "text-brown hover:text-terracotta",
  inverse:
    "bg-[#fbf1e2] text-brown shadow-[0_10px_28px_rgba(0,0,0,0.22)] hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  // Full height, tight horizontal padding — for rows of two CTAs side by side.
  compact: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-[3.35rem] px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  analyticsEvent?: AnalyticsEvent;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-busy"?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

function ArrowIcon() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-1"
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    analyticsEvent,
    className,
    children,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const handleClick = () => {
      if (analyticsEvent) trackEvent(analyticsEvent);
      props.onClick?.();
    };
    return (
      <a
        href={props.href}
        onClick={handleClick}
        aria-label={props["aria-label"]}
        {...(props.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={classes}
      >
        {children}
        {withArrow && <ArrowIcon />}
      </a>
    );
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (analyticsEvent) trackEvent(analyticsEvent);
    props.onClick?.(e);
  };

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      aria-busy={props["aria-busy"]}
      onClick={handleClick}
      className={classes}
    >
      {children}
      {withArrow && <ArrowIcon />}
    </button>
  );
}
