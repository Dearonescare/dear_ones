import { Mail, Phone } from "lucide-react";
import {
  getMailtoHref,
  getPhoneLinks,
  getWhatsappHref,
  serviceAreaLabel,
  siteConfig,
} from "@/config/site";
import { contact } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/BrandIcons";

export function ContactSection() {
  const phones = getPhoneLinks();
  const wa = getWhatsappHref();
  const mail = getMailtoHref("Dear Ones enquiry");

  return (
    <section id="contact" className="bg-background-soft py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Speak with us</p>
          <h2 className="text-balance text-[2rem] leading-[1.12] text-brown sm:text-[2.5rem]">
            {contact.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {contact.body}
          </p>
        </Reveal>

        {/* Two direct channels — no form to fill in. */}
        <Reveal
          delay={100}
          className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          {phones.length > 0 && (
            /* Each number is its own link, so the card is a container rather
               than a single anchor. */
            <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface px-6 py-6 shadow-[0_10px_30px_rgba(76,37,13,0.06)] transition-colors hover:border-terracotta">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-terracotta text-[#fff7ee] shadow-[0_8px_20px_rgba(138,61,37,0.24)]">
                <Phone aria-hidden="true" className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Call us</span>
                {/* Sans with tabular figures: the display serif uses old-style
                    numerals, which makes a phone number hard to scan. */}
                {phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="mt-0.5 block font-sans text-lg font-semibold tabular-nums tracking-[0.01em] text-brown transition-colors hover:text-terracotta"
                  >
                    {phone.display}
                  </a>
                ))}
                <span className="mt-0.5 block text-xs text-muted">
                  Tap a number to call a care coordinator
                </span>
              </span>
            </div>
          )}

          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-line bg-surface px-6 py-6 shadow-[0_10px_30px_rgba(76,37,13,0.06)] transition-colors hover:border-[#25683f]"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#25683f] text-white shadow-[0_8px_20px_rgba(37,104,63,0.26)]">
                <WhatsappIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Message us on</span>
                <span className="block font-serif text-xl font-semibold text-brown">
                  WhatsApp
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Chat with us any time
                </span>
              </span>
            </a>
          )}
        </Reveal>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          {mail && (
            <p className="text-sm text-muted">
              Prefer email?{" "}
              <a
                href={mail}
                className="inline-flex items-center gap-1.5 font-medium text-brown underline-offset-4 hover:text-terracotta hover:underline"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {siteConfig.email}
              </a>
            </p>
          )}

          <p className="mt-4 text-sm text-muted">Serving: {serviceAreaLabel()}.</p>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Dear Ones is not an emergency service. In a medical emergency, please
            contact local emergency services directly.
          </p>
        </div>
      </Container>
    </section>
  );
}
