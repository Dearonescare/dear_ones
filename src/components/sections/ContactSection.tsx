import { Mail, MessageCircle, Phone } from "lucide-react";
import {
  getMailtoHref,
  getTelHref,
  getWhatsappHref,
  hasAnyContactChannel,
  serviceAreaLabel,
  siteConfig,
} from "@/config/site";
import { contact } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

export function ContactSection() {
  const tel = getTelHref();
  const wa = getWhatsappHref(
    "Hello Dear Ones, I would like to learn more about your elder-support services."
  );
  const mail = getMailtoHref("Dear Ones enquiry");

  return (
    <section id="contact" className="bg-background-soft py-20 sm:py-28 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="max-w-md">
          <p className="eyebrow mb-4">Speak with us</p>
          <h2 className="text-balance text-[2rem] leading-[1.12] text-brown sm:text-[2.5rem]">
            {contact.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {contact.body}
          </p>

          {hasAnyContactChannel() ? (
            <ul className="mt-8 space-y-3">
              {tel && (
                <li>
                  <a href={tel} className="group flex items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-gold">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-background-soft text-terracotta">
                      <Phone aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">Call us</span>
                      <span className="font-semibold text-brown">{siteConfig.phone}</span>
                    </span>
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-gold">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-background-soft text-terracotta">
                      <MessageCircle aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">Message on</span>
                      <span className="font-semibold text-brown">WhatsApp</span>
                    </span>
                  </a>
                </li>
              )}
              {mail && (
                <li>
                  <a href={mail} className="group flex items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-gold">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-background-soft text-terracotta">
                      <Mail aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">Email us</span>
                      <span className="font-semibold text-brown break-all">{siteConfig.email}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="mt-8 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-muted">
              Direct contact details will be available soon. Please share your
              details using the form and a care coordinator will reach out.
            </p>
          )}

          <p className="mt-6 text-sm text-muted">
            Serving: {serviceAreaLabel()}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Dear Ones is not an emergency service. In a medical emergency, please
            contact local emergency services directly.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-[0_12px_40px_rgba(76,37,13,0.08)] sm:p-8">
            <EnquiryForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
