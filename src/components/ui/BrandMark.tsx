import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// "Your Love. Our Hands." — the two halves are coloured differently in the
// brand lockup, so split on the first sentence break.
const [taglineLead, taglineRest] = (() => {
  const [first, ...rest] = siteConfig.tagline.split(/(?<=\.)\s+/);
  return [first, rest.join(" ")];
})();

interface BrandMarkProps {
  /** Show the "Dear Ones" wordmark next to the symbol. */
  showText?: boolean;
  /** Show the "Your Love. Our Hands." tagline under the wordmark. */
  showTagline?: boolean;
  /** Tailwind size for the symbol (defaults to h-9 w-9). */
  markClassName?: string;
  textClassName?: string;
  className?: string;
}

/**
 * Dear Ones brand lockup rendered as crisp, accessible SVG + live text.
 * Preferred over an image crop of the logo: sharper at every size, fully
 * responsive, selectable and readable by screen readers/search engines.
 */
export function BrandMark({
  showText = true,
  showTagline = false,
  markClassName,
  textClassName,
  className,
}: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 44"
        role="img"
        aria-hidden={showText ? true : undefined}
        aria-label={showText ? undefined : siteConfig.name}
        className={cn("h-9 w-9 shrink-0", markClassName)}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Heart */}
        <path
          d="M24 24 C16 18 12 14.5 12 10.5 C12 7.5 14.2 5.5 16.8 5.5 C19 5.5 22.2 6.6 24 9.6 C25.8 6.6 29 5.5 31.2 5.5 C33.8 5.5 36 7.5 36 10.5 C36 14.5 32 18 24 24 Z"
          stroke="var(--terracotta)"
          strokeWidth={2.4}
        />
        {/* Cupping hands */}
        <path
          d="M9 26 C7.5 31 10 35.5 15.5 37 C18 37.7 21 38 24 38"
          stroke="var(--gold-dark)"
          strokeWidth={2.4}
        />
        <path
          d="M39 26 C40.5 31 38 35.5 32.5 37 C30 37.7 27 38 24 38"
          stroke="var(--gold-dark)"
          strokeWidth={2.4}
        />
      </svg>

      {showText && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-brown">
            {siteConfig.name}
          </span>
          {showTagline && (
            <span className="mt-1 text-xs font-medium tracking-wide">
              <span className="text-terracotta">{taglineLead}</span>
              {taglineRest && <span className="text-gold-dark"> {taglineRest}</span>}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
