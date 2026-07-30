"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-background/80 shadow-[0_4px_24px_rgba(76,37,13,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#top"
            className="rounded-lg py-1"
            aria-label={`${"Dear Ones"} — back to top`}
          >
            <Image
              src="/images/brand-lockup.png"
              alt={`${siteConfig.name} — ${siteConfig.tagline}`}
              width={600}
              height={165}
              priority
              sizes="(min-width: 640px) 200px, 168px"
              className="h-[46px] w-auto sm:h-[54px]"
            />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.95rem] font-medium text-brown-soft transition-colors hover:text-terracotta"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Only from lg — below that the sticky MobileContactBar already
                carries this action, and two of them read as a duplicate.
                The wrapper does the hiding: Button's base class sets
                `inline-flex`, which would otherwise beat a `hidden` passed
                through className (cn is a plain join, not tailwind-merge). */}
            <div className="hidden lg:block">
              <Button href="#contact" size="sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                Speak With Us
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-brown transition-colors hover:bg-surface lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
