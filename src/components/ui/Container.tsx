import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered content column with consistent horizontal padding. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
