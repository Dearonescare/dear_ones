"use client";

import { MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getTelHref, getWhatsappHref } from "@/config/site";
import { Button } from "@/components/ui/Button";

const WA_PREFILL =
  "Hello Dear Ones, I would like to learn more about your elder-support services.";

/**
 * Sticky bottom contact bar on mobile + a floating WhatsApp (or best
 * available) action on desktop. The page reserves space via bottom padding
 * (see page layout) so the mobile bar never hides content.
 */
export function MobileContactBar() {
  const tel = getTelHref();
  const wa = getWhatsappHref(WA_PREFILL);

  return (
    <>
      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-3">
          <Button href="#contact" size="md" className="flex-1" analyticsEvent="hero_cta_click">
            Speak With Us
          </Button>
          {tel && (
            <a
              href={tel}
              onClick={() => trackEvent("phone_click")}
              aria-label="Call Dear Ones"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-surface text-terracotta"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
            </a>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click")}
              aria-label="Message Dear Ones on WhatsApp"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25683f] text-white"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Desktop floating WhatsApp */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click")}
          aria-label="Message Dear Ones on WhatsApp"
          className="fixed bottom-7 right-7 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25683f] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-transform hover:scale-105 lg:grid"
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        </a>
      )}
    </>
  );
}
