"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Lightweight scroll-reveal using IntersectionObserver.
 * The `.reveal` styles (and their prefers-reduced-motion reset) live in
 * globals.css, so reduced-motion users see content immediately.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback for environments without IntersectionObserver: reveal on the
      // next frame (deferred so we don't setState synchronously in the effect).
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
