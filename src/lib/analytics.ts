/**
 * Optional, privacy-respecting analytics helpers.
 *
 * Analytics is disabled by default. It only ever fires when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set AND the GA script has loaded.
 * These typed helpers are safe no-ops on the server and when GA is absent.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "plan_cta_click"
  | "on_demand_cta_click"
  | "enquiry_submit_success";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", event, params ?? {});
}
