import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-32">
      <h1 className="text-4xl text-brown">Terms of Service</h1>
      {/* TODO: replace this placeholder with reviewed terms of service before launch. */}
      <p className="mt-6 rounded-2xl border border-gold/40 bg-background-soft px-5 py-4 text-sm text-brown-soft">
        This is a placeholder page. The full terms of service, including service
        scope, plan inclusions, service limits and third-party arrangements, will
        be published here before launch.
      </p>
      <p className="mt-6 leading-relaxed text-muted">
        Service availability, visit limits and response times vary by location
        and plan. Clinical, emergency and third-party services are coordinated
        with external providers where applicable.
      </p>
    </Container>
  );
}
