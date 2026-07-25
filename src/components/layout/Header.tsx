"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/content/landing-page";
import { BrandMark } from "@/components/ui/BrandMark";
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
            <BrandMark />
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
            <Button
              href="#contact"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Speak With Us
            </Button>
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
