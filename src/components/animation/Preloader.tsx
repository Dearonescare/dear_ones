import Image from "next/image";

/**
 * Brand curtain shown over the page while the hero prepares itself.
 *
 * Deliberately markup-only: the choreography in MotionProvider animates it, so
 * the intro stays a single timeline rather than a preloader that fades on its
 * own schedule and a hero that guesses when to start.
 *
 * It is `display: none` by default and only revealed under `.motion-ready`,
 * the class an inline script adds before first paint when motion is allowed.
 * A visitor with JavaScript off, or reduced motion on, never sees it and can
 * never be left staring at a curtain that has nothing to lift it.
 */
export function Preloader() {
  return (
    <div
      data-preloader=""
      aria-hidden="true"
      className="fixed inset-0 z-100 hidden place-items-center bg-background"
    >
      {/* Stacked lockup, keyed to transparency from its white JPEG ground so
          it sits on the cream curtain without a visible tile. */}
      <Image
        data-preloader-logo=""
        src="/images/brand-stacked.webp"
        alt=""
        width={700}
        height={603}
        priority
        className="h-auto w-[min(62vw,280px)]"
      />
    </div>
  );
}
