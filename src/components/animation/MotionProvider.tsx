"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { EASE, MEDIA, SCRUB, TRAVEL, PARALLAX } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The page's single scroll choreography.
 *
 * Mounted once in the root layout. It owns smooth scrolling (Lenis) and every
 * scroll-linked effect, driven off `data-anim` attributes on the existing
 * markup rather than per-component animation code — so the sections stay
 * presentational and the motion stays coordinated in one timeline graph.
 *
 * Lenis drives the scroll position and ScrollTrigger reads it; they are not
 * competing systems. GSAP's ticker runs Lenis so there is one rAF loop.
 */
export function MotionProvider() {
  useEffect(() => {
    // Honour the OS setting before anything is created: reduced-motion users
    // get the plain document, with the CSS reveal fallback already in place.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Weighted, decelerating feel — smooth without feeling sluggish.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than emulating it.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    let pointerCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      /* ---------- Hero entrance ----------
         One timeline, built once on load rather than inside matchMedia, so
         crossing a breakpoint while reading cannot replay the intro. The two
         sides of the hero arrive together: the photograph unmasks from the
         right while the copy steps in from the left. */
      const isDesktopNow = window.matchMedia(MEDIA.desktop).matches;
      const isMobileNow = window.matchMedia(MEDIA.mobile).matches;
      // Mobile keeps the same idea at roughly half the travel.
      const f = isMobileNow ? 0.45 : isDesktopNow ? 1 : 0.72;

      const q = <T extends HTMLElement>(sel: string) =>
        gsap.utils.toArray<T>(sel);

      const media = document.querySelector<HTMLElement>('[data-hero="media"]');
      const badge = document.querySelector<HTMLElement>('[data-hero="badge"]');
      const headline = document.querySelector<HTMLElement>(
        '[data-hero="headline"]'
      );
      const desc = document.querySelector<HTMLElement>('[data-hero="desc"]');
      const ctas = q<HTMLElement>('[data-hero="ctas"] > *');
      const benefits = q<HTMLElement>('[data-hero="benefit"]');
      const heart = document.querySelector<HTMLElement>('[data-hero="heart"]');
      const ruleL = document.querySelector<HTMLElement>(
        '[data-hero="rule-left"]'
      );
      const ruleR = document.querySelector<HTMLElement>(
        '[data-hero="rule-right"]'
      );

      if (media || headline) {
        const intro = gsap.timeline({
          defaults: { ease: EASE },
          // Clear the pre-paint guard once the sequence owns the elements.
          onStart: () =>
            document.documentElement.classList.remove("motion-ready"),
          onComplete: () => {
            // Drop inline transforms so nothing here creates a containing
            // block for the fixed header or the scroll parallax below.
            gsap.set([badge, desc, heart, ruleL, ruleR], {
              clearProps: "all",
            });
            gsap.set([headline, ...ctas, ...benefits], { clearProps: "all" });
          },
        });

        // The photograph unmasks from the right and settles out of its zoom.
        if (media) {
          intro.fromTo(
            media,
            {
              opacity: 1,
              x: 100 * f,
              scale: 1 + 0.08 * f,
              clipPath: "inset(0% 0% 0% 25%)",
            },
            {
              x: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: isMobileNow ? 1.35 : 1.6,
              ease: "power4.out",
            },
            0.05
          );
        }

        if (badge) {
          intro.fromTo(
            badge,
            { opacity: 0, y: 18, x: -15 },
            { opacity: 1, y: 0, x: 0, duration: 0.6 },
            0.15
          );
        }

        // The headline is the left-hand counterpart of the photograph: same
        // duration, same easing, same start, mirrored direction. Running them
        // together is what makes the two sides of the hero feel like one
        // movement rather than two animations that happen to overlap.
        // The headline blooms open from small. `back.out` overshoots slightly
        // past full size before settling, which is what gives it the sense of
        // opening rather than merely growing — kept low so it reads as a flower
        // opening, not a bounce.
        if (headline) {
          intro.fromTo(
            headline,
            { opacity: 0, scale: 0.86, transformOrigin: "left center" },
            {
              opacity: 1,
              scale: 1,
              duration: isMobileNow ? 1.05 : 1.2,
              ease: "back.out(1.3)",
            },
            0.05
          );
        }

        // Divider draws outward from the heart.
        if (ruleL && ruleR && heart) {
          intro
            .fromTo(
              ruleL,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.55 },
              0.95
            )
            .fromTo(
              heart,
              { opacity: 0, scale: 0.6 },
              { opacity: 1, scale: 1, duration: 0.5 },
              1.03
            )
            .fromTo(
              ruleR,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.55 },
              1.11
            );
        }

        if (desc) {
          intro.fromTo(
            desc,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8 },
            1.14
          );
        }

        if (ctas.length) {
          intro.fromTo(
            ctas,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1 },
            1.34
          );
        }

        if (benefits.length) {
          intro.fromTo(
            benefits,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.085 },
            1.6
          );
        }
      }

      /* ---------- Pointer micro-parallax (desktop, non-touch) ----------
         Applied to the inner <picture>, not the wrapper: the wrapper is what
         the scroll timeline moves, and two tweens writing the same transform
         would fight each other. Bounded to a few pixels and interpolated, so
         it reads as the photograph breathing rather than tracking the cursor. */
      const pictureEl = media?.querySelector<HTMLElement>("picture");

      if (
        pictureEl &&
        isDesktopNow &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        const xSet = gsap.quickTo(pictureEl, "x", {
          duration: 1.1,
          ease: "power3.out",
        });
        const ySet = gsap.quickTo(pictureEl, "y", {
          duration: 1.1,
          ease: "power3.out",
        });

        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          xSet(nx * 4);
          ySet(ny * 3);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        pointerCleanup = () =>
          window.removeEventListener("pointermove", onMove);
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: `${MEDIA.desktop} and ${MEDIA.motionOk}`,
          tablet: `${MEDIA.tablet} and ${MEDIA.motionOk}`,
          mobile: `${MEDIA.mobile} and ${MEDIA.motionOk}`,
        },
        (context) => {
          const { desktop, tablet } = context.conditions as Record<
            string,
            boolean
          >;
          const key = desktop ? "desktop" : tablet ? "tablet" : "mobile";
          const travel = TRAVEL[key];
          const parallax = PARALLAX[key];

          /* ---------- 1. Hero: subtle scroll depth ----------
             Only a few pixels of separation between the photograph and the
             copy. The entrance timeline below is the hero's real moment; this
             just stops it feeling frozen once the visitor starts scrolling. */

          const hero = document.querySelector<HTMLElement>('[data-anim="hero"]');
          const heroMedia = document.querySelector<HTMLElement>(
            '[data-anim="hero-media"]'
          );
          const heroCopy = document.querySelector<HTMLElement>(
            '[data-hero="copy"]'
          );

          if (hero && heroMedia) {
            const depth = desktop ? 1 : tablet ? 0.7 : 0.45;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: SCRUB,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(
              heroMedia,
              { y: 0, scale: 1 },
              { y: 30 * depth, scale: 1.025, ease: "none" },
              0
            );

            if (heroCopy) {
              tl.fromTo(
                heroCopy,
                { y: 0 },
                { y: -22 * depth, ease: "none" },
                0
              );
            }
          }

          /* ---------- 2. Masked heading reveals ---------- */

          gsap.utils
            .toArray<HTMLElement>('[data-anim="mask"]')
            .forEach((el) => {
              const inner = el.querySelector<HTMLElement>("[data-anim-inner]");
              if (!inner) return;

              gsap.fromTo(
                inner,
                { yPercent: 108 },
                {
                  yPercent: 0,
                  duration: 1.05,
                  ease: EASE,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    once: true,
                  },
                }
              );
            });

          /* ---------- 3. Parallax on section visuals ----------
             Staggered content reveals stay with the existing <Reveal>
             component: it already covers that behaviour and its
             reduced-motion fallback, so duplicating it here would give two
             systems fighting over the same elements. */

          gsap.utils
            .toArray<HTMLElement>('[data-anim="parallax"]')
            .forEach((el) => {
              const strength = Number(el.dataset.animStrength ?? 1) * parallax;

              gsap.fromTo(
                el,
                { yPercent: strength * 100 * 0.5 },
                {
                  yPercent: -strength * 100 * 0.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: SCRUB,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

          /* ---------- 5. Feature visual settling into place ---------- */

          gsap.utils
            .toArray<HTMLElement>('[data-anim="feature"]')
            .forEach((el) => {
              gsap.fromTo(
                el,
                { scale: desktop ? 0.88 : 0.94, y: travel, opacity: 0.4 },
                {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "center 58%",
                    scrub: SCRUB,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

          return () => {
            // matchMedia cleanup: GSAP reverts everything created in here.
          };
        }
      );
    });

    // Fonts and images change layout after hydration; recalculate once settled.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      pointerCleanup?.();
      gsap.ticker.remove(ticker);
      ctx.revert();
      lenis.destroy();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
