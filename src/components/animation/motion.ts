/**
 * Shared motion constants.
 *
 * One place for the easing and distances so every scroll effect on the page
 * reads as a single motion language rather than a pile of independent
 * animations. Values are deliberately restrained: this is an elder-care site,
 * so the motion should feel calm and editorial, never playful.
 */

/** The house easing curve. Matches the CSS cubic-bezier already in globals.css. */
export const EASE = "power3.out";

/** Scrubbed timelines lag the scroll position by this many seconds. */
export const SCRUB = 0.8;

/** Vertical travel for content reveals, in pixels, per breakpoint. */
export const TRAVEL = {
  desktop: 44,
  tablet: 32,
  mobile: 22,
} as const;

/** Parallax drift for secondary visuals, as a fraction of their own height. */
export const PARALLAX = {
  desktop: 0.12,
  tablet: 0.08,
  mobile: 0.04,
} as const;

export const MEDIA = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 640px) and (max-width: 1023.98px)",
  mobile: "(max-width: 639.98px)",
  motionOk: "(prefers-reduced-motion: no-preference)",
} as const;
