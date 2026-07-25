import { getFaqs } from "@/content/landing-page";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export function FAQSection() {
  const faqs = getFaqs().map(({ question, answer }) => ({ question, answer }));

  return (
    <section id="faqs" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="FAQs"
            title="Questions families often ask."
            align="center"
          />
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqs} defaultOpen={0} />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-[0.98rem] text-muted">
            Still have a question?{" "}
            <a
              href="#contact"
              className="font-semibold text-terracotta underline-offset-4 hover:underline"
            >
              Speak with a care coordinator
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
