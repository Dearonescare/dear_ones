"use client";

import { useEffect, useRef } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  getMailtoHref,
  getTelHref,
  getWhatsappHref,
  siteConfig,
} from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "@/types";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNavigation({ open, onClose, links }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);

    return () => {
      style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const tel = getTelHref();
  const wa = getWhatsappHref("Hello Dear Ones, I would like to learn more about your elder-support services.");
  const mail = getMailtoHref("Dear Ones enquiry");

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-brown/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-brown transition-colors hover:bg-surface"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3.5 font-serif text-xl text-brown transition-colors hover:bg-surface"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line px-5 py-5">
          <Button href="#contact" onClick={onClose} className="w-full" withArrow>
            Speak with a Care Coordinator
          </Button>
          <div className="flex flex-wrap gap-2">
            {tel && (
              <a
                href={tel}
                onClick={() => trackEvent("phone_click")}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-brown"
              >
                <Phone aria-hidden="true" className="h-4 w-4" /> Call
              </a>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click")}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-brown"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {mail && (
              <a
                href={mail}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-brown"
              >
                <Mail aria-hidden="true" className="h-4 w-4" /> Email
              </a>
            )}
          </div>
          {!tel && !wa && !mail && (
            <p className="text-sm text-muted">
              Contact details will be available soon. Please use the enquiry
              form above.
            </p>
          )}
          <p className="pt-1 text-center text-xs text-muted">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
