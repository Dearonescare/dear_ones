import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcons";
import {
  getMailtoHref,
  getTelHref,
  getWhatsappHref,
  hasAnyContactChannel,
  serviceAreaLabel,
  siteConfig,
} from "@/config/site";
import { footer, navLinks } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";

export function Footer() {
  const year = new Date().getFullYear();
  const tel = getTelHref();
  const wa = getWhatsappHref();
  const mail = getMailtoHref("Dear Ones enquiry");

  // Unconfigured profiles stay out of the markup entirely.
  const socials = [
    {
      label: "Facebook",
      href: siteConfig.socialLinks.facebook,
      Icon: FacebookIcon,
    },
    {
      label: "Instagram",
      href: siteConfig.socialLinks.instagram,
      Icon: InstagramIcon,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="border-t border-line bg-background-soft">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <BrandMark showTagline />
            <p className="mt-5 text-pretty text-[0.98rem] leading-relaxed text-muted">
              {footer.description}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.98rem] text-brown-soft transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-[0.98rem] text-brown-soft transition-colors hover:text-terracotta"
                >
                  Speak With Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3 text-[0.98rem] text-brown-soft">
              {tel && (
                <li>
                  <a
                    href={tel}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-terracotta"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 text-gold-dark" />
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-terracotta"
                  >
                    <WhatsappIcon className="h-4 w-4 text-gold-dark" />
                    WhatsApp
                  </a>
                </li>
              )}
              {mail && (
                <li>
                  <a
                    href={mail}
                    className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-terracotta"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4 text-gold-dark" />
                    {siteConfig.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                <span>{serviceAreaLabel()}</span>
              </li>
              {!hasAnyContactChannel() && (
                <li className="text-muted">
                  Contact details coming soon — please reach out to us shortly.
                </li>
              )}
            </ul>

            {socials.length > 0 && (
              <>
                <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  Follow us
                </h2>
                <ul className="mt-4 flex items-center gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${label}`}
                        title={label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-brown-soft transition-colors hover:border-gold hover:text-terracotta"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          {/* Draft disclaimer — mark for legal review before launch. */}
          <p className="max-w-4xl text-xs leading-relaxed text-muted">
            {footer.disclaimer}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {year} {siteConfig.legalName || siteConfig.name}. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-xs text-brown-soft">
              <a href={siteConfig.legalLinks.privacy} className="hover:text-terracotta">
                Privacy Policy
              </a>
              <a href={siteConfig.legalLinks.terms} className="hover:text-terracotta">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
